export class LoginPage {
  open () {
    cy.visit(`${Cypress.env('VmURL')}` + `/statements`)
  }

  get GoogleSignInButton() {
    return cy.get('.jss10')
  }

  get emailInputField() {
    return cy.get('#identifierId')
  }

  get passwordInputField() {
    return cy.get('#password')
  }
}