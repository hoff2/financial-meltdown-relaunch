import {getFinancedItemsAPI, postFinancedItemAPI} from "./financed-items-api";
import {ADD_FINANCED_ITEM, UPDATE_FINANCED_ITEM, UPDATE_FINANCED_ITEMS} from "../../store/actions";
import FinancedItemState from "./financed-item-state";

export const addFinancedItem = () => {
    return dispatch => {
        dispatch({
            type: ADD_FINANCED_ITEM
        });
        return null;
    }
};

export const updateFinancedItems = (itemIndex, financedItem, name, value) => {
    const updatedFinancedItem = FinancedItemState.update(financedItem, {
        [name]: {
            $set: value
        }
    });

    return dispatch => {
        dispatch({
            type: UPDATE_FINANCED_ITEM,
            payload: {
                itemIndex: itemIndex,
                updatedFinancedItem: updatedFinancedItem
            }
        });
        return null;
    }
};
export const persistFinancedItems = (financedItems) => {
    return dispatch => {
        financedItems.forEach((financedItem, index) => {
            postFinancedItemAPI(financedItem).then((response) => {
                dispatch({
                    type: UPDATE_FINANCED_ITEM,
                    payload: {
                        itemIndex: index,
                        updatedFinancedItem: response
                    }
                })
            });
        });
        return null;
    }
};

export const fetchFinancedItems = () => {
    return dispatch => {
        getFinancedItemsAPI().then((response) => {
            dispatch({
                type: UPDATE_FINANCED_ITEMS,
                payload: response
            });
        });
        return null;
    }
};