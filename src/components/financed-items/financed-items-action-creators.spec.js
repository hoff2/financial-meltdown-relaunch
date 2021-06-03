import {
  ADD_FINANCED_ITEM,
  UPDATE_FINANCED_ITEM,
  UPDATE_FINANCED_ITEMS,
} from "../../store/actions";
import * as sinon from "sinon";
import * as FinancedItemsAPI from "./financed-items-api";
import {
  addFinancedItem,
  fetchFinancedItems,
  persistFinancedItems,
  updateFinancedItems,
} from "./financed-items-action-creators";
import { getDefaultFinancedItem } from "./financed-item-state";
import Chance from "chance";
import FinancedItemState from "./financed-item-state";

const chance = new Chance();

const initialFinancedItem = FinancedItemState({
  itemName: chance.string(),
  price: chance.floating(),
  minimumPayment: chance.floating(),
  rate: chance.floating(),
});

describe("Financed Items Action Creator", () => {
  let dispatchSpy, apiPostStub, apiGetStub;

  beforeEach(() => {
    dispatchSpy = sinon.spy();
    apiPostStub = sinon.stub(FinancedItemsAPI, "postFinancedItemAPI");
    apiGetStub = sinon.stub(FinancedItemsAPI, "getFinancedItemsAPI");
  });

  afterEach(() => {
    apiPostStub.restore();
    apiGetStub.restore();
  });

  describe("addFinancedItem", () => {
    test("should add financed empty financed item", () => {
      const expectedEvent = {
        type: ADD_FINANCED_ITEM,
      };

      addFinancedItem()(dispatchSpy);
      expect(dispatchSpy.calledWithExactly(expectedEvent)).toEqual(true);
    });
  });

  describe("updateFinancedItems", () => {
    test("should update financed item property with value", () => {
      const expectedFinancedItem = FinancedItemState.update(
        initialFinancedItem,
        {
          itemName: {
            $set: chance.string(),
          },
        }
      );

      const expectedItemIndex = chance.integer();

      const expectedEvent = {
        type: UPDATE_FINANCED_ITEM,
        payload: {
          itemIndex: expectedItemIndex,
          updatedFinancedItem: expectedFinancedItem,
        },
      };

      updateFinancedItems(
        expectedItemIndex,
        initialFinancedItem,
        "itemName",
        expectedFinancedItem.itemName
      )(dispatchSpy);
      expect(dispatchSpy.calledWithExactly(expectedEvent)).toEqual(true);
    });
  });

  describe("persistFinancedItems", () => {
    test("should call the post financed item api for each item", async () => {
      apiPostStub.returns(Promise.resolve({ id: "123", itemName: "test" }));

      await persistFinancedItems([{ itemName: "test" }, { itemName: "test2" }])(
        dispatchSpy
      );

      expect(apiPostStub.calledTwice).toEqual(true);
      expect(dispatchSpy.calledTwice).toEqual(true);
    });
  });

  describe("fetchFinancedItems", () => {
    test("should call get financed items api and store result", async () => {
      const financedItems = [
        getDefaultFinancedItem(),
        getDefaultFinancedItem(),
      ];

      apiGetStub.returns(Promise.resolve(financedItems));

      const expectedDispatch = {
        type: UPDATE_FINANCED_ITEMS,
        payload: financedItems,
      };

      await fetchFinancedItems()(dispatchSpy);

      expect(apiGetStub.calledWith()).toEqual(true);
      expect(dispatchSpy.calledWithExactly(expectedDispatch)).toEqual(true);
    });
  });
});
