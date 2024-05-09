beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignment 4
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{
        
        cy.get('#username').type('Something')
        cy.get('#email').type('test@email.com')
        cy.get('input[name="name"]').type('Kulla')
        cy.get('#lastName').type('Kallis')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[name="password"]').type('Testpassword6')
        cy.get('[name="confirm"]').type('password66')
    
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('not.be.enabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')

        // Change the test, so the passwords would match
        cy.get('#username').type('Something')
        cy.get('#email').type('test@email.com')
        cy.get('input[name="name"]').type('Kulla')
        cy.get('#lastName').type('Kallis')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[name="password"]').clear().type('Testpassword6')
        cy.get('[name="confirm"]').clear().type('Testpassword6')

        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('#password_error_message').should('not.be.visible')
        
    })
    
    it('User can submit form with all fields added', ()=>{
       
        cy.get('#username').type('Something')
        cy.get('#email').type('test@email.com')
        cy.get('input[name="name"]').type('Kulla')
        cy.get('#lastName').type('Kallis')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#htmlFavLanguage').type('HTML')
        cy.get('#vehicle1').type('Bike')
        cy.get('#cars').select('Opel')
        cy.get('#animal').select('Cow')
        cy.get('input[name="password"]').clear().type('Testpassword6')
        cy.get('[name="confirm"]').clear().type('Testpassword6')

        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')

    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
       
        fillInMandatoryFields('johnDoe')

        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')

    })

    it('Submit button is not enabled when some mandatory field is not present', ()=>{
       
        fillInMandatoryFields('Something')

        cy.get('#username').scrollIntoView()
        cy.get('#username').clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('not.be.enabled')
        cy.get('#input_error_message').should('be.visible')
        
    })

})

/*
Assignment 5
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100) 

    })

    it('My test for second picture', () => {
     
        cy.log('Will check logo source and size')
        cy.get('img').next().should('have.attr', 'src').should('include', 'cypress_logo')
      
        cy.get('img').next().invoke('height').should('be.lessThan', 116)
            .and('be.greaterThan', 85)   

    });

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
      
        cy.url().should('contain', '/registration_form_1.html')
        
        cy.go('back')
        cy.log('Back again in registration form 2')

    })

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
    
        cy.url().should('contain', '/registration_form_3.html')
        
        cy.go('back')
        cy.log('Back again in registration form 2')

    })

    it('Check that list of checkboxes is correct', () => {
        
        cy.get('input[class="checkbox vehicles"]').should('have.length', 3)

        cy.get('input[class="checkbox vehicles"]').next().eq(0).should('have.text','I have a bike')
        cy.get('input[class="checkbox vehicles"]').next().eq(1).should('have.text','I have a car')
        cy.get('input[class="checkbox vehicles"]').next().eq(2).should('have.text','I have a boat')

        cy.get('input[class="checkbox vehicles"]').first().check().should('be.checked')
        cy.get('input[class="checkbox vehicles"]').eq(1).should('not.be.checked')
        cy.get('input[class="checkbox vehicles"]').eq(2).should('not.be.checked')
        
        cy.get('input[class="checkbox vehicles"]').eq(1).check().should('be.checked')
        cy.get('input[class="checkbox vehicles"]').first().should('be.checked')
        cy.get('input[class="checkbox vehicles"]').eq(2).should('not.be.checked')

    })

    it('Favourite animals dropdown is correct', () => {
        
        cy.get('#animal').select(1).screenshot('animal drop-down')
        cy.screenshot('Full page screenshot')

        cy.get('#animal').find('option').should('have.length', 6)
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'cow', 'mouse'])

        })
    })


})

function fillInMandatoryFields(username) {
    cy.log('Something')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('test@test.ee')
    cy.get('[data-cy="name"]').type('Kulla')
    cy.get('#lastName').type('Kallis')
    cy.get('[data-testid="phoneNumberTestId"]').type('5556677')
    cy.get('#password').type('Testpassword6')
    cy.get('#confirm').type('Testpassword6')
    cy.get('h2').contains('Password').click()
}