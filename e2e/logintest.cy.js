import {faker }from '@faker-js/faker';

describe('Test wsi.edu.pl', ()=>{
    beforeEach( ()=>{
        cy.visit('https://zadania.t24.ovh')
    })

    it('Sprawdzenie czy jest strona w UTF-8', ()=>{
        cy.document().should('have.property','charset').and('eq', 'UTF-8')
    })
  let adres = ""
  it('Sprawdzenie czy wyświetla się odpowiednia strona', ()=>{
        
   
        cy.url().should('eq',"https://zadania.t24.ovh/login")
        
})
function mail_catching(mail,password){
    cy.get('#email').type(mail)
    cy.get('#password').type(password)
    cy.get('.btn-primary')
     .click()
}


  it('Sprawdzenie czy wyłapuje  mail profesora', ()=>{
        
        
    
    mail_catching("prof1@admin.pl","1234")
    cy.url().should('eq',"http://zadania.t24.ovh/nauczyciel")
   

  

})
it('Sprawdzenie czy wyłapuje  mail ucznia', ()=>{
    mail_catching("uczen1@admin.pl","1234")
    cy.url().should('eq',"http://zadania.t24.ovh/uczen")

})


    it('Sprawdzenie czy wyłapuje inne maile', ()=>{
        
        for(var i = 0;i<=10;i++){
            let adres = faker.internet.email();
            let haslo = faker.internet.password();
            mail_catching(adres,haslo)
            cy.url().should('eq',"http://zadania.t24.ovh/login")
            cy.get('.invalid-feedback').should('contain',"Te dane uwierzytelniające nie pasują do naszych rekordów.")
        }

    })


    it('Sprawdzenie czy resetuje hasło', ()=>{
        
        
            
            cy.get('.btn-link')
             .click()
            cy.url().should('eq',"http://zadania.t24.ovh/password/reset")
            cy.get('#email').type("prof1@admin.pl")
            cy.get('.btn-primary')
             .click()

            cy.get('navbar-brand').should('contain',"System Zarządzania Zadaniami")
        

   
    })
    
    function logout(){
        mail_catching("prof1@admin.pl","1234")
        cy.get('.nav-link').contains("prof1").click()
        cy.get('.dropdown-menu').contains("Logout").click()
        
        
        cy.url().should('eq',"http://zadania.t24.ovh/login")  
    }

    it('Sprawdzenie czy wylogowywanie działa ', ()=>{
        logout()


})
  /*  it('Sprawdzenie czy zapamiętuje hasło', ()=>{
        cy.get('#remember')
         .click()
        mail_catching("prof1@admin.pl","1234")
        logout()
        cy.get('#email').type("prof1@admin.pl")
        
        
        cy.url().should('eq',"http://zadania.t24.ovh/nauczyciel")
    


}) */

function subsite_checking(tytul,tytul2){

    
    cy.get('.nav-link').contains(tytul)
     .click()
    cy.get('.card-header').should('contain',tytul2)
}

it('Sprawdzenie czy podstrony się ładują', ()=>{
    mail_catching("prof1@admin.pl","1234");
    subsite_checking("Przedmiot","Przedmioty");
    subsite_checking("Klasy","Wybór szkoły");
    subsite_checking("Użytkownicy","Użytkownicy");




})
function registering(fields,select_eight){
    cy.get('#name').type(fields[0])
    cy.get('#first_name').type(fields[1])
    cy.get('#last_name').type(fields[2])
    cy.get('[value="'+fields[3]+'"]').check()
    cy.get('#email').type(fields[4])
    cy.get('#password').type(fields[5])
    cy.get('#password-confirm').type(fields[6])
    cy.get('select[name=schools]').select(fields[7])
    if(select_eight == true){
    cy.get('select[name=classes]').select(fields[8])
    }
    cy.get('.btn-primary')
     .click()
}
it('Sprawdzenie czy wszystkie pola da się zaznaczyć.', ()=>{
    cy.get('.nav-link').contains("Register").click()
    var pass = faker.internet.password()
    registering([faker.internet.userName(),faker.name.firstName(),faker.name.lastName(),Math.floor(Math.random()*1),faker.internet.email(),pass,pass,Math.floor(Math.random()*2)+1,"" ],true);
    




})
it('Sprawdzenie czy rejestracja działa.', ()=>{
    cy.get('.nav-link').contains("Register").click()
    var pass = faker.internet.password()
    registering([faker.internet.userName(),faker.name.firstName(),faker.name.lastName(),Math.floor(Math.random()*1),faker.internet.email(),pass,pass,Math.floor(Math.random()*2)+1 ],false);
    cy.get('body').should('contain',"System Zarządzania Zadaniami")




})
it('Sprawdzenie czy wyłapuje próbę rejestracji bez wymaganych pól ', ()=>{
    cy.get('.nav-link').contains("Register").click()
    var pass = ""
    var tab = []
    for(var i = 0;i<=7;i++){
        if(i!=3  && i!=7){
        var pass = faker.internet.password()
        tab = [faker.internet.userName(),faker.name.firstName(),faker.name.lastName(),Math.floor(Math.random()*1),faker.internet.email(),pass,pass,Math.floor(Math.random()*2)+1 ]
        tab[i] = " "
        registering(tab,false);
        
            cy.get('.card-header').should('contain',"Register")

        }
    }
    




})
it('Sprawdzenie czy wyłapuje próbę rejestracji z niepoprawnie powtórzonym hasłem ', ()=>{
    cy.get('.nav-link').contains("Register").click()
    var pass = ""
    var tab = []
    
    tab = [faker.internet.userName(),faker.name.firstName(),faker.name.lastName(),Math.floor(Math.random()*1),faker.internet.email(),faker.internet.password(),faker.internet.password(),Math.floor(Math.random()*2)+1 ]
    registering(tab,false);
        
    cy.get('.card-header').should('contain',"Register")

        
    })
    function mail_validation_checking(text1,mail){
        it(text1, ()=>{
        cy.get('.nav-link').contains("Register").click()
    var pass = ""
    var tab = []
    var pass = faker.internet.password()
    tab = [faker.internet.userName(),faker.name.firstName(),faker.name.lastName(),Math.floor(Math.random()*1),mail,pass,pass,Math.floor(Math.random()*2)+1 ]
    registering(tab,false);
        
    cy.get('.card-header').should('contain',"Register")
})
    }
    
    mail_validation_checking('Sprawdzenie czy wyłapuje próbę rejestracji z mailem bez małpy',"prof2.com")
    mail_validation_checking('Sprawdzenie czy wyłapuje próbę rejestracji bez końcówki maila',"prof3@")
    mail_validation_checking('Sprawdzenie czy wyłapuje próbę rejestracji z mailem bez początku',"@gmail.com")
    mail_validation_checking('Sprawdzenie czy wyłapuje próbę rejestracji z mailem bez domeny',"prof4@gmail")
    mail_validation_checking('Sprawdzenie czy wyłapuje próbę rejestracji z niepoprawnymi znakami w mailu',"prof#4@gmail.com")
    mail_validation_checking('Sprawdzenie czy wyłapuje próbę rejestracji z niepoprawnymi znakami w mailu cz. 2',"prof4@gma-il.com")
    mail_validation_checking('Sprawdzenie czy wyłapuje próbę rejestracji z niepoprawnymi znakami w mailu cz. 3',"prof..4@gmail.com")
    mail_validation_checking('Sprawdzenie czy wyłapuje próbę rejestracji z niepoprawnymi znakami w mailu cz. 4',"prof4..@gmail.com")
    mail_validation_checking('Sprawdzenie czy wyłapuje próbę rejestracji z niepoprawnymi znakami w mailu cz. 5',"prof4@gmail..com")
    function class_creation(class_number,class_letter,class_type){
         
         ret =(class_number).toString()+class_letter+"t"+class_type;
         return ret
    }
    /*it('Sprawdzenie czy można dodać klasę', ()=>{
        
        var types = ["i","l","f","p"]
        for(i =1;i<=5;i++){
            for(j =97;j<=101;j++){
        mail_catching("prof1@admin.pl","1234")
        cy.get('.nav-link').contains("Klasy").click()
        cy.get('name').type(class_creation(i, charCodeAt(j),types[Math.floor(Math.random()*4)]))
        cy.get('year_start').type(Math.floor(Math.random()*8)+2018);
        cy.get('[value=1"]').check()
        cy.get('[value='++'"]').check()


        }
    }
        
       
    
      
    
    })*/
                
          
 


})