import React from 'react'

import { debounce } from 'lodash'

const portraitRatio = 0.85

const useScreenOrientation = () => {
    const [isPortrait, setIsPortrait] = React.useState(false)

    React.useEffect(() => {
        const handleResize = () => {
            setIsPortrait(
                window.innerWidth / window.innerHeight <= portraitRatio,
            )
            console.log(
                `Viewport resized: ${window.innerWidth}x${window.innerHeight}, ratio: ${window.innerWidth / window.innerHeight}`,
            )
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
    }
}

export default useScreenOrientation
