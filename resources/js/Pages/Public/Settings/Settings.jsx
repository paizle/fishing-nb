import './Settings.scss'
import PublicLayout from '@/Layouts/PublicLayout/PublicLayout'
import PublicNav from '@/Layouts/PublicLayout/PublicNav'

export default function Settings({}) {

    return (
        <PublicLayout>
            <header>
                <PublicNav>
                    Settings
                </PublicNav>
            </header>
            <main>
                <div className="Settings">
                    {/*
                    <label>
                        <input type="checkbox" name="gradient-background" />
                        Gradient Background
                    </label>
                    */}
                </div>
            </main>
        </PublicLayout>
        
    )
}