import './bootstrap'

import WhatsOpenNowCardLive from '@/Pages/Public/SmartFish/Homepage/sections/WhatsOpenNowCardLive'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const mountNode = document.getElementById('whats-open-now-widget')

if (mountNode) {
	createRoot(mountNode).render(
		<StrictMode>
			<WhatsOpenNowCardLive apiLastModified={mountNode.dataset.apiLastModified ?? ''} />
		</StrictMode>,
	)
}
