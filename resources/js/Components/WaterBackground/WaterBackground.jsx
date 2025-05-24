import './WaterBackground.css'

export default function WaterBackground({ className = '', children }) {
	return (
		<div className={`WaterBackground ${className}`}>
			<div className="WaterBackgroundInner"></div>
			<div className="WaterBackgroundChildren">{children}</div>
		</div>
	)
}
