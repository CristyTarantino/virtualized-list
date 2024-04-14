import {
  render,
  fireEvent,
  getAllByTestId,
  screen,
} from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import VirtualList from "./index";
import { useVirtualizedListContext, VirtualizedListProvider } from "./context";
const spyScrollTo = jest.fn();

// Define the itemContent function
const itemContent = (item: { id: number; name: string }, index: number) => (
  <div key={item.id} data-testid={`item-${item.id}`}>
    {item.name}-{index}
  </div>
);
describe("VirtualList", () => {
  // Test rendering when there are no items
  it("renders no products message when no items are provided", () => {
    const { container, getByText } = render(
      <VirtualList items={[]} itemHeight={72} itemContent={itemContent} />,
    );
    expect(getByText("No products available")).toBeInTheDocument();
    expect(container.querySelector(".topButton")).not.toBeInTheDocument();
  });

  // Test rendering with items and scrolling behavior
  it("renders items and scrolls to top", () => {
    const items = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      name: `Item ${i}`,
    }));
    const { container } = render(
      <VirtualList items={items} itemHeight={72} itemContent={itemContent} />,
    );

    const scrollContainer = container.querySelector(".scrollContainer");

    Object.defineProperty(scrollContainer, "scrollTo", { value: spyScrollTo });
    spyScrollTo.mockClear();

    // Ensure correct number of items are rendered initially
    const renderedItems = getAllByTestId(container, /^item-/);
    expect(renderedItems).toHaveLength(items.length); // Assuming a buffer of 10

    // Simulate scrolling
    fireEvent.scroll(scrollContainer!, { target: { scrollTop: 100 } });

    const scrollTopButton = screen.getByText("Scroll to Top");
    expect(scrollTopButton).toBeInTheDocument();

    fireEvent.click(scrollTopButton);

    expect(spyScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  it("adjusts container size when first item is added", async () => {
    const items: any = []; // Start with an empty list of items

    const { rerender } = render(
      <VirtualList items={items} itemHeight={50} itemContent={itemContent} />,
    );

    // Update items to contain a single item
    const updatedItems = [{ id: 1, name: "Item 1" }];

    await act(async () => {
      rerender(
        <VirtualList
          items={updatedItems}
          itemHeight={72}
          itemContent={itemContent}
        />,
      );
    });

    expect(screen.getByTestId("item-1")).toBeInTheDocument();
  });

  it("automatically scrolls to the bottom when a new item is added", async () => {
    const items = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      name: `Item ${i}`,
    }));

    const newItems = { id: 20, name: "New Item" };

    const MockComponent = () => {
      const { triggerAddItem } = useVirtualizedListContext();
      return <button onClick={() => triggerAddItem(newItems)}>Click me</button>;
    };

    // Render the VirtualList component with the mocked context value
    const { container, getByText, rerender } = render(
      <VirtualizedListProvider>
        <MockComponent />
        <VirtualList items={items} itemHeight={72} itemContent={itemContent} />
      </VirtualizedListProvider>,
    );

    const scrollContainer = container.querySelector(".scrollContainer");

    Object.defineProperty(scrollContainer, "scrollTo", { value: spyScrollTo });
    spyScrollTo.mockClear();

    fireEvent.click(getByText("Click me"));

    const updatedItems = [...items, newItems];

    await act(async () => {
      rerender(
        <VirtualList
          items={updatedItems}
          itemHeight={72}
          itemContent={itemContent}
        />,
      );
    });

    await act(async () => {
      expect(spyScrollTo).toHaveBeenCalledWith({
        // the updatedItems.length - 1 because we want to get the top of the last added item
        // times the itemHeight
        // minus the offsetHeight defined in the jest setup - 1 offset
        top: (updatedItems.length - 1) * 72 - (500 - 1),
        behavior: "smooth",
      });
    });
  });
});
