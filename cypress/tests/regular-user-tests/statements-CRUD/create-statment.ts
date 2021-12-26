import { LoginPage } from '../../../pageObjects/pages/loginPage'
import { MyStatementsPage } from '../../../pageObjects/pages/myStatementsPage'
import { NewStatementPage } from '../../../pageObjects/pages/newStatementPage'
import { NavMenu } from '../../../pageObjects/components/navigationMenu'
import { TopBar } from '../../../pageObjects/components/topBar'

describe('Regular user flow', () => {

  const loginPage = new LoginPage()
  const myStatementsPage = new MyStatementsPage()
  const navigationMenu = new NavMenu()
  const newStatementPage = new NewStatementPage()
  const topBar = new TopBar()

  beforeEach(() => {

    // login with Google Account and open the page
    cy.signInWithGoogle()
    cy.saveUserInfo()

    // All statements page components are displayed properly
    topBar.userName.should('have.text', 'Anastasia Malets')
  })

  it('Managers are returned from API and autocompleted in a list', () => {

    cy.intercept({
      method: 'POST',
      url: '**/api/managers/**',
    }).as('managers')

    cy.visit(`${Cypress.env('vmURL')}/statements-create`)

    cy.wait('@managers').then((interception) => {
      newStatementPage.departmentManager.should('have.attr', 'value', 
      `${interception.response.body.departmentManager.firstName} ${interception.response.body.departmentManager.lastName}`)

      newStatementPage.projectManagers
      .find('.MuiChip-root')
      .should(($managers) => {

        //Validate that Amount of managers displayed by UI equals amount of managers from API
        expect($managers.length).to.eql((interception.response.body.projectManagers).length)

        //All API managers are displayed in the corresponding list
        for(let i = 0; i < $managers.length; i++) {
          let managerName = `${interception.response.body.projectManagers[i].lastName} ${interception.response.body.projectManagers[i].firstName}`
          expect($managers[i]).to.have.text(`${managerName}`)
        }
      })
    })
  })

  it('Create a dayOff statement (UI test)', () => {
   
    cy.intercept({
      method: 'POST',
      url: '**/agreements**',
    }).as('newStatement')

    cy.visit(`${Cypress.env('vmURL')}/statements-create`)

    newStatementPage.dateFrom.click()
    newStatementPage.selectDay(1)
    
    newStatementPage.dateTo.click()
    newStatementPage.selectDay(5)

    newStatementPage.daysAmount.should('have.attr', 'value', '5')  
    newStatementPage.saveDraft.click()
    newStatementPage.saveButton.click()

    cy.wait('@newStatement').then((interception) => {
      expect(interception.response.statusCode).to.be.eql(200)

      myStatementsPage.statementsTableRow
      .siblings()
      .should(($rows) => {
        expect($rows.length).to.be.greaterThan(0)
      })

      cy.readFile('cypress/fixtures/dayOffStatement.json').then((obj) => {
        obj.id = `${interception.response.body.id + 1}`
        obj.id = parseInt(obj.id)
        cy.writeFile('cypress/fixtures/dayOffStatement.json', obj)
      })
    })
  })

  it('Create a dayOff statement (API test)', () => {
   
    cy.intercept({
      method: 'POST',
      url: '**/agreements**',
    }).as('newStatement')

    cy.visit(`${Cypress.env('vmURL')}/statements-create`)

    newStatementPage.dateFrom.click()
    newStatementPage.selectDay(1)
    
    newStatementPage.dateTo.click()
    newStatementPage.selectDay(5)

    newStatementPage.daysAmount.should('have.attr', 'value', '5')  
    newStatementPage.saveDraft.click()
    newStatementPage.saveButton.click()

    cy.wait('@newStatement').then((interception) => {
      cy.fixture('dayOffStatement').then((newStatement) => {
        let response = JSON.stringify(interception.response.body)
        response = `{ "newStatement": ${response} }`
        response = JSON.parse(response)
        
        expect(response).to.be.eql({
          newStatement
        })
      })
    })
  })
})