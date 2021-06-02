import {getDefaultFinancedItem} from "./financed-item-state";
import {ADD_FINANCED_ITEM, UPDATE_FINANCED_ITEM, UPDATE_FINANCED_ITEMS} from "../../store/actions";
import FinancedItemState from "./financed-item-state";

const addFinancedItem = (state) => {
    const updatedFinancedItems = state.slice();

    const newFinancedItem = FinancedItemState({
        itemName: "",
        price: 0.00
    });

    updatedFinancedItems.push(newFinancedItem);

    return updatedFinancedItems;
};

const updateFinancedItem = (state, action) => {
    const updatedFinancedItems = state.slice();
    const itemIndex = action.payload.itemIndex;
    const updatedItem = action.payload.updatedFinancedItem;

    updatedFinancedItems[itemIndex] = updatedItem;

    return updatedFinancedItems;
};

const updateFinancedItems = (state, action) => {
    return action.payload;
};

const financedItemsReducer = (state = [getDefaultFinancedItem()], action) => {
    const reducers = {
        [ADD_FINANCED_ITEM]: addFinancedItem,
        [UPDATE_FINANCED_ITEM]: updateFinancedItem,
        [UPDATE_FINANCED_ITEMS]: updateFinancedItems
    };

    const reducer = action ? reducers[action.type] : null;

    return reducer ? reducer(state, action) : state;
};

export default financedItemsReducer;