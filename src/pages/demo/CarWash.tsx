import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"
import { DemoNavbar } from "@/components/demo/DemoNavbar"
import { DemoFooter } from "@/components/demo/DemoFooter"
import { BookingDialog } from "@/components/demo/BookingDialog"
import { useDemoAuth } from "@/hooks/useDemoAuth"

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

export default function CarWash() {
  const auth = useDemoAuth("carwash")
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F0F9FF] text-[#0C4A6E]">
      <DemoNavbar
        brandName="Автомойка «Блеск»"
        brandIcon="Droplets"
        navLinks={[
          { href: "#packages", label: "Услуги" },
          { href: "#about", label: "О нас" },
          { href: "#contact", label: "Контакты" },
        ]}
        user={auth.user}
        onLogin={auth.login}
        onRegister={auth.register}
        onLogout={auth.logout}
        accentClass="text-[#0284C7]"
      />

      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url(https://cdn.poehali.dev/projects/f80b7ca9-e4ab-4b58-a507-37f5b16b693e/files/f4e4a051-d21b-48be-8f51-de11e8508040.jpg)",
          }}
        />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <Badge className="bg-[#0284C7]/10 text-[#0284C7] border-none mb-6 animate-fade-in-up">
            Работаем без выходных
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up animate-delay-100">
            Автомойка «Блеск»
          </h1>
          <p className="text-lg sm:text-xl text-[#0C4A6E]/70 mb-8 max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
            Быстро и качественно приведём ваш автомобиль в порядок. Онлайн-запись экономит ваше время.
          </p>
          <Button
            size="lg"
            className="bg-[#0284C7] hover:bg-[#0369A1] text-white animate-fade-in-up animate-delay-300"
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
                    ? "border-[#0284C7] shadow-xl scale-105 bg-white"
                    : "border-[#0284C7]/10 hover:shadow-lg bg-white/70"
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {pkg.highlighted && (
                  <div className="absolute top-0 right-0 bg-[#0284C7] text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                    Популярный
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-[#0284C7]/10 text-[#0284C7]">
                    <Icon name={pkg.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-xl mb-1">{pkg.title}</h3>
                  <p className="text-sm text-[#0C4A6E]/50 mb-4">{pkg.time}</p>
                  <p className="text-3xl font-bold text-[#0284C7] mb-4">{pkg.price}</p>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Icon name="Check" className="h-4 w-4 text-[#0284C7] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full bg-[#0284C7] hover:bg-[#0369A1] text-white"
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

      {/* About */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">О нас</h2>
          <p className="text-[#0C4A6E]/70 leading-relaxed text-lg">
            Используем только качественную бесконтактную химию и профессиональное оборудование. Заботимся о вашем
            автомобиле как о своём.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <Icon name="MapPin" className="h-6 w-6 text-[#0284C7]" />
            <p className="text-sm text-[#0C4A6E]/70">пр. Мира, 8</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon name="Clock" className="h-6 w-6 text-[#0284C7]" />
            <p className="text-sm text-[#0C4A6E]/70">Ежедневно 7:00 - 23:00</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon name="Phone" className="h-6 w-6 text-[#0284C7]" />
            <p className="text-sm text-[#0C4A6E]/70">+7 900 345-67-89</p>
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
