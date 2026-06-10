import { useState, useCallback } from 'react'
import VerifySourceModal from '@/Components/VerifySourceModal/VerifySourceModal'

export default function useVerifySourceModal(regionName = '', isMobile = false) {
	const [state, setState] = useState({
		open: false,
		page: null,
		location: null,
		regionName: '',
		restriction: null,
		fishName: '',
		fishImageSrc: '',
	})

	const openVerify = useCallback((restriction, fishName = '', fishImageSrc = '') => {
		if (!restriction?.sourcePage || !restriction?.sourceLocation) {
			return
		}
		setState({
			open: true,
			page: restriction.sourcePage,
			location: restriction.sourceLocation,
			regionName,
			restriction,
			fishName,
			fishImageSrc,
		})
	}, [])

	const closeVerify = useCallback(() => {
		setState({
			open: false,
			page: null,
			location: null,
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
			location={state.location}
			regionName={state.regionName}
			restriction={state.restriction}
			fishName={state.fishName}
			isMobile={isMobile}
			onClose={closeVerify}
		/>
	)

	return { openVerify, modal }
}
