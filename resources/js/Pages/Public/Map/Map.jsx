import React, { useEffect } from 'react'
import { Head } from '@inertiajs/react'
import useScreenOrientation from '@/Hooks/useScreenOrientation'
import MapMobile from './MapMobile'
import MapWeb from './MapWeb'
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb'
import PublicLayout from '@/Layouts/PublicLayout/PublicLayout'
import PublicNav from '@/Layouts/PublicLayout/PublicNav'
import useLocalStorageDefaults from '@/Hooks/useLocalStorageDefaults'

export default function Map({ locations, breadcrumb }) {
    
    const screenOrientation = useScreenOrientation()

    const localStorage = useLocalStorageDefaults()
    useEffect(() => {
        const settings = localStorage.getItem('settings')
        settings.searchBy = 'location'
        localStorage.setItem('settings', settings)
    }, [])

    locations = locations.map((location) => {
        location.hasData = ['Lower Saint John', 'Southwest'].includes(
            location.name,
        )
        return location
    })

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
