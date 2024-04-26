import { memo } from "react";
import styles from "./ProductItemRow.module.css";
import { ProductListItem } from "@/interfaces";

const ProductItemRow = ({
  item,
  index,
  customClass,
  rowNumber,
  rowHeight,
}: {
  item: ProductListItem;
  index: number;
  rowNumber: number;
  rowHeight: number;
  customClass?: string;
}) => (
  <div
    id={`item-${item.id}`}
    className={`${styles.productRowContainer} ${customClass}`}
    style={{
      gridTemplateColumns: `repeat(${rowNumber}, 1fr)`,
      height: rowHeight,
    }}
  >
    <div className={`${styles.productRowItem} ${styles.productRowItemBorder}`}>
      {item.name} - {index}
    </div>
    <div
      className={`${styles.truncateOverflow} ${styles.productRowItemBorder}`}
      // to enable truncation and center the item we need to use line-height the height of the full block
      // ITEM_HEIGHT + padding: 1rem for the top and padding: 1rem for the bottom
      style={{ lineHeight: `${rowHeight - 16 * 2}px` }}
    >
      {item.description}
    </div>
    <div className={`${styles.productRowItem} ${styles.productRowItemBorder}`}>
      {item.price}
    </div>
  </div>
);

export default memo(ProductItemRow);
