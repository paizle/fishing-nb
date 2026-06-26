export type ExceptionType = 'exclusive' | 'specifier'

export type NormalizedRecord = {
	id: number
	fishId: number | null
	fishName: string
	waterId: number | null
	exceptionType: ExceptionType | null
	seasonStart: Date | null
	seasonEnd: Date | null
	bagLimit: number | null
	hookLimit: number | null
	minSize: string | null
	maxSize: string | null
	fishingMethod: string
	tidal: string
	water: string
	watersCategory: string
	boundary: string
	waterDescription: string
	note: string | null
	sourcePage: number | null
	sourceTable: string | null
	sourceRow: string | null
	isExceptionRow?: boolean
	hasOverlap?: boolean
	pairedRestrictionId?: number
}

export type DateInterval = {
	start: Date
	end: Date
}
