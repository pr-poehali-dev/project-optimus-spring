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

const products = [
  {
    id: "headphones",
    title: "Беспроводные наушники",
    price: 4990,
    oldPrice: 6990,
    category: "Электроника",
    image: "https://cdn.poehali.dev/projects/f80b7ca9-e4ab-4b58-a507-37f5b16b693e/files/2768a0f2-cd1a-4b46-a76a-d9e791fe296d.jpg",
    badge: "Хит продаж",
  },
  {
    id: "smartwatch",
    title: "Умные часы",
    price: 7990,
    oldPrice: null,
    category: "Электроника",
    image: "https://cdn.poehali.dev/projects/f80b7ca9-e4ab-4b58-a507-37f5b16b693e/files/7be509f1-08fb-41a3-9bb2-26d7c45c67ce.jpg",
    badge: "Новинка",
  },
  {
    id: "sneakers",
    title: "Стильные кроссовки",
    price: 5490,
    oldPrice: 7000,
    category: "Обувь",
    image: "https://cdn.poehali.dev/projects/f80b7ca9-e4ab-4b58-a507-37f5b16b693e/files/6b9e4626-b979-41d9-8a12-02254899686e.jpg",
    badge: "-22%",
  },
  {
    id: "backpack",
    title: "Городской рюкзак",
    price: 3290,
    oldPrice: null,
    category: "Аксессуары",
    image: "https://cdn.poehali.dev/projects/f80b7ca9-e4ab-4b58-a507-37f5b16b693e/files/8e39a0b9-98af-44b2-9fde-143fd02d3129.jpg",
    badge: null,
  },
]

const categories = ["Все", "Электроника", "Обувь", "Аксессуары"]

export default function OnlineShop() {
  const auth = useDemoAuth("shop")
  const cart = useDemoCart("shop")
  const [cartOpen, setCartOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("Все")

  const filtered = activeCategory === "Все" ? products : products.filter((p) => p.category === activeCategory)

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <DemoNavbar
        brandName="TechStore"
        brandIcon="ShoppingBag"
        navLinks={[
          { href: "#catalog", label: "Каталог" },
          { href: "#about", label: "О магазине" },
          { href: "#contact", label: "Контакты" },
        ]}
        user={auth.user}
        onLogin={auth.login}
        onRegister={auth.register}
        onLogout={auth.logout}
        cartCount={cart.count}
        onCartClick={() => setCartOpen(true)}
        accentClass="text-violet-600"
      />

      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-violet-50 to-white">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <Badge className="bg-violet-100 text-violet-700 border-none mb-6 animate-fade-in-up">
            Бесплатная доставка от 3 000 ₽
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up animate-delay-100">
            Технологии для вашей жизни
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
            Гаджеты, обувь и аксессуары от проверенных брендов с гарантией и быстрой доставкой по городу.
          </p>
          <Button
            size="lg"
            className="bg-violet-600 hover:bg-violet-700 text-white animate-fade-in-up animate-delay-300"
            asChild
          >
            <a href="#catalog">
              Смотреть каталог
              <Icon name="ArrowRight" className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">Каталог товаров</h2>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-violet-600 text-white shadow-lg scale-105"
                    : "bg-slate-100 text-slate-600 hover:bg-violet-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <Card
                key={product.id}
                className="group overflow-hidden border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="relative aspect-square overflow-hidden bg-slate-50">
                  {product.badge && (
                    <Badge className="absolute top-3 left-3 z-10 bg-violet-600 text-white border-none">
                      {product.badge}
                    </Badge>
                  )}
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="text-xs text-slate-400 mb-1">{product.category}</p>
                  <h3 className="font-semibold mb-2 truncate">{product.title}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-bold text-lg text-violet-600">{product.price} ₽</span>
                    {product.oldPrice && (
                      <span className="text-sm text-slate-400 line-through">{product.oldPrice} ₽</span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white gap-1"
                    onClick={() =>
                      cart.addItem({ id: product.id, title: product.title, price: product.price, image: product.image })
                    }
                  >
                    <Icon name="ShoppingCart" className="h-3.5 w-3.5" />В корзину
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">О магазине</h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            Продаём только оригинальные товары с официальной гарантией. Доставка по городу — в течение суток,
            по стране — 2-5 дней.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <Icon name="Truck" className="h-6 w-6 text-violet-600" />
            <p className="text-sm text-slate-600">Доставка по всей стране</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon name="ShieldCheck" className="h-6 w-6 text-violet-600" />
            <p className="text-sm text-slate-600">Гарантия на все товары</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon name="Phone" className="h-6 w-6 text-violet-600" />
            <p className="text-sm text-slate-600">+7 900 456-78-90</p>
          </div>
        </div>
      </section>

      <DemoFooter brandName="TechStore" />

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
