import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"
import { DemoNavbar } from "@/components/demo/DemoNavbar"
import { DemoFooter } from "@/components/demo/DemoFooter"
import { BookingDialog } from "@/components/demo/BookingDialog"
import { useDemoAuth } from "@/hooks/useDemoAuth"

const services = [
  {
    icon: "Wrench",
    title: "Диагностика двигателя",
    price: "от 1 500 ₽",
    desc: "Компьютерная диагностика всех систем автомобиля за 30 минут",
  },
  {
    icon: "Settings",
    title: "Замена масла и фильтров",
    price: "от 1 200 ₽",
    desc: "Полная замена масла, масляного и воздушного фильтров",
  },
  {
    icon: "CircleGauge",
    title: "Ремонт ходовой части",
    price: "от 3 000 ₽",
    desc: "Замена амортизаторов, рычагов, сайлентблоков",
  },
  {
    icon: "Disc3",
    title: "Замена тормозных колодок",
    price: "от 2 000 ₽",
    desc: "Диагностика и замена тормозных колодок и дисков",
  },
  {
    icon: "BatteryCharging",
    title: "Электрика и АКБ",
    price: "от 1 000 ₽",
    desc: "Диагностика проводки, замена и зарядка аккумулятора",
  },
  {
    icon: "Snowflake",
    title: "Заправка кондиционера",
    price: "от 1 800 ₽",
    desc: "Диагностика и заправка системы кондиционирования",
  },
]

const serviceNames = services.map((s) => s.title)

export default function AutoRepair() {
  const auth = useDemoAuth("autorepair")
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#0F1115] text-white">
      <DemoNavbar
        brandName="Автосервис «Профи»"
        brandIcon="Wrench"
        navLinks={[
          { href: "#services", label: "Услуги" },
          { href: "#about", label: "О нас" },
          { href: "#contact", label: "Контакты" },
        ]}
        user={auth.user}
        onLogin={auth.login}
        onRegister={auth.register}
        onLogout={auth.logout}
        accentClass="text-[#F59E0B]"
      />

      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url(https://cdn.poehali.dev/projects/f80b7ca9-e4ab-4b58-a507-37f5b16b693e/files/032593be-9039-4d11-b46a-27f202607dda.jpg)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-[#0F1115]/60 to-[#0F1115]/20" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <Badge className="bg-[#F59E0B]/20 text-[#F59E0B] border-none mb-6 animate-fade-in-up">
            Гарантия на все работы 12 месяцев
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up animate-delay-100">
            Автосервис «Профи»
          </h1>
          <p className="text-lg sm:text-xl text-white/70 mb-8 max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
            Честная диагностика и качественный ремонт любых авто. Работаем быстро, прозрачно и по делу.
          </p>
          <Button
            size="lg"
            className="bg-[#F59E0B] hover:bg-[#D97706] text-black font-semibold animate-fade-in-up animate-delay-300"
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
                className="bg-[#1A1D24] border-white/5 hover:border-[#F59E0B]/50 transition-all duration-300 hover:-translate-y-1 group animate-fade-in-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-[#F59E0B]/10 text-[#F59E0B] group-hover:bg-[#F59E0B] group-hover:text-black transition-all duration-300 group-hover:scale-110">
                    <Icon name={s.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                  <p className="text-sm text-white/60 mb-4 leading-relaxed">{s.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#F59E0B]">{s.price}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/10 hover:bg-[#F59E0B] hover:text-black hover:border-[#F59E0B]"
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
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1A1D24]">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">О нас</h2>
          <p className="text-white/70 leading-relaxed text-lg">
            Работаем с 2015 года. Наши мастера проходят регулярное обучение, а на все виды работ мы даём честную
            гарантию. Диагностика — бесплатно при последующем ремонте у нас.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <Icon name="MapPin" className="h-6 w-6 text-[#F59E0B]" />
            <p className="text-sm text-white/70">ул. Промышленная, 5</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon name="Clock" className="h-6 w-6 text-[#F59E0B]" />
            <p className="text-sm text-white/70">Пн-Сб 8:00 - 20:00</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon name="Phone" className="h-6 w-6 text-[#F59E0B]" />
            <p className="text-sm text-white/70">+7 900 234-56-78</p>
          </div>
        </div>
      </section>

      <DemoFooter brandName="Автосервис «Профи»" />

      <BookingDialog open={bookingOpen} onOpenChange={setBookingOpen} services={serviceNames} />
    </div>
  )
}
