import UiIcon from '@/Components/UiIcon/UiIcon'

function statusIconConfig(statusClass) {
	switch (statusClass) {
		case 'open':
			return { name: 'check', modifier: '--open' }
		case 'catch-release':
		case 'warning':
			return { name: 'exclamation-triangle-solid', modifier: '--warning' }
		case 'closed':
		default:
			return { name: 'x-mark', modifier: '--closed' }
	}
}

export default function WhatsOpenStatusIcon({ statusClass }) {
	const { name, modifier } = statusIconConfig(statusClass)

	return (
		<span
			className={`WhatsOpenNowCard-statusIcon WhatsOpenNowCard-statusIcon${modifier}`}
			aria-hidden="true"
		>
			<UiIcon name={name} />
		</span>
	)
}
