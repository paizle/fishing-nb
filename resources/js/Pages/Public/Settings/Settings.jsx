import './Settings.scss'
import { useState } from 'react'
import PublicLayout from '@/Layouts/PublicLayout/PublicLayout'
import PublicNav from '@/Layouts/PublicLayout/PublicNav'

import useLocalStorageDefaults from '@/Hooks/useLocalStorageDefaults'

export default function Settings({}) {

    const [, setStateTrigger] = useState(false); // Dummy state
    const localStorage = useLocalStorageDefaults()
    const settings = localStorage.getItem('settings')

    const handleChange = (event) => {
        const element = event.currentTarget
        switch (element.type) {
            case 'checkbox':
                settings[element.name] = element.checked
                break
            default:
                settings[element.name] = element.value
        }

        localStorage.setItem('settings', settings)
        setStateTrigger((prev) => !prev)
    }

    return (
        <PublicLayout>
            <header>
                <PublicNav>
                    Settings
                </PublicNav>
            </header>
            <main>
                <div className="Settings">
                    <label>
                        <input
                            type="checkbox"
                            onChange={handleChange}
                            name="gradientBackground"
                            checked={settings.gradientBackground}
                            value={true}
                        />
                        Gradient Background
                    </label>
                </div>
            </main>
        </PublicLayout>
        
    )
}