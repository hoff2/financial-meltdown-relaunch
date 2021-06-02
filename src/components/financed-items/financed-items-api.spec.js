import {getFinancedItemsAPI, postFinancedItemAPI} from "./financed-items-api";

describe('financed items api', () => {
    beforeEach(() => {
        fetch.resetMocks()
    });

    test('should post financed item and return result', (done) => {
        fetch.mockResponseOnce(JSON.stringify({ itemName: 'test' }));

        postFinancedItemAPI({}).then(res => {
            expect(res.itemName).toEqual("test");
            done();
        }).catch((error) => {
            done.fail(error);
        });

        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual('http://localhost:8080/financedItems')
    });

    test('should get financed items and return result', (done) => {
        fetch.mockResponseOnce(JSON.stringify({itemName: 'test'}));

        getFinancedItemsAPI().then(res => {
            expect(res.itemName).toEqual("test");
            done();
        }).catch((error) => {
            done.fail(error);
        });

        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual('http://localhost:8080/financedItems');
    });
});