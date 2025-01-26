describe('Accounts', () => {
    it('lists accounts', () => {
      cy.visit('/admin/accounts');
      // Wait for table to load
      // check test
      cy.get('table', { timeout: 10000 }).should('be.visible');
    });
  });