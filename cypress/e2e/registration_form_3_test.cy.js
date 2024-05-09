beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
BONUS TASK: add visual tests for registration form 3
Task list:
 */
    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','Never')

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

    it('Countries and cities dropdown is correct', () => {
    /* dropdown and dependencies between 2 dropdowns:
        * list of cities changes depending on the choice of country */
        cy.get('#country').children().should('have.length', 4)
        cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
        cy.get('#country').select('Estonia')
        
        cy.get('#city').children().should('have.length', 4)
        cy.get('#city').find('option').eq(2).should('have.text', 'Haapsalu')
        cy.get('#city').select('Haapsalu')
        
        // if city is already chosen and country is updated, then city choice should be removed
        cy.get('#country').children().should('have.length', 4)
        cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
        cy.get('#country').select('Spain')

        cy.get('#city').children().should('have.length', 5)
        cy.get('#city').find('option').eq(2).should('have.text', 'Madrid')
        cy.get('#city').select('Madrid')

    })

    
    it('Email input should support correct pattern', () => {
        
        cy.get('[name="email"]').type('testmail.ee')
        cy.get('#emailAlert').should('be.visible').and('contain', 'Invalid email address')

        cy.get('[name="email"]').clear().type('testmail2')
        cy.get('#emailAlert').should('be.visible').and('contain', 'Invalid email address')

        cy.get('[name="email"]').type('test@mail')
        cy.get('#emailAlert').should('be.visible').and('contain', 'Invalid email address')

    })


// BONUS TASK: add functional tests for registration form 3
//Task list:
// Create second test suite for functional tests
// Create tests to verify logic of the page:
    // all fields are filled in + corresponding assertions

    it('All fields are filled in', () => {
    cy.get('#name').type('Sam')
    cy.get('[name="email"]').type('test@mail.ee')
    cy.get('#country').select('Estonia')
    cy.get('#city').select('Tallinn')
    cy.contains('Date of registration').next().type('2024-11-07').should('have.value', '2024-11-07')
    cy.get('input[type="radio"]').eq(2).check()
    cy.get('#birthday').type('2000-11-07')
    cy.get('input[type="checkbox"]').first().check().next().check()
        cy.get('input[type="submit"]').should('be.enabled')
        cy.get('input[type="submit"]').click()
        cy.get('h1').contains('Submission received').should('be.visible')

    })

    // only mandatory fields are filled in + corresponding assertions

    it.only('Only mandatory fields are filled in', () => {
        cy.get('#name').type('Sam')
        cy.get('[name="email"]').type('test@mail.ee')
        cy.get('#country').select('Estonia')
        cy.get('#city').select('Tallinn')
        cy.contains('Date of registration').next().type('2024-11-07').should('have.value', '2024-11-07')
        cy.get('input[type="checkbox"]').first().check()
            cy.get('input[type="submit"]').should('be.enabled')
            cy.get('input[type="submit"]').click()
            cy.get('h1').contains('Submission received').should('be.visible')

    // mandatory fields are absent + corresponding assertions (try using function)

    
    // add file functionlity(google yourself for solution!) */
})