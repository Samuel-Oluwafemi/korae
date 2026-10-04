export type Category = "Bags" | "Shoes";
export interface Product {
  id: string;
  name: string;
  slug: string;
  category: Category;
  price: number;
  description: string;
  images: string[];
  sizes?: string[];
  colors: string[];
  tag?: "NEW" | "BESTSELLER";
  isNew: boolean;
  isBestseller: boolean;
  inStock: boolean;
  createdAt: string;
}
export interface CartItem {
  key: string;
  productId: string;
  color: string;
  size?: string;
  qty: number;
}
export interface Line extends CartItem {
  product: Product;
}
