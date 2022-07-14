describe('Asset Registration and Replace Option Tests', () => {
  beforeEach(()=>{
    cy.visit('/')
    cy.login()
    cy.get('a[href="#!/me/spaces/165742/dashboard"]').contains("Your first space").click()
    cy.get('a[href="#!/me/spaces/165742/assets"]').contains("Assets").click()
  })
  it('multiple file upload and delete test', () => {
    const path = ["animal.jpg","banner2.jpg","csvFiles.csv","DataStructure.png","QualityAssurance.pdf"]
    cy.attachDoc(path);
   //remove all associated assets
    cy.removeAll();
  })
  it('Verifying Replace functionality', () => {
    const path = 'animal.jpg'
    cy.attachDoc(path);
    const path2 = 'banner2.jpg'
    cy.replaceDocWith(path2);
  })
  it('verify public and private attachment view', () => {
    const path = 'animal.jpg'
    cy.attachDoc(path);
    // clicking on 1st record
    cy.get('a.list__item').eq(0).click({force:true})
    cy.get('.modal__container').within(()=>{
      // image available
      cy.get('#js-modal-image').should('exist')
      // empty image icon not available
      cy.get('svg use').should('not.exist')
      // making the attachment private
      cy.get('.uk-margin-right').eq(1).scrollIntoView().click()
      // image not available
      cy.get('#js-modal-image').should('not.exist')
      // empty image icon available
      cy.get('svg use').should('exist')
    });
  })
  it('Verifying the private filter', () => {
    const path = 'animal.jpg'
    // uploading public attachment
    cy.attachDoc(path);
    const path2 = 'banner2.jpg'
    // uploading private attachment
    cy.attachDoc(path2, 'private');
    // Applying the private filter
    cy.get('label input').check()
    // verifying record showing only private attachment
    cy.get('.list__item-name').should('contain', 'banner2')
    // Removing the private filter
    cy.get('label input').uncheck()
    //remove all record
    cy.removeAll();
  })
  it('Verifying private image attachment preview', () => {
    const path2 = 'banner2.jpg'
    // uploading private attachment
    cy.attachDoc(path2, 'private', 'withSnapshot');
   // clicking on 1st record
    cy.get('a.list__item').eq(0).click({force:true})
    cy.get('.modal__container').within(()=>{
    // clicking on public button
    cy.get('.uk-margin-right').eq(0).scrollIntoView().click()
    // compare base image with image on test run
    cy.get('.assets__img > img').matchImageSnapshot('withSnapshot')
  });
  })
})