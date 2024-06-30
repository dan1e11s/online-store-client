import axios from 'axios';
import { create } from 'zustand';
import {
  CartItem,
  CartItemsState,
  ModalState,
  Product,
  ProductsState,
} from './types';
import { persist } from 'zustand/middleware';

const API = import.meta.env.VITE_BASE_API;

export const useProducts = create<ProductsState>((set, get) => ({
  products: [],
  categories: [],
  oneProduct: null,
  activeCategory: 'All Categories',
  query: '',
  error: null,
  setQuery: (value: string) => {
    set({ query: value });
  },
  setActiveCategory: (value: string) => {
    set({ activeCategory: value });
  },
  getProducts: async () => {
    try {
      const query = get().query;
      let data;

      if (query !== '') {
        const res = await axios<Product[]>(`${API}/product?q=${query}`);
        data = res.data;
        set({ products: data, error: null });
      } else {
        const res = await axios<Product[]>(`${API}/product`);
        data = res.data;
        set({
          products: data,
          categories:
            data
              .map((product) => product.category)
              .filter(
                (category, index, self) => self.indexOf(category) === index
              )
              .map(
                (category) =>
                  category.charAt(0).toUpperCase() + category.slice(1)
              ) || [],
          error: null,
        });
      }
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

export const useCart = create<CartItemsState>()(
  persist(
    (set) => ({
      cartItems: [],
      itemCount: 0,
      isHaveCart: false,
      error: null,
      setItemCount: (value: number) =>
        set(() => ({
          itemCount: value,
        })),
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
          const { data: cartItem } = await axios.post<CartItem>(
            `${API}/cart/add`,
            {
              productId,
              quantity: 1,
            }
          );

          set((state) => {
            const isHave = state.cartItems.find(
              (item) => item.id === cartItem.id
            );

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
    }),
    { name: 'cart' }
  )
);

export const useModal = create<ModalState>((set) => ({
  isModal: false,
  range: [0, 1000],
  activeColors: [],
  activeSizes: [],
  filters: null,
  sortOption: null,
  setFilters: (filterObj) => set({ filters: filterObj }),
  setSortOption: (option) => set({ sortOption: option }),
  setActiveSizes: (sizes) => set({ activeSizes: sizes }),
  setActiveColors: (colors) => set({ activeColors: colors }),
  setRange: (values) => set({ range: values }),
  setOpenModal: () => {
    set({ isModal: true });
  },
  setCloseModal: () => {
    set({ isModal: false });
  },
}));
