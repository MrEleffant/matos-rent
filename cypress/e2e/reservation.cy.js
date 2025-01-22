// cypress/e2e/reservation.cy.js

describe('Reservation Tests', () => {
    beforeEach(() => {
      // Use the custom login method to log in as an admin
      cy.login('test@gmail.com', 'ceciestunmdp');
  
      // Navigate to the home page
      cy.visit('/');
    });
  
    it('should try to reserve the same material twice with overlapping dates', () => {
      // Select the first material in the list
      cy.get('tbody tr').first().find('button').contains('📅').click();
  
      // Make the first reservation
      cy.get('input[type="date"]').first().type('2025-02-01');
      cy.get('input[type="date"]').last().type('2025-02-10');
      cy.get('button[type="submit"]').click();
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Réservation effectuée avec succès !');
      });
  
      // Attempt a second reservation with overlapping dates
      cy.visit('/');
      cy.get('tbody tr').first().find('button').contains('📅').click();
  
      cy.get('input[type="date"]').first().type('2025-02-05');
      cy.get('input[type="date"]').last().type('2025-02-15');
      cy.get('button[type="submit"]').click();
      cy.on('window:alert', (str) => {
        expect(str).to.equal("Le matériel n'est pas disponible aux dates choisies.");
      });
  
      // Clean up: delete the first reservation
      cy.visit('/manage-reservations'); // Navigate to the reservation management page
      cy.get('tbody tr').first().find('button').contains('🗑️').click();
      cy.on('window:confirm', () => true); // Confirm the deletion
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Réservation supprimée !');
      });
    });
  });
  