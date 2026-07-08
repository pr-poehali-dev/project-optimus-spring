function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21.05 3.76 2.7 10.86c-1.24.5-1.23 1.2-.23 1.51l4.7 1.47 1.8 5.5c.22.6.37.85.75.85.3 0 .43-.14.6-.3l1.7-1.66 4.75 3.5c.57.32 1 .16 1.14-.53l3.2-15.1c.2-.9-.35-1.3-1.06-1.34ZM9.6 15.5l-.44-3.2 8.7-7.85c.4-.34-.1-.5-.63-.16l-10.6 6.7-2.7-.85 13.1-5.06-2.3 12.75-3.9-2.9-1.23 1.57Z" />
    </svg>
  )
}

function VkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.5 18.9c-6.1 0-9.6-4.2-9.7-11.1h2.9c.1 5.2 2.4 7.4 4.2 7.9V7.8h2.8v4.4c1.8-.2 3.6-2.2 4.2-4.4h2.7c-.5 2.7-2.5 4.7-3.9 5.5 1.4.6 3.7 2.4 4.5 5.6h-3c-.7-2.1-2.3-3.7-4.5-3.9v3.9h-.2Z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ВебМастер</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Создаю сайты для бизнеса в вашем городе.
              <br />
              2025. Все права защищены.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  О нас
                </a>
              </li>
              <li>
                <a href="#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Услуги
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Портфолио
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Мы в соцсетях</h4>
            <div className="flex gap-4">
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all hover:scale-110"
              >
                <TelegramIcon className="h-5 w-5" />
                <span className="sr-only">Telegram</span>
              </a>
              <a
                href="https://vk.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all hover:scale-110"
              >
                <VkIcon className="h-5 w-5" />
                <span className="sr-only">ВКонтакте</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}