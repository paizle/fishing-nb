import './PublicLayout.scss'
import useLocalStorageDefaults from '@/Hooks/useLocalStorageDefaults'

export default function PublicLayout({ children }) {

    const localStorage = useLocalStorageDefaults()

    return (
        <div className={`PublicLayout
            ${localStorage.getItem('settings').gradientBackground ? 'gradient-background' : ''}`}
        >
            {children}
        </div>
    )
}
