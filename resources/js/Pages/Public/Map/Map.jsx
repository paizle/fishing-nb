import React from 'react'
import { Head } from '@inertiajs/react'
import useScreenOrientation from '@/Hooks/useScreenOrientation'
import MapMobile from './MapMobile'
import MapWeb from './MapWeb'
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb'
import PublicLayout from '@/Layouts/PublicLayout/PublicLayout'
import PublicNav from '@/Layouts/PublicLayout/PublicNav'

export default function Map({ locations, breadcrumb }) {
    console.log(breadcrumb)

    locations = locations.map((location) => {
        location.hasData = ['Lower Saint John', 'Southwest'].includes(
            location.name,
        )
        return location
    })

    const screenOrientation = useScreenOrientation()

    return (
        <PublicLayout>
            <header>
                <PublicNav>
                    <Breadcrumb breadcrumb={breadcrumb} />
                </PublicNav>
            </header>
            <main>
                {screenOrientation.isPortrait ? (
                    <MapMobile locations={locations} />
                ) : (
                    <MapWeb locations={locations} />
                )}
            </main>
        </PublicLayout>
    )
}
