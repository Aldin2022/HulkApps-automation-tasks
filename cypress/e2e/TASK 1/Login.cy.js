describe('Test Login functionality', () => {
  it('Login with valid data', () => {
    //Visiting Homepage
    cy.visit('/')

    // Entering Website password
    cy.WebsiteLogin()

    // Get Login button and click on it
    cy.get('a*[class="header__icon header__icon--account link focus-inset small-hide"]')
      .should('be.visible')
      .click()

    // Checking if the url matches url for login page
    cy.url().should('eq', 'https://qa-practical-test.myshopify.com/account/login')

    //Entering email address into Email field
    cy.get('#CustomerEmail')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Email')
      .type('aldin_abaza@hotmail.com')

    //Entering password into password field
    cy.get('#CustomerPassword')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Password')
      .type('Aldin5656')

    //Checking if the "forgot your password" button is visible
    cy.get('a*[href="#recover"]')
      .should('be.visible')
      .contains('Forgot your password?')

    //Checking if the "Create account" button is visible
    cy.get('a*[href="/account/register"]')
      .should('be.visible')
      .contains('Create account')

    //Clicking on Sign in button
    cy.get('form[id="customer_login"] button')
      .should('be.visible')
      .and('contain.text', 'Sign in')
      .click()

    /*Checking url after successful Login; 
    **IMPORTANT**
      this part could fail because in some cases captcha is activated and it is required to finish SignIn process.
    */
    cy.url().should('eq', 'https://qa-practical-test.myshopify.com/account')

    // Checking the "Account" header is visible
    cy.get('div[class="customer account"] div h1')
      .should('be.visible')
      .contains('Account')

    //Check if the log out button is visible
    cy.get('a[href="/account/logout"]')
      .should('be.visible')
      .contains('Log out')
  })
})