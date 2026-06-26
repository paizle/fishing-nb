/**
 * Generates *.viewmodel.json golden fixtures from *.raw.json API captures.
 *
 * Run:  npm run export-restriction-fixtures
 *
 * Each *.raw.json file must be structured as:
 *   { "limits": [...], "_context": { "waterId": <number|null> } }
 *
 * Fetch raw fixtures from the running dev server:
 *   curl.exe http://127.0.0.1:8000/api/rules?region=chaleur&water=bass-river > tests/fixtures/restrictions/chaleur-bass-river.raw.json
 *   (then manually add "_context": { "waterId": <id> } or null)
 */
import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { buildFishTables } from '../resources/js/Pages/Public/SmartFish/FishingRestrictions/buildFishTables'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const fixturesDir = path.resolve(__dirname, '../tests/fixtures/restrictions')

/** Serialize Date → ISO string for JSON comparison. */
function dateReplacer(_key: string, value: unknown): unknown {
	if (value instanceof Date) return value.toISOString()
	return value
}

describe('export-restriction-fixtures', () => {
	it('exports all raw fixtures to viewmodel JSON', () => {
		const files = fs.readdirSync(fixturesDir).filter((f) => f.endsWith('.raw.json'))
		expect(files.length).toBeGreaterThan(0)

		for (const file of files) {
			const rawPath = path.join(fixturesDir, file)
			const raw = JSON.parse(fs.readFileSync(rawPath, 'utf-8')) as {
				limits: Record<string, unknown>[]
				_context?: { waterId: number | null }
			}
			const limits = raw.limits ?? []
			const waterId: number | null = raw._context?.waterId ?? null

			const viewmodel = buildFishTables(limits, { waterId })

			const outPath = rawPath.replace('.raw.json', '.viewmodel.json')
			fs.writeFileSync(outPath, JSON.stringify(viewmodel, dateReplacer, 2))
			console.log(
				`  Written: ${path.basename(outPath)} (${viewmodel.fishTables.length} fish tables, ${viewmodel.undatedExceptions.length} undated exceptions)`,
			)
		}
	})
})
