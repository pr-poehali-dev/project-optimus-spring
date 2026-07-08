import { useCallback, useEffect, useMemo, useState } from "react"

export interface CartItem {
  id: string
  title: string
  price: number
  image?: string
  qty: number
}

/**
 * Демо-хук корзины. Хранит состояние в localStorage под своим namespace,
 * не обращается к реальному backend — только для демонстрации UX корзины.
 */
export function useDemoCart(storageKey: string) {
  const key = `${storageKey}_cart`
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const raw = localStorage.getItem(key)
    if (raw) {
      try {
        setItems(JSON.parse(raw))
      } catch {
        localStorage.removeItem(key)
      }
    }
  }, [key])

  const persist = useCallback(
    (next: CartItem[]) => {
      setItems(next)
      localStorage.setItem(key, JSON.stringify(next))
    },
    [key]
  )

  const addItem = useCallback(
    (item: Omit<CartItem, "qty">) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.id === item.id)
        const next = existing
          ? prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
          : [...prev, { ...item, qty: 1 }]
        localStorage.setItem(key, JSON.stringify(next))
        return next
      })
    },
    [key]
  )

  const removeItem = useCallback(
    (id: string) => {
      setItems((prev) => {
        const next = prev.filter((i) => i.id !== id)
        localStorage.setItem(key, JSON.stringify(next))
        return next
      })
    },
    [key]
  )

  const updateQty = useCallback(
    (id: string, qty: number) => {
      setItems((prev) => {
        const next = qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i))
        localStorage.setItem(key, JSON.stringify(next))
        return next
      })
    },
    [key]
  )

  const clear = useCallback(() => {
    persist([])
  }, [persist])

  const total = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items])
  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items])

  return { items, addItem, removeItem, updateQty, clear, total, count }
}
