describe('Transactions', () => {
    it('lists transactions', () => {
      cy.visit('/admin/transactions');
      // Wait for table to load
      // check test
      // cy.get('table', { timeout: 10000 }).should('be.visible');
    });
  });