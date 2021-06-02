import * as sinon from "sinon";
import {
    fetchCustomerDetails,
    persistCustomerDetails,
    updateCustomerDetails
} from "./customer-details-action-creators";
import Chance from 'chance';
import {UPDATE_CUSTOMER_DETAILS} from "../../store/actions";
import CustomerDetailsData from "./customer-details-state";
import * as CustomerDetailsAPI from "./customer-details-api";
import * as toast from "react-toastify";

const chance = new Chance();

const initialCustomerDetails = CustomerDetailsData({
    firstName: chance.string(),
    lastName: chance.string(),
    streetAddress: chance.string(),
    city: chance.string(),
    state: chance.string(),
    phone: chance.string(),
    email: chance.string()
});

describe("UpdateCustomerDetails", () => {
    let dispatchSpy,
        apiPostStub,
        apiGetStub,
        toastStub;

    beforeEach(() => {
        dispatchSpy = sinon.spy();
        apiPostStub = sinon.stub(CustomerDetailsAPI, 'updateCustomerDetailsAPI');
        apiGetStub = sinon.stub(CustomerDetailsAPI, 'getCustomerDetailsAPI');
        toastStub = sinon.stub(toast, 'toast');
    });

    afterEach(() => {
        apiPostStub.restore();
        apiGetStub.restore();
        toastStub.restore();
    });

    describe("updateCustomerDetails", () => {
        test("should update customer details property with value", () => {
            const expectedCustomerDetails = CustomerDetailsData.update(initialCustomerDetails, {
               firstName: {
                   $set: chance.string()
               }
            });

            const expectedEvent = {
                type: UPDATE_CUSTOMER_DETAILS,
                payload: expectedCustomerDetails
            };

            updateCustomerDetails(initialCustomerDetails, "firstName", expectedCustomerDetails.firstName)(dispatchSpy);

            expect(dispatchSpy.calledWithExactly(expectedEvent)).toEqual(true);
        });
    });

    describe("persistCustomerDetails", () => {
        test("should call the update customer details api with current details", () => {
            apiPostStub.returns(Promise.resolve({}));

            persistCustomerDetails({})(dispatchSpy);

            expect(apiPostStub.calledWith({})).toEqual(true);
        });
    });

    describe("fetchCustomerDetails", () => {
        test("should call get customer details api and store result", async () => {
            apiGetStub.returns(Promise.resolve(initialCustomerDetails));

            const expectedDispatch = {
                type: UPDATE_CUSTOMER_DETAILS,
                payload: initialCustomerDetails
            };

            await fetchCustomerDetails()(dispatchSpy);

            expect(apiGetStub.calledWith()).toEqual(true);
            expect(dispatchSpy.calledWithExactly(expectedDispatch)).toEqual(true);
        });

        test("should display toast message when api call fails", async () => {
            const error = {
                error: true,
                message: chance.string()
            };

            apiGetStub.returns(Promise.resolve(error));

            await fetchCustomerDetails()(dispatchSpy);

            expect(dispatchSpy.callCount).toEqual(0);
            expect(toastStub.calledWithExactly(error.message)).toBe(true);
        });
    });
});