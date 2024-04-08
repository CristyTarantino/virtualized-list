import { ProductListItem } from "@/interfaces";

export type GetProductResponse = {
  products: ProductListItem[];
};

export async function getProducts(): Promise<GetProductResponse> {
  // forcing no cache for next js caching limitations going over 2M
  // pagination could be implemented
  // however the difficulty of this test is to load all the items and let the FE deal with the virtualization issue
  const response = await fetch(`${process.env.HTTP_HOST}/api/products`, {
    cache: "no-store",
  });
  return response.json();
}
