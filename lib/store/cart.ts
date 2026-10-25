import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem } from "@/lib/types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  isCheckoutOpen: boolean;
  
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  
  openCheckout: () => void;
  closeCheckout: () => void;

  addItem: (item: CartItem) => void;
  removeItem: (variantId: string, size: string) => void;
  updateQuantity: (variantId: string, size: string, quantity: number) => void;
  clearCart: () => void;

  getItemCount: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isCheckoutOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      openCheckout: () => set({ isOpen: false, isCheckoutOpen: true }),
      closeCheckout: () => set({ isCheckoutOpen: false }),

      addItem: (newItem: CartItem) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.variantId === newItem.variantId && i.size === newItem.size
          );

          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex].quantity += newItem.quantity;
            return { items: updated, isOpen: true };
          }

          return { items: [...state.items, newItem], isOpen: true };
        });
      },

      removeItem: (variantId: string, size: string) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.variantId === variantId && i.size === size)
          ),
        }));
      },

      updateQuantity: (variantId: string, size: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(variantId, size);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.variantId === variantId && i.size === size
              ? { ...i, quantity }
              : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "kapde_cart_storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
