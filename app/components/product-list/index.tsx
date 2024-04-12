"use client";
import styles from "./styles.module.css";
import VirtualizedList from "@/components/virtualized-list";
import { ProductListItem } from "@/interfaces";
import ProductItemRow from "@/app/components/product-list/ProductItemRow";

const headerTitles = ["Name", "Description", "Price"];
const ITEM_HEIGHT = 72;

const ProductList = ({ products }: { products: ProductListItem[] }) => (
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
      itemContent={(item, index) => (
        <ProductItemRow
          key={item.isbn}
          item={item}
          index={index}
          customClass={
            index === products?.length - 1 ? styles.productRowContainerLast : ""
          }
          rowNumber={headerTitles.length}
          rowHeight={ITEM_HEIGHT}
        />
      )}
    />
  </div>
);

export default ProductList;
