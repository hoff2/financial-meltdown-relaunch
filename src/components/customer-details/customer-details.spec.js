import React from 'react';
import {shallow} from 'enzyme';
import CustomerDetails from "./customer-details";
import Chance from 'chance';
import CustomerDetailsData from "./customer-details-state";
import * as sinon from "sinon";

const chance = new Chance();

describe("CustomerDetails", () => {
    let customerDetails;

    const persistCustomerDetailsAC = sinon.spy();
    const updateCustomerDetailsAC = sinon.spy();

    const properties = {
        customerDetails: CustomerDetailsData({
            firstName: chance.string(),
            lastName: chance.string(),
            streetAddress: chance.string(),
            city: chance.string(),
            state: chance.string(),
            phone: chance.string(),
            email: chance.string()
        }),
        persistCustomerDetails: persistCustomerDetailsAC,
        updateCustomerDetails: updateCustomerDetailsAC
    };

    beforeEach(() => {
        customerDetails = shallow(<CustomerDetails {...properties} />);
    });

    describe("update button", () => {
        test("should have an update-customer-details button", () => {
            const updateButton = customerDetails.find(".update-customer-details");

            expect(updateButton.length).toEqual(1);
        });

        test("should call persist customer details action creator when button is clicked", () => {
            const updateButton = customerDetails.find(".update-customer-details>button");

            updateButton.simulate("click");

            expect(persistCustomerDetailsAC.calledWithExactly(properties.customerDetails)).toEqual(true);
        });
    });

    describe("First Name", () => {
        test("should have a first name", () => {
            const firstName = customerDetails.find(".first-name");

            expect(firstName.length).toEqual(1);
            expect(firstName.text()).toContain("First Name");
        });

        describe("input", () => {
            let firstNameInput;

            beforeEach(() => {
                firstNameInput = customerDetails.find(".first-name>input");
            });

            test("should set first name to value from props", () => {
                expect(firstNameInput.prop('value')).toEqual(properties.customerDetails.firstName);
            });

            test("should call update customer details when first name is changed", () => {
                const fieldName = "firstName";
                const updatedFirstName = chance.string();

                firstNameInput.simulate('change', {target: {name: fieldName, value: updatedFirstName}});

                expect(updateCustomerDetailsAC.calledWithExactly(properties.customerDetails, fieldName, updatedFirstName)).toBe(true);
            });
        });
    });

    describe("Last Name", () => {
        test("should have a last name", () => {
            const lastName = customerDetails.find(".last-name");

            expect(lastName.length).toEqual(1);
            expect(lastName.text()).toContain("Last Name");
        });

        describe("input", () => {
            let lastNameInput;

            beforeEach(() => {
                lastNameInput = customerDetails.find(".last-name>input");
            });

            test("should set last name to value from props", () => {

                expect(lastNameInput.prop('value')).toEqual(properties.customerDetails.lastName);
            });

            test("should update customer details when last name is changed", () => {
                const fieldName = "lastName";
                const updatedLastName = chance.string();

                lastNameInput.simulate('change', {target: {name: fieldName, value: updatedLastName}});

                expect(updateCustomerDetailsAC.calledWithExactly(properties.customerDetails, fieldName, updatedLastName)).toBe(true);
            });
        });
    });

    describe("Street Address", () => {
        test("should have a street address", () => {
            const lastName = customerDetails.find(".street-address");

            expect(lastName.length).toEqual(1);
            expect(lastName.text()).toContain("Street Address");
        });

        describe("input", () => {
            let streetAddressInput;

            beforeEach(() => {
                streetAddressInput = customerDetails.find(".street-address>input");
            });

            test("should set street address to value from props", () => {

                expect(streetAddressInput.prop('value')).toEqual(properties.customerDetails.streetAddress);
            });

            test("should update customer details when street address is changed", () => {
                const fieldName = "streetAddress";
                const updatedStreetAddress = chance.string();

                streetAddressInput.simulate('change', {target: {name: fieldName, value: updatedStreetAddress}});

                expect(updateCustomerDetailsAC.calledWithExactly(properties.customerDetails, fieldName, updatedStreetAddress)).toBe(true);
            });
        });
    });

    describe("City", () => {
        test("should have a city", () => {
            const lastName = customerDetails.find(".city");

            expect(lastName.length).toEqual(1);
            expect(lastName.text()).toContain("City");
        });

        describe("input", () => {
            let cityInput;

            beforeEach(() => {
                cityInput = customerDetails.find(".city>input");
            });

            test("should set city to value from props", () => {

                expect(cityInput.prop('value')).toEqual(properties.customerDetails.city);
            });

            test("should update customer details when city is changed", () => {
                const fieldName = "city";
                const updatedCity = chance.string();

                cityInput.simulate('change', {target: {name: fieldName, value: updatedCity}});

                expect(updateCustomerDetailsAC.calledWithExactly(properties.customerDetails, fieldName, updatedCity)).toBe(true);
            });
        });
    });

    describe("State", () => {
        test("should have a state", () => {
            const lastName = customerDetails.find(".state");

            expect(lastName.length).toEqual(1);
            expect(lastName.text()).toContain("State");
        });

        describe("input", () => {
            let stateInput;

            beforeEach(() => {
                stateInput = customerDetails.find(".state>input");
            });

            test("should set state to value from props", () => {

                expect(stateInput.prop('value')).toEqual(properties.customerDetails.state);
            });

            test("should update customer details when state is changed", () => {
                const fieldName = "state";
                const updateState = chance.string();

                stateInput.simulate('change', {target: {name: fieldName, value: updateState}});

                expect(updateCustomerDetailsAC.calledWithExactly(properties.customerDetails, fieldName, updateState)).toBe(true);
            });
        });
    });

    describe("Phone", () => {
        test("should have a phone", () => {
            const lastName = customerDetails.find(".phone");

            expect(lastName.length).toEqual(1);
            expect(lastName.text()).toContain("Phone");
        });

        describe("input", () => {
            let phoneInput;

            beforeEach(() => {
                phoneInput = customerDetails.find(".phone>input");
            });

            test("should set phone to value from props", () => {

                expect(phoneInput.prop('value')).toEqual(properties.customerDetails.phone);
            });

            test("should update customer details when phone is changed", () => {
                const fieldName = "phone";
                const updatedPhone = chance.string();

                phoneInput.simulate('change', {target: {name: fieldName, value: updatedPhone}});

                expect(updateCustomerDetailsAC.calledWithExactly(properties.customerDetails, fieldName, updatedPhone)).toBe(true);
            });
        });
    });

    describe("Email", () => {
        test("should have a email", () => {
            const lastName = customerDetails.find(".email");

            expect(lastName.length).toEqual(1);
            expect(lastName.text()).toContain("Email");
        });

        describe("input", () => {
            let emailInput;

            beforeEach(() => {
                emailInput = customerDetails.find(".email>input");
            });

            test("should set email to value from props", () => {

                expect(emailInput.prop('value')).toEqual(properties.customerDetails.email);
            });

            test("should update customer details when email is changed", () => {
                const fieldName = "email";
                const updatedEmail = chance.string();

                emailInput.simulate('change', {target: {name: fieldName, value: updatedEmail}});

                expect(updateCustomerDetailsAC.calledWithExactly(properties.customerDetails, fieldName, updatedEmail)).toBe(true);
            });
        });
    });
});
