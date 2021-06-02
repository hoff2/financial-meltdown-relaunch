import React from 'react';
import {shallow} from 'enzyme';
import FinancedItems from "./financed-items";
import FinancedItemState from "./financed-item-state";
import Chance from 'chance';
import FinancedItem from "./financed-item";
import * as sinon from "sinon";

const chance = new Chance();

describe("FinancedItems", () => {
    let financedItems;

    const updateFinancedItemsACMock = () => {};
    const addFinancedItemAC = sinon.spy();
    const persistFinancedItemsAC = sinon.spy();

    const financedItem1 = FinancedItemState({
        itemName: chance.string(),
        price: chance.floating(),
        minimumPayment: chance.floating(),
        rate: chance.floating()
    });

    const financedItem2 = FinancedItemState({
        itemName: chance.string(),
        price: chance.floating(),
        minimumPayment: chance.floating(),
        rate: chance.floating()
    });

    const properties = {
        addFinancedItem: addFinancedItemAC,
        financedItems: [financedItem1, financedItem2],
        persistFinancedItems: persistFinancedItemsAC,
        updateFinancedItems: updateFinancedItemsACMock
    };

    beforeEach(() => {
        financedItems = shallow(<FinancedItems {...properties} />);
    });

    describe("Financed Items", () => {
        test("should have a header", () => {
           const header = financedItems.find('h2');

           expect(header.length).toEqual(1);
        });

        test("should have an add item button", () => {
            const addButton = financedItems.find('.addItem>button');

            expect(addButton.length).toEqual(1);
        });

        describe("financed item instances", () => {
            let financedItemInstances;

            beforeEach(() => {
                financedItemInstances = financedItems.find(FinancedItem);
            });

            test("should display all financed items", () => {
               expect(financedItemInstances.length).toEqual(properties.financedItems.length);
            });

            describe("first item", () => {
                let firstItem;

                beforeEach(() => {
                    firstItem = financedItemInstances.get(0);
                });

                test("should supply itemIndex property to financed item", () => {
                    expect(firstItem.props.itemIndex).toEqual(0);
                });

                test("should supply financedItem property to financed item", () => {
                    expect(firstItem.props.financedItem).toEqual(financedItem1);
                });

                test("should supply updateFinancedItems action creator to financed item", () => {
                    expect(firstItem.props.updateFinancedItems).toEqual(updateFinancedItemsACMock);
                });
            });
        });

        describe("add button", () => {
            test("should call add item action creator when button is clicked", () => {
                const addButton = financedItems.find('.addItem>button');

                addButton.simulate("click");

                expect(addFinancedItemAC.calledWithExactly()).toEqual(true);
            });
        });

        describe("persist button", () => {
            test("should call persist items action creator when button is clicked", () => {
                const persistButton = financedItems.find('.persist-financed-items>button');

                persistButton.simulate('click');

                expect(persistFinancedItemsAC.calledWithExactly(properties.financedItems)).toEqual(true);
            });
        });
    })
});
