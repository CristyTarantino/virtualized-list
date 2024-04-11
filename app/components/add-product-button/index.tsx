"use client";
import { useVirtualizedListContext } from "@/components/virtualized-list/context";
import { createRandomProduct } from "@/utils/data-creation";
import { addProduct } from "@/app/actions/products";

const AddProductButton = () => {
  const { triggerAddItem } = useVirtualizedListContext();
  const addItem = async () => {
    const response = await addProduct(createRandomProduct());
    triggerAddItem(response.product);
  };

  return (
    <button onClick={addItem} style={{ marginBottom: "20px" }}>
      Add New Item
    </button>
  );
};

export default AddProductButton;
