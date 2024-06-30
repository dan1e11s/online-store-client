export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  size: string;
  sale: number;
  color: string;
  isNew: boolean;
  images: string[];
}

export interface ProductsState {
  products: Product[];
  categories: string[];
  oneProduct: Product | null;
  activeCategory: string;
  query: string;
  error: string | null;
  setQuery: (value: string) => void;
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

export type FilterObj = {
  range: [number, number] | [];
  activeColors: string[];
  activeSizes: string[];
  sortOption: string | null;
};

export interface ModalState {
  isModal: boolean;
  range: [number, number];
  activeColors: string[];
  activeSizes: string[];
  sortOption: string | null;
  filters: null | FilterObj;
  setFilters: (filterObj: FilterObj) => void;
  setSortOption: (option: string | undefined) => void;
  setActiveSizes: (sizes: string[]) => void;
  setActiveColors: (colors: string[]) => void;
  setRange: (values: [number, number]) => void;
  setOpenModal: () => void;
  setCloseModal: () => void;
}
