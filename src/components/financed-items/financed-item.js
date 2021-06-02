import React from "react";
import PropTypes from 'prop-types';
import FinancedItemState from "./financed-item-state";
import './financed-items.css';

const FinancedItem = (props) => {

    const updateHandler = (event) => {
        if (event.target.name === 'price') {
            props.updateFinancedItems(
                props.itemIndex,
                props.financedItem,
                event.target.name,
                parseFloat(event.target.value ? event.target.value : 0.0))
        } else {
            props.updateFinancedItems(
                props.itemIndex,
                props.financedItem,
                event.target.name,
                event.target.value)
        }
    };

    const price = props.financedItem.price;


    const itemNameId = "itemName-" + props.itemIndex;
    const priceId = "price-" + props.itemIndex;

    return (
        <fieldset className='financedItem column'>
            <div className='row'>
                <div className='itemName'>
                    <label htmlFor={itemNameId}>{'Item Name'}</label>
                    <input
                        id={itemNameId}
                        type="text"
                        name="itemName"
                        value={props.financedItem.itemName}
                        onChange={(event) => updateHandler(event)} />
                </div>

                <div className='price'>
                    <label htmlFor={priceId}>{'Price'}</label>
                    <input
                        id={priceId}
                        type="number"
                        step="0.01"
                        name="price"
                        value={!price ? '' : price}
                        onChange={(event) => updateHandler(event)} />
                </div>
            </div>

            <div className='row'>
                <div className='minimum-payment'>
                    <span>{'Minimum Payment'}</span>
                    <span className='value'>
                        {props.financedItem.minimumPayment}
                    </span>
                </div>
            </div>

            <div className='row'>
                <div className='rate'>
                    <span>{'Rate'}</span>
                    <span className='value'>
                        {props.financedItem.rate}
                    </span>
                </div>
            </div>
        </fieldset>
    )
};

FinancedItem.propTypes = {
    financedItem: PropTypes.instanceOf(FinancedItemState),
    itemIndex: PropTypes.number,
    updateFinancedItems: PropTypes.func
};

export default FinancedItem;