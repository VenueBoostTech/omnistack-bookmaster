// cypress/support/e2e.ts
beforeEach(() => {
    cy.loginSession();
  });


  Cypress.on('uncaught:exception', (err) => {
    // Ignore hydration errors
    if (err.message.includes('Hydration failed')) {
      return false;
    }
   });