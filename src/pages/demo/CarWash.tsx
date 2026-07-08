import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"
import { DemoNavbar } from "@/components/demo/DemoNavbar"
import { DemoFooter } from "@/components/demo/DemoFooter"
import { BookingDialog } from "@/components/demo/BookingDialog"
import { ReviewsSection } from "@/components/demo/ReviewsSection"
import { FaqSection } from "@/components/demo/FaqSection"
import { useDemoAuth } from "@/hooks/useDemoAuth"

const CDN = "https://cdn.poehali.dev/projects/f80b7ca9-e4ab-4b58-a507-37f5b16b693e/files"

const packages = [
  {
    icon: "Droplets",
    title: "Экспресс-мойка",
    price: "500 ₽",
    time: "15 мин",
    features: ["Мойка кузова", "Обдув сушкой", "Мойка ковриков"],
  },
  {
    icon: "Sparkles",
    title: "Комплексная мойка",
    price: "1 200 ₽",
    time: "40 мин",
    features: ["Мойка кузова", "Химчистка салона", "Полировка стёкол", "Чернение шин"],
    highlighted: true,
  },
  {
    icon: "Gem",
    title: "Премиум-детейлинг",
    price: "3 500 ₽",
    time: "2 часа",
    features: ["Полная химчистка", "Нанополировка кузова", "Обработка дисков", "Ароматизация"],
  },
]

const subscriptions = [
  { icon: "CalendarDays", title: "Абонемент на месяц", price: "3 900 ₽", desc: "8 экспресс-моек в любое удобное время" },
  { icon: "Repeat", title: "Абонемент на квартал", price: "10 500 ₽", desc: "24 экспресс-мойки со скидкой 12%" },
  { icon: "Crown", title: "VIP-абонемент", price: "18 000 ₽", desc: "12 комплексных моек + 2 детейлинга в подарок" },
]

const reviews = [
  { name: "Наталья Ф.", rating: 5, date: "неделю назад", text: "Езжу на «Блеск» на Мира уже второй год, всегда чисто и быстро, даже в очередь редко попадаю." },
  { name: "Александр Р.", rating: 5, date: "3 недели назад", text: "Взял VIP-абонемент — реально выгодно, машина всегда как новая. Ребята аккуратно работают с салоном." },
  { name: "Екатерина М.", rating: 4, date: "месяц назад", text: "Хорошая мойка в Кургане, удобная запись через сайт, не нужно стоять и ждать вживую." },
]

const faq = [
  { question: "Нужна ли запись заранее?", answer: "Можно приехать без записи, но в выходные дни рекомендуем записаться через сайт, чтобы не ждать в очереди." },
  { question: "Какая химия используется?", answer: "Работаем только на профессиональной бесконтактной химии без агрессивных ПАВ — безопасно для лакокрасочного покрытия." },
  { question: "Можно ли купить абонемент в подарок?", answer: "Да, оформим подарочный сертификат на любой абонемент — отличный подарок для автовладельца." },
  { question: "Работаете ли вы в дождь и мороз?", answer: "Да, мойка крытая и отапливаемая, работаем круглый год без выходных, включая морозы до -30°C." },
]

