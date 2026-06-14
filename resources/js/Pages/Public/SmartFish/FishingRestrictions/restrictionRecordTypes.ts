export type ExceptionOverlay = {
	waterDescription: string
	note: string | null
	fishingMethod: string
	sourcePage: number | null
	sourceTable: string | null
	sourceRow: string | null
}

export type NormalizedRecord = {
	id: number
	fishId: number | null
	fishName: string
	waterId: number | null
	isException: boolean
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
	exceptionOverlay?: ExceptionOverlay
}

export type DateInterval = {
	start: Date
	end: Date
}
