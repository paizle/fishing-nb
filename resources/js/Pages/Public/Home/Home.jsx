import './Home.scss'
import { useState, useEffect, useRef } from 'react'
import PublicLayout from '@/Layouts/PublicLayout/PublicLayout'
import PublicNav from '@/Layouts/PublicLayout/PublicNav'
import useLocalStorageDefaults from '@/Hooks/useLocalStorageDefaults'

import Combobox from '@/Components/Combobox/Combobox'

export default function Home({fishes}) {

    const [locations, setLocations] = useState([])

    const [selectedFish, setSelectedFish] = useState(null)

    const storage = useLocalStorageDefaults()

    const fishListRef = useRef(null)

    useEffect(() => {
        axios.get('/api/locations')
            .then((request) => {
                const data = request.data.locations
                setLocations(Object.keys(data).map((key) => ({value: data[key], label: key})))
            })
            .catch((e) => console.error(e))
    }, [])

    useEffect(() => {
        if (fishListRef.current) {
            const settings = storage.getItem('settings')
            if (settings.selectedFish) {
                setSelectedFish(settings.selectedFish)
                const element = fishListRef.current.querySelector(`[data-id="${settings.selectedFish}"]`)
                element.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'center'
                })
            }
        }
    }, [fishListRef.current])

    const localStorage = useLocalStorageDefaults()
    useEffect(() => {
        const settings = localStorage.getItem('settings')
        settings.landingPage = 'home'
        localStorage.setItem('settings', settings)
    }, [])
    
    const selectFish = (id) => {
        let newSelectedFish
        if (selectedFish === id) {
            newSelectedFish = null
        } else {
            newSelectedFish = id
        }
        const settings = storage.getItem('settings')
        settings['selectedFish'] = newSelectedFish
        storage.setItem('settings', settings)
        setSelectedFish(newSelectedFish)
    }

    const handleLocationFocus = (e) => {
        setTimeout(() => {
            console.log('test')
            e.target.scrollIntoView({behavior: 'smooth', block: 'start'})
        }, 100)
    }

    return (
        <PublicLayout className="Home">
            <header>
                <PublicNav>
                    <h1 className="hero">Smart <span>Fish</span></h1>
                </PublicNav>
            </header>
            <main>
                <Combobox 
                    items={locations}
                    onFocus={handleLocationFocus}
                    placeholder="Location: filter by river, lake or region"
                />
                <div className="logo">
                    <img src="/images/logo.png" />
                </div>
            </main>
            <footer>
                <div className="fishes" ref={fishListRef}>
                    {fishes.map((fish) => (
                        <button 
                            key={fish.name}
                            data-id={fish.id}
                            className={`fish ${selectedFish === fish.id ? 'selected' : ''}`}
                            onClick={() => selectFish(fish.id)}
                        >
                            <img src="/images/fish-shadow.png" />
                            <div className="name">{fish.name}</div>
                        </button>
                    ))}
                </div>
            </footer>
        </PublicLayout>
    )
}
