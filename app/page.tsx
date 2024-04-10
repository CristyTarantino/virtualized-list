import { getProducts } from "@/app/actions/products";
import AddProductButton from "@/components/add-product-button";
import VirtualizedList from "@/components/virtualized-list-perf";
import { VirtualizedListProvider } from "@/components/virtualized-list-perf/virtualized-list.context";
import { NextPage } from "next";
import { Suspense } from "react";
import styles from "./page.module.css";

const Home: NextPage = async () => {
  const { products } = await getProducts();

  return (
    <VirtualizedListProvider>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Virtualized List</h1>
          <AddProductButton />
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
          <Suspense fallback={<div>Loading...</div>}>
            <VirtualizedList products={products} />
          </Suspense>
        </div>
      </main>
    </VirtualizedListProvider>
  );
};

export default Home;
