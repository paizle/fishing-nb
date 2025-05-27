// cypress/e2e/filterButtonSpec.cy.js
// IMPORTANT: Install cypress-real-events and import it in cypress/support/e2e.js for .realHover() to work

describe('Filter Button and SVG Interaction Test', () => {
	before(() => {
		cy.visit('http://127.0.0.1')
	})

	const expectedRegions = [
		'Restigouche',
		'Chaleur',
		'Miramichi',
		'Southeast',
		'Inner Bay of Fundy',
		'Lower Saint John',
		'Southwest',
		'Upper Saint John',
	]

	it('should display unique h3 texts on hover for each g in SVG after clicking the filter button', () => {
		cy.get('button.select-region').should('exist').and('be.visible').click()
		cy.get('svg').should('exist').and('be.visible')

		// Debugging: Check if elements are interactive
		cy.get('svg g g path') // Target child elements like <path>; adjust to 'svg g' or 'svg g rect' if needed
			.should('have.length.gte', 1)
			.should('have.css', 'pointer-events', 'all') // Ensures no 'none' blocking events

		const seenTexts = []
		cy.get('svg g path')
			.each(($el, index) => {
				// Debugging: Log element details
				cy.log(`Processing element ${index} for hover`)

				// Dynamically get the element's bounding box for accurate mouse positioning
				cy.wrap($el).then((el) => {
					const rect = el[0].getBoundingClientRect()
					const clientX = rect.left + rect.width / 2 // Center X
					const clientY = rect.top + rect.height / 2 // Center Y

					// Preferred: Use realHover from cypress-real-events for native event simulation
					// This should fix most hover issues – ensure the plugin is installed!
					cy.wrap($el).realHover() // Simulates a real hover at the element's position

					// Fallback if plugin not installed: Use trigger with calculated coordinates
					// cy.wrap($el).trigger('mouseenter', { clientX, clientY, force: true, bubbles: true });

					// Wait for effect and assert <h3> becomes visible (confirms hover worked)
					cy.get('h3:visible', { timeout: 2000 }) // Your updated selector; add specificity like '.tooltip h3:visible' if needed
						.should('exist')
						.and('be.visible')
						.invoke('text')
						.then((text) => {
							const trimmedText = text.trim()

							// Debugging: Log to confirm changes
							cy.log(`Hover ${index}: <h3> text is "${trimmedText}"`)

							// Optional: Extract region if text has extras (e.g., "New Brunswick Restigouche")
							const regionPart = trimmedText
								.replace(/^New Brunswick\s*/, '')
								.split(/\s{2,}/)[0]
							const finalText = regionPart.trim()

							// Assertions
							expect(expectedRegions).to.include(
								finalText,
								`Hovered text "${finalText}" must be an expected region`,
							)
							expect(seenTexts).to.not.include(
								finalText,
								`Duplicate region: ${finalText}`,
							)
							seenTexts.push(finalText)
						})

					// Reset with realMouseOut or trigger
					cy.wrap($el).realMouseOut() // For cypress-real-events
					// Or: cy.wrap($el).trigger('mouseleave', { clientX, clientY, force: true });
				})

				// Optional: Pause for manual inspection (remove after debugging)
				// cy.pause();
			})
			.then(() => {
				expect(seenTexts).to.have.lengthOf(expectedRegions.length)
				cy.log(`Unique regions found: ${seenTexts.join(', ')}`)
			})
	})
})
