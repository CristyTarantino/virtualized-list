"use client";
import styles from "@/app/page.module.css";
import VirtualizedList from "@/components/virtualized-list";
import { ProductListItem } from "@/interfaces";
import React from "react";

const ProductList = ({ products }: { products: ProductListItem[] }) => {
  return (
    <div className={styles.listContainer}>
      <VirtualizedList
        items={products}
        header={
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              textAlign: "center",
              padding: "20px",
            }}
          >
            <div>Name</div>
            <div>Description</div>
            <div>Price</div>
          </div>
        }
        itemHeight={70}
        itemContent={(item: ProductListItem, index) => (
          <div
            id={`item-${item.isbn}`}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              height: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              {item.name} - {index}
            </div>
            <div className={styles.truncateOverflow}>{item.description}</div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              {item.price}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default ProductList;
