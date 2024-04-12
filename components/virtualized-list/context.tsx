"use client";
import { ProductListItem } from "@/interfaces";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

// Define the type for your context state
interface VirtualizedListContextType {
  addItem: ProductListItem | null;
  triggerAddItem: (newAction: ProductListItem) => void;
}

export const VirtualizedListContext = createContext<
  VirtualizedListContextType | undefined
>(undefined);

interface VirtualizedListProviderProps {
  children: ReactNode;
}

export function VirtualizedListProvider({
  children,
}: Readonly<VirtualizedListProviderProps>) {
  const [addItem, setAddItem] = useState<ProductListItem | null>(null); // Replace 'any' with the specific type for addItem

  const triggerAddItem = useCallback((newAction: ProductListItem) => {
    setAddItem(newAction);
  }, []);

  const value = useMemo(
    () => ({ addItem, triggerAddItem }),
    [addItem, triggerAddItem],
  );

  return (
    <VirtualizedListContext.Provider value={value}>
      {children}
    </VirtualizedListContext.Provider>
  );
}

export function useVirtualizedListContext() {
  const context = useContext(VirtualizedListContext);
  if (!context) {
    throw new Error(
      "useVirtualizedListContext must be used within a VirtualizedListProvider",
    );
  }
  return context;
}
