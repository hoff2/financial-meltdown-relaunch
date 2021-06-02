import React from 'react';
import {shallow} from 'enzyme';
import CreditApplicationConnector from './credit-application-connector';
import CreditApplicationProvider from "./credit-application-provider";
import {Provider} from "react-redux";

describe('CreditApplicationProvider', () => {
    test('should render redux provider', () => {
        const provider = shallow(<CreditApplicationProvider/>);
        const reduxProvider = provider.find(Provider);

        expect(reduxProvider.length).toEqual(1);
    });

    test('should render the connector', () => {
        const provider = shallow(<CreditApplicationProvider/>);
        const connector = provider.find(CreditApplicationConnector);

        expect(connector.length).toEqual(1);
    });
});