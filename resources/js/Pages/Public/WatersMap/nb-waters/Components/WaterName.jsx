import { getWaterDisplay } from '../Util/waterName'

/** Renders a water name or compact id (NID: prefix only when kind is nid). */
export default function WaterName({ item, className = '', as: Tag = 'span' }) {
	const display = getWaterDisplay(item)
	if (display.text != null) {
		return <Tag className={className}>{display.text}</Tag>
	}
	const idClass = ['water-id', className].filter(Boolean).join(' ')
	return (
		<Tag className={idClass}>
			{display.label && (
				<>
					<span className="water-id-label">{display.label}:</span>{' '}
				</>
			)}
			<span className="water-id-value">{display.value}</span>
		</Tag>
	)
}
