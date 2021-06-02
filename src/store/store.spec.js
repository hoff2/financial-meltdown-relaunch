import React from 'react';
import prepareStore from "./store";

describe("prepareStore", () => {
    test("should return a store", () => {
        const store = prepareStore();

        expect(store).not.toBeNull();
    });
});