import './Index.scss'
import { useLayoutEffect } from 'react'
import PublicLayout from '@/Layouts/PublicLayout/PublicLayout'
import useLocalStorageDefaults from '@/Hooks/useLocalStorageDefaults'

export default function Index() {

    const localStorage = useLocalStorageDefaults()
    useLayoutEffect(() => {
        const settings = localStorage.getItem('settings')
        
        switch (settings.landingPage) {
            case 'location':
                window.location.href = route('location.map')
            break;
            case 'fishes':
                window.location.href = route('fish.fishes')
            break;
            case 'home':
                window.location.href = route('home.home')
            break;
        }
    }, [])

    return (
        <PublicLayout>
            <header></header>
            <main>
                <div className="flex items-center">
                    <img src="/images/logo.png" />
                </div>
            </main>
        </PublicLayout>
    )
}
