export class NavMenu {

  get navigationMenu () {
    return cy.get('.MuiList-root.MuiList-padding')
  }

  get myStatements () {
    return cy.get('div.MuiButtonBase-root').contains('Мои заявления')
  }

  get newStatement () {
    return cy.get('div.MuiButtonBase-root').contains('Новое заявление')
  }

  get statementsForSign () {
    return cy.get('div.MuiButtonBase-root').contains('На подпись')
  }

  get statementsArchive () {
    return cy.get('div.MuiButtonBase-root').contains('Архив заявлений')
  } 
}