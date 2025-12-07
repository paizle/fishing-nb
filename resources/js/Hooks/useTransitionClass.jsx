import { useEffect, useRef } from 'react'

/**
 * Returns a ref that has transition start/end events handled so that the cssClass is applied
 * while the element animating via transition
 *
 * @param {*} cssClass
 * @returns
 */

export default function useTransitionClass(cssClass = 'is-transitioning') {
	const ref = useRef(null)

	useEffect(() => {
		if (!ref.current) return

		const el = ref.current

		const onStart = () => el.classList.add(cssClass)
		const onEnd = () => el.classList.remove(cssClass)

		el.addEventListener('transitionstart', onStart)
		el.addEventListener('transitionend', onEnd)

		return () => {
			el.removeEventListener('transitionstart', onStart)
			el.removeEventListener('transitionend', onEnd)
		}
	}, [ref.current, cssClass])

	return ref
}
