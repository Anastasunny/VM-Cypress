export class NewStatementPage {

  get departmentManager () {
    return cy.get('#departmentManager')
  }

  get projectManagers () {
      return cy.get('.MuiAutocomplete-root')
    }

  get dateFrom () {
    return cy.get(':nth-child(2) > :nth-child(1) > .MuiFormControl-fullWidth > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
    }

  get dateTo () {
    return cy.get(':nth-child(3) > :nth-child(1) > .MuiFormControl-fullWidth > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
  }

  get daysAmount () {
    return cy.get('#days')
  }

  get saveDraft () {
    return cy.get(':nth-child(8) > .MuiFormControl-root > .MuiFormGroup-root > :nth-child(1) > .MuiTypography-root')
  }

  get sendForSignature () {
    return cy.get(':nth-child(8) > .MuiFormControl-root > .MuiFormGroup-root > :nth-child(2) > .MuiTypography-root')
  }

  get saveButton () {
    return cy.get('.jss108 > :nth-child(1)')
  }

  selectDay(day){
    cy.get('.MuiPickersCalendar-transitionContainer').contains(`${day}`).click()
    cy.get('.MuiDialogActions-root > :nth-child(3)').click()
  }
}