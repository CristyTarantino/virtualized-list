export interface Product {
  isbn: string;
  name: string;
  description: string;
  price: string;
}

export interface ProductListItem extends Product {
  id: string;
}
