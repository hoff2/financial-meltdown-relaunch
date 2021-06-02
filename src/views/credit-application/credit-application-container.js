import React from 'react';
import CustomerDetails from "../../components/customer-details/customer-details";
import FinancedItems from "../../components/financed-items/financed-items";
import PropTypes from 'prop-types';
import {ToastContainer} from "react-toastify";
import '../../styles/toast.css';

class CreditApplicationContainer extends React.Component {
    componentDidMount() {
        this.props.fetchCustomerDetails();
        this.props.fetchFinancedItems();
    };

    render() {
        return (
            <div>
                <ToastContainer />
                <h1>Credit Application</h1>
                <CustomerDetails {...this.props} />
                <FinancedItems {...this.props} />
            </div>)
    }
}

CreditApplicationContainer.propTypes = {
    fetchCustomerDetails: PropTypes.func,
    fetchFinancedItems: PropTypes.func
};

export default CreditApplicationContainer;