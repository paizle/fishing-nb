import { createElement, useCallback, useEffect, useRef, useState } from 'react'
import LoadingSpinner from '@/Components/LoadingSpinner/LoadingSpinner'

/**
 * Icon map control with animated label popper.
 * Desktop: hover reveals label; click fires action.
 * Touch (default): first tap reveals label; second tap fires action.
 * Touch (actionOnFirstTap): first tap reveals label and fires action; second tap fires again.
 * `revealed` is separate from DOM focus so focus+click on the same tap does not skip reveal.
 */
export default function MapControlButton({
	icon,
	label,
	active = false,
	busy = false,
	isTouch,
	onAction,
	labelPosition = 'left',
	childrenPosition = 'below',
	className = '',
	ariaLabel,
	actionOnFirstTap = false,
	children,
	onRevealChange,
}) {
	const [revealed, setRevealed] = useState(false)
	const revealedRef = useRef(false)
	const [labelAnimating, setLabelAnimating] = useState(false)
	const [labelReady, setLabelReady] = useState(false)
	const rootRef = useRef(null)

	const setPopperRevealed = useCallback((open) => {
		revealedRef.current = open
		setRevealed(open)
	}, [])

	const popperVisible = revealed

	useEffect(() => {
		if (!popperVisible) {
			setLabelAnimating(false)
			setLabelReady(false)
			return
		}
		const id = requestAnimationFrame(() => setLabelAnimating(true))
		return () => cancelAnimationFrame(id)
	}, [popperVisible])

	useEffect(() => {
		if (!isTouch || !revealed) return
		const onDocTap = (e) => {
			if (rootRef.current?.contains(e.target)) return
			setPopperRevealed(false)
		}
		document.addEventListener('pointerdown', onDocTap)
		return () => document.removeEventListener('pointerdown', onDocTap)
	}, [isTouch, revealed, setPopperRevealed])

	const onLabelTransitionEnd = useCallback(() => {
		if (labelAnimating) setLabelReady(true)
	}, [labelAnimating])

	const handlePointerEnter = () => {
		if (!isTouch) setPopperRevealed(true)
	}

	const handlePointerLeave = () => {
		if (!isTouch) setPopperRevealed(false)
	}

	const handleClick = () => {
		if (isTouch) {
			if (!revealedRef.current) {
				setPopperRevealed(true)
				if (actionOnFirstTap) onAction()
				return
			}
		}
		onAction()
	}

	const handleFocus = () => {
		if (!isTouch) setPopperRevealed(true)
	}

	const handleBlur = (e) => {
		if (isTouch) return
		if (rootRef.current?.contains(e.relatedTarget)) return
		setPopperRevealed(false)
	}

	const listOpen = Boolean(children) && labelReady && popperVisible

	useEffect(() => {
		if (!onRevealChange) return
		onRevealChange(children ? listOpen : popperVisible)
	}, [children, listOpen, popperVisible, onRevealChange])

	useEffect(() => {
		if (!onRevealChange) return
		return () => onRevealChange(false)
	}, [onRevealChange])

	useEffect(() => {
		if (busy) setPopperRevealed(true)
	}, [busy, setPopperRevealed])

	return (
		<div
			ref={rootRef}
			className={`MapControlButton ${labelPosition} ${childrenPosition === 'left' ? 'children-left' : ''} ${active ? 'active' : ''} ${busy ? 'busy' : ''} ${popperVisible ? 'popper-open' : ''} ${className}`}
		>
			<div
				className="MapControlButton-zone"
				onPointerEnter={handlePointerEnter}
				onPointerLeave={handlePointerLeave}
			>
				<div className="MapControlButton-main">
					{popperVisible && (
						<span
							className={`MapControlButton-label ${labelAnimating ? 'animate-in' : ''}`}
							onTransitionEnd={onLabelTransitionEnd}
						>
							{label}
						</span>
					)}

					<button
						type="button"
						className="MapControlButton-icon"
						onClick={handleClick}
						onFocus={handleFocus}
						onBlur={handleBlur}
						disabled={busy}
						aria-busy={busy || undefined}
						aria-pressed={active}
						aria-label={ariaLabel ?? label}
					>
						{busy ? (
							<LoadingSpinner className="MapControlButton-spinner" />
						) : (
							createElement(icon, null)
						)}
					</button>
				</div>

				{listOpen && children && (
					<div className="MapControlButton-children">{children}</div>
				)}
			</div>
		</div>
	)
}
