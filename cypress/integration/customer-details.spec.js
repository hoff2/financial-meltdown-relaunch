/// <reference types="Cypress" />
import Chance from 'chance';

const chance = new Chance();

const verifyInputField = (selector) => {
    const expectedInputValue = chance.string();

    cy.get(selector)
        .type('{selectall}{del}')
        .type(expectedInputValue)
        .should('have.value', expectedInputValue);
};

context('Customer Details', () => {
    beforeEach(() => {
        cy.visit('/')
    });

    it('should update the first name', () => {
        verifyInputField('.first-name>input');
    });

    it('should update the last name', () => {
        verifyInputField('.last-name>input');
    });

    it('should update the street address', () => {
        verifyInputField('.street-address>input');
    });

    it('should update the city', () => {
        verifyInputField('.city>input');
    });

    it('should update the state', () => {
        verifyInputField('.state>input');
    });

    it('should update the phone', () => {
        verifyInputField('.phone>input');
    });

    it('should update the email', () => {
        verifyInputField('.email>input');
    });

    it('should retrieve last updated customer details when page refreshed', () => {
        const expectedFirstName = chance.string();
        cy.get('.first-name>input')
            .type('{selectall}{del}')
            .type(expectedFirstName).should('have.value', expectedFirstName);

        cy.get('.update-customer-details>button').click();

        cy.visit('/');

        cy.get('.first-name>input').should('have.value', expectedFirstName);
    });
});
