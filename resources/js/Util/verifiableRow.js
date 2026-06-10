import { hasSourceCitation } from '@/Util/sourceLocation'

export function getVerifiableRowProps(restriction, onVerify, singleClick) {
	if (!hasSourceCitation(restriction) || typeof onVerify !== 'function' || !singleClick) {
		return { rowClassName: '', firstCellProps: {}, cellProps: {} }
	}

	const { createHandlers, invokeNow } = singleClick
	const { onClick, onDoubleClick } = createHandlers(restriction.id, () => onVerify(restriction), {
		shouldIgnore: (event) => event.target.closest('.Tooltip'),
	})

	const onKeyDown = (event) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault()
			invokeNow(restriction.id, () => onVerify(restriction), event)
		}
	}

	return {
		rowClassName: 'row-verifiable',
		firstCellProps: {
			onClick,
			onDoubleClick,
			onKeyDown,
			tabIndex: 0,
			role: 'button',
		},
		cellProps: {
			onClick,
			onDoubleClick,
		},
	}
}
