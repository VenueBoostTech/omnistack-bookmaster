// cypress/support/commands.ts
Cypress.Commands.add('loginSession', () => {
  const email = Cypress.env('TEST_EMAIL');
  const password = Cypress.env('TEST_PASSWORD');
 
  cy.session('user', () => {
    cy.visit('/auth/login');
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password); 
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/admin');
  }, {
    validate() {
      cy.getCookie('next-auth.session-token').should('exist');
    }
  });
 });