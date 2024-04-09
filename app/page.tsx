import { NextPage } from "next";
import { getProducts } from "@/app/lib/products";
import VirtualizedList from "@/components/virtualized-list-perf";
import styles from "./page.module.css";

const Home: NextPage = async () => {
  const { products } = await getProducts();

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>Virtualized List</h1>
      </header>
      <div className={styles.listContainer}>
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
        <VirtualizedList products={products} />
      </div>
    </main>
  );
};

export default Home;
