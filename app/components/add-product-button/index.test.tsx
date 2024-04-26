import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import AddProductButton from "@/app/components/add-product-button";

// Mock useVirtualizedListContext
const mockSetAddItem = jest.fn();
jest.mock("@/components/virtualized-list/context", () => ({
  __esModule: true,
  useVirtualizedListContext: () => ({ setAddItem: mockSetAddItem }),
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

    // Assert that setAddItem function is called
    // Wait for addProduct to resolve
    await waitFor(() => {
      // Assert that setAddItem is called
      expect(mockSetAddItem).toHaveBeenCalled();
    });
  });

  it("should call setAddItem function with correct parameter", async () => {
    const { getByText } = render(<AddProductButton />);
    fireEvent.click(getByText("Add New Item"));

    // Assert that setAddItem is called with the correct parameter
    await waitFor(() => {
      // Assert that setAddItem is called
      expect(mockSetAddItem).toHaveBeenCalledWith(mockProduct);
    });
  });
});
