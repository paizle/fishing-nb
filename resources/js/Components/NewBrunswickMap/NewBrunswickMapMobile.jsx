import useTap from '@/Hooks/useTap'
import React from 'react'
import NewBrunswickMap, { pathSelectorToLocationName } from './NewBrunswickMap'

export default function NewBrunswickMapMobile({
    containerRef = null,
    onTouchLocation,
}) {
    const containerRefLocal = containerRef || React.createRef(null)

    const useTapHook = useTap()

    React.useEffect(() => {
        if (containerRefLocal.current) {
            const svg = containerRefLocal.current.querySelector('svg')

            Object.keys(pathSelectorToLocationName).forEach((key) => {
                const locationPath = svg.querySelector('#' + key)
                locationPath.classList.add('location')

                if (onTouchLocation) {
                    locationPath.addEventListener(
                        'touchstart',
                        useTapHook.onTouchStart(() => null),
                    )
                    locationPath.addEventListener(
                        'touchmove',
                        useTapHook.onTouchMove(() => null),
                    )
                    locationPath.addEventListener(
                        'touchend',
                        useTapHook.onTouchEnd((event) => {
                            Object.keys(pathSelectorToLocationName).forEach(
                                (key) => {
                                    const locationPath = svg.querySelector(
                                        '#' + key,
                                    )
                                    locationPath.classList.remove('active')
                                },
                            )
                            const locationPath = svg
                                .querySelector('#' + key)
                                .classList.add('active')

                            onTouchLocation(event, key)
                        }),
                    )
                }
            })
        }
    }, [containerRefLocal.current])

    return <NewBrunswickMap containerRef={containerRefLocal} />
}
