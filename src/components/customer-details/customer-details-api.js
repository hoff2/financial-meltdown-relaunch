export const getCustomerDetailsAPI = () => {
    return fetch('http://localhost:8080/customerDetails', {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .catch(() => {
            return {
                error: true,
                message: "Customer details are unavailable"
            };
        });
};

export const updateCustomerDetailsAPI = (customerDetails) => {
    return fetch('http://localhost:8080/customerDetails', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerDetails)
    }).then(res => res.json());
};
