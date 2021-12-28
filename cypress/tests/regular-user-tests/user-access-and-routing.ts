import { LoginPage } from '../../pageObjects/pages/loginPage'
import { MyStatementsPage } from '../../pageObjects/pages/myStatementsPage'
import { NotAvailablePage } from '../../pageObjects/pages/notAvailablePage'
import { NavMenu } from '../../pageObjects/components/navigationMenu'
import { TopBar } from '../../pageObjects/components/topBar'

describe('Regular user flow', () => {

  const loginPage = new LoginPage()
  const myStatementsPage = new MyStatementsPage()
  const notAvailablePage = new NotAvailablePage()
  const navigationMenu = new NavMenu()
  const topBar = new TopBar()
  const navMenuOptions = {
    'statements': 0,
    'newStatement': 1,
  }

  beforeEach(() => {
    //Open the page and login with Google Account
    cy.signInWithGoogle()
    cy.visit(`${Cypress.env('vmURL')}`)
    loginPage.GoogleSignInButton.click()

    //All statements page components are displayed properly
    topBar.userName.should('have.text', 'Anastasia Malets')
  })

  after(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  it('Statements page UI test', () => {

    //Мои заявления table, Info cards and Navigation menu are displayed
    myStatementsPage.statementsTable.should('be.visible')
    myStatementsPage.rightInfoCards.should('be.visible')
    navigationMenu.navigationMenu.should('be.visible')

    navigationMenu.navigationMenu
    .find('a')
    .should(($options) => {
      // Regular user has only 2 buttons in the navigation menu
      // Buttons are Statements. New statement
      // DOM include 2 lists (displayed one, and hidden for mobile view)
      // 2 buttons for 1 list * 2 lists = 4 items
      expect($options).to.have.length(4)

      expect($options[navMenuOptions['statements']]).to.have.attr('href', '/statements')
      expect($options[navMenuOptions['newStatement']]).to.have.attr('href', '/statements-create')

      // Regular user shouldn't have access to following pages
      for(let i = 0; i < $options.length; i++) {
        expect($options[i]).to.not.attr('href', '/employees')
        expect($options[i]).to.not.attr('href', '/archive')
        expect($options[i]).to.not.attr('href', '/calendar')
        expect($options[i]).to.not.attr('href', '/admin/agreements')
      }
    })
  })

  it('Regular user access & routing negative test', () => {
    // employee available pages: /statements-create, /statements

    //Check access & routing via UI
    navigationMenu.newStatement.click()
    cy.url().should('equal', `${Cypress.env('vmURL')}/statements-create`)

    navigationMenu.myStatements.click()
    cy.url().should('equal', `${Cypress.env('vmURL')}/statements`)

    //Check access & routing via API 
    cy.visit(`${Cypress.env('vmURL')}/statements-create`)
    cy.url().should('equal', `${Cypress.env('vmURL')}/statements-create`)
    
    cy.visit(`${Cypress.env('vmURL')}/statements`)
    cy.url().should('equal', `${Cypress.env('vmURL')}/statements`)

    cy.visit(`${Cypress.env('vmURL')}/employees`)
    cy.url().should('equal', `${Cypress.env('vmURL')}/not-avaliable`)
    notAvailablePage.homePageButton.click()
    cy.wait(100) // Take some time for FE to change Browsing URL
    cy.url().should('equal', `${Cypress.env('vmURL')}/statements`)

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