import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Layout, Palette, Code, Share2, Target, Search } from "lucide-react"

const services = [
  {
    icon: Layout,
    title: "Сайт-визитка",
    description:
      "Компактный сайт, который расскажет о вашей компании, услугах и ценах. Идеально для мастеров, салонов, магазинов и небольших фирм, которым нужно заявить о себе в интернете.",
  },
  {
    icon: Code,
    title: "Лендинг под услугу",
    description:
      "Продающая одностраничная страница, которая превращает посетителей в заявки. Отлично подходит для конкретной услуги, акции или запуска нового направления бизнеса.",
  },
  {
    icon: Palette,
    title: "Дизайн под ваш бренд",
    description:
      "Разработаю фирменный стиль под ваш бизнес — цвета, шрифты, логотип. Сайт будет выглядеть современно и запоминаться клиентам с первого взгляда.",
  },
  {
    icon: Search,
    title: "SEO для вашего города",
    description:
      "Настрою сайт так, чтобы вас находили в поиске люди из вашего города. «Ремонт квартир в [городе]», «мастер маникюра рядом» — клиенты придут сами.",
  },
  {
    icon: Share2,
    title: "Связь с клиентами",
    description:
      "Подключу форму заявки, кнопки WhatsApp и Telegram, звонок в один клик. Клиенту будет удобно связаться с вами, а вам — не упустить ни одну заявку.",
  },
  {
    icon: Target,
    title: "Поддержка и правки",
    description:
      "Не бросаю сайт после запуска. Обновлю тексты, добавлю новые услуги, поправлю что нужно. Ваш сайт всегда будет актуальным и рабочим.",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 animate-pulse" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mx-auto block w-fit">
          Мои услуги
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 text-balance">
          Чем я <span className="text-primary">помогу</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty leading-relaxed text-lg">
          Создам для вашего бизнеса сайт, который работает: привлекает клиентов из вашего города и приносит заявки.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-background/50 backdrop-blur-sm"
            >
              <CardHeader>
                <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <service.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}