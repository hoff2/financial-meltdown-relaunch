/// <reference types="Cypress" />
import Chance from 'chance';

const chance = new Chance();

const updateField = (selector, updateValue) => {
    cy.get(selector)
        .first()
        .type('{selectall}{del}')
        .type(updateValue)
        .should('have.value', updateValue);
};

context('Financed Items', () => {
    beforeEach(() => {
        cy.visit('/')
    });

    it('should display persisted items w/ minimumPayment and rate when page is refreshed', () => {
        const itemNameExisting = chance.string();
        const itemNameNew = chance.string();

        cy.get('.addItem>button').click();

        updateField('.itemName>input', itemNameExisting);

        cy.get('.addItem>button').click();

        updateField('.itemName>input', itemNameNew);

        cy.get('.persist-financed-items>button').click();

        cy.visit('/');

        cy.get('.financedItem')
            .each(($li, index, $lis) => {
                expect($li.find('.minimum-payment').valueOf()).to.not.be.null;
                expect($li.find('.rate').valueOf()).to.not.be.null;
            });
    });
});
