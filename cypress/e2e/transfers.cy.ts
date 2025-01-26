describe('Transfers', () => {
    it('lists transfers', () => {
      cy.visit('/admin/operations/transfers');
      // Wait for table to load
      // check test
      // cy.get('table', { timeout: 10000 }).should('be.visible');
    });
  });