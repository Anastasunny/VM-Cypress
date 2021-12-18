export class NotAvailablePage {
    open () {
      cy.visit(`${Cypress.env('VmURL')}` + `/not-avaliable`)
    }

    get homePageButton () {
        return cy.get('.MuiButtonBase-root')
      }
  }