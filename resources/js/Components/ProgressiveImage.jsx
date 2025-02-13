import { useState } from 'react'

const ProgressiveImage = ({ lowResSrc, highResSrc, alt, className = '' }) => {
	const [loaded, setLoaded] = useState(false)

	return (
		<div className={`relative ${className}`}>
			{loaded ? null : (
				<img
					src={lowResSrc}
					className={`low-res absolute inset-0 top-0 h-full w-full object-cover object-top transition-opacity duration-100 ${
						loaded ? 'opacity-0' : 'opacity-100'
					}`}
				/>
			)}

			<img
				src={highResSrc}
				alt={alt}
				className={`h-full w-full object-cover object-top transition-opacity duration-100 ${
					loaded ? 'opacity-100' : 'opacity-0'
				}`}
				onLoad={() => setLoaded(true)}
			/>
		</div>
	)
}

export default ProgressiveImage
