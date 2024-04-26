"use client";
import { useVirtualizedListContext } from "@/components/virtualized-list/context";
import { createRandomProduct } from "@/utils/data-creation";
import { addProduct } from "@/app/actions/products";

const AddProductButton = () => {
  const { setAddItem } = useVirtualizedListContext();
  const addItem = async () => {
    const response = await addProduct(createRandomProduct());
    setAddItem(response?.product);
  };

  return (
    <button onClick={addItem} className="secondary">
      Add New Item
    </button>
  );
};

export default AddProductButton;
