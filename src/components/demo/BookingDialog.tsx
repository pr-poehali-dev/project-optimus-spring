import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Icon from "@/components/ui/icon"
import { useToast } from "@/hooks/use-toast"

interface BookingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  services: string[]
  triggerless?: boolean
  accentClass?: string
}

const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"]

export function BookingDialog({ open, onOpenChange, services }: BookingDialogProps) {
  const { toast } = useToast()
  const [form, setForm] = useState({ name: "", phone: "", service: services[0] || "", date: "", time: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Запись оформлена!",
      description: `${form.service} — ${form.date} в ${form.time}. Демо-режим: заявка не отправлена.`,
    })
    onOpenChange(false)
    setForm({ name: "", phone: "", service: services[0] || "", date: "", time: "" })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="CalendarCheck" className="h-5 w-5 text-primary" />
            Онлайн-запись
          </DialogTitle>
          <DialogDescription>Демо-режим: заявка сохранится только на экране, без отправки.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="booking-name">Имя *</Label>
            <Input
              id="booking-name"
              required
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Ваше имя"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="booking-phone">Телефон *</Label>
            <Input
              id="booking-phone"
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              placeholder="+7 900 123-45-67"
            />
          </div>
          <div className="space-y-2">
            <Label>Услуга *</Label>
            <Select value={form.service} onValueChange={(v) => setForm((p) => ({ ...p, service: v }))}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите услугу" />
              </SelectTrigger>
              <SelectContent>
                {services.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="booking-date">Дата *</Label>
              <Input
                id="booking-date"
                type="date"
                required
                value={form.date}
                onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Время *</Label>
              <Select value={form.time} onValueChange={(v) => setForm((p) => ({ ...p, time: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Время" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" className="w-full" size="lg">
            Записаться
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
