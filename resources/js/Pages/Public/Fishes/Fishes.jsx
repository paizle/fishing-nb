import './Fishes.scss'
import { useState, useEffect } from 'react'
import PublicLayout from '@/Layouts/PublicLayout/PublicLayout'
import PublicNav from '@/Layouts/PublicLayout/PublicNav'
import { Link } from '@inertiajs/react'
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb'
import useLocalStorageDefaults from '@/Hooks/useLocalStorageDefaults'
import useScreenOrientation from '@/Hooks/useScreenOrientation'

export default function Fishes({fishes, breadcrumb}) {

    const localStorage = useLocalStorageDefaults()
    useEffect(() => {
        const settings = localStorage.getItem('settings')
        settings.landingPage = 'fishes'
        localStorage.setItem('settings', settings)
    }, [])

    const screenOrientation = useScreenOrientation()


    const results = fishes

    const columns = screenOrientation.isMobile ? 0 : 1

    const columnLayout = ['one-up', 'two-up', 'three-up', 'four-up']

    return (
        <PublicLayout className="Fishes">
            <header>
                <PublicNav>
                    <Breadcrumb breadcrumb={breadcrumb} />
                </PublicNav>
            </header>
            <main>
                <div className={`fish-list ${columnLayout[columns]}`}>
                    {results.map((fish) => (
                        <div>
                        <Link
                            key={fish.name}
                            href={route('fish.fish', fish.id)}
                        >
                            <img
                                src={`/images/fish/${getFileName(fish.name)}`}
                            />
                            <strong>{fish.name}</strong>
                        </Link>
                        </div>
                    ))}
                </div>
            </main>
        </PublicLayout>
    )
}


function getFileName(fishName) {
    return fishName.toLowerCase().replaceAll(' ', '-') + '.png'
}