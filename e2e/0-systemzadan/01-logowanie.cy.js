
const login = (user, pass) => {
    cy.get("#email").type(user, {delay:100});
    cy.get("#password").type(pass, {delay:100});
    cy.get(".btn.btn-primary").click();
}

describe('Cypress logowanie', () => {
    beforeEach(() => {
    cy.visit('https://zadania.t24.ovh/')
    })

    it('Sprawdzenie nagłówka strony', () => {
        cy.get(".navbar").contains("System Zarządzania Zadaniami")
    });
  
    it('Logowanie do systemu', () => {
      // logowanie do systemu
      login("prof1@admin.pl","1234");
    });

    it('Sprawdzenie podstron', () => {
        login("prof1@admin.pl","1234");
        cy.get('h3').contains('Main Site');
        cy.get('.nav-item').contains('Klasy').click();
        cy.get('.card-header').contains("Wybór szkoły")
        cy.get('.nav-item').contains('Przedmiot').click();
        cy.get('.card-header').contains("Przedmioty")
        cy.get('.nav-item').contains('Użytkownicy').click();
        cy.get('.card-header').contains("Użytkownicy")
    });



});