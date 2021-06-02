import t from 'tcomb';

const FinancedItemState = t.struct({
    id: t.maybe(t.String),
    itemName: t.String,
    price: t.Number,
    minimumPayment: t.maybe(t.Number),
    rate: t.maybe(t.Number)
}, "FinancedItemState");

export const getDefaultFinancedItem = () => {
    return FinancedItemState({
        id: null,
        itemName: '',
        price: 0.00,
        minimumPayment: null,
        rate: null
    })
};

export default FinancedItemState;