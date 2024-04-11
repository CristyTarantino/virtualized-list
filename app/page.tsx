import { getProducts } from "@/app/actions/products";
import AddProductButton from "@/app/components/add-product-button";
import ProductList from "@/app/components/product-list";
import { VirtualizedListProvider } from "@/components/virtualized-list/context";
import { NextPage } from "next";
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
        <ProductList products={products} />
      </main>
    </VirtualizedListProvider>
  );
};

export default Home;
