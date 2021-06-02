import React from 'react';
import prepareStore from "../../store/store";
import {Provider} from "react-redux";
import CreditApplicationConnector from './credit-application-connector';

const store = prepareStore();

const CreditApplicationProvider = () => (
    <Provider store={store}>
        <CreditApplicationConnector/>
    </Provider>
);

export default CreditApplicationProvider;