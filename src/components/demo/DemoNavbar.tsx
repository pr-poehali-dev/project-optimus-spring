import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import Icon from "@/components/ui/icon"
import { AuthDialog } from "@/components/demo/AuthDialog"
import type { DemoUser } from "@/hooks/useDemoAuth"

interface DemoNavbarProps {
  brandName: string
  brandIcon: string
  navLinks: { href: string; label: string }[]
  user: DemoUser | null
  onLogin: (email: string, password: string) => DemoUser
  onRegister: (name: string, email: string, password: string) => DemoUser
  onLogout: () => void
  cartCount?: number
  onCartClick?: () => void
  accentClass?: string
}

export function DemoNavbar({
  brandName,
  brandIcon,
  navLinks,
  user,
  onLogin,
  onRegister,
  onLogout,
  cartCount,
  onCartClick,
  accentClass = "text-primary",
}: DemoNavbarProps) {
  const [authOpen, setAuthOpen] = useState(false)

  return (
    <>
      <nav className="sticky top-0 z-40 w-full bg-background/90 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <Link
                to="/"
                className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
              >
                <Icon name="ArrowLeft" className="h-3.5 w-3.5" />
                Портфолио
              </Link>
              <div className="flex items-center gap-2 font-bold text-lg truncate">
                <Icon name={brandIcon} className={`h-5 w-5 ${accentClass} shrink-0`} />
                <span className="truncate">{brandName}</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {onCartClick && (
                <Button variant="outline" size="icon" className="relative" onClick={onCartClick}>
                  <Icon name="ShoppingCart" className="h-4 w-4" />
                  {!!cartCount && cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center animate-in zoom-in">
                      {cartCount}
                    </span>
                  )}
                </Button>
              )}

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Icon name="UserCircle2" className="h-4 w-4" />
                      <span className="hidden sm:inline">{user.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem disabled className="opacity-70">
                      {user.email}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onLogout} className="text-destructive cursor-pointer">
                      <Icon name="LogOut" className="h-4 w-4 mr-2" />
                      Выйти
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button size="sm" onClick={() => setAuthOpen(true)}>
                  Войти
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AuthDialog
        open={authOpen}
        onOpenChange={setAuthOpen}
        onLogin={onLogin}
        onRegister={onRegister}
        brandName={brandName}
      />
    </>
  )
}
