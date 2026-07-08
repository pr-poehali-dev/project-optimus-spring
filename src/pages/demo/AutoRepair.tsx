import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Icon from "@/components/ui/icon"
import { DemoNavbar } from "@/components/demo/DemoNavbar"
import { DemoFooter } from "@/components/demo/DemoFooter"
import { BookingDialog } from "@/components/demo/BookingDialog"
import { ReviewsSection } from "@/components/demo/ReviewsSection"
import { FaqSection } from "@/components/demo/FaqSection"
import { useDemoAuth } from "@/hooks/useDemoAuth"

const CDN = "https://cdn.poehali.dev/projects/f80b7ca9-e4ab-4b58-a507-37f5b16b693e/files"

const services = [
  { icon: "Wrench", title: "Диагностика двигателя", price: "от 1 500 ₽", desc: "Компьютерная диагностика всех систем автомобиля за 30 минут" },
  { icon: "Settings", title: "Замена масла и фильтров", price: "от 1 200 ₽", desc: "Полная замена масла, масляного и воздушного фильтров" },
  { icon: "CircleGauge", title: "Ремонт ходовой части", price: "от 3 000 ₽", desc: "Замена амортизаторов, рычагов, сайлентблоков" },
  { icon: "Disc3", title: "Замена тормозных колодок", price: "от 2 000 ₽", desc: "Диагностика и замена тормозных колодок и дисков" },
  { icon: "BatteryCharging", title: "Электрика и АКБ", price: "от 1 000 ₽", desc: "Диагностика проводки, замена и зарядка аккумулятора" },
  { icon: "Snowflake", title: "Заправка кондиционера", price: "от 1 800 ₽", desc: "Диагностика и заправка системы кондиционирования" },
  { icon: "Gauge", title: "Развал-схождение", price: "от 1 800 ₽", desc: "Компьютерная регулировка углов установки колёс" },
  { icon: "Cog", title: "Ремонт КПП и сцепления", price: "от 5 000 ₽", desc: "Диагностика и ремонт механических и автоматических коробок" },
  { icon: "Flame", title: "Ремонт выхлопной системы", price: "от 2 500 ₽", desc: "Замена глушителей, катализаторов, гофр" },
]

const serviceNames = services.map((s) => s.title)

const masters = [
  { name: "Сергей Иванов", role: "Мастер-диагност, стаж 14 лет", speciality: "Двигатели и электроника" },
  { name: "Андрей Кузнецов", role: "Мастер по ходовой, стаж 10 лет", speciality: "Подвеска и тормозная система" },
  { name: "Максим Петров", role: "Мастер КПП, стаж 9 лет", speciality: "Коробки передач и сцепление" },
]

const reviews = [
  { name: "Игорь С.", rating: 5, date: "неделю назад", text: "Приезжаю в «Профи» с 2019 года, на Промышленной. Всегда честно скажут, что реально нужно менять, а что подождёт." },
  { name: "Роман Т.", rating: 5, date: "2 недели назад", text: "Сделали развал-схождение и поменяли колодки быстро, без разводов на доп.услуги. Рекомендую куряновцам." },
  { name: "Виктория Л.", rating: 4, date: "месяц назад", text: "Хороший сервис, удобная онлайн-запись через сайт — не пришлось звонить и стоять в живой очереди." },
]

const faq = [
  { question: "Сколько длится диагностика?", answer: "Компьютерная диагностика занимает около 30 минут, полная диагностика ходовой — до часа." },
  { question: "Нужна ли предварительная запись?", answer: "Да, рекомендуем записываться заранее через сайт или по телефону — так вы не будете ждать в очереди." },
  { question: "Даёте ли вы гарантию на работы?", answer: "Да, на все виды ремонта действует гарантия 12 месяцев или 15 000 км пробега." },
  { question: "Работаете ли вы с иномарками?", answer: "Да, обслуживаем как отечественные автомобили, так и все популярные иномарки, включая азиатские и европейские марки." },
]

