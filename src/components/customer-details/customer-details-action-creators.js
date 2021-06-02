import {UPDATE_CUSTOMER_DETAILS} from "../../store/actions";
import CustomerDetailsData from "./customer-details-state";
import {getCustomerDetailsAPI, updateCustomerDetailsAPI} from "./customer-details-api";
import {toast} from "react-toastify";

export const updateCustomerDetails = (customerDetails, name, value) => {
    const updatedCustomerDetails = CustomerDetailsData.update(customerDetails, {
        [name]: {
            $set: value
        }
    });

    return dispatch => {
        dispatch({
            type: UPDATE_CUSTOMER_DETAILS,
            payload: updatedCustomerDetails
        });
        return null;
    }
};

export const persistCustomerDetails = (customerDetails) => {
    return dispatch => {
        updateCustomerDetailsAPI(customerDetails)
            .then(() => {
                dispatch({
                    type: 'NOOP'
                });
            });
        return null;
    };
};

export const fetchCustomerDetails = () => {
    return dispatch => {
        getCustomerDetailsAPI()
            .then((response) => {

                if (response && !response.error) {
                    const customerDetails = CustomerDetailsData(response);
                    dispatch({
                        type: UPDATE_CUSTOMER_DETAILS,
                        payload: customerDetails
                    });
                } else {
                    toast(response.message);
                }
            });
        return null;
    };
};
