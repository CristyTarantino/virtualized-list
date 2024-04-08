import { getProducts } from "@/app/lib/products";
import SimpleList from "@/components/simple-list";
import { NextPage } from "next";
import styles from "./page.module.css";

const Home: NextPage = async () => {
  const { products } = await getProducts();

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>Virtualized List</h1>
      </header>
      <div className={styles.listContainer}>
        <SimpleList items={products} />
      </div>
    </main>
  );
};

export default Home;
