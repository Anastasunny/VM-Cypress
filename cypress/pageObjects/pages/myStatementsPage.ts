export class MyStatementsPage {
  open () {
    cy.visit(`${Cypress.env('VmURL')}` + `/statements`)
  }

  get statementsTable () {
    return cy.get('.jss15')
  }

  get statementsTableRow () {
    return cy.get('.MuiTableBody-root > :nth-child(1)')
  }

  get rightInfoCards () {
    return cy.get('.jss17')
  }

  get navigationMenu () {
    return cy.get('.MuiList-root.MuiList-padding')
  }
}