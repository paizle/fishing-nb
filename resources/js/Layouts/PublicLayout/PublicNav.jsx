import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/outline'

export default function PublicNav({children}) {

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <nav className="border-b border-gray-100 dark:border-gray-700 dark:bg-gray-800">
            <div className="mx-auto max-w-7xl">
                <div className="flex justify-between items-center relative">

                    <div className="title">
                        <div className="child-wrapper">
                            {children}
                        </div>
                    </div>

                    <div className="hidden sm:flex ">
                        <div className="relative">
                            <Dropdown className="Dropdown">
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="menu-icon"
                                        >
                                            <svg
                                                className="h-6 w-6"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    className={
                                                        !showingNavigationDropdown
                                                            ? 'inline-flex'
                                                            : 'hidden'
                                                    }
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M4 6h16M4 12h16M4 18h16"
                                                />
                                                <path
                                                    className={
                                                        showingNavigationDropdown
                                                            ? 'inline-flex'
                                                            : 'hidden'
                                                    }
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link
                                        href={route('location.map')}
                                        active={route().current('location.*')}
                                    >
                                        Search By Location
                                    </Dropdown.Link>

                                    <Dropdown.Link
                                        href={route('fish.fish')}
                                        active={route().current('fish.*')}
                                    >
                                        Search By Fish
                                    </Dropdown.Link>

                                    <Dropdown.Link
                                        href={route('settings.edit')}
                                        active={route().current('settings.*')}
                                        className="flex justify-between" 
                                    >
                                        <div>Settings</div>
                                        <Cog6ToothIcon className="h-5 w-5" />
                                    </Dropdown.Link>

                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                    

                    <div className="right-0 flex items-center sm:hidden">
                        <button className="menu-icon"
                            onClick={() =>
                                setShowingNavigationDropdown(
                                    (previousState) => !previousState,
                                )
                            }
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className={
                                        !showingNavigationDropdown
                                            ? 'inline-flex'
                                            : 'hidden'
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={
                                        showingNavigationDropdown
                                            ? 'inline-flex'
                                            : 'hidden'
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={'navigation-drop-down ' +
                    (showingNavigationDropdown ? 'block' : 'hidden') +
                    ' sm:hidden'
                }
            >
                <div className="py-1">
                    <ResponsiveNavLink
                        href={route('location.map')}
                        active={route().current('location.*')}
                    >
                        Search By Location
                    </ResponsiveNavLink>
                </div>

                <div className="py-1">
                    <ResponsiveNavLink
                        href={route('fish.fish')}
                        active={route().current('fish.*')}
                    >
                        Search By Fish
                    </ResponsiveNavLink>
                </div>

                <div className="border-t border-gray-200 ">
                    <div className="py-1">
                        <ResponsiveNavLink className="justify-between" href={route('settings.edit')}>
                            <div>Settings</div>
                            <Cog6ToothIcon className="h-5 w-5" />
                        </ResponsiveNavLink>
                    </div>
                </div>

            </div>
        </nav>
    )
}