import WaterName from '../WaterName'
import { formatDistance } from './nearestWatersUtils'

/** Map overlay label: water name with muted distance at the end. */
export default function WaterDirectionLabel({
	item,
	distance,
	className,
	style,
	onClick,
	ariaLabel,
}) {
	return (
		<button
			type="button"
			className={['MapWaterLabel', className].filter(Boolean).join(' ')}
			style={style}
			onClick={onClick}
			aria-label={ariaLabel}
		>
			<WaterName item={item} className="MapWaterLabel-name" />
			<span className="MapWaterLabel-dist">{formatDistance(distance)}</span>
		</button>
	)
}
