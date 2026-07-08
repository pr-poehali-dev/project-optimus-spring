import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"
import { DemoNavbar } from "@/components/demo/DemoNavbar"
import { DemoFooter } from "@/components/demo/DemoFooter"
import { CartSheet } from "@/components/demo/CartSheet"
import { ReviewsSection } from "@/components/demo/ReviewsSection"
import { FaqSection } from "@/components/demo/FaqSection"
import { useDemoAuth } from "@/hooks/useDemoAuth"
import { useDemoCart } from "@/hooks/useDemoCart"

const CDN = "https://cdn.poehali.dev/projects/f80b7ca9-e4ab-4b58-a507-37f5b16b693e/files"

const menu = [
  { id: "cappuccino", title: "Капучино", price: 220, category: "Кофе", image: `${CDN}/4b77d6b0-3ea9-4a3c-b267-84abf68413e2.jpg`, desc: "Классический эспрессо с бархатной молочной пенкой" },
  { id: "latte", title: "Латте", price: 240, category: "Кофе", image: `${CDN}/4b77d6b0-3ea9-4a3c-b267-84abf68413e2.jpg`, desc: "Нежный кофейный напиток с большим количеством молока" },
  { id: "americano", title: "Американо", price: 180, category: "Кофе", image: `${CDN}/4b77d6b0-3ea9-4a3c-b267-84abf68413e2.jpg`, desc: "Крепкий чёрный кофе для бодрого начала дня" },
  { id: "raf", title: "Раф-кофе", price: 260, category: "Кофе", image: `${CDN}/4b77d6b0-3ea9-4a3c-b267-84abf68413e2.jpg`, desc: "Взбитые сливки с ванилью и эспрессо" },
  { id: "iced-latte", title: "Айс-латте", price: 250, category: "Холодное", image: `${CDN}/ac250a87-4d45-4941-a136-9790eb97f28c.jpg`, desc: "Освежающий кофе со льдом — идеален в жаркий день" },
  { id: "tea", title: "Чай с лимоном", price: 160, category: "Холодное", image: `${CDN}/c4f7b10a-1de5-4342-b418-40c4c9a46245.jpg`, desc: "Чёрный или зелёный чай с долькой лимона" },
  { id: "cocoa", title: "Горячий шоколад", price: 230, category: "Холодное", image: `${CDN}/a9681233-a958-4696-8691-b7c02ec15419.jpg`, desc: "Насыщенный какао со взбитыми сливками и маршмеллоу" },
  { id: "croissant", title: "Круассан", price: 190, category: "Выпечка", image: `${CDN}/d85c96e0-209f-4981-af0c-87774fd8b98a.jpg`, desc: "Свежая выпечка на сливочном масле, готовим каждое утро" },
  { id: "cinnamon-bun", title: "Булочка с корицей", price: 210, category: "Выпечка", image: `${CDN}/d85c96e0-209f-4981-af0c-87774fd8b98a.jpg`, desc: "Ароматная сдоба с корицей и карамельной глазурью" },
  { id: "muffin", title: "Черничный маффин", price: 200, category: "Выпечка", image: `${CDN}/5326a371-64e9-4c99-b1fb-c94b21b22e4b.jpg`, desc: "Нежный маффин с настоящей черникой" },
  { id: "sandwich", title: "Клаб-сэндвич", price: 320, category: "Выпечка", image: `${CDN}/14397bb2-2681-469d-8d86-5d4bd126dae5.jpg`, desc: "Сытный сэндвич с курицей и овощами — на завтрак или перекус" },
  { id: "cheesecake", title: "Чизкейк", price: 280, category: "Десерты", image: `${CDN}/e7a109d1-6353-45d9-8df8-37ed82102ed5.jpg`, desc: "Нежный чизкейк с ягодным соусом" },
  { id: "macaron", title: "Макаруны (3 шт)", price: 240, category: "Десерты", image: `${CDN}/f36420c7-18db-4a57-8a55-cd0197d52d35.jpg`, desc: "Французское пирожное миндального теста, разные вкусы" },
]

const categories = ["Все", "Кофе", "Холодное", "Выпечка", "Десерты"]

const reviews = [
  { name: "Анастасия К.", rating: 5, date: "2 недели назад", text: "Лучший раф в Кургане! Захожу почти каждое утро перед работой на Гоголя. Всегда свежая выпечка." },
  { name: "Дмитрий В.", rating: 5, date: "месяц назад", text: "Уютное место в центре города, приятная музыка и вежливые бариста. Обязательно попробуйте чизкейк." },
  { name: "Ольга П.", rating: 4, date: "3 недели назад", text: "Хорошая кофейня рядом с Центральным парком, удобно встречаться с подругами. Иногда бывает очередь по выходным." },
]

const faq = [
  { question: "Где вы находитесь?", answer: "Мы находимся в центре Кургана, на улице Гоголя, 42, в пяти минутах ходьбы от Центрального парка." },
  { question: "Есть ли доставка?", answer: "Да, доставляем по всему Кургану через партнёрские сервисы, а также можно оформить самовывоз через сайт со скидкой 5%." },
  { question: "Работает ли программа лояльности?", answer: "Да! Каждая 6-я чашка кофе — в подарок. Карта лояльности оформляется бесплатно при регистрации на сайте." },
  { question: "Можно ли забронировать столик для компании?", answer: "Конечно, напишите нам в Telegram или позвоните по указанному номеру — забронируем места на нужное время." },
]

