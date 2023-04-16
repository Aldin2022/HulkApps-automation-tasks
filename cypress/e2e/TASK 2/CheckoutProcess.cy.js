describe('Testing Checkout Process', () => {
  it(' Testing the whole checkout process, add to cart,  increase quantity.', () => {
    //Visiting Homepage
    cy.visit('/')

    // Entering Website password
    cy.WebsiteLogin()

    //Click on Catalog
    cy.get('a[href="/collections/all"] span')
      .should('be.visible')
      .contains('Catalog')
      .click()
    cy.url().should('eq', 'https://qa-practical-test.myshopify.com/collections/all')

    //Select the Product, and store selected product name for test purposes
    var selectedProduct = ''
    cy.get('a[href="/products/14k-bloom-earrings"]')
      .click().then(($el) => {
        cy.wrap($el).then((value) => {
          selectedProduct = value[0].innerText;

          //Adding the product to the cart
          cy.get('button[name="add"] span')
            .should('be.visible')
            .contains('Add to cart')
            .click()

          //Navigating to the cart
          cy.get('#cart-notification-button')
            .should('be.visible')
            .contains('View my cart')
            .click()
          cy.url().should('eq', 'https://qa-practical-test.myshopify.com/cart')

          //Check if the added product is in the cart
          cy.get('.cart-item__name.h4.break')
            .should('be.visible')
            .and('include.text', selectedProduct.trim())
        })
      });

    //Increased number of products, for 4. products 
    let initialCounterValue;

    cy.get('button[name="plus"]')
      .should('be.visible')
      .then(($button) => {
        // Get the initial value of the counter before updating the quantity
        initialCounterValue = parseInt($button.siblings('.quantity__input').val());
      });

    for (let i = 0; i < 4; i++) {
      cy.get('button[name="plus"]').click();
    }

    cy.get('button[name="plus"]')
      .should('be.visible')
      .siblings('.quantity__input')
      .should(($input) => {
        // Assert that the quantity has been updated correctly
        expect(parseInt($input.val())).to.equal(initialCounterValue + 4);
      });

    //Opening the Check out window
    cy.get('#checkout')
      .should('be.visible')
      .contains('Check out')
      .click()
    cy.url().should('include', 'https://qa-practical-test.myshopify.com/checkouts').should('include', '/information')

    //Checking if the selected product displayed in the Check out window
    cy.get('p._1x52f9s1')
      .should('be.visible')
      .contains('14k Bloom Earrings')

    // Filling Out the customer's information form (only non-optional fields)
    const emailShipping = 'bosnianlilium@outlook.com'
    const lastName = 'Abaza'
    const address = 'Augusta Shenoe'
    const postalCode = '88304'
    const city = 'Sarajevo'

    cy.get('#email')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Email or mobile phone number')
      .type(emailShipping)

    cy.get('#TextField1')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Last name')
      .type(lastName)

    cy.get('#TextField6')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Address')
      .type(address)

    cy.get('#TextField7')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Postal code')
      .type(postalCode)

    cy.get('#TextField8')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'City')
      .type(city)

    cy.get('label[for="save_shipping_information"]')
      .should('be.visible')
      .contains('Save this information for next time')
      .click()

    //Navigating to the shipping section
    cy.get('button.QT4by.rqC98.hodFu.VDIfJ.j6D1f.janiy')
      .should('be.visible')
      .should('contain', 'Continue to shipping')
      .click()
    cy.url().should('include', '/checkouts/').should('include', '/shipping')

    //Checking if the correct data is in the shipping form and checking Shipping methods
    cy.get('div.nkp8r')
      .should('contain', emailShipping)

    cy.get('address[class="_19gi7yt0 _19gi7ytf _1fragem1i"]')
      .should('contain', address, postalCode, city, 'Bosnia & Herzegovina')

    cy.get('div.hEGyz')
      .should('be.visible')
      .and('contain.text', 'USPS Priority Mail International')
      .and('contain.text', '6 to 10 business days')

    cy.get('div.B4zH6')
      .should('be.visible')
      .and('contain.text', 'USPS Priority Mail International')
      .and('contain.text', '3 to 5 business days')

    cy.get('.hEGyz')
      .should('be.visible')
      .and('contain.text', 'DHL Express Worldwide')
      .and('contain.text', '2 to 5 business days')
      .find('input[type="radio"]')
      .click({ multiple: true });

    //Navigating to the payment section
    cy.get('button[class="QT4by rqC98 hodFu VDIfJ j6D1f janiy"]')
      .should('be.visible')
      .and('contain', 'Continue to payment')
      .click()
    cy.url().should('include', '/checkouts/').should('include', '/payment')

    //Checking if the correct data is in the payment form 
    cy.get('bdo[class="_19gi7yt0 _19gi7ytf _1fragem1i"]')
      .should('contain', emailShipping)

    cy.get('address[class="_19gi7yt0 _19gi7ytf _1fragem1i"]')
      .should('contain', address, postalCode, city, 'Bosnia & Herzegovina')

    //Check if the message for unacceptable payments is displayed
    cy.get('p._1x52f9s1._1fragema3._1x52f9sm._1fragem1i._1fragema6')
      .should('be.visible')
      .and('contain', 'This store can’t accept payments right now.')
  })
})