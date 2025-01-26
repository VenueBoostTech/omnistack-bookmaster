describe('Products', () => {
    it('lists products', () => {
      cy.visit('/admin/products');
      // Wait for table to load
      // check test
      // cy.get('table', { timeout: 10000 }).should('be.visible');
    });
  });