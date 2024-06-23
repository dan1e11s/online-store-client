export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  images: string[];
}

export interface ProductsState {
  products: Product[];
  oneProduct: Product | null;
  activeCategory: string;
  error: string | null;
  setActiveCategory: (value: string) => void;
  getProducts: () => Promise<void>;
  getOneProduct: (id: string) => Promise<void>;
}

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export interface CartItemsState {
  cartItems: CartItem[];
  itemCount: number;
  error: string | null;
  setItemCount: (value: number) => void;
  getCartItems: () => Promise<void>;
  addToCart: (productId: number) => Promise<void>;
  deleteCartItem: (productId: number) => Promise<void>;
  clearCartItems: () => Promise<void>;
}
