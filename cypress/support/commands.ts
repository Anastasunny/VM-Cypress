import googleCreds from '../fixtures/googleCreds.json'

let api = Cypress.env('vmAPI')

Cypress.Commands.add('signInWithGoogle', () => {
  cy.log('Logging in to Google')

  // Отправка login запроса на сервера Google
  cy.request({
    method: 'POST',
    url: 'https://www.googleapis.com/oauth2/v4/token',
    body: {

      // Здесь передаются пользовтельские googleClientId, googleClientSecret, googleRefreshToken
      grant_type: 'refresh_token',
      client_id: googleCreds.googleClientId,
      client_secret: googleCreds.googleClientSecret,
      refresh_token: googleCreds.googleRefreshToken,
    },
  }).then(({ body }) => {

    // В responseBody запроса возвращается access_token (ключ входа)
    const { access_token, id_token } = body

    // Используя пользовательский ключ входа (access_token) - получаем данные о пользователе
    cy.request({
      method: 'GET',
      url: 'https://www.googleapis.com/oauth2/v3/userinfo',
      headers: { Authorization: `Bearer ${access_token}` },
    }).then(({ body }) => {
      cy.log(body)
      const userItem = {

        // Данные о пользователе хранятся в ответе запрос GET
        token: id_token,
        user: {
          googleId: body.sub,
          email: body.email,
          givenName: body.given_name,
          familyName: body.family_name,
          imageUrl: body.picture,
        },
      }

    // Устанавливаем объект с ключом входа и пользовательскими данными в local storage браузера
    window.localStorage.setItem('googleCypress', JSON.stringify(userItem))
    window.localStorage.setItem('token', JSON.stringify(userItem.token))
    })
  })
})

Cypress.Commands.add('saveUserInfo', () => {

  // This is to capture and save userInfo
  cy.intercept({
    method: 'GET',
    url: '**/api/users/**',
  }).as('userID')

  // Trigger login action
  cy.visit(`${Cypress.env('vmURL')}`)
  cy.get('.jss10').click()
    
  cy.wait('@userID').then((interception) => {
    cy.writeFile(
      'cypress/fixtures/temp/userInfo.json',
      `{"userId": "${interception.response.body.id}",
      "bearerToken": "${interception.request.headers.authorization}"}`,
    )   
  })
})

Cypress.Commands.add('totalStatementsAmount', () => {
  cy.readFile('cypress/fixtures/temp/userInfo.json').then((userInfo) => {
    const authorization = `${userInfo.bearerToken}`
    cy.request({
      method: 'GET',
      url: `${api}/api/users/${userInfo.userId}/agreements`,
      headers: { authorization }
    }).then((response) => {
      return response.body.totalElements
    })
  })
})