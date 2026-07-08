import { Link } from "react-router-dom"
import Icon from "@/components/ui/icon"

export function DemoFooter({ brandName }: { brandName: string }) {
  return (
    <footer className="border-t border-border bg-muted/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© 2026 {brandName}. Демо-сайт для портфолио.</p>
        <Link
          to="/"
          className="flex items-center gap-2 font-medium text-foreground hover:text-primary transition-colors"
        >
          <Icon name="Sparkles" className="h-4 w-4 text-primary" />
          Сайт создан студией ВебМастер
        </Link>
      </div>
    </footer>
  )
}
