export class StatementDetailsPage {

  get deleteButton () {
    return cy.get('span.MuiButton-label').contains('Удалить')
  }
}