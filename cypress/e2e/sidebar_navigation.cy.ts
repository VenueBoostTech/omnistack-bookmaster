describe('Sidebar Navigation', () => {
  beforeEach(() => {
    cy.loginSession();
    cy.visit('/admin/dashboard');
    cy.get('aside').should('be.visible');
  });

  describe('Main Menu', () => {
    it('navigates to Dashboard', () => {
      cy.get('a[href="/admin/dashboard"]').first().click();
      cy.url().should('include', '/admin/dashboard');
    });

    it('navigates to Analytics', () => {
      cy.get('a[href="/admin/analytics"]').first().click();
      cy.url().should('include', '/admin/analytics');
    });
  });

  describe('Inventory', () => {
    it('navigates to Products section', () => {
      cy.get('a').contains('span', 'Products').click();
      cy.wait(2000);
      cy.get('a').contains('All Products').click();
      cy.url().should('include', '/admin/products');
      
      cy.get('a').contains('Categories').click();
      cy.url().should('include', '/admin/products/categories');
    });

    it('navigates to Warehouses section', () => {
      cy.get('a').contains('span', 'Warehouses').click();
      cy.wait(3000);
      cy.get('a').contains('Locations').click();
      cy.url().should('include', '/admin/warehouses');
      cy.wait(3000);
      cy.get('a').contains('Stock Levels').click();
      cy.url().should('include', '/admin/warehouses/stock');
    });

    it('navigates to Operations section', () => {
      cy.get('a').contains('span', 'Operations').click();
      cy.wait(1500);

      cy.get('a').contains('Stock In').click();
      // check test
      // cy.url().should('include', '/admin/operations/in');

      cy.get('a').contains('Stock Out').click();
      // check test
      // cy.url().should('include', '/admin/operations/out');

      cy.get('a').contains('Transfers').click();
      // check test
      // cy.url().should('include', '/admin/operations/transfers');

      cy.get('a').contains('Adjustments').click();
      // check test
      // cy.url().should('include', '/admin/operations/adjustments');
    });

    it('navigates to Batches', () => {
      cy.get('a[href="/admin/batches"]').click();
      cy.url().should('include', '/admin/batches');
    });
  });

  describe('Procurement', () => {
    it('navigates to Vendors', () => {
      cy.get('a[href="/admin/vendors"]').click();
      cy.url().should('include', '/admin/vendors');
    });

    it('navigates to Procurement Operations', () => {
      cy.get('a').contains('span', 'Procedures').click();
      cy.wait(3000);

      cy.get('a').contains('Purchases').click();
      // cy.url().should('include', '/admin/procurement/purchases');
      
      cy.get('a').contains('Returns').click();
      // cy.url().should('include', '/admin/procurement/returns');
    });
  });

  describe('Finance', () => {
    it('navigates to finance sections', () => {
      cy.get('a[href="/admin/accounts"]').first().click();
      // cy.url().should('include', '/admin/accounts');

      cy.get('a[href="/admin/transactions"]').click();
      // cy.url().should('include', '/admin/transactions');
    });
  });

  describe('Administration', () => {
    it('navigates to administration sections', () => {
      cy.get('a[href="/admin/users"]').click();
      // cy.url().should('include', '/admin/users');

      cy.get('a[href="/admin/settings"]').click();
      // cy.url().should('include', '/admin/settings');
    });
  });
});
