
// https://on.cypress.io/writing-first-test
/// <reference types="Cypress" />

const { functionsIn } = require("cypress/types/lodash")

describe('Central de Atendimento ao Cliente TAT',function(){
beforeEach(function() {
  cy.visit('./src/index.html')
})


    it('verifica o título da aplicação', function() {
          cy.visit('./src/index.html')
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })
 
    it('preenche os campos obrigatórios e envia o formulário',function() {
      const  longText = 'Estou testando a area de digitacao.,Estou testando a area de digitacao.,Estou testando a area de digitacao.,Estou testando a area de digitacao.,Estou testando a area de digitacao.,Estou testando a area de digitacao.Estou testando a area de digitacao.Estou testando a area de digitacao.'
      cy.get('#firstName').type('Roberta')
      cy.get('#lastName').type('Tozo')
      cy.get('#email').type('rctozo@teste.com')
      cy.get('#open-text-area').type(longText,{delay:0}) // para tesxto muito long, valei incluir delay para não perder muito tempo no teste.
      cy.get('button[type="submit"]').click()
      
      cy.get('.success').should('be.visible') 

    })

     it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',function(){
      const  longText = 'Estou testando a area de digitacao.,Estou testando a area de digitacao.,Estou testando a area de digitacao.,Estou testando a area de digitacao.,Estou testando a area de digitacao.,Estou testando a area de digitacao.Estou testando a area de digitacao.Estou testando a area de digitacao.'

      cy.get('#firstName').type('Roberta')
      cy.get('#lastName').type('Tozo')
      cy.get('#email').type('rctozoteste.com')
      cy.get('#open-text-area').type(longText,{delay:0}) // para tesxto muito long, valei incluir delay para não perder muito tempo no teste.
      cy.get('button[type="submit"]').click()
      
      cy.get('.error').should('be.visible') 


     })


     it('campo telefonme continua vazio quando preeenchido por valor não-numérico',function(){
      cy.get('#phone')
      .type('abedcf')
      .should('have.value','')

     })




     it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
      const  longText = 'Estou testando a area de digitacao.,Estou testando a area de digitacao.,Estou testando a area de digitacao.,Estou testando a area de digitacao.,Estou testando a area de digitacao.,Estou testando a area de digitacao.Estou testando a area de digitacao.Estou testando a area de digitacao.'

      cy.get('#firstName').type('Roberta')
      cy.get('#lastName').type('Tozo')
      cy.get('#email').type('rctozoteste.com')
      cy.get('#open-text-area').type(longText,{delay:0}) // para tesxto muito long, valei incluir delay para não perder muito tempo no teste.
      cy.get('#phone-checkbox').check()
      cy.contains('button','Enviar').click()
      
      cy.get('.error').should('be.visible') 

     })

     it('preenche e limpa os campos nome, sobrenome, email e telefone',function(){

      cy.get('#firstName').type('Roberta').should('have.value','Roberta').clear().should('have.value','')
      cy.get('#lastName').type('Tozo').should('have.value','Tozo').clear().should('have.value','')
      cy.get('#email').type('rctozoteste.com').clear().should('have.value','')
      cy.get('#phone-checkbox').click()
      cy.get('#phone').type('51998888871').clear().should('have.value','')
     })

     it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.',function() {
      cy.contains('button','Enviar').click()
      cy.get('.error').should('be.visible') 

     })

     it('envia o formuário com sucesso usando um comando customizado',function(){
      cy.fillMandatoryFieldsAndSubmit()
      cy.get('.success').should('be.visible') 
     })


     it('seleciona um produto (YouTube) por seu texto',function(){
      cy.get('#product')
      .select('youtube')
      .should('have.value','youtube')
      
    })

      it('seleciona um produto (Mentoria) por seu valor (value)',function(){
       cy.get('#product')
        .select('mentoria')
        .should('have.value','mentoria') 
      })

      it('seleciona um produto (Blog) por seu índice',function(){
        cy.get('#product')
          .select(1)
          .should('have.value','blog') 
       })


       it('marca o tipo de atendimento "Feedback"',function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()    //usar check para radio
        .should('have.value','feedback')

       })


       ///parei no  Exercício extra da aula 4 - assiste aula vide 24 .

       it('marca cada tipo de atendimento',function(){
        cy.get('input[type="radio"]')                 /// aqui retorna mais que um elemento
          .should('have.length',3)                // conta quantos tem 
          .each(function($radio){                     ///passa por cada um dos elementos
              cy.wrap($radio).check()                 //funcão recebe cada um dos elementos marca cada um deles e verifica se foi marcado.
              cy.wrap($radio).should('be.checked')
          })
       })

       it('marca ambos checkboxes, depois desmarca o último',function(){
        cy.get('input[type="checkbox"]')    ///pega todos inputs
          .check()                          //marca mais de um
          .should('be.checked')
          .last()                           //dos elementos que reornou ele pega o ultimo
          .uncheck()                        //desmarca o ultimo
          .should('not.be.checked')         // verifica que foi desmarcado o ultimo

       })

       

       it('seleciona um arquivo da pasta fixtures',function(){
          cy.get('input[type="file"]')
            .should('not.be.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
       })

       it.only('seleciona um arquivo via arrasto drag and drop',function(){
        cy.get('input[type="file"]')
          .should('not.be.value')
          .selectFile('cypress/fixtures/example.json',{action: 'drag-drop'})
          .should(function($input){
              expect($input[0].files[0].name).to.equal('example.json')
          })
     })


      })