// multiSelect.spec.js

describe('MultiSelect Component', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should toggle dropdown on click', () => {
    cy.get('.flex-wrap').click()
    cy.get('ul').should('be.visible')

    cy.get('.outside').click()
    cy.get('ul').should('not.exist')
  })

  it('should add and remove items', () => {
    cy.get('.flex-wrap').click()

    cy.get('ul li:first').click()
    cy.get('span').should('have.length', 1)

    cy.get('span button').click()
    cy.get('span').should('have.length', 0)
  })

  it('should limit the number of selected items', () => {
    for (let i = 0; i < 6; i++) {
      cy.get('.flex-wrap').click()
      cy.get('ul li:first').click()
    }

    cy.get('span').should('have.length', 5)
  })

  it('should hide input when limit is reached', () => {
    cy.get('input').should('be.visible')

    for (let i = 0; i < 6; i++) {
      cy.get('.flex-wrap').click()
      cy.get('ul li:first').click()
    }

    cy.get('input').should('not.exist')
  })
})
