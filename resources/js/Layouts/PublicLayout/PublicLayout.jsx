import './PublicLayout.scss'
import useLocalStorageDefaults from '@/Hooks/useLocalStorageDefaults'

export default function PublicLayout({ className, children }) {
    const localStorage = useLocalStorageDefaults()

    return (
        <div
            className={`PublicLayout ${className} ${localStorage.getItem('settings').gradientBackground ? 'gradient-background' : ''}`}
        >
            {children}
        </div>
    )
}
