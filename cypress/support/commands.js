import 'cypress-file-upload';
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand({
    failureThreshold: 0.03,
    failureThresholdType: 'percent',
    customDiffConfig: { threshold: 0.1 },
    capture: 'viewport',
  });
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', () => {
    cy.get('input[placeholder="Email"]').type(Cypress.env('userName'))
    cy.get('input[placeholder="Password"]').type(Cypress.env('password'))
    cy.get('button[class="uk-button uk-button-primary"]')
      .contains("Login").should('be.visible')
      .click()
})

Cypress.Commands.add('replaceDocWith', (path) => {
    // select item
    cy.get('.list__checkall').click({force:true}) 
    // file upload for replacement 
    cy.get('.upload-select').eq(1).attachFile(path) 
    // verfy   at least 1 item available
    cy.get('a.list__item').should('have.length.at.least', 1)
})

Cypress.Commands.add('attachDoc', (path, isPrivate, snapshot) => {
    //get add asset button and attach file
    cy.get('.upload-select').eq(0).attachFile(path)
    //multiple upload or single upload
    if(Array.isArray(path)){
        //assert modal is not available
        cy.get('.modal__container').should('not.exist')
        cy.get('a.list__item').should('have.length.at.least', path.length)
    }else {
        cy.get('.modal__container').within(()=>{
            if(snapshot){
                cy.get('.assets__img > img').matchImageSnapshot(snapshot)
            }
            if(isPrivate=== 'private') {
              cy.get('a').contains('Advanced options').click()
              // get private radio button
              cy.get('.uk-margin-right').eq(1).scrollIntoView().click()
            }
            // click confirm button
            cy.get('.uk-button.uk-button-primary').click()
        });
        // after upload confirm the modal disappear
        cy.get('.modal__container').should('not.exist')
        // list should contain at least 1 record
        cy.get('a.list__item').should('have.length.at.least', 1)
    }
})

Cypress.Commands.add('removeAll', () => {
    // select all
    cy.get('.list__checkall').click({force:true})
    // click delete icon
    cy.get('.popover__link .uk-icon-trash').click({force:true})
    // verifying empty message 
    cy.get('.list__message_e').contains('No assets found')
})