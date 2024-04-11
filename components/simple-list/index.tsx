import { ProductListItem } from "@/interfaces";
import styles from "./styles.module.css";

interface SimpleListProps {
  items: ProductListItem[];
}

const SimpleList = ({ items }: SimpleListProps) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            <th className={styles.tableData}>Name</th>
            <th className={styles.tableData}>Description</th>
            <th className={styles.tableData}>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className={styles.tableData}>{item.name}</td>
              <td className={styles.tableData}>{item.description}</td>
              <td className={styles.tableData}>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SimpleList;
