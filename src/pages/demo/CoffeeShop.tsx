import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"
import { DemoNavbar } from "@/components/demo/DemoNavbar"
import { DemoFooter } from "@/components/demo/DemoFooter"
import { CartSheet } from "@/components/demo/CartSheet"
import { useDemoAuth } from "@/hooks/useDemoAuth"
import { useDemoCart } from "@/hooks/useDemoCart"

const menu = [
  {
    id: "cappuccino",
    title: "Капучино",
    price: 220,
    category: "Кофе",
    image: "https://cdn.poehali.dev/projects/f80b7ca9-e4ab-4b58-a507-37f5b16b693e/files/4b77d6b0-3ea9-4a3c-b267-84abf68413e2.jpg",
    desc: "Классический эспрессо с бархатной молочной пенкой",
  },
  {
    id: "latte",
    title: "Латте",
    price: 240,
    category: "Кофе",
    image: "https://cdn.poehali.dev/projects/f80b7ca9-e4ab-4b58-a507-37f5b16b693e/files/4b77d6b0-3ea9-4a3c-b267-84abf68413e2.jpg",
    desc: "Нежный кофейный напиток с большим количеством молока",
  },
  {
    id: "americano",
    title: "Американо",
    price: 180,
    category: "Кофе",
    image: "https://cdn.poehali.dev/projects/f80b7ca9-e4ab-4b58-a507-37f5b16b693e/files/4b77d6b0-3ea9-4a3c-b267-84abf68413e2.jpg",
    desc: "Крепкий чёрный кофе для бодрого начала дня",
  },
  {
    id: "croissant",
    title: "Круассан",
    price: 190,
    category: "Выпечка",
    image: "https://cdn.poehali.dev/projects/f80b7ca9-e4ab-4b58-a507-37f5b16b693e/files/d85c96e0-209f-4981-af0c-87774fd8b98a.jpg",
    desc: "Свежая выпечка на сливочном масле, готовим каждое утро",
  },
  {
    id: "cinnamon-bun",
    title: "Булочка с корицей",
    price: 210,
    category: "Выпечка",
    image: "https://cdn.poehali.dev/projects/f80b7ca9-e4ab-4b58-a507-37f5b16b693e/files/d85c96e0-209f-4981-af0c-87774fd8b98a.jpg",
    desc: "Ароматная сдоба с корицей и карамельной глазурью",
  },
  {
    id: "cheesecake",
    title: "Чизкейк",
    price: 280,
    category: "Десерты",
    image: "https://cdn.poehali.dev/projects/f80b7ca9-e4ab-4b58-a507-37f5b16b693e/files/e7a109d1-6353-45d9-8df8-37ed82102ed5.jpg",
    desc: "Нежный чизкейк с ягодным соусом",
  },
]

const categories = ["Все", "Кофе", "Выпечка", "Десерты"]

export default function CoffeeShop() {
  const auth = useDemoAuth("coffee")
  const cart = useDemoCart("coffee")
  const [cartOpen, setCartOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("Все")

  const filtered = activeCategory === "Все" ? menu : menu.filter((m) => m.category === activeCategory)

  return (
    <div className="min-h-screen bg-[#FBF6EF] text-[#3D2B1F]">
      <DemoNavbar
        brandName="Кофейня «Тепло»"
        brandIcon="Coffee"
        navLinks={[
          { href: "#menu", label: "Меню" },
          { href: "#about", label: "О нас" },
          { href: "#contact", label: "Контакты" },
        ]}
        user={auth.user}
        onLogin={auth.login}
        onRegister={auth.register}
        onLogout={auth.logout}
        cartCount={cart.count}
        onCartClick={() => setCartOpen(true)}
        accentClass="text-[#B45309]"
      />

      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage:
              "url(https://cdn.poehali.dev/projects/f80b7ca9-e4ab-4b58-a507-37f5b16b693e/files/f751a09a-bc88-4fff-8270-6f59b90f790e.jpg)",
          }}
        />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <Badge className="bg-[#B45309]/10 text-[#B45309] border-none mb-6 animate-fade-in-up">
            Открыты каждый день с 8:00
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up animate-delay-100">
            Кофейня «Тепло»
          </h1>
          <p className="text-lg sm:text-xl text-[#3D2B1F]/70 mb-8 max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
            Уютное место рядом с домом, где варят настоящий кофе и пекут свежую выпечку каждое утро.
          </p>
          <Button
            size="lg"
            className="bg-[#B45309] hover:bg-[#92400E] text-white animate-fade-in-up animate-delay-300"
            asChild
          >
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
                    ? "bg-[#B45309] text-white shadow-lg scale-105"
                    : "bg-white text-[#3D2B1F]/70 hover:bg-[#B45309]/10"
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
                  <p className="text-sm text-[#3D2B1F]/60 mb-4 leading-relaxed">{item.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">{item.price} ₽</span>
                    <Button
                      size="sm"
                      className="bg-[#B45309] hover:bg-[#92400E] text-white gap-1"
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
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">О нас</h2>
          <p className="text-[#3D2B1F]/70 leading-relaxed text-lg">
            Мы обжариваем зерна сами и печём выпечку каждое утро с нуля. Заходите за чашкой хорошего настроения —
            здесь всегда тепло, уютно и пахнет свежим кофе.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <Icon name="MapPin" className="h-6 w-6 text-[#B45309]" />
            <p className="text-sm text-[#3D2B1F]/70">ул. Центральная, 12</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon name="Clock" className="h-6 w-6 text-[#B45309]" />
            <p className="text-sm text-[#3D2B1F]/70">Ежедневно 8:00 - 22:00</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon name="Phone" className="h-6 w-6 text-[#B45309]" />
            <p className="text-sm text-[#3D2B1F]/70">+7 900 123-45-67</p>
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
