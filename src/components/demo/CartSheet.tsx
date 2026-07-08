import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import Icon from "@/components/ui/icon"
import type { CartItem } from "@/hooks/useDemoCart"
import { useToast } from "@/hooks/use-toast"

interface CartSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: CartItem[]
  total: number
  onUpdateQty: (id: string, qty: number) => void
  onRemove: (id: string) => void
  onClear: () => void
}

export function CartSheet({ open, onOpenChange, items, total, onUpdateQty, onRemove, onClear }: CartSheetProps) {
  const { toast } = useToast()

  const handleCheckout = () => {
    toast({ title: "Заказ оформлен!", description: "Это демо-режим — реальный заказ не создан." })
    onClear()
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[420px] flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Icon name="ShoppingCart" className="h-5 w-5 text-primary" />
            Корзина
          </SheetTitle>
          <SheetDescription>Демо-режим: заказ не отправляется на сервер.</SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-muted-foreground">
            <Icon name="ShoppingCart" className="h-12 w-12 opacity-30" />
            <p>Корзина пуста</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 mt-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 items-center border-b border-border pb-4">
                  {item.image && (
                    <img src={item.image} alt={item.title} className="w-16 h-16 rounded-md object-cover" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7"
                        onClick={() => onUpdateQty(item.id, item.qty - 1)}
                      >
                        <Icon name="Minus" className="h-3 w-3" />
                      </Button>
                      <span className="text-sm w-6 text-center">{item.qty}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7"
                        onClick={() => onUpdateQty(item.id, item.qty + 1)}
                      >
                        <Icon name="Plus" className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => onRemove(item.id)}>
                    <Icon name="Trash2" className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex justify-between font-semibold text-lg">
                <span>Итого:</span>
                <span>{total} ₽</span>
              </div>
              <Button className="w-full" size="lg" onClick={handleCheckout}>
                Оформить заказ
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
