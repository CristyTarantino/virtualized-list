"use client";
import { ProductListItem } from "@/interfaces";
import { createContext, ReactNode, useContext, useState } from "react";

// Define the type for your context state
interface VirtualizedListContextType {
  addItem: ProductListItem | null; // Replace 'any' with a more specific type depending on what you're storing
  triggerAddItem: (newAction: ProductListItem) => void; // Again, replace 'any' with the actual type of 'newAction'
}

// Initialize the context with a default value
const VirtualizedListContext = createContext<
  VirtualizedListContextType | undefined
>(undefined);

interface VirtualizedListProviderProps {
  children: ReactNode;
}

// Context provider component
export function VirtualizedListProvider({
  children,
}: VirtualizedListProviderProps) {
  const [addItem, setAddItem] = useState<ProductListItem | null>(null); // Replace 'any' with the specific type for addItem

  // Function to update the action
  const triggerAddItem = (newAction: ProductListItem) => {
    // Replace 'any' with the specific type for newAction
    setAddItem(newAction);
  };

  return (
    <VirtualizedListContext.Provider value={{ addItem, triggerAddItem }}>
      {children}
    </VirtualizedListContext.Provider>
  );
}

// Example usage of useContext with typed context
export function useVirtualizedListContext() {
  const context = useContext(VirtualizedListContext);
  if (!context) {
    throw new Error(
      "useVirtualizedListContext must be used within a VirtualizedListProvider",
    );
  }
  return context;
}
