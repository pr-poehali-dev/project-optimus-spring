import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const projects = [
  {
    title: "Кофейня «Тепло»",
    category: "Сайт-визитка для кафе",
    image: "https://cdn.poehali.dev/projects/f80b7ca9-e4ab-4b58-a507-37f5b16b693e/files/f751a09a-bc88-4fff-8270-6f59b90f790e.jpg",
    description:
      "Уютный сайт для кофейни с меню, онлайн-заказом и корзиной. Гости выбирают напитки и десерты прямо на сайте.",
    url: "/demo/coffee-shop",
    tags: ["Каталог", "Корзина", "Регистрация"],
  },
  {
    title: "Автосервис «Профи»",
    category: "Сайт для автомастерской",
    image: "https://cdn.poehali.dev/projects/f80b7ca9-e4ab-4b58-a507-37f5b16b693e/files/032593be-9039-4d11-b46a-27f202607dda.jpg",
    description:
      "Сайт с полным перечнем услуг, ценами и онлайн-записью на диагностику. Клиенты выбирают удобное время сами.",
    url: "/demo/auto-repair",
    tags: ["Онлайн-запись", "Каталог услуг", "Личный кабинет"],
  },
  {
    title: "Автомойка «Блеск»",
    category: "Сайт-визитка для автомойки",
    image: "https://cdn.poehali.dev/projects/f80b7ca9-e4ab-4b58-a507-37f5b16b693e/files/f4e4a051-d21b-48be-8f51-de11e8508040.jpg",
    description:
      "Сайт с тарифами на мойку и детейлинг, онлайн-записью на удобное время и авторизацией клиентов.",
    url: "/demo/car-wash",
    tags: ["Тарифы", "Онлайн-запись", "Адаптивный дизайн"],
  },
  {
    title: "TechStore",
    category: "Интернет-магазин",
    image: "https://cdn.poehali.dev/projects/f80b7ca9-e4ab-4b58-a507-37f5b16b693e/files/97e71d9a-201e-4b54-b4a5-45d4b4641dd8.jpg",
    description:
      "Полноценный интернет-магазин с каталогом, фильтрами по категориям, корзиной и регистрацией покупателей.",
    url: "/demo/online-shop",
    tags: ["Каталог", "Корзина", "Регистрация"],
  },
]

export function PortfolioSection() {
  const navigate = useNavigate()

  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance">Мои работы</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Примеры сайтов, которые я сделал для местного бизнеса. Каждый из них — рабочая демоверсия с регистрацией и корзиной, кликните и попробуйте сами.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-none shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(project.url)}
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="gap-2"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(project.url)
                    }}
                  >
                    Открыть проект <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-sm text-primary font-semibold mb-2">{project.category}</p>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}