export default function CarWash() {
  const auth = useDemoAuth("carwash")
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#08222B] text-white">
      <DemoNavbar
        brandName="Автомойка «Блеск»"
        brandIcon="Droplets"
        navLinks={[
          { href: "#packages", label: "Услуги" },
          { href: "#subscriptions", label: "Абонементы" },
          { href: "#reviews", label: "Отзывы" },
          { href: "#contact", label: "Контакты" },
        ]}
        user={auth.user}
        onLogin={auth.login}
        onRegister={auth.register}
        onLogout={auth.logout}
        accentClass="text-[#2DD4BF]"
      />

      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${CDN}/f4e4a051-d21b-48be-8f51-de11e8508040.jpg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08222B] via-[#08222B]/70 to-[#08222B]/30" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <Badge className="bg-[#2DD4BF]/15 text-[#2DD4BF] border-none mb-6 animate-fade-in-up">
            Курган, пр. Машиностроителей, 8 · Без выходных
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up animate-delay-100">
            Автомойка «Блеск»
          </h1>
          <p className="text-lg sm:text-xl text-white/70 mb-8 max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
            Работаем в Кургане с 2017 года на проспекте Машиностроителей. Крытый тёплый бокс, профессиональная химия
            и удобная онлайн-запись — экономим ваше время в любую погоду.
          </p>
          <Button
            size="lg"
            className="bg-[#2DD4BF] hover:bg-[#14B8A6] text-[#08222B] font-semibold animate-fade-in-up animate-delay-300"
            onClick={() => setBookingOpen(true)}
          >
            <Icon name="CalendarCheck" className="mr-2 h-5 w-5" />
            Записаться онлайн
          </Button>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Выберите пакет</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <Card
                key={pkg.title}
                className={`relative overflow-hidden transition-all duration-300 hover:-translate-y-2 animate-fade-in-up ${
                  pkg.highlighted
                    ? "border-[#2DD4BF] shadow-xl shadow-[#2DD4BF]/10 scale-105 bg-[#0F2E38]"
                    : "border-white/5 hover:shadow-lg bg-[#0F2E38]/60"
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {pkg.highlighted && (
                  <div className="absolute top-0 right-0 bg-[#2DD4BF] text-[#08222B] text-xs font-semibold px-3 py-1 rounded-bl-lg">
                    Популярный
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-[#2DD4BF]/10 text-[#2DD4BF]">
                    <Icon name={pkg.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-xl mb-1">{pkg.title}</h3>
                  <p className="text-sm text-white/40 mb-4">{pkg.time}</p>
                  <p className="text-3xl font-bold text-[#2DD4BF] mb-4">{pkg.price}</p>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-white/80">
                        <Icon name="Check" className="h-4 w-4 text-[#2DD4BF] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full bg-[#2DD4BF] hover:bg-[#14B8A6] text-[#08222B] font-semibold"
                    onClick={() => setBookingOpen(true)}
                  >
                    Записаться
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subscriptions */}
      <section id="subscriptions" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0F2E38]">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Абонементы — выгоднее разовых визитов</h2>
          <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
            Постоянным клиентам предлагаем абонементы со скидкой до 20% от разовой цены
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptions.map((s, i) => (
              <Card
                key={s.title}
                className="bg-[#08222B] border-white/5 hover:border-[#2DD4BF]/50 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-[#2DD4BF]/10 text-[#2DD4BF]">
                    <Icon name={s.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                  <p className="text-2xl font-bold text-[#2DD4BF] mb-2">{s.price}</p>
                  <p className="text-sm text-white/60">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-center">О нас</h2>
          <div className="space-y-4 text-white/70 leading-relaxed text-lg">
            <p>
              «Блеск» открылся в Кургане в 2017 году на проспекте Машиностроителей. За это время мы вымыли более
              50 000 автомобилей и стали одной из самых загруженных моек города — благодаря честному подходу и
              стабильному качеству.
            </p>
            <p>
              Бокс тёплый и крытый — работаем без выходных круглый год, включая морозы. Используем только
              профессиональную бесконтактную химию, бережную к лакокрасочному покрытию.
            </p>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0F2E38]">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Отзывы клиентов</h2>
          <ReviewsSection reviews={reviews} accentClass="text-[#2DD4BF]" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-10">Частые вопросы</h2>
          <FaqSection items={faq} />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0F2E38]">
        <div className="container mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <Icon name="MapPin" className="h-6 w-6 text-[#2DD4BF]" />
            <p className="text-sm text-white/70">Курган, пр. Машиностроителей, 8</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon name="Clock" className="h-6 w-6 text-[#2DD4BF]" />
            <p className="text-sm text-white/70">Ежедневно 7:00 - 23:00</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon name="Phone" className="h-6 w-6 text-[#2DD4BF]" />
            <p className="text-sm text-white/70">+7 3522 67-89-01</p>
          </div>
        </div>
      </section>

      <DemoFooter brandName="Автомойка «Блеск»" />

      <BookingDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        services={packages.map((p) => p.title)}
      />
    </div>
  )
}
