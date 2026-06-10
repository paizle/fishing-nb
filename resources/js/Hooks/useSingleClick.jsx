import { useCallback, useRef } from 'react'

const DEFAULT_DELAY_MS = 300

export default function useSingleClick(delayMs = DEFAULT_DELAY_MS) {
	const pendingRef = useRef(new Map())

	const clearPending = useCallback((key) => {
		const timer = pendingRef.current.get(key)
		if (timer) {
			clearTimeout(timer)
			pendingRef.current.delete(key)
		}
	}, [])

	const createHandlers = useCallback(
		(key, action, { shouldIgnore } = {}) => {
			const onClick = (event) => {
				if (shouldIgnore?.(event)) {
					return
				}

				clearPending(key)
				pendingRef.current.set(
					key,
					setTimeout(() => {
						pendingRef.current.delete(key)
						action(event)
					}, delayMs),
				)
			}

			const onDoubleClick = () => {
				clearPending(key)
			}

			return { onClick, onDoubleClick }
		},
		[clearPending, delayMs],
	)

	const invokeNow = useCallback(
		(key, action, event) => {
			clearPending(key)
			action(event)
		},
		[clearPending],
	)

	return { createHandlers, invokeNow }
}
