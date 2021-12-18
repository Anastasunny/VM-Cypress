export class MyStatementsPage {
  open () {
    cy.visit(`${Cypress.env('VmURL')}` + `/statements`)
  }

  get userName () {
    return cy.get('span.jss28')
  }

  get statementsTable () {
    return cy.get('.jss15')
  }

  get rightInfoCards () {
    return cy.get('.jss17')
  }

  get navigationMenu () {
    return cy.get('.MuiList-root.MuiList-padding')
  }
}