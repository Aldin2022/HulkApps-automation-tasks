describe('Testing SignUp functionality', () => {
  beforeEach(() => {
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

    //Checking if the "Create account" button is visible and clickable
    cy.get('a*[href="/account/register"]')
      .should('be.visible')
      .contains('Create account')
      .click()

    // Checking if the url matches url for SignUp page
    cy.url().should('eq', 'https://qa-practical-test.myshopify.com/account/register')

    //Checking if the header "Creating account" is visible
    cy.get('div[class="customer register"] h1')
      .should('be.visible')

    //Entering data into "First name" field
    cy.get('#RegisterForm-FirstName')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'First name')
      .type('BonJovi')

    //Entering data into "Last name" field
    cy.get('#RegisterForm-LastName')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Last name')
      .type('LucaToni')

  })

  it('Testing SignUp functionality with invalid data (used data)', () => {
    //Entering an randomly generated email address into "Email" field 
    cy.get('#RegisterForm-email')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Email')
      .type('bengaltiger@outlook.com')

    //Entering a password into "Password" field
    cy.get('#RegisterForm-password')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Password')
      .type('Emilliano')

    //Finishing the SignUp process
    cy.get('form[id="create_customer"] button')
      .should('be.visible')
      .contains('Create')
      .click()

    /* **IMPORTANT**
      this part could fail because in some cases captcha is activated and it is required to finish SignUp process.
    */
    cy.get('.form__message')
      .should('be.visible')
      .contains('Please adjust the following:')
  })

  it('Testing SignUp functionality with blank mandatory field', () => {

    //Leaving email field blank to test mandatory field validation
    //No data is entered in the Email field

    //Entering a password into "Password" field
    cy.get('#RegisterForm-password')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Password')
      .type('Emilliano')

    //Finishing the SignUp process
    cy.get('form[id="create_customer"] button')
      .should('be.visible')
      .contains('Create')
      .click()

    /* **IMPORTANT**
      this part could fail because in some cases captcha is activated and it is required to finish SignUp process.
    */
    cy.get('a[href="#RegisterForm-email"]')
      .should('be.visible')
      .contains("Email can't be blank")
  })
})