import type { ExceptionType } from './restrictionRecordTypes'

function isTruthyFlag(value: unknown): boolean {
	return value === 1 || value === true || value === '1'
}

function rawMethodValue(row: Record<string, unknown>): string {
	if (typeof row.method === 'string') {
		return row.method
	}
	const method = row.method as { value?: string } | null | undefined
	if (method && typeof method.value === 'string') {
		return method.value
	}
	const fishingMethod = row.fishing_method as { name?: string } | null | undefined
	return fishingMethod?.name ?? ''
}

/** Map API/DB row to overlay type; supports legacy is_exception until DB is re-imported. */
export function resolveExceptionType(row: Record<string, unknown>): ExceptionType | null {
	const direct = row.exception_type
	if (direct === 'exclusive' || direct === 'specifier') {
		return direct
	}
	if (typeof direct === 'object' && direct !== null && 'value' in direct) {
		const value = (direct as { value?: string }).value
		if (value === 'exclusive' || value === 'specifier') {
			return value
		}
	}

	if (!isTruthyFlag(row.is_exception)) {
		return null
	}

	return rawMethodValue(row) === 'fly fishing' ? 'exclusive' : 'specifier'
}
