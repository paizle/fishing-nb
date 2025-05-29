describe('Fishing NB Home Page', { testIsolation: false }, () => {
	before(() => {
		cy.visit('http://127.0.0.1')
	})

	it('should load the home page successfully', () => {
		cy.get('nav').should('exist')
		cy.contains('Smart Fish').should('be.visible')
	})

	it('should find the combobox input on the page', () => {
		cy.get('[id="downshift-:r0:-input"]').should('have.length', 1)
	})

	it('should type words in the combobox until ul appears with li elements', () => {
		cy.get('[id="downshift-:r0:-input"]').clear().type('testwordnotreal')
		cy.get('[id="downshift-:r0:-menu"] li').should('not.exist')

		cy.get('[id="downshift-:r0:-input"]').clear().type('river')
		cy.get('[id="downshift-:r0:-menu"] li').should('have.length.greaterThan', 1)
	})
})
