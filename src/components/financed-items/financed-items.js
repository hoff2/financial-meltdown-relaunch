import React from 'react';
import FinancedItem from "./financed-item";
import FinancedItemState from "./financed-item-state";
import PropTypes from 'prop-types';
import './financed-items.css';

const FinancedItems = (props) => {

    return (
    <fieldset className='financed-items'>
        <h2>{'Financed Items'}</h2>
        <div className='column'>
            {props.financedItems.map((value, index) => {
                return <FinancedItem
                    financedItem={value}
                    itemIndex={index}
                    key={index}
                    updateFinancedItems={props.updateFinancedItems}/>
            })}
        </div>
        <div className='row'>
            <div className='addItem'>
                <button onClick={props.addFinancedItem}>{'Add Item'}</button>
            </div>
            <div className='persist-financed-items'>
                <button onClick={() => props.persistFinancedItems(props.financedItems)}>{'Save'}</button>
            </div>
        </div>
    </fieldset>
)};

FinancedItems.propTypes = {
    addFinancedItem: PropTypes.func,
    financedItems: PropTypes.arrayOf(PropTypes.instanceOf(FinancedItemState)),
    persistFinancedItems: PropTypes.func,
    updateFinancedItems: PropTypes.func
};

export default FinancedItems;