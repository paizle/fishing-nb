import type { FishingRestriction } from './FishingRestrictionsTransformers'

export type VerifySource = FishingRestriction

export type DataTableRow = {
	kind: 'data'
	key: string
	verify: VerifySource
	seasonStart: Date
	seasonEnd: Date
	dateTrailingComma: boolean
	showLocationDetail: boolean
	locationDetail: string
	note: string | null
	bagLimit: number | null
	bagLimitShowInfinity: boolean
	hookLimit: number | null
	minSize: string
	maxSize: string
	minSizeInvalid: boolean
	maxSizeInvalid: boolean
	hideBagLimit: boolean
	hideMinSize: boolean
	hideMaxSize: boolean
	exceptionNoteSpan: boolean
	isExceptionRow: boolean
	hasOverlap: boolean
	pairedRestrictionId?: number
	strikeSeasonStart?: boolean
	strikeSeasonEnd?: boolean
	replacementSeasonStart?: Date
	replacementSeasonEnd?: Date
	rowClassName: string
	waterGroupContinue?: boolean
}

export type GroupFooterTableRow = {
	kind: 'group-footer'
	key: string
	verify: VerifySource
	locationDetail: string
	note: string | null
	waterGroupContinue?: boolean
}

export type ExceptionsHeadingTableRow = {
	kind: 'exceptions-heading'
	key: string
	waterGroupContinue?: boolean
}

export type TableRow = DataTableRow | GroupFooterTableRow | ExceptionsHeadingTableRow

export type FishTableViewModel = {
	fishName: string
	rows: TableRow[]
}
