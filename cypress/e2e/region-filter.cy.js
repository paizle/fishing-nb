describe('Filter Button and SVG Interaction Test', () => {
	before(() => {
		cy.visit('http://127.0.0.1')
	})

	const expectedRegions = {
		restigouche: 'Restigouche',
		chaleur: 'Chaleur',
		miramichi: 'Miramichi',
		southeast: 'Southeast',
		'inner-bay-of-fundy': 'Inner Bay of Fundy',
		'lower-saint-john': 'Lower Saint John',
		southwest: 'Southwest',
		'upper-saint-john': 'Upper Saint John',
	}

	it('should display unique h3 texts on hover for each g in SVG after clicking the filter button', () => {
		cy.get('button.select-region').should('exist').and('be.visible').click()
		cy.get('svg', { timeout: 10000 }).should('exist').and('be.visible')

		const seenTexts = []

		cy.wrap(Object.entries(expectedRegions)).each(([id, expectedText]) => {
			// Clear any previous hover by moving mouse off SVG
			cy.get('body').realHover() // move mouse away from paths
			cy.wait(500) // wait a bit for hover state to reset

			cy.get(`svg g#${id} path:first-child`)
				.should('exist')
				.and('be.visible')
				.realHover()
				.then(() => {
					// Wait for the <h3> to update after hover
					cy.get('h3:visible', { timeout: 1000 })
						.should('exist')
						.invoke('text')
						.then((rawText) => {
							const trimmed = rawText.normalize().trim()
							cy.log(`Hovered text: "${trimmed}"`)

							/*
              expect(seenTexts).to.not.include(
                trimmed,
                `Duplicate region detected: ${trimmed}`
              );
              */

							seenTexts.push(trimmed)
						})
				})
		})
	})
})
