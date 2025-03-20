import Dropdown from '@/Components/Dropdown'
import ResponsiveNavLink from '@/Components/ResponsiveNavLink/ResponsiveNavLink'
import { useState } from 'react'
import {
	MapIcon,
	MapPinIcon,
	Cog6ToothIcon,
	DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline'

export default function PublicNav({ children }) {
	const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false)

	return (
		<nav className="border-b border-gray-100 dark:border-gray-700 dark:bg-gray-800">
			<div className="mx-auto">
				<div className="relative flex items-center justify-between">
					<div className="title">
						<div className="child-wrapper">{children}</div>
					</div>

					<div className="desktop-menu hidden sm:flex">
						<div className="relative">
							<Dropdown className="Dropdown">
								<Dropdown.Trigger>
									<span className="menu-icon inline-flex rounded-md">
										<button type="button" aria-label="menu">
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
										href={route('home.home')}
										active={route().current('home.*')}
										className="flex justify-between"
									>
										Smart Fish
										<DevicePhoneMobileIcon className="h-5 w-5" />
									</Dropdown.Link>

									<Dropdown.Link
										href={route('location.map')}
										active={route().current('location.*')}
										className="flex justify-between"
									>
										Search By Location
										<MapIcon className="h-5 w-5" />
									</Dropdown.Link>

									<Dropdown.Link
										href={route('settings.edit')}
										active={route().current('settings.*')}
										className="flex justify-between"
									>
										Settings
										<Cog6ToothIcon className="h-5 w-5" />
									</Dropdown.Link>
								</Dropdown.Content>
							</Dropdown>
						</div>
					</div>

					<div
						className={`mobile-menu menu-icon ${
							showingNavigationDropdown ? 'open' : ''
						} `}
					>
						<button
							onClick={() =>
								setShowingNavigationDropdown((previousState) => !previousState)
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
										!showingNavigationDropdown ? 'inline-flex' : 'hidden'
									}
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
								<path
									className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
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
				className={
					'navigation-drop-down ' +
					(showingNavigationDropdown ? 'open' : '') +
					' sm:hidden'
				}
			>
				<div className="py-1">
					<ResponsiveNavLink href={route('home.home')} active={route().current('home.*')}>
						Smart Fish
						<DevicePhoneMobileIcon className="h-5 w-5" />
					</ResponsiveNavLink>
				</div>

				<div className="py-1">
					<ResponsiveNavLink
						href={route('location.map')}
						active={route().current('location.*')}
					>
						Search By Location
						<MapIcon className="h-5 w-5" />
					</ResponsiveNavLink>
				</div>

				<div className="border-t border-gray-200">
					<div className="py-1">
						<ResponsiveNavLink
							className=""
							href={route('settings.edit')}
							active={route().current('settings.*')}
						>
							Settings
							<Cog6ToothIcon className="h-5 w-5" />
						</ResponsiveNavLink>
					</div>
				</div>
			</div>
		</nav>
	)
}
