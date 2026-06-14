export type VerifySource = {
	id: number
	sourcePage: number | null
	sourceTable: string | null
	sourceRow: string | null
}

export type DataTableRow = {
	kind: 'data'
	key: string
	verify: VerifySource
	seasonStart: Date
	seasonEnd: Date
	dateTrailingComma: boolean
	showLocationDetail: boolean
	locationDetail: string
	exceptionDetail: string
	note: string | null
	bagLimit: number | null
	bagLimitShowInfinity: boolean
	hookLimit: number | null
	minSize: string
	maxSize: string
	minSizeInvalid: boolean
	maxSizeInvalid: boolean
	rowClassName: string
}

export type GroupFooterTableRow = {
	kind: 'group-footer'
	key: string
	verify: VerifySource
	locationDetail: string
	exceptionDetail: string
	note: string | null
}

export type TableRow = DataTableRow | GroupFooterTableRow

export type FishTableViewModel = {
	fishName: string
	rows: TableRow[]
}
