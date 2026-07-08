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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Icon from "@/components/ui/icon"
import { useToast } from "@/hooks/use-toast"
import type { DemoUser } from "@/hooks/useDemoAuth"

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLogin: (email: string, password: string) => DemoUser
  onRegister: (name: string, email: string, password: string) => DemoUser
  brandName: string
}

export function AuthDialog({ open, onOpenChange, onLogin, onRegister, brandName }: AuthDialogProps) {
  const { toast } = useToast()
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const user = onLogin(loginData.email, loginData.password)
    toast({ title: `С возвращением, ${user.name}!`, description: "Вы успешно вошли в аккаунт." })
    onOpenChange(false)
    setLoginData({ email: "", password: "" })
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    const user = onRegister(registerData.name, registerData.email, registerData.password)
    toast({ title: `Добро пожаловать, ${user.name}!`, description: "Регистрация прошла успешно." })
    onOpenChange(false)
    setRegisterData({ name: "", email: "", password: "" })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="UserCircle2" className="h-5 w-5 text-primary" />
            {brandName}
          </DialogTitle>
          <DialogDescription>Демо-режим: данные сохраняются только в вашем браузере.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="mt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">E-mail</Label>
                <Input
                  id="login-email"
                  type="email"
                  required
                  value={loginData.email}
                  onChange={(e) => setLoginData((p) => ({ ...p, email: e.target.value }))}
                  placeholder="your@email.ru"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Пароль</Label>
                <Input
                  id="login-password"
                  type="password"
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData((p) => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                />
              </div>
              <Button type="submit" className="w-full">
                Войти
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Имя</Label>
                <Input
                  id="register-name"
                  required
                  value={registerData.name}
                  onChange={(e) => setRegisterData((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Ваше имя"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">E-mail</Label>
                <Input
                  id="register-email"
                  type="email"
                  required
                  value={registerData.email}
                  onChange={(e) => setRegisterData((p) => ({ ...p, email: e.target.value }))}
                  placeholder="your@email.ru"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Пароль</Label>
                <Input
                  id="register-password"
                  type="password"
                  required
                  value={registerData.password}
                  onChange={(e) => setRegisterData((p) => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                />
              </div>
              <Button type="submit" className="w-full">
                Создать аккаунт
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
