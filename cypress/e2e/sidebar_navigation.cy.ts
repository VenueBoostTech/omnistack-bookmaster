describe('Sidebar Navigation', () => {
  beforeEach(() => {
    // Visit the admin dashboard or any base page where the sidebar exists
    cy.visit('/admin/dashboard');

    // Wait for the sidebar to load
    cy.get('.sidebar-container').should('be.visible'); // Update selector as necessary
  });

  it('should navigate to Dashboard', () => {
    // Click on the Dashboard link
    cy.get('a[href="/admin/dashboard"]').click();

    // Assert the URL has changed
    cy.url().should('include', '/admin/dashboard');
  });

  it('should navigate to Products', () => {
    // Open the Inventory section if it is collapsible
    cy.get('a[href="#"]').contains('Inventory').click();

    // Click on the Products link
    cy.get('a[href="/admin/products"]').click();

    // Assert the URL has changed
    cy.url().should('include', '/admin/products');
  });
});
