#!/usr/bin/env bash
#
# Prepare a Hostinger deploy branch: merge source branch, build assets, commit.
# Does not push — run: git push origin <deploy-branch>
#
# Default: merge main -> hostinger-deployment
# Redesign workflow example:
#   ./scripts/deploy.sh -s smart-fish-redesign -d smart-fish-deployment-3
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

SOURCE_BRANCH="${SOURCE_BRANCH:-main}"
DEPLOY_BRANCH="${DEPLOY_BRANCH:-hostinger-deployment}"
BUMP_API=false
STAY_ON_DEPLOY=false
DRY_RUN=false

usage() {
	cat <<'EOF'
Usage: ./scripts/deploy.sh [options]

Prepare a deployment branch for Hostinger (merge, npm run build, commit).
Does not push. After success, push manually:
  git push origin <deploy-branch>

Options:
  -s, --source-branch NAME   Branch to merge from (default: main)
  -d, --deploy-branch NAME   Deployment branch (default: hostinger-deployment)
      --bump-api             Bump config/app.php api_last_modified on source branch
                             before merge (use after DB/API changes)
      --stay-on-deploy       Leave checkout on deploy branch when finished
      --dry-run              Print commands without running them
  -h, --help                 Show this help

Environment:
  SOURCE_BRANCH, DEPLOY_BRANCH  Same as -s / -d

Cleanup: unless --stay-on-deploy, returns to source branch with a clean tree.
EOF
}

log() {
	printf '==> %s\n' "$*"
}

run() {
	if $DRY_RUN; then
		printf '+'
		printf ' %q' "$@"
		printf '\n'
	else
		"$@"
	fi
}

require_clean_tree() {
	if ! git diff --quiet || ! git diff --cached --quiet; then
		echo "error: working tree is not clean. Commit or stash changes first." >&2
		exit 1
	fi
}

ensure_build_not_gitignored() {
	if [[ ! -f .gitignore ]]; then
		return 0
	fi
	if grep -qE '^/public/build' .gitignore; then
		log "Removing /public/build from .gitignore on deploy branch"
		if $DRY_RUN; then
			echo '+ remove /public/build from .gitignore'
		else
			grep -vE '^/public/build' .gitignore > .gitignore.tmp
			mv .gitignore.tmp .gitignore
		fi
	fi
}

bump_api_last_modified() {
	log "Bumping api_last_modified in config/app.php"
	if $DRY_RUN; then
		node -e "
const fs = require('fs');
const path = 'config/app.php';
const src = fs.readFileSync(path, 'utf8');
const m = src.match(/api_last_modified' => '([^']+)'/);
if (!m) { console.error('api_last_modified not found'); process.exit(1); }
const ms = Date.parse(m[1]);
if (isNaN(ms)) { console.error('parse failed:', m[1]); process.exit(1); }
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const fmt = (d) => d.getUTCDate() + ' ' + months[d.getUTCMonth()] + ' ' + d.getUTCFullYear() + ' ' +
  String(d.getUTCHours()).padStart(2,'0') + ':' + String(d.getUTCMinutes()).padStart(2,'0') + ':' +
  String(d.getUTCSeconds()).padStart(2,'0') + ' GMT';
const cur = new Date(ms);
const now = new Date();
const sameDay = cur.getUTCFullYear() === now.getUTCFullYear() &&
  cur.getUTCMonth() === now.getUTCMonth() && cur.getUTCDate() === now.getUTCDate();
const next = sameDay ? new Date(ms + 3600000)
  : new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 1, 0, 0));
console.log('would set api_last_modified to', fmt(next));
"
		return 0
	fi

	node -e "
const fs = require('fs');
const path = 'config/app.php';
const src = fs.readFileSync(path, 'utf8');
const m = src.match(/api_last_modified' => '([^']+)'/);
if (!m) { console.error('api_last_modified not found'); process.exit(1); }
const ms = Date.parse(m[1]);
if (isNaN(ms)) { console.error('parse failed:', m[1]); process.exit(1); }
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const fmt = (d) => d.getUTCDate() + ' ' + months[d.getUTCMonth()] + ' ' + d.getUTCFullYear() + ' ' +
  String(d.getUTCHours()).padStart(2,'0') + ':' + String(d.getUTCMinutes()).padStart(2,'0') + ':' +
  String(d.getUTCSeconds()).padStart(2,'0') + ' GMT';
const cur = new Date(ms);
const now = new Date();
const sameDay = cur.getUTCFullYear() === now.getUTCFullYear() &&
  cur.getUTCMonth() === now.getUTCMonth() && cur.getUTCDate() === now.getUTCDate();
const next = sameDay ? new Date(ms + 3600000)
  : new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 1, 0, 0));
const value = fmt(next);
const updated = src.replace(/api_last_modified' => '[^']+'/, \"api_last_modified' => '\" + value + \"'\");
fs.writeFileSync(path, updated);
console.log(value);
"

	run git add config/app.php
	run git commit -m "Bump api_last_modified to bust stale API cache after data deploy."
}

cleanup() {
	local exit_code=$?
	if $STAY_ON_DEPLOY; then
		exit "$exit_code"
	fi
	if ! $DRY_RUN; then
		git restore . >/dev/null 2>&1 || true
		git checkout "$SOURCE_BRANCH" >/dev/null 2>&1 || true
	fi
	exit "$exit_code"
}

while [[ $# -gt 0 ]]; do
	case "$1" in
		-s | --source-branch)
			SOURCE_BRANCH="$2"
			shift 2
			;;
		-d | --deploy-branch)
			DEPLOY_BRANCH="$2"
			shift 2
			;;
		--bump-api)
			BUMP_API=true
			shift
			;;
		--stay-on-deploy)
			STAY_ON_DEPLOY=true
			shift
			;;
		--dry-run)
			DRY_RUN=true
			shift
			;;
		-h | --help)
			usage
			exit 0
			;;
		*)
			echo "error: unknown option: $1" >&2
			usage
			exit 1
			;;
	esac
done

trap cleanup EXIT

cd "$REPO_ROOT"

if ! $DRY_RUN; then
	require_clean_tree
fi

log "Repository: $REPO_ROOT"
log "Source branch: $SOURCE_BRANCH"
log "Deploy branch: $DEPLOY_BRANCH"

run git checkout "$SOURCE_BRANCH"

if $BUMP_API; then
	bump_api_last_modified
fi

if git show-ref --verify --quiet "refs/heads/$DEPLOY_BRANCH"; then
	run git checkout "$DEPLOY_BRANCH"
else
	log "Creating deploy branch $DEPLOY_BRANCH"
	run git checkout -b "$DEPLOY_BRANCH"
fi

run git merge "$SOURCE_BRANCH" -m "Merge branch '$SOURCE_BRANCH' into $DEPLOY_BRANCH"

ensure_build_not_gitignored

run npm run build

run git add .gitignore public/build package-lock.json
run git commit -m "Preparing deployment."

log "Deploy branch ready: $DEPLOY_BRANCH"
log "Push when ready: git push origin $DEPLOY_BRANCH"
log "Hostinger branch: $DEPLOY_BRANCH (no --force)"

if $STAY_ON_DEPLOY; then
	trap - EXIT
else
	log "Returning to $SOURCE_BRANCH"
	if ! $DRY_RUN; then
		git restore .
		git checkout "$SOURCE_BRANCH"
		git status
	fi
	trap - EXIT
fi
