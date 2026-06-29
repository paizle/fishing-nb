/** Shared name/NID resolution for prepare-data and audit scripts. */

/** Human-readable name columns only — not NAMEID* reference fields. */
export const NAME_FIELDS = ['NAME1', 'NAME2', 'LOCALNAME']

export function hasKnownName(props) {
  if (!props) return false
  return NAME_FIELDS.some((field) => isTruthyName(props[field]))
}

function isTruthyName(value) {
  if (value == null) return false
  return String(value).trim().length > 0
}

export function getNameSourceFromProps(props) {
  if (!props) return null
  for (const field of NAME_FIELDS) {
    const value = props[field]
    if (isTruthyName(value)) {
      return { field, value: String(value).trim() }
    }
  }
  return null
}

export function getNameFromProps(props) {
  return getNameSourceFromProps(props)?.value ?? ''
}

/** NID comes only from the source NID property — never from NAMEID* or other fields. */
export function getNidFromProps(props) {
  if (props?.NID == null) return ''
  const nid = String(props.NID).trim()
  if (!nid || nid === '{' || nid === '}') return ''
  return nid
}
