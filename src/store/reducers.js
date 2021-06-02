import { combineReducers } from 'redux'
import customerDetailsReducer from "../components/customer-details/customer-details-reducer";
import financedItemsReducer from "../components/financed-items/financed-items-reducer";

export const reducers = {
    customerDetails: customerDetailsReducer,
    financedItems: financedItemsReducer
};

export default combineReducers(reducers);