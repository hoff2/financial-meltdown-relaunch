export const getFinancedItemsAPI = () => {
    return fetch('http://localhost:8080/financedItems', {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
};

export const postFinancedItemAPI = (financedItem) => {
    return fetch('http://localhost:8080/financedItems', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(financedItem)
    }).then(res => res.json());
};
