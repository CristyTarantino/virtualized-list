/**
 * @jest-environment jsdom
 */
import { createRandomProduct } from "@/utils/data-creation";
import { render, screen } from "@testing-library/react";
import { FC, ReactElement } from "react";
import Page from "./page";
import "@testing-library/jest-dom";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock the data fetching function directly
jest.mock("@/app/actions/products", () => ({
  getProducts: jest.fn(() =>
    Promise.resolve({
      products: Array.from({ length: 10 }, createRandomProduct),
    }),
  ),
}));

type AnyComponentProps = Record<string, any>;

// Define a generic async function to resolve the server component
async function resolvedComponent<P = AnyComponentProps>(
  Component: (props: P) => Promise<ReactElement>, // Specify that Component is a function returning a Promise of a ReactElement
  props: P = {} as P, // Default props to an empty object of type P
): Promise<FC<P>> {
  // The resolved component will be a functional component accepting props of type P
  const ComponentResolved = await Component(props);
  // Return a functional component that renders the resolved element
  return function ResolvedComponent(): ReactElement {
    return ComponentResolved;
  };
}

describe("Home Page", () => {
  it("App Router: Works with Server Components", async () => {
    const ServerComponent = await resolvedComponent(
      Page as (props: AnyComponentProps) => Promise<ReactElement>,
    );

    render(<ServerComponent />);

    const headingElement = screen.getByRole("heading");

    expect(headingElement).toBeInTheDocument();
    expect(screen.getByText("Virtualized List")).toBeInTheDocument();
  });
});
