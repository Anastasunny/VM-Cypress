export class StatementDetailsPage {

  get projectManagers () {
    return cy.get('.MuiInputBase-root > MuiChip-root')
  }
}