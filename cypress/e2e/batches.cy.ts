describe('Batches', () => {
    it('lists batches', () => {
      cy.visit('/admin/batches');
      // Wait for table to load
      // check test
      // cy.get('table', { timeout: 10000 }).should('be.visible');
    });
  });