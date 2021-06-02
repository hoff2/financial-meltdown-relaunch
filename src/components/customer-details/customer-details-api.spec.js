import {getCustomerDetailsAPI, updateCustomerDetailsAPI} from "./customer-details-api";

describe('customer details api', () => {
    beforeEach(() => {
        fetch.resetMocks()
    });

    test('should post customer details and return result', (done) => {
        fetch.mockResponseOnce(JSON.stringify({ firstName: 'test' }));

        updateCustomerDetailsAPI({}).then(res => {
            expect(res.firstName).toEqual("test");
            done();
        }).catch((error) => {
            done.fail(error);
        });

        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual('http://localhost:8080/customerDetails')
    });

    test('should get customer details and return result', (done) => {
        fetch.mockResponseOnce(JSON.stringify({firstName: 'test'}));

        getCustomerDetailsAPI().then(res => {
            expect(res.firstName).toEqual("test");
            done();
        }).catch((error) => {
            done.fail(error);
        });

        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual('http://localhost:8080/customerDetails');
    });

    test('should return error when request is rejects', (done) => {
        fetch.mockReject();

        getCustomerDetailsAPI().then(res => {
            expect(res.error).toEqual(true);
            expect(res.message).toEqual("Customer details are unavailable");
            done();
        }).catch((error) => {
            done.fail(error);
        });
    });
});