describe('Vendors', () => {
    it('lists vendors', () => {
      cy.visit('/admin/vendors');
      // Wait for table to load
      // check test
      // cy.get('table', { timeout: 10000 }).should('be.visible');
    });
  });