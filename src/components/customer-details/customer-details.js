import React from 'react';
import PropTypes from 'prop-types';
import CustomerDetailsData from "./customer-details-state";
import './customer-details.css';

const CustomerDetails = (props) => {

    const persistHandler = () => {
        props.persistCustomerDetails(props.customerDetails);
    };

    const updateHandler = (event) => {
        props.updateCustomerDetails(
            props.customerDetails,
            event.target.name,
            event.target.value
        )
    };

    return (
        <fieldset className='customer-details'>
            <h2>{'Customer Details'}</h2>

            <div className='row'>
                <div className='first-name'>
                    <label htmlFor="firstName">{'First Name'}</label>
                    <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        value={props.customerDetails.firstName}
                        onChange={(event) => updateHandler(event)} />
                </div>

                <div className='last-name'>
                    <label htmlFor="lastName">{'Last Name'}</label>
                    <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        value={props.customerDetails.lastName}
                        onChange={(event) => updateHandler(event)} />
                </div>
            </div>

            <div className='row'>
                <div className='street-address'>
                    <label htmlFor="streetAddress">{'Street Address'}</label>
                    <input
                        id="streetAddress"
                        type="text"
                        name="streetAddress"
                        value={props.customerDetails.streetAddress}
                        onChange={(event) => updateHandler(event)} />
                </div>
            </div>

            <div className='row'>
                <div className='city'>
                    <label htmlFor="city">{'City'}</label>
                    <input
                        id="city"
                        type="text"
                        name="city"
                        value={props.customerDetails.city}
                        onChange={(event) => updateHandler(event)} />
                </div>

                <div className='state'>
                    <label htmlFor="state">{'State'}</label>
                    <input
                        id="state"
                        type="text"
                        name="state"
                        value={props.customerDetails.state}
                        onChange={(event) => updateHandler(event)} />
                </div>
            </div>

            <div className='row'>
                <div className='phone'>
                    <label htmlFor="phone">{'Phone'}</label>
                    <input
                        id="phone"
                        type="text"
                        name="phone"
                        value={props.customerDetails.phone}
                        onChange={(event) => updateHandler(event)} />
                </div>
            </div>

            <div className='row'>
                <div className='email'>
                    <label htmlFor="email">{'Email'}</label>
                    <input
                        id="email"
                        type="text"
                        name="email"
                        value={props.customerDetails.email}
                        onChange={(event) => updateHandler(event)} />
                </div>
                <div className='update-customer-details'>
                    <button onClick={() => persistHandler()}>{'Update'}</button>
                </div>
            </div>
        </fieldset>
)};

CustomerDetails.propTypes = {
    customerDetails: PropTypes.instanceOf(CustomerDetailsData),
    persistCustomerDetails: PropTypes.func,
    updateCustomerDetails: PropTypes.func
};

export default CustomerDetails;