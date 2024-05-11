beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

//BONUS TASK: add visual tests for registration form 3

    it('Check that radio button list is correct', () => {

        cy.get('input[type="radio"]').should('have.length', 4)

        cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','Never')

        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')

    })

    it('Countries and cities dropdown is correct', () => {

        cy.get('#country').children().should('have.length', 4)
        cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
        cy.get('#country').select('Estonia')
        
        cy.get('#city').children().should('have.length', 4)
        cy.get('#city').find('option').eq(2).should('have.text', 'Haapsalu')
        cy.get('#city').select('Haapsalu')
        
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

        cy.get('[name="email"]').clear().type('test_mail.ee')
        cy.get('#emailAlert').should('be.visible').and('contain', 'Invalid email address')

    })

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

    it('Only mandatory fields are filled in', () => {

        cy.get('#name').type('Sam')
        cy.get('[name="email"]').type('test@mail.ee')
        cy.get('#country').select('Estonia')
        cy.get('#city').select('Tallinn')
        cy.contains('Date of registration').next().type('2024-11-07').should('have.value', '2024-11-07')
        cy.get('input[type="checkbox"]').first().check()
        cy.get('input[type="submit"]').should('be.enabled')
        cy.get('input[type="submit"]').click()
        cy.get('h1').contains('Submission received').should('be.visible')
        })

    it('Mandatory fields are absent', () => {

        AbsentMandatoryFields('2000-11-07') 

        cy.get('input[type="submit"]').should('not.be.enabled')

    })

        it('Should submit a file', () => {

        cy.get('input[type="file"]').selectFile("C:\\Users\\annel\\Desktop\\QA\\project 4\\cypress_simple_tests\\cypress\\fixtures\\cypress_logo.png")
        cy.get('button[type="submit"]').click()
        cy.get('h1').contains('Submission received').should('be.visible')

    })

    function AbsentMandatoryFields(birthday) {
        cy.log('Fields absent')
        cy.get('input[type="radio"]').eq(2).check()
        cy.get('#birthday').type(birthday)
    }