import { LoginPage } from '../../pageObjects/loginPage'
import { MyStatementsPage } from '../../pageObjects/myStatementsPage'
import { StatementDetailsPage } from '../../pageObjects/statementDetailsPage'
import { NotAvailablePage } from '../../pageObjects/notAvailablePage'

describe('Regular user - Create draft statement flow tests', () => {

  const loginPage = new LoginPage()
  const myStatementsPage = new MyStatementsPage()
  const statementDetailsPage = new StatementDetailsPage()
  const notAvailablePage = new NotAvailablePage()

  before(() => {
    //Open the page and login with Google Account
    cy.signInWithGoogle()
    cy.visit(`${Cypress.env('vmURL')}`)
    loginPage.GoogleSignInButton.click()

    //All statements page components are displayed properly
    myStatementsPage.userName.should('have.text', 'Anastasia Malets')
  })

  it('Statements page UI test', () => {

    //Мои заявления table, Info cards and Navigation menu are displayed
    myStatementsPage.statementsTable.should('be.visible')
    myStatementsPage.rightInfoCards.should('be.visible')
    myStatementsPage.navigationMenu.should('be.visible')

    myStatementsPage.navigationMenu
    .find('a')
    .should(($buttons) => {
      // Regular user has only 2 buttons in the navigation menu
      // Buttons are Statements. New statement
      // DOM include 2 lists (displayed one, and hidden for mobile view)
      // 2 buttons for 1 list * 2 lists =
      expect($buttons).to.have.length(4)
      expect($buttons[2]).to.have.attr('href', '/statements')
      expect($buttons[3]).to.have.attr('href', '/statements-create')

      // Regular user shouldn't have access to following pages
      for(let i = 0; i < $buttons.length; i++) {
        expect($buttons[i]).to.not.attr('href', '/employees')
        expect($buttons[i]).to.not.attr('href', '/archive')
        expect($buttons[i]).to.not.attr('href', '/calendar')
        expect($buttons[i]).to.not.attr('href', '/admin/agreements')
      }
    })
  })

  it('Regular user access test', () => {

    cy.visit(`${Cypress.env('vmURL')}/employees`)
    cy.url().should('equal', `${Cypress.env('vmURL')}/not-avaliable`)
    notAvailablePage.homePageButton.click()
    cy.wait(100) // Take some time for FE to change Browsing URL
    cy.url().should('equal', `${Cypress.env('vmURL')}/statements`)

    cy.visit(`${Cypress.env('vmURL')}/archive`)
    cy.url().should('equal', `${Cypress.env('vmURL')}/not-avaliable`)
    notAvailablePage.homePageButton.click()
    cy.wait(100) // Take some time for FE to change Browsing URL
    cy.url().should('equal', `${Cypress.env('vmURL')}/statements`)

    cy.visit(`${Cypress.env('vmURL')}/calendar`)
    cy.url().should('equal', `${Cypress.env('vmURL')}/not-avaliable`)
    notAvailablePage.homePageButton.click()
    cy.wait(100) // Take some time for FE to change Browsing URL
    cy.url().should('equal', `${Cypress.env('vmURL')}/statements`)

    cy.visit(`${Cypress.env('vmURL')}/admin/agreements`)
    cy.url().should('equal', `${Cypress.env('vmURL')}/not-avaliable`)
    notAvailablePage.homePageButton.click()
    cy.wait(100) // Take some time for FE to change Browsing URL
    cy.url().should('equal', `${Cypress.env('vmURL')}/statements`)
  })
})