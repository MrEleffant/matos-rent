Cypress.Commands.add('login', (email, password) => {
    cy.visit('/auth'); // Aller à la page de connexion
    cy.get('input#email').type(email); // Entrer l'email
    cy.get('input#password').type(password); // Entrer le mot de passe
    cy.get('button[type="submit"]').click(); // Cliquer sur le bouton de connexion
    cy.contains(`Logged in as: ${email}`).should('be.visible'); // Vérifier la connexion
  });
  