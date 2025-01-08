import { createRef } from 'react'
import NewBrunswickMapSvg from '../../../svgs/NewBrunswick.svg?react'
import './NewBrunswickMap.scss'

export const pathSelectorToLocationName = {
    path102: 'Restigouche',
    path47: 'Chaleur',
    path53: 'Miramichi',
    path55: 'Southeast',
    path28: 'Inner Bay of Fundy',
    path60: 'Lower Saint John',
    path89: 'Southwest',
    path62: 'Upper Saint John',
}

export default function NewBrunswickMap({ containerRef = null }) {
    const containerRefLocal = containerRef || createRef(null)

    return (
        <div ref={containerRefLocal} className="NewBrunswickMap">
            <NewBrunswickMapSvg />
        </div>
    )
}
