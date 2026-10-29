"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

export interface WishlistItem {
  product: Product;
}

interface StoreState {
  // Cart
  cartItems: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;

  // Wishlist
  wishlistItems: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCart: (product: Product) => void;

  // UI
  isSearchOpen: boolean;
  toggleSearch: () => void;
  closeSearch: () => void;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;

  // Notifications
  notifications: { id: string; message: string; type: "success" | "info" | "error" }[];
  addNotification: (message: string, type?: "success" | "info" | "error") => void;
  removeNotification: (id: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart state
      cartItems: [],
      isCartOpen: false,

      addToCart: (product, size, quantity = 1) => {
        const { cartItems } = get();
        const existingIndex = cartItems.findIndex(
          (item) => item.product.id === product.id && item.size === size
        );

        if (existingIndex >= 0) {
          const updated = [...cartItems];
          updated[existingIndex].quantity += quantity;
          set({ cartItems: updated, isCartOpen: true });
        } else {
          set({
            cartItems: [...cartItems, { product, quantity, size }],
            isCartOpen: true,
          });
        }

        get().addNotification(`${product.name} added to cart!`, "success");
      },

      removeFromCart: (productId, size) => {
        set({
          cartItems: get().cartItems.filter(
            (item) => !(item.product.id === productId && item.size === size)
          ),
        });
      },

      updateQuantity: (productId, size, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, size);
          return;
        }
        const updated = get().cartItems.map((item) =>
          item.product.id === productId && item.size === size
            ? { ...item, quantity }
            : item
        );
        set({ cartItems: updated });
      },

      clearCart: () => set({ cartItems: [] }),
      toggleCart: () => set((s) => ({ isCartOpen: !s.isCartOpen })),
      closeCart: () => set({ isCartOpen: false }),

      // Wishlist state
      wishlistItems: [],

      addToWishlist: (product) => {
        const { wishlistItems } = get();
        const exists = wishlistItems.some((i) => i.product.id === product.id);
        if (!exists) {
          set({ wishlistItems: [...wishlistItems, { product }] });
          get().addNotification(`${product.name} added to wishlist!`, "info");
        } else {
          get().removeFromWishlist(product.id);
        }
      },

      removeFromWishlist: (productId) => {
        set({
          wishlistItems: get().wishlistItems.filter(
            (i) => i.product.id !== productId
          ),
        });
      },

      isInWishlist: (productId) => {
        return get().wishlistItems.some((i) => i.product.id === productId);
      },

      moveToCart: (product) => {
        get().addToCart(product, product.sizes[0]);
        get().removeFromWishlist(product.id);
      },

      // UI state
      isSearchOpen: false,
      toggleSearch: () => set((s) => ({ isSearchOpen: !s.isSearchOpen })),
      closeSearch: () => set({ isSearchOpen: false }),

      isMobileMenuOpen: false,
      toggleMobileMenu: () =>
        set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
      closeMobileMenu: () => set({ isMobileMenuOpen: false }),

      // Notifications
      notifications: [],
      addNotification: (message, type = "success") => {
        const id = Math.random().toString(36).slice(2);
        set((s) => ({
          notifications: [...s.notifications, { id, message, type }],
        }));
        setTimeout(() => get().removeNotification(id), 3500);
      },
      removeNotification: (id) => {
        set((s) => ({
          notifications: s.notifications.filter((n) => n.id !== id),
        }));
      },
    }),
    {
      name: "halloween-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cartItems: state.cartItems,
        wishlistItems: state.wishlistItems,
      }),
    }
  )
);

// Computed helpers
export const useCartCount = () =>
  useStore((s) => s.cartItems.reduce((acc, i) => acc + i.quantity, 0));

export const useCartTotal = () =>
  useStore((s) =>
    s.cartItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0)
  );

export const useWishlistCount = () =>
  useStore((s) => s.wishlistItems.length);
