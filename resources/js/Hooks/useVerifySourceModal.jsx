import { useState, useCallback } from 'react'
import VerifySourceModal from '@/Components/VerifySourceModal/VerifySourceModal'

export default function useVerifySourceModal(regionName = '', isMobile = false) {
	const [state, setState] = useState({
		open: false,
		page: null,
		table: null,
		row: null,
		regionName: '',
		restriction: null,
		fishName: '',
		fishImageSrc: '',
	})

	const openVerify = useCallback(
		(restriction, fishName = '', fishImageSrc = '') => {
			if (!restriction?.sourcePage || !restriction?.sourceTable) {
				return
			}
			setState({
				open: true,
				page: restriction.sourcePage,
				table: restriction.sourceTable,
				row: restriction.sourceRow ?? '',
				regionName,
				restriction,
				fishName,
				fishImageSrc,
			})
		},
		[regionName],
	)

	const closeVerify = useCallback(() => {
		setState({
			open: false,
			page: null,
			table: null,
			row: null,
			regionName: '',
			restriction: null,
			fishName: '',
			fishImageSrc: '',
		})
	}, [])

	const modal = (
		<VerifySourceModal
			open={state.open}
			page={state.page}
			table={state.table}
			row={state.row}
			regionName={state.regionName}
			restriction={state.restriction}
			fishName={state.fishName}
			isMobile={isMobile}
			onClose={closeVerify}
		/>
	)

	return { openVerify, modal }
}
