import t from 'tcomb';
import CustomerDetailsData, {getDefaultCustomerDetails} from "../components/customer-details/customer-details-state";
import FinancedItemState, {getDefaultFinancedItem} from "../components/financed-items/financed-item-state";

const InitialState = t.struct({
    customerDetails: t.instanceOf(CustomerDetailsData),
    financedItems: t.list(t.instanceOf(FinancedItemState))
}, 'InitialState');

export const getInitialState = () => {
    return InitialState({
        customerDetails: getDefaultCustomerDetails(),
        financedItems: [getDefaultFinancedItem(), getDefaultFinancedItem()]
    })
};

export default InitialState;