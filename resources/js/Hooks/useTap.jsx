import React from 'react'

const useTap = (maxDuration = 300, maxMove = 10) => {
    const [touchStart, setTouchStart] = React.useState(null)
    const touchStartRef = React.useRef(touchStart)
    React.useEffect(() => {
        touchStartRef.current = touchStart
    }, [touchStart])

    const [touchPosition, setTouchPosition] = React.useState(null)
    const touchPositionRef = React.useRef(touchPosition)
    React.useEffect(() => {
        touchPositionRef.current = touchPosition
    }, [touchPosition])

    const onTouchStart = (callback) => (event) => {
        const touch = event.touches[0]
        setTouchStart({ time: Date.now(), x: touch.clientX, y: touch.clientY })
        setTouchPosition({ x: touch.clientX, y: touch.clientY })
        console.log('start')
    }

    const onTouchMove = (callback) => (event) => {
        const touch = event.touches[0]
        setTouchPosition({ x: touch.clientX, y: touch.clientY })
        console.log('move')
    }

    const onTouchEnd = (callback) => (event) => {
        console.log({ callback })
        const touchStart = touchStartRef.current
        const touchPosition = touchPositionRef.current
        console.log('end')
        if (touchStart) {
            const timeDiff = Date.now() - touchStart.time
            const moveX = Math.abs(touchStart.x - touchPosition.x)
            const moveY = Math.abs(touchStart.y - touchPosition.y)

            if (
                timeDiff <= maxDuration &&
                moveX <= maxMove &&
                moveY <= maxMove
            ) {
                callback(event)
            }
        }

        setTouchStart(null)
        setTouchPosition(null)
    }

    return { onTouchStart, onTouchMove, onTouchEnd }
}

export default useTap
