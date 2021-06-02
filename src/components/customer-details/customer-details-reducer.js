import {getDefaultCustomerDetails} from "./customer-details-state";
import {UPDATE_CUSTOMER_DETAILS} from "../../store/actions";

const updateCustomerDetails = (state, action) => {
    return action.payload;
};

const customerDetailsReducer = (state = getDefaultCustomerDetails(), action) => {
    const reducers = {
        [UPDATE_CUSTOMER_DETAILS]: updateCustomerDetails
    };

    const reducer = reducers[action.type];

    return reducer ? reducer(state, action): state;
};

export default customerDetailsReducer;