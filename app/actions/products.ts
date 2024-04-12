"use server";
import { ProductListItem } from "@/interfaces";
import { revalidateTag } from "next/cache";

export type GetProductResponse = {
  products: ProductListItem[];
};

export async function getProducts(): Promise<GetProductResponse> {
  // forcing no cache for next js caching limitations going over 2M
  // pagination could be implemented
  // however the difficulty of this test is to load all the items and let the FE deal with the virtualization issue
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
    {
      cache: "no-store",
      next: {
        tags: ["products"],
      },
    },
  );
  return response.json();
}

export type AddProductResponse = {
  product: ProductListItem;
};

export async function addProduct(
  product: ProductListItem,
): Promise<AddProductResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
    {
      method: "POST",
      body: JSON.stringify({ product }),
    },
  );

  revalidateTag("products");
  return response.json();
}
