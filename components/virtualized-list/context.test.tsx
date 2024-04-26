import { render, fireEvent } from "@testing-library/react";
import React from "react";
import { VirtualizedListProvider, useVirtualizedListContext } from "./context";

describe("VirtualizedListContext", () => {
  it("creates context with the correct shape", async () => {
    const setAddItem = jest.fn(); // Create a mock function for setAddItem

    const MockComponent = () => {
      const { setAddItem } = useVirtualizedListContext();
      return <button onClick={() => setAddItem(["test"])}>Click me</button>;
    };

    // Mock useState to return the mock function
    jest.spyOn(React, "useState").mockReturnValueOnce([null, setAddItem]);

    const { getByText } = render(
      <VirtualizedListProvider>
        <MockComponent />
      </VirtualizedListProvider>,
    );

    fireEvent.click(getByText("Click me"));

    expect(setAddItem).toHaveBeenCalledWith(["test"]);
  });

  it("throws an error when used outside VirtualizedListProvider", () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const TestComponent = () => {
      const { setAddItem } = useVirtualizedListContext(); // Using mocked hook
      return <div onClick={() => setAddItem(["test"])}>Click me</div>;
    };

    expect(() => render(<TestComponent />)).toThrow();

    errorSpy.mockRestore();
  });
});
