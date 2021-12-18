/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {

    /**
     * Path Google OAuth 2.0 authentication
     */
    signInWithGoogle(): void

    /**
     * Create draft of a new statement
     */
     createDraftStatement(): void
  }
}
