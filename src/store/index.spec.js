import {reducers} from "./reducers";

describe("combineReducers", () => {
    test("should have a reducer for updating customer details", () => {
        expect(reducers.hasOwnProperty('customerDetails')).toEqual(true);
    });

    test("should have a reducer for updating financed items", () => {
        expect(reducers.hasOwnProperty('financedItems')).toEqual(true);
    });
});