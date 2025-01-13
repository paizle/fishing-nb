import './Breadcrumb.scss'
import { Link } from '@inertiajs/react'
import useScreenOrientation from '@/Hooks/useScreenOrientation'

export default function BreadCrumb({ breadcrumb }) {
    const screenOrientation = useScreenOrientation()
    return (
        <div className={`Breadcrumb`}>
            {(breadcrumb ?? []).map((item, index) => (
                <div className="breadcrumb-item" key={item.title}>
                    <Link href={item.href}>
                        {screenOrientation.isMobile && item.shortTitle && breadcrumb.length - index > 1 ? item.shortTitle : item.title}
                    </Link>
                </div>
            ))}
        </div>
    )
}
