beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{
        // Add test steps for filling in only mandatory fields
        // Type confirmation password which is different from first password
        cy.get('#username').type('Something')
        cy.get('#email').type('test@email.com')
        cy.get('input[name="name"]').type('Kulla')
        cy.get('#lastName').type('Kallis')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[name="password"]').type('Testpassword6')
        cy.get('[name="confirm"]').type('Testpassword66')
    
        // Assert that submit button is not enabled
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('not.be.enabled')


        // Assert that successful message is not visible
        cy.get('#success_message').should('not.be.visible')

        // Assert that error message is visible
        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')

        // Change the test, so the passwords would match
        cy.get('#username').type('Something')
        cy.get('#email').type('test@email.com')
        cy.get('input[name="name"]').type('Kulla')
        cy.get('#lastName').type('Kallis')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[name="password"]').clear().type('Testpassword6')
        cy.get('[name="confirm"]').clear().type('Testpassword6')

        // Add assertion, that submit button is now enabled
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')

        // Add assertion, that error message is not visible anymore
        cy.get('#password_error_message').should('not.be.visible')

        
    })
    
    it('User can submit form with all fields added', ()=>{
        // Add test steps for filling in ALL fields
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

        // Assert that submit button is enabled
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()

        // Assert that after submitting the form system show successful message
        cy.get('#success_message').should('be.visible')
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        // Add test steps for filling in ONLY mandatory fields
        inputValidData('johnDoe')

        // Assert that submit button is enabled
        // Assert that after submitting the form system shows successful message
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')

        
    })

    it('Submit button is not enabled when some mandatory field is not present', ()=>{
        // Add test steps for filling in ONLY mandatory fields
        inputValidData('Something')

        //Clear the username field
        cy.get('#username').scrollIntoView()
        cy.get('#username').clear()
        cy.get('h2').contains('Password').click()

        // Assert that submit button is enabled
        // Assert that after submitting the form system shows error message
        cy.get('.submit_button').should('not.be.enabled')
        cy.get('#input_error_message').should('be.visible')
        
    })

})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height
        // it should be less than 178 and greater than 100
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)   
    })

    it('My test for second picture', () => {
        // Create similar test for checking the second picture
        cy.log('Will check logo source and size')
        cy.get('img').next().should('have.attr', 'src').should('include', 'cypress_logo')
        // get element and check its parameter height
        // it should be less than 178 and greater than 100
        cy.get('img').next().invoke('height').should('be.lessThan', 116)
            .and('be.greaterThan', 85)   
    });

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })


    // Create similar test for checking the second link 
    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its second child, check the link content and click it
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_3.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    // Create test similar to previous one verifying checkboxes
    it('Check that list of checkboxes is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[class="checkbox vehicles"]').should('have.length', 3)

        // Verify labels of the checkboxes
        cy.get('input[class="checkbox vehicles"]').next().eq(0).should('have.text','I have a bike')
        cy.get('input[class="checkbox vehicles"]').next().eq(1).should('have.text','I have a car')
        cy.get('input[class="checkbox vehicles"]').next().eq(2).should('have.text','I have a boat')

        //Verify first checkbox as checked and assert its state
        cy.get('input[class="checkbox vehicles"]').first().check().should('be.checked')
        cy.get('input[class="checkbox vehicles"]').eq(1).should('not.be.checked')
        cy.get('input[class="checkbox vehicles"]').eq(2).should('not.be.checked')
        
        // Mark the second checkbox as checked and assert the state of the first and second checkboxes (both will stay checked)
        cy.get('input[class="checkbox vehicles"]').eq(1).check().should('be.checked')
        cy.get('input[class="checkbox vehicles"]').first().should('be.checked')
        cy.get('input[class="checkbox vehicles"]').eq(2).should('not.be.checked')
    })

    it('Car dropdown is correct', () => {
        // Here is just an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area or full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        // Check that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    // Create test similar to previous one

    it('Favourite animals dropdown is correct', () => {
        // Here is just an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area or full page
        cy.get('#animal').select(1).screenshot('animal drop-down')
        cy.screenshot('Full page screenshot')

        // Next 2 lines of code do exactly the same!
        cy.get('#animal').find('option').should('have.length', 6)
        
        // Check that first element in the dropdown has text Volvo
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'cow', 'mouse'])
        })
    })


})

function inputValidData(username) {
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