export default function AutoRepair() {
  const auth = useDemoAuth("autorepair")
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#0B1220] text-white">
      <DemoNavbar
        brandName="Автосервис «Профи»"
        brandIcon="Wrench"
        navLinks={[
          { href: "#services", label: "Услуги" },
          { href: "#masters", label: "Мастера" },
          { href: "#reviews", label: "Отзывы" },
          { href: "#contact", label: "Контакты" },
        ]}
        user={auth.user}
        onLogin={auth.login}
        onRegister={auth.register}
        onLogout={auth.logout}
        accentClass="text-[#38BDF8]"
      />

      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${CDN}/032593be-9039-4d11-b46a-27f202607dda.jpg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/70 to-[#0B1220]/30" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <Badge className="bg-[#38BDF8]/15 text-[#38BDF8] border-none mb-6 animate-fade-in-up">
            Курган, ул. Промышленная, 5 · Гарантия 12 месяцев
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up animate-delay-100">
            Автосервис «Профи»
          </h1>
          <p className="text-lg sm:text-xl text-white/70 mb-8 max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
            С 2015 года ремонтируем автомобили курганцев честно и по делу. Собственный цех на Промышленной, опытная
            команда мастеров и понятные цены без скрытых доплат.
          </p>
          <Button
            size="lg"
            className="bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#0B1220] font-semibold animate-fade-in-up animate-delay-300"
            onClick={() => setBookingOpen(true)}
          >
            <Icon name="CalendarCheck" className="mr-2 h-5 w-5" />
            Записаться на диагностику
          </Button>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Наши услуги</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <Card
                key={s.title}
                className="bg-[#111827] border-white/5 hover:border-[#38BDF8]/50 transition-all duration-300 hover:-translate-y-1 group animate-fade-in-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-[#38BDF8]/10 text-[#38BDF8] group-hover:bg-[#38BDF8] group-hover:text-[#0B1220] transition-all duration-300 group-hover:scale-110">
                    <Icon name={s.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                  <p className="text-sm text-white/60 mb-4 leading-relaxed">{s.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#38BDF8]">{s.price}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/10 hover:bg-[#38BDF8] hover:text-[#0B1220] hover:border-[#38BDF8]"
                      onClick={() => setBookingOpen(true)}
                    >
                      Записаться
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#111827]">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-center">О нас</h2>
          <div className="space-y-4 text-white/70 leading-relaxed text-lg">
            <p>
              Автосервис «Профи» работает в Кургане с 2015 года. Начинали с небольшого поста на два подъёмника, а
              сегодня у нас собственный цех на улице Промышленной с современным диагностическим оборудованием и
              командой из 8 мастеров.
            </p>
            <p>
              Мы принципиально не накручиваем список работ — если деталь ещё послужит, мы так и скажем. Именно
              поэтому большинство клиентов приходят к нам по рекомендации соседей и коллег.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 text-center">
            <div>
              <p className="text-3xl font-bold text-[#38BDF8]">2015</p>
              <p className="text-sm text-white/60">Год основания</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#38BDF8]">8</p>
              <p className="text-sm text-white/60">Мастеров в команде</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#38BDF8]">6 000+</p>
              <p className="text-sm text-white/60">Отремонтированных авто</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#38BDF8]">12 мес</p>
              <p className="text-sm text-white/60">Гарантия на работы</p>
            </div>
          </div>
        </div>
      </section>

      {/* Masters */}
      <section id="masters" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Наша команда</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {masters.map((m, i) => (
              <Card
                key={m.name}
                className="bg-[#111827] border-white/5 text-center hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <CardContent className="p-6 flex flex-col items-center">
                  <Avatar className="h-16 w-16 mb-4">
                    <AvatarFallback className="bg-[#38BDF8]/10 text-[#38BDF8] text-xl font-bold">
                      {m.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg">{m.name}</h3>
                  <p className="text-sm text-[#38BDF8] mb-2">{m.role}</p>
                  <p className="text-sm text-white/60">{m.speciality}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#111827]">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Отзывы клиентов</h2>
          <ReviewsSection reviews={reviews} accentClass="text-[#38BDF8]" />
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
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#111827]">
        <div className="container mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <Icon name="MapPin" className="h-6 w-6 text-[#38BDF8]" />
            <p className="text-sm text-white/70">Курган, ул. Промышленная, 5</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon name="Clock" className="h-6 w-6 text-[#38BDF8]" />
            <p className="text-sm text-white/70">Пн-Сб 8:00 - 20:00</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon name="Phone" className="h-6 w-6 text-[#38BDF8]" />
            <p className="text-sm text-white/70">+7 3522 56-78-90</p>
          </div>
        </div>
      </section>

      <DemoFooter brandName="Автосервис «Профи»" />

      <BookingDialog open={bookingOpen} onOpenChange={setBookingOpen} services={serviceNames} />
    </div>
  )
}
