import React from "react";
import { render } from "@testing-library/react";
import ProductList from "@/app/components/product-list";

describe("ProductList", () => {
  const products = [
    {
      id: "1",
      isbn: "1",
      name: "Product 1",
      description: "Description 1",
      price: "$10.99",
    },
    {
      id: "2",
      isbn: "2",
      name: "Product 2",
      description: "Description 2",
      price: "$20.99",
    },
    {
      id: "3",
      isbn: "3",
      name: "Product 3",
      description: "Description 3",
      price: "$30.99",
    },
  ];

  it("renders with default props", () => {
    const { container } = render(
      <div style={{ height: "1000px" }}>
        <ProductList products={products} />
      </div>,
    );

    const listContainer = container.querySelector(".listContainer");
    expect(listContainer).toBeInTheDocument();

    const header = container.querySelector(".header");
    expect(header).toBeInTheDocument();
    expect(header?.textContent).toContain("Name");
    expect(header?.textContent).toContain("Description");
    expect(header?.textContent).toContain("Price");

    const items = container.querySelectorAll(".productRowContainer");
    expect(items.length).toBe(products.length);
  });
});
