import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { calculateCartSummary } from '../utils/order'

const withSummary = (items) => calculateCartSummary(items)

export const useCartStore = create(
  persist(
    (set) => ({
      ...withSummary([]),
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id)

          if (existingItem) {
            const updatedItems = state.items.map((item) =>
              item.id === product.id
                ? {
                    ...item,
                    quantity: Math.min(item.quantity + 1, item.stock || item.quantity + 1),
                  }
                : item,
            )

            return withSummary(updatedItems)
          }

          return withSummary([
            ...state.items,
            {
              id: product.id,
              name: product.name,
              price: Number(product.price),
              image: product.images?.[0] ?? '',
              category: product.category,
              stock: Number(product.stock ?? 0),
              quantity: 1,
            },
          ])
        }),
      increaseQuantity: (id) =>
        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: Math.min(item.quantity + 1, item.stock || item.quantity + 1),
                }
              : item,
          )

          return withSummary(updatedItems)
        }),
      decreaseQuantity: (id) =>
        set((state) => {
          const updatedItems = state.items
            .map((item) =>
              item.id === id
                ? {
                    ...item,
                    quantity: Math.max(item.quantity - 1, 0),
                  }
                : item,
            )
            .filter((item) => item.quantity > 0)

          return withSummary(updatedItems)
        }),
      removeItem: (id) =>
        set((state) => withSummary(state.items.filter((item) => item.id !== id))),
      clearCart: () => set(withSummary([])),
    }),
    {
      name: 'elora-boutique-cart',
    },
  ),
)
