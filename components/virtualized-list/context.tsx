"use client";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

// Define the type for your context state
export interface VirtualizedListContextType<T extends object> {
  addItem: T | null;
  triggerAddItem: (newAction: T) => void;
}

export const VirtualizedListContext = createContext<
  VirtualizedListContextType<any> | undefined
>(undefined);

interface VirtualizedListProviderProps<T> {
  children: ReactNode;
}

export function VirtualizedListProvider<T>({
  children,
}: Readonly<VirtualizedListProviderProps<T>>) {
  const [addItem, setAddItem] = useState<T | null>(null); // Replace 'any' with the specific type for addItem

  const triggerAddItem = useCallback((newItem: T) => {
    setAddItem(newItem);
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

export function useVirtualizedListContext<T extends object>() {
  const context = useContext(VirtualizedListContext);
  if (!context) {
    throw new Error(
      "useVirtualizedListContext must be used within a VirtualizedListProvider",
    );
  }
  return context as VirtualizedListContextType<T>;
}
