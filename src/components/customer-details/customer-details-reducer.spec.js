import CustomerDetailsData from "./customer-details-state";
import customerDetailsReducer from "./customer-details-reducer";
import Chance from 'chance';
import {UPDATE_CUSTOMER_DETAILS, UPDATE_LAST_NAME} from "../../store/actions";

const chance = new Chance();

const initialState = CustomerDetailsData({
    firstName: chance.string(),
    lastName: chance.string(),
    streetAddress: chance.string(),
    city: chance.string(),
    state: chance.string(),
    phone: chance.string(),
    email: chance.string()
});

describe("CustomerDetailsReducer", () => {
    describe("updateCustomerDetails", () => {
        test("should update a specified property with a specified value", () => {
            const updatedLastName = chance.string();
            const expectedUpdatedState = CustomerDetailsData.update(initialState, {
                lastName: {
                    $set: updatedLastName
                }
            });
            const action = {
                type: UPDATE_CUSTOMER_DETAILS,
                payload: expectedUpdatedState
            };

            const reducerResult = customerDetailsReducer(initialState, action);

            expect(reducerResult).toEqual(expectedUpdatedState);
        });
    })
});