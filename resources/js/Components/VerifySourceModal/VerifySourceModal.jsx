import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import './VerifySourceModal.scss'
import { buildVerifySourceUrl, formatVerifyDescription } from '@/Util/sourceLocation'
import { formatVerifyRestriction } from '@/Util/formatVerifyRestriction'

export default function VerifySourceModal({
	open,
	page,
	table,
	row,
	restriction,
	fishName,
	regionName,
	isMobile,
	onClose,
}) {
	const closeButtonRef = useRef(null)

	useEffect(() => {
		if (!open) {
			return undefined
		}

		closeButtonRef.current?.focus()

		const onKeyDown = (event) => {
			if (event.key === 'Escape') {
				onClose()
			}
		}

		document.addEventListener('keydown', onKeyDown)
		const previousOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'

		return () => {
			document.removeEventListener('keydown', onKeyDown)
			document.body.style.overflow = previousOverflow
		}
	}, [open, onClose])

	if (!open || !page || !table || !restriction) {
		return null
	}

	const description = formatVerifyDescription(page, table, row, regionName)
	const pdfUrl = buildVerifySourceUrl(page, table, row, regionName)
	const details = formatVerifyRestriction({ restriction, fishName, regionName, isMobile })

	return createPortal(
		<div className="VerifySourceModal" role="presentation" onClick={onClose}>
			<div
				className="VerifySourceModal-panel"
				role="dialog"
				aria-modal="true"
				aria-labelledby="verify-source-description"
				onClick={(event) => event.stopPropagation()}
			>
				<button
					type="button"
					className="VerifySourceModal-close"
					ref={closeButtonRef}
					onClick={onClose}
					aria-label="Close"
				>
					×
				</button>

				<div className="VerifySourceModal-details">
					{details.headline && (
						<p className="VerifySourceModal-headline">{details.headline}</p>
					)}

					{details.date && <p className="VerifySourceModal-date">{details.date}</p>}

					{details.water && <p className="VerifySourceModal-water">{details.water}</p>}

					{details.limits && (
						<p className="VerifySourceModal-limits">
							{details.limits.map((limit, index) => (
								<span key={limit.label} className="VerifySourceModal-limit">
									{index > 0 && (
										<span
											className="VerifySourceModal-limit-sep"
											aria-hidden="true"
										>
											{' '}
											·{' '}
										</span>
									)}
									<span className="VerifySourceModal-limit-label">
										{limit.label}
									</span>{' '}
									<span className="VerifySourceModal-limit-value">
										{limit.value}
									</span>
								</span>
							))}
						</p>
					)}
				</div>

				<a
					className="VerifySourceModal-open"
					href={pdfUrl}
					target="_blank"
					rel="noopener noreferrer"
				>
					Check Source Document
				</a>

				<p id="verify-source-description" className="VerifySourceModal-description">
					{description}
				</p>
			</div>
		</div>,
		document.body,
	)
}

VerifySourceModal.propTypes = {
	open: PropTypes.bool.isRequired,
	page: PropTypes.number,
	table: PropTypes.string,
	row: PropTypes.string,
	restriction: PropTypes.object,
	fishName: PropTypes.string,
	regionName: PropTypes.string,
	isMobile: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
}
