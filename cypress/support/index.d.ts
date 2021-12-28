/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {

    /**
     * Path Google OAuth 2.0 authentication
     */
     signInWithGoogle(): void

    /**
     * Save user info
     */
     saveUserInfo(): void

      /**
     * returns Total statmenets amount
     */
       totalStatementsAmount(): void
      }
}
