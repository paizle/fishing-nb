/** Placeholder fish icon until species illustrations are supplied. */
export function FishIconPlaceholder({ name }) {
	const initial = name.charAt(0).toUpperCase()

	return (
		<div className="FishIconPlaceholder" aria-hidden="true">
			<svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M4 16c8-8 20-10 32-6-4 2-6 6-6 10s2 8 6 10C24 26 12 24 4 16z"
					stroke="currentColor"
					strokeWidth="1.5"
					fill="none"
				/>
				<circle cx="10" cy="14" r="1.5" fill="currentColor" />
				<path
					d="M36 10l4 6-4 6"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
				/>
			</svg>
			<span className="FishIconPlaceholder-initial">{initial}</span>
		</div>
	)
}
