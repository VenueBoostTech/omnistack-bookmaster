describe('Create and Validate Transactions', () => {
    beforeEach(() => {
      cy.visit('/admin/transactions');
    });
  
    it('should create a new transaction', () => {
      cy.contains('New Transaction').click();
  
      // Fill out the form
      cy.get('input[name="number"]').type('TXN002');
      cy.get('input[name="date"]').type('2025-01-01');
      cy.get('select[name="type"]').select('SALE');
      cy.get('textarea[name="description"]').type('Sample Sale Transaction');
      cy.get('input[name="debit"]').type('500');
      cy.get('select[name="account"]').select('Sample Account');
  
      // Submit
      cy.get('button[type="submit"]').click();
  
      // Validate
      cy.contains('Transaction created successfully').should('be.visible');
      cy.get('table').contains('TXN002').should('be.visible');
    });
  });
  