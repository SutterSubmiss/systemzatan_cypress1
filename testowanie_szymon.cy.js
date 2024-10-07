const login = (user, password) =>{
    cy.get('#email').type(user);
    cy.get('#password').type(password);
  }
  const gora1 = () =>{
    cy.get('#app > nav > div > a').should('exist').contains('System Zarządzania Zadaniami')
    cy.get('#navbarSupportedContent > ul.navbar-nav.ms-auto > li:nth-child(1) > a').should('exist').contains('Login');
    cy.get('#navbarSupportedContent > ul.navbar-nav.ms-auto > li:nth-child(2) > a').should('exist').contains('Register');
  }
  const gora2 = () =>{
    cy.get('#app > nav > div > a').should('exist').contains('System Zarządzania Zadaniami');
    cy.get('#navbarSupportedContent > ul.navbar-nav.ms-auto > li:nth-child(1) > a').should('exist').contains('Start');
    cy.get('#navbarSupportedContent > ul.navbar-nav.ms-auto > li:nth-child(2) > a').should('exist').contains('Klasy');
    cy.get('#navbarSupportedContent > ul.navbar-nav.ms-auto > li:nth-child(3) > a').should('exist').contains('Przedmiot');
    cy.get('#navbarSupportedContent > ul.navbar-nav.ms-auto > li:nth-child(4) > a').should('exist').contains('Użytkownicy');
    cy.get('#navbarDropdown').should('exist').contains('prof1');
    cy.get('#navbarDropdown').should('exist').contains('prof1').click();
    cy.get('#navbarSupportedContent > ul.navbar-nav.ms-auto > li.nav-item.dropdown > div > a').should('exist').contains('Logout');
  }
  
  describe('Test strony logowania https://zadania.t24.ovh', () => {
  beforeEach(() => {
    cy.visit('https://zadania.t24.ovh');
  });
  
  it('Powinno wyświetlić stronę formularza logowania', () => {
    gora1();
    cy.get('form').should('exist');
    cy.get('#app > main > div > div > div > div > div.card-header').should('exist').contains('Login')
    cy.get('#app > main > div > div > div > div > div.card-body > form > div:nth-child(2) > label').should('exist').contains('Email Address')
    cy.get('#email').should('exist');
    cy.get('#app > main > div > div > div > div > div.card-body > form > div:nth-child(3) > label').should('exist').contains('Password')
    cy.get('#password').should('exist');
    cy.get('#app > main > div > div > div > div > div.card-body > form > div:nth-child(4) > div > div > label').should('exist').contains('Remember Me')
    cy.get('#remember').should('exist');
    cy.get('#app > main > div > div > div > div > div.card-body > form > div.row.mb-0 > div > button').should('exist').contains('Login')
    cy.get('#app > main > div > div > div > div > div.card-body > form > div.row.mb-0 > div > a').should('exist').contains('Forgot Your Password?')
    cy.url().should('include', '/login');
  });
  it('Powinno wejść i wyświetlić strone do resetowania hasla', () =>{
    cy.get('#app > main > div > div > div > div > div.card-body > form > div.row.mb-0 > div > a').should('exist').click();
    cy.url().should('include', '/password/reset');
    gora1();
    cy.get('#app > main > div > div > div > div > div.card-header').should('exist').contains('Reset Password');
    cy.get('#app > main > div > div > div > div > div.card-body > form > div.row.mb-3 > label').should('exist').contains('Email Address');
    cy.get('#email').should('exist');
    cy.get('#app > main > div > div > div > div > div.card-body > form > div.row.mb-0 > div > button').should('exist').contains('Send Password Reset Link')
  
  })
  it('Powinno wyświetlić formularz rejestracji', () => {
    cy.get('#navbarSupportedContent > ul.navbar-nav.ms-auto > li:nth-child(2) > a').click();
    cy.url().should('include','/register')
    gora1();
    cy.get('#app > main > div > div > div > div > div.card-header').should('exist').contains('Register');
    cy.get('#app > main > div > div > div > div > div.card-body > form > div:nth-child(2) > label').should('exist').contains('Nazwa');
    cy.get('#name').should('exist');
    cy.get('#app > main > div > div > div > div > div.card-body > form > div:nth-child(3) > label').should('exist').contains('Imię');
    cy.get('#first_name').should('exist');
    cy.get('#app > main > div > div > div > div > div.card-body > form > div:nth-child(4) > label').should('exist').contains('Nazwisko');
    cy.get('#last_name').should('exist');
    cy.get('#app > main > div > div > div > div > div.card-body > form > div:nth-child(5) > label').should('exist').contains('Płeć');
    cy.get('#exampleRadios1').should('exist');
    cy.get('#app > main > div > div > div > div > div.card-body > form > div:nth-child(5) > div > div:nth-child(1) > label').should('exist').contains('Kobieta');
    cy.get('#exampleRadios2').should('exist');
    cy.get('#app > main > div > div > div > div > div.card-body > form > div:nth-child(5) > div > div:nth-child(2) > label').should('exist').contains('Mężczyzna');
    cy.get('#app > main > div > div > div > div > div.card-body > form > div:nth-child(6) > label').should('exist').contains('Email');
  });
  
  it('Nie powinno zalogować użytkownika przy pustych danych', () => {
    cy.get('button[type="submit"]').click();
    cy.get('#navbarSupportedContent > ul.navbar-nav.ms-auto > li:nth-child(2) > a#navbarSupportedContent > ul.navbar-nav.ms-auto > li.nav-item.dropdown').should('not.exist');
  });
  
  it('Niepoprawne dane logowania', () => {
    login("twojstary@email.pl", '404')
    cy.get('#app > main > div > div > div > div > div.card-body > form > div.row.mb-0 > div > button').click();
    cy.get('#navbarSupportedContent > ul.navbar-nav.ms-auto > li:nth-child(2) > a#navbarSupportedContent > ul.navbar-nav.ms-auto > li.nav-item.dropdown').should('not.exist');
  });
  
  it('Poprawne logowanie nauczyciel', () => {
    login("prof1@admin.pl", '1234')
    cy.get('#app > main > div > div > div > div > div.card-body > form > div.row.mb-0 > div > button').click();
    cy.url().should('include', '/nauczyciel'); 
  });
  it('Sprawdzanie zakładki start', ()=> {
    login("prof1@admin.pl", '1234');
    cy.get('#app > main > div > div > div > div > div.card-body > form > div.row.mb-0 > div > button').click();
    gora2();
    cy.get('#app > main > div > div:nth-child(2) > div > h3').should('exist').contains('Main Site')
    cy.get('#navbarSupportedContent > ul.navbar-nav.ms-auto > li:nth-child(1) > a').click()
    cy.get('#app > main').should('exist');
  })
  it('Sprawdzanie zakładki klasy', ()=> {
    login("prof1@admin.pl", '1234')
    cy.get('#app > main > div > div > div > div > div.card-body > form > div.row.mb-0 > div > button').click();
    gora2();
    cy.get('#navbarSupportedContent > ul.navbar-nav.ms-auto > li:nth-child(2) > a').click();
    cy.url().should('include', '/klasy');
    cy.get('#app > main > div > div > div > div > div.card-header').should('exist').contains('Wybór szkoły')
    cy.get('#schoolSelect').should('exist');
    
  })
  it('Sprawdzanie zakładki przedmioty', ()=> {
    login("prof1@admin.pl", '1234')
    cy.get('#app > main > div > div > div > div > div.card-body > form > div.row.mb-0 > div > button').click();
    gora2();
    cy.get('#navbarSupportedContent > ul.navbar-nav.ms-auto > li:nth-child(3) > a').click();
    cy.url().should('include', '/przedmioty');
  })
  it('Sprawdzanie zakładki uzytkownicy', ()=> {
    login("prof1@admin.pl", '1234')
    cy.get('#app > main > div > div > div > div > div.card-body > form > div.row.mb-0 > div > button').click();
    gora2();
    cy.get('#navbarSupportedContent > ul.navbar-nav.ms-auto > li:nth-child(4) > a').click();
    cy.url().should('include', '/uzytkownicy');
  })
  it('Poprawne logowanie uczen', () => {
    login("uczen1@admin.pl", '1234');
    cy.get('#app > main > div > div > div > div > div.card-body > form > div.row.mb-0 > div > button').click();
    cy.url().should('include', '/uczen');
    cy.get('#navbarSupportedContent > ul.navbar-nav.ms-auto > li:nth-child(1) > a').click();
    cy.url().should('include', '/uczen');
    cy.get('#navbarSupportedContent > ul.navbar-nav.ms-auto > li:nth-child(2) > a').click();
    cy.url().should('include', '/zadania');
    cy.get('#navbarSupportedContent > ul.navbar-nav.ms-auto > li:nth-child(3) > a').click();
    cy.url().should('include', '/zadaniawyslane');
  });
  });