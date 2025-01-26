describe('Users', () => {
    it('lists users', () => {
      cy.visit('/admin/users');
      // Wait for table to load
      // check test
      // cy.get('table', { timeout: 10000 }).should('be.visible');
    });
  });