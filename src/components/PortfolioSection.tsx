import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "Автомойка «Блеск»",
    category: "Сайт-визитка для автосервиса",
    image: "/autopoetsbedrijf-tahsin-project.png",
    description:
      "Современный сайт для автомойки с онлайн-записью, ценами и услугами. Клиенты выбирают удобное время прямо на сайте — поток заявок вырос в разы.",
    url: "#",
    tags: ["Онлайн-запись", "Адаптивный дизайн", "Быстрая загрузка"],
  },
  {
    title: "Ремонт квартир «Профи»",
    category: "Лендинг под услугу",
    image: "/professional-corporate-website.png",
    description:
      "Продающая страница для бригады по ремонту. Портфолио работ, калькулятор стоимости и форма заявки. Клиенты приходят из поиска по своему городу.",
    url: "#",
    tags: ["Лендинг", "Форма заявки", "SEO"],
  },
  {
    title: "Салон красоты «Мята»",
    category: "Сайт для салона",
    image: "/restaurant-website-design.png",
    description:
      "Стильный сайт салона с прайсом, галереей работ мастеров и записью онлайн. Кнопки WhatsApp и Telegram для быстрой связи с клиентами.",
    url: "#",
    tags: ["Онлайн-запись", "Галерея", "WhatsApp"],
  },
  {
    title: "Кофейня «Тепло»",
    category: "Сайт-визитка для кафе",
    image: "/modern-ecommerce-website.png",
    description:
      "Уютный сайт для локальной кофейни с меню, картой проезда и акциями. Помогает гостям легко найти заведение и узнать о новинках.",
    url: "#",
    tags: ["Меню", "Карта", "Мобильная версия"],
  },
]

export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance">Мои работы</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Примеры сайтов, которые я сделал для местного бизнеса. Каждый из них помогает своему владельцу находить новых клиентов.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="gap-2"
                    onClick={() => window.open(project.url, "_blank")}
                  >
                    Открыть проект <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-sm text-primary font-semibold mb-2">{project.category}</p>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
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