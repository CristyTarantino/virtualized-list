import { ProductListItem } from "@/interfaces";
import { createRandomProduct } from "@/utils/data-creation";
import { NextResponse } from "next/server";

const products: ProductListItem[] = Array.from(
  { length: 10000 },
  createRandomProduct,
);

export async function GET() {
  return NextResponse.json({
    products: products,
  });
}
