describe('Test Login functionality using invalid data', () => {
  it('Login with invalid data', () => {
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

    //Entering incorrect email address into Email field
    cy.get('#CustomerEmail')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Email')
      .type('mostar.sarajevo@hotmail.com')

    //Entering incorrect password into password field
    cy.get('#CustomerPassword')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Password')
      .type('12345678')

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

      /*Check if the error message is displayed due to entering invalid data
      IMPORTANT**
      this part could fail because in some cases captcha is activated and it is required to finish SignIn process.
      */
      cy.get('.form__message')
      .should('be.visible')
      .contains('Please adjust the following')

      cy.get('div[class="errors"] ul li')
      .should('be.visible')
      .contains('Incorrect email or password.')
  })
})