import './Breadcrumb.scss'
import { Link } from '@inertiajs/react'

export default function BreadCrumb({ breadcrumb }) {
    return (
        <div className={`Breadcrumb`}>
            {(breadcrumb ?? []).map((item, index) => (
                <div className="breadcrumb-item">
                    <Link key={item.title} href={item.href}>
                        {item.title}
                    </Link>
                </div>
            ))}
        </div>
    )
}
