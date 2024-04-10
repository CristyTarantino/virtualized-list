import { ProductListItem } from "@/interfaces";
import { createRandomProduct } from "@/utils/data-creation";
import { NextResponse } from "next/server";

let products: ProductListItem[] = Array.from(
  { length: 100000 },
  createRandomProduct,
);

export async function GET() {
  return NextResponse.json(
    {
      products: products,
    },
    {
      status: 200,
    },
  );
}

export async function POST(req: Request) {
  const { product } = await req.json();
  products.push(product);
  return NextResponse.json(
    {
      product,
    },
    {
      status: 201,
    },
  );
}
