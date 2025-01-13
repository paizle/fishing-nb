import React, { useState, useLayoutEffect } from 'react'

import { debounce } from 'lodash'

const portraitRatio = 0.85

const mobileWidth = 640

const useScreenOrientation = () => {
    const [isPortrait, setIsPortrait] = useState(false)

    const [isMobile, setIsMobile] = useState(false)

    useLayoutEffect(() => {
        const handleResize = () => {
            setIsPortrait(
                window.innerWidth / window.innerHeight <= portraitRatio,
            )
            setIsMobile(window.innerWidth <= mobileWidth)
        }
        handleResize()

        const handleResizeDebounced = debounce(() => {
            handleResize()
        }, 100)
        window.addEventListener('resize', handleResizeDebounced)

        return () => {
            window.removeEventListener('resize', handleResizeDebounced)
        }
    }, [])

    return {
        isPortrait: isPortrait,
        isMobile: isMobile,
    }
}

export default useScreenOrientation