export default function CoffeeShop() {
  const auth = useDemoAuth("coffee")
  const cart = useDemoCart("coffee")
  const [cartOpen, setCartOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("Все")

  const filtered = activeCategory === "Все" ? menu : menu.filter((m) => m.category === activeCategory)

  return (
    <div className="min-h-screen bg-[#F4F7F1] text-[#1C2B22]">
      <DemoNavbar
        brandName="Кофейня «Тепло»"
        brandIcon="Coffee"
        navLinks={[
          { href: "#menu", label: "Меню" },
          { href: "#about", label: "О нас" },
          { href: "#reviews", label: "Отзывы" },
          { href: "#contact", label: "Контакты" },
        ]}
        user={auth.user}
        onLogin={auth.login}
        onRegister={auth.register}
        onLogout={auth.logout}
        cartCount={cart.count}
        onCartClick={() => setCartOpen(true)}
        accentClass="text-[#2F5233]"
      />

      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${CDN}/f751a09a-bc88-4fff-8270-6f59b90f790e.jpg)` }}
        />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <Badge className="bg-[#2F5233]/10 text-[#2F5233] border-none mb-6 animate-fade-in-up">
            Курган, ул. Гоголя, 42 · Открыты с 8:00
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up animate-delay-100">
            Кофейня «Тепло»
          </h1>
          <p className="text-lg sm:text-xl text-[#1C2B22]/70 mb-8 max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
            С 2018 года варим настоящий кофе в самом сердце Кургана — рядом с Центральным парком. Своя обжарка,
            свежая выпечка каждое утро и атмосфера, в которую хочется возвращаться.
          </p>
          <Button size="lg" className="bg-[#2F5233] hover:bg-[#24401F] text-white animate-fade-in-up animate-delay-300" asChild>
            <a href="#menu">Смотреть меню</a>
          </Button>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">Наше меню</h2>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-[#2F5233] text-white shadow-lg scale-105"
                    : "bg-white text-[#1C2B22]/70 hover:bg-[#2F5233]/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <Card
                key={item.id}
                className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white animate-fade-in-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-[#1C2B22]/60 mb-4 leading-relaxed">{item.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">{item.price} ₽</span>
                    <Button
                      size="sm"
                      className="bg-[#2F5233] hover:bg-[#24401F] text-white gap-1"
                      onClick={() => cart.addItem({ id: item.id, title: item.title, price: item.price, image: item.image })}
                    >
                      <Icon name="Plus" className="h-3.5 w-3.5" />В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-center">О нас</h2>
          <div className="space-y-4 text-[#1C2B22]/70 leading-relaxed text-lg">
            <p>
              «Тепло» открылось в 2018 году на улице Гоголя — в самом центре Кургана, всего в пяти минутах ходьбы от
              Центрального парка. Мы начинали с маленькой стойки на 12 квадратных метров, а сегодня это уютное
              пространство на 40 посадочных мест, куда куряне приходят на утренний кофе, деловые встречи и посиделки
              с друзьями.
            </p>
            <p>
              Зерно обжариваем сами на собственной мини-обжарочной машине, а выпечку готовим каждое утро с нуля —
              никакой заморозки. По выходным собираем очередь из постоянных гостей за свежими круассанами.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 text-center">
            <div>
              <p className="text-3xl font-bold text-[#2F5233]">2018</p>
              <p className="text-sm text-[#1C2B22]/60">Год открытия</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#2F5233]">40</p>
              <p className="text-sm text-[#1C2B22]/60">Посадочных мест</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#2F5233]">15 000+</p>
              <p className="text-sm text-[#1C2B22]/60">Довольных гостей</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#2F5233]">4.8</p>
              <p className="text-sm text-[#1C2B22]/60">Рейтинг на картах</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Отзывы гостей</h2>
          <ReviewsSection reviews={reviews} accentClass="text-[#2F5233]" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-10">Частые вопросы</h2>
          <FaqSection items={faq} />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <Icon name="MapPin" className="h-6 w-6 text-[#2F5233]" />
            <p className="text-sm text-[#1C2B22]/70">Курган, ул. Гоголя, 42</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon name="Clock" className="h-6 w-6 text-[#2F5233]" />
            <p className="text-sm text-[#1C2B22]/70">Ежедневно 8:00 - 22:00</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon name="Phone" className="h-6 w-6 text-[#2F5233]" />
            <p className="text-sm text-[#1C2B22]/70">+7 3522 45-67-89</p>
          </div>
        </div>
      </section>

      <DemoFooter brandName="Кофейня «Тепло»" />

      <CartSheet
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={cart.items}
        total={cart.total}
        onUpdateQty={cart.updateQty}
        onRemove={cart.removeItem}
        onClear={cart.clear}
      />
    </div>
  )
}
