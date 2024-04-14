import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import AddProductButton from "@/app/components/add-product-button";

// Mock useVirtualizedListContext
const mockTriggerAddItem = jest.fn();
jest.mock("@/components/virtualized-list/context", () => ({
  __esModule: true,
  useVirtualizedListContext: () => ({ triggerAddItem: mockTriggerAddItem }),
}));

// Mock addProduct function

const mockProduct = {
  id: "123",
  name: "Test Product",
  price: "10.99",
};
jest.mock("@/app/actions/products", () => ({
  __esModule: true,
  addProduct: jest.fn(() => ({
    product: mockProduct,
  })),
}));

describe("AddProductButton", () => {
  it("should trigger addItem function when button is clicked", async () => {
    const { getByText } = render(<AddProductButton />);
    fireEvent.click(getByText("Add New Item"));

    // Assert that addProduct function is called
    expect(require("@/app/actions/products").addProduct).toHaveBeenCalled();

    // Assert that triggerAddItem function is called
    // Wait for addProduct to resolve
    await waitFor(() => {
      // Assert that triggerAddItem is called
      expect(mockTriggerAddItem).toHaveBeenCalled();
    });
  });

  it("should call triggerAddItem function with correct parameter", async () => {
    const { getByText } = render(<AddProductButton />);
    fireEvent.click(getByText("Add New Item"));

    // Assert that triggerAddItem is called with the correct parameter
    await waitFor(() => {
      // Assert that triggerAddItem is called
      expect(mockTriggerAddItem).toHaveBeenCalledWith(mockProduct);
    });
  });
});
