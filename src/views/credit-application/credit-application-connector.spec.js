import {
  mapDispatchToProps,
  mapStateToProps,
} from "./credit-application-connector";
import { getDefaultCustomerDetails } from "../../components/customer-details/customer-details-state";

describe("CreditApplicationConnector", () => {
  const expectedCustomerDetails = getDefaultCustomerDetails();
  const expectedState = {
    customerDetails: expectedCustomerDetails,
  };

  describe("mapStateToProps", () => {
    test("should provide updateCustomerDetails from state", () => {
      expect(mapStateToProps(expectedState).customerDetails).toEqual(
        expectedCustomerDetails
      );
    });
  });

  describe("mapDispatchToProps", () => {
    test("should provide an updateCustomerDetails action creator", () => {
      expect(
        mapDispatchToProps.hasOwnProperty("updateCustomerDetails")
      ).toEqual(true);
    });

    test("should provide an updateFinancedItems action creator", () => {
      expect(mapDispatchToProps.hasOwnProperty("updateFinancedItems")).toEqual(
        true
      );
    });

    test("should provide an addFinancedItem action creator", () => {
      expect(mapDispatchToProps.hasOwnProperty("addFinancedItem")).toEqual(
        true
      );
    });

    test("should provide an persistCustomerDetails action creator", () => {
      expect(
        mapDispatchToProps.hasOwnProperty("persistCustomerDetails")
      ).toEqual(true);
    });

    test("should provide an fetchCustomerDetails action creator", () => {
      expect(mapDispatchToProps.hasOwnProperty("fetchCustomerDetails")).toEqual(
        true
      );
    });

    test("should provide a persistFinancedItems action creator", () => {
      expect(mapDispatchToProps.hasOwnProperty("persistFinancedItems")).toEqual(
        true
      );
    });

    test("should provide a fetchFinancedItems action creator", () => {
      expect(mapDispatchToProps.hasOwnProperty("fetchFinancedItems")).toEqual(
        true
      );
    });
  });
});
