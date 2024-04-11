"use client";
import styles from "./styles.module.css";
import VirtualizedList from "@/components/virtualized-list";
import { ProductListItem } from "@/interfaces";

const headerTitles = ["Name", "Description", "Price"];
const ITEM_HEIGHT = 70;

const getProductItem = (
  item: ProductListItem,
  index: number,
  products: ProductListItem[],
) => (
  <div
    id={`item-${item.isbn}`}
    className={`${styles.productRowContainer} ${index === products?.length - 1 ? styles.productRowContainerLast : ""}`}
    style={{
      gridTemplateColumns: `repeat(${headerTitles.length}, 1fr)`,
    }}
  >
    <div className={`${styles.productRowItem} ${styles.productRowItemBorder}`}>
      {item.name} - {index}
    </div>
    <div
      className={`${styles.truncateOverflow} ${styles.productRowItemBorder}`}
      // to enable truncation and center the item we need to use line-height the height of the full block
      // ITEM_HEIGHT + padding: 1rem for the top and padding: 1rem for the bottom
      style={{ lineHeight: `${ITEM_HEIGHT - 16 * 2}px` }}
    >
      {item.description}
    </div>
    <div className={`${styles.productRowItem} ${styles.productRowItemBorder}`}>
      {item.price}
    </div>
  </div>
);

const ProductList = ({ products }: { products: ProductListItem[] }) => {
  return (
    <div className={styles.listContainer}>
      <VirtualizedList
        items={products}
        header={
          <div
            className={styles.header}
            style={{
              gridTemplateColumns: `repeat(${headerTitles.length}, 1fr)`,
            }}
          >
            {headerTitles.map((item) => (
              <div key={item} className={styles.headerItem}>
                {item}
              </div>
            ))}
          </div>
        }
        itemHeight={ITEM_HEIGHT}
        itemContent={(item, index) => getProductItem(item, index, products)}
      />
    </div>
  );
};

export default ProductList;
