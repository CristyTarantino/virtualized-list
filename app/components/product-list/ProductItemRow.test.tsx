import React from "react";
import { render } from "@testing-library/react";
import { ProductListItem } from "@/interfaces";
import ProductItemRow from "./ProductItemRow";

describe("ProductItemRow", () => {
  const mockItem = {
    id: "123456789",
    isbn: "123456789",
    name: "Test Product",
    description: "Test Description",
    price: "10.99",
  } as ProductListItem;

  it("renders with default props", () => {
    const { getByText } = render(
      <ProductItemRow
        item={mockItem}
        index={0}
        rowNumber={3}
        rowHeight={100}
      />,
    );

    // Assert that item name, description, and price are rendered
    expect(getByText(`${mockItem.name} - 0`)).toBeInTheDocument();
    expect(getByText(mockItem.description)).toBeInTheDocument();
    expect(getByText(mockItem.price)).toBeInTheDocument();
  });

  it("renders with custom class", () => {
    const { container } = render(
      <ProductItemRow
        item={mockItem}
        index={0}
        rowNumber={3}
        rowHeight={100}
        customClass="custom"
      />,
    );

    // Assert that the custom class is applied
    expect(container.firstChild).toHaveClass("custom");
  });

  it("renders with correct grid template columns and height", () => {
    const rowNumber = 3;
    const rowHeight = 150;
    const { container } = render(
      <ProductItemRow
        item={mockItem}
        index={0}
        rowNumber={rowNumber}
        rowHeight={rowHeight}
      />,
    );

    // Assert that grid template columns and height are set correctly
    expect(container.firstChild).toHaveStyle(
      `grid-template-columns: repeat(${rowNumber}, 1fr)`,
    );
    expect(container.firstChild).toHaveStyle(`height: ${rowHeight}px`);
  });
});
