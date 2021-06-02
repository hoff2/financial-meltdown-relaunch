import t from 'tcomb';

const CustomerDetailsData = t.struct({
    firstName: t.String,
    lastName: t.String,
    streetAddress: t.String,
    city: t.String,
    state: t.String,
    phone: t.String,
    email: t.String
}, 'CustomerDetailsData');

export const getDefaultCustomerDetails = () => {
    return CustomerDetailsData({
        firstName: '',
        lastName: '',
        streetAddress: '',
        city: '',
        state: '',
        phone: '',
        email: ''
    })
};

export default CustomerDetailsData;