describe('Testing Search Functionality', () => {
  it('Testing Search using existing products', () => {

    //Visiting Homepage
    cy.visit('/')

    // Entering Website password
    cy.WebsiteLogin()

    //Clicking on the Search button
    cy.get('summary[aria-label="Search"]')
      .should('be.visible')
      .click()

    //Check if the Search field is visible and typing desired item into Search field
    cy.get('#Search-In-Modal')
      .should('be.visible')
      .type('Bloom')

    //Check if the main search suggestions container is displayed
    cy.get('#predictive-search-results')
      .should('be.visible')

    cy.get('#predictive-search-products')
      .should('be.visible')
      .contains('Products')

    //Check if all the search suggestions contain searched value, e.g. "Bloom"
    var searchItem = "Bloom"
    cy.get('#predictive-search-results-list li').each(($li) => {
      cy.wrap($li).then((value) => {
        expect(value[0].innerText).to.include(searchItem);
      })
    })

    //Check if search all products button is visible and clickable
    cy.get('button[class="predictive-search__item predictive-search__item--term link link--text h5 animate-arrow"]')
      .should('be.visible')
      .contains('Search for “' + searchItem + '”')
      .click({ force: true })

    //Check if all the search results contain searched value, e.g. "Bloom"
    cy.get('.grid.grid--4-col-desktop li').each(($li) => {
      cy.wrap($li).then((value) => {
        expect(value[0].innerText).to.include(searchItem);
      })
    })
  })
})