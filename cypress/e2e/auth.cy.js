// cypress/e2e/auth.cy.js

describe('Authentication Tests', () => {
  beforeEach(() => {
    cy.visit('/auth');
  });

  it('should display the login form', () => {
    cy.get('input#email').should('be.visible');
    cy.get('input#password').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should validate email and password fields', () => {
    cy.get('input#email').type('invalid-email');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/auth'); // Stays on the page due to invalid email
  });

  it('should log in successfully with valid credentials', () => {
    cy.get('input#email').type('mathi@gmail.com');
    cy.get('input#password').type('tititutu');
    cy.get('button[type="submit"]').click();
    
    cy.contains('Logged in as: mathi@gmail.com').should('be.visible');
  });

  it('should show an error for invalid credentials', () => {
    cy.get('input#email').type('wrongemail@gmail.com');
    cy.get('input#password').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (str) => {
      expect(str).to.include('Error logging in');
    });
  });
});
