import axios from 'axios';
import { create } from 'zustand';
import { CartItem, CartItemsState, Product, ProductsState } from './types';

const API = import.meta.env.VITE_BASE_API;

export const useProducts = create<ProductsState>((set) => ({
  products: [],
  oneProduct: null,
  activeCategory: 'All Categories',
  error: null,
  setActiveCategory: (value: string) => {
    set({ activeCategory: value });
  },
  getProducts: async () => {
    try {
      const { data } = await axios<Product[]>(`${API}/product`);

      set({ products: data, error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
  getOneProduct: async (id: string) => {
    try {
      const { data } = await axios<Product>(`${API}/product/${id}`);

      set({ oneProduct: data, error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
}));

export const useCart = create<CartItemsState>((set) => ({
  cartItems: [],
  error: null,
  getCartItems: async () => {
    try {
      const { data } = await axios(`${API}/cart`);

      set({ cartItems: data, error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
  addToCart: async (productId: number) => {
    try {
      const { data: cartItem } = await axios.post<CartItem>(`${API}/cart/add`, {
        productId,
        quantity: 1,
      });

      set((state) => {
        const isHave = state.cartItems.find((item) => item.id === cartItem.id);

        if (!isHave) {
          return { cartItems: [...state.cartItems, cartItem], error: null };
        } else {
          const updatedCartItems = state.cartItems.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          return { cartItems: updatedCartItems, error: null };
        }
      });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
  deleteCartItem: async (productId: number) => {
    try {
      await axios.delete(`${API}/cart/remove/${productId}`);

      set((state) => ({
        cartItems: state.cartItems.filter(
          (item) => item.product.id !== productId
        ),
        error: null,
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
  clearCartItems: async () => {
    try {
      await axios.delete(`${API}/cart/clear`);

      set({ cartItems: [], error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
}));
