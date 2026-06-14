/** Coerce fish id from API, localStorage, or URL to a number (or null). */
export default function normalizeFishId(id: unknown): number | null {
	if (id === null || id === undefined || id === '') {
		return null
	}
	const n = Number(id)
	return Number.isFinite(n) ? n : null
}

export function fishIdsEqual(a: unknown, b: unknown): boolean {
	const left = normalizeFishId(a)
	const right = normalizeFishId(b)
	return left !== null && right !== null && left === right
}
