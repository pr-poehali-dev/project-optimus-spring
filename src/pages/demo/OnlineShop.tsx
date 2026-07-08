import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Icon from "@/components/ui/icon"
import { DemoNavbar } from "@/components/demo/DemoNavbar"
import { DemoFooter } from "@/components/demo/DemoFooter"
import { CartSheet } from "@/components/demo/CartSheet"
import { ReviewsSection } from "@/components/demo/ReviewsSection"
import { FaqSection } from "@/components/demo/FaqSection"
import { useDemoAuth } from "@/hooks/useDemoAuth"
import { useDemoCart } from "@/hooks/useDemoCart"

const CDN = "https://cdn.poehali.dev/projects/f80b7ca9-e4ab-4b58-a507-37f5b16b693e/files"

const products = [
  { id: "headphones", title: "Беспроводные наушники", price: 4990, oldPrice: 6990, category: "Электроника", rating: 4.8, reviews: 214, image: `${CDN}/2768a0f2-cd1a-4b46-a76a-d9e791fe296d.jpg`, badge: "Хит продаж" },
  { id: "smartwatch", title: "Умные часы", price: 7990, oldPrice: null, category: "Электроника", rating: 4.6, reviews: 132, image: `${CDN}/7be509f1-08fb-41a3-9bb2-26d7c45c67ce.jpg`, badge: "Новинка" },
  { id: "speaker", title: "Bluetooth-колонка", price: 3490, oldPrice: 4200, category: "Электроника", rating: 4.7, reviews: 98, image: `${CDN}/2040a017-6566-479b-803c-42ed86055734.jpg`, badge: null },
  { id: "powerbank", title: "Портативный аккумулятор", price: 1990, oldPrice: null, category: "Электроника", rating: 4.5, reviews: 76, image: `${CDN}/cfcd01e3-f6cd-4fe4-a36b-561b775e6a5a.jpg`, badge: null },
  { id: "mouse", title: "Игровая мышь", price: 2490, oldPrice: 2990, category: "Электроника", rating: 4.9, reviews: 145, image: `${CDN}/04c51a7d-dfa2-4f73-b296-7a0ba85b44de.jpg`, badge: "-17%" },
  { id: "keyboard", title: "Механическая клавиатура", price: 5990, oldPrice: null, category: "Электроника", rating: 4.7, reviews: 87, image: `${CDN}/3f60aaea-b9b1-4103-8c97-73b29cfc8731.jpg`, badge: null },
  { id: "earbuds", title: "Беспроводные наушники-капли", price: 3290, oldPrice: 3990, category: "Электроника", rating: 4.4, reviews: 63, image: `${CDN}/f0c4cd14-038d-4a03-a891-74aff6b460ea.jpg`, badge: null },
  { id: "wireless-mouse", title: "Мышь + подставка для ноутбука", price: 2190, oldPrice: null, category: "Электроника", rating: 4.3, reviews: 41, image: `${CDN}/fd53f28e-1c6e-415f-aa2b-a65901098cd1.jpg`, badge: null },
  { id: "sneakers", title: "Стильные кроссовки", price: 5490, oldPrice: 7000, category: "Обувь", rating: 4.6, reviews: 189, image: `${CDN}/6b9e4626-b979-41d9-8a12-02254899686e.jpg`, badge: "-22%" },
  { id: "running-shoes", title: "Кроссовки для бега", price: 4790, oldPrice: null, category: "Обувь", rating: 4.8, reviews: 156, image: `${CDN}/cea0fb99-9fc9-45ed-a32c-806bf85b0d98.jpg`, badge: "Хит продаж" },
  { id: "backpack", title: "Городской рюкзак", price: 3290, oldPrice: null, category: "Аксессуары", rating: 4.5, reviews: 102, image: `${CDN}/8e39a0b9-98af-44b2-9fde-143fd02d3129.jpg`, badge: null },
  { id: "handbag", title: "Женская сумка", price: 4290, oldPrice: 5200, category: "Аксессуары", rating: 4.7, reviews: 88, image: `${CDN}/f576fd7e-c1c8-4e29-9fbf-205dcaeadc87.jpg`, badge: null },
  { id: "wallet", title: "Кожаный кошелёк", price: 1590, oldPrice: null, category: "Аксессуары", rating: 4.6, reviews: 74, image: `${CDN}/202e2073-564f-482e-9846-25b5de27f966.jpg`, badge: null },
  { id: "sunglasses", title: "Солнцезащитные очки", price: 1890, oldPrice: 2400, category: "Аксессуары", rating: 4.4, reviews: 59, image: `${CDN}/2f82d3be-21c2-41e5-aefd-f3e0da19b028.jpg`, badge: "-21%" },
  { id: "cap", title: "Бейсболка", price: 990, oldPrice: null, category: "Аксессуары", rating: 4.3, reviews: 47, image: `${CDN}/2dbc1552-ae49-4466-96a3-4387f6239522.jpg`, badge: null },
  { id: "jacket", title: "Зимняя куртка", price: 8990, oldPrice: 11000, category: "Одежда", rating: 4.8, reviews: 121, image: `${CDN}/74f065bd-08f0-46d7-9177-0fa35da5325a.jpg`, badge: "-18%" },
  { id: "hoodie", title: "Худи оверсайз", price: 2790, oldPrice: null, category: "Одежда", rating: 4.6, reviews: 93, image: `${CDN}/eb975cdd-a4f2-4f45-b63c-2002ac6d9a45.jpg`, badge: "Новинка" },
  { id: "yoga-mat", title: "Коврик для йоги", price: 1490, oldPrice: null, category: "Спорт и дом", rating: 4.5, reviews: 68, image: `${CDN}/fcdb0b42-7742-4bcf-a57f-57ffcd9398b0.jpg`, badge: null },
  { id: "bottle", title: "Спортивная бутылка", price: 690, oldPrice: null, category: "Спорт и дом", rating: 4.4, reviews: 52, image: `${CDN}/ff0fd905-33a2-4d6c-8388-37f930602bc0.jpg`, badge: null },
  { id: "kettle", title: "Электрический чайник", price: 2390, oldPrice: 2890, category: "Спорт и дом", rating: 4.7, reviews: 84, image: `${CDN}/fe8de5d7-6e74-4058-ae58-844b64c673c0.jpg`, badge: null },
  { id: "lamp", title: "Настольная лампа", price: 1690, oldPrice: null, category: "Спорт и дом", rating: 4.5, reviews: 39, image: `${CDN}/6cce43cc-9676-4550-bbac-2b1a9145af24.jpg`, badge: null },
  { id: "organizer", title: "Органайзер для стола", price: 890, oldPrice: null, category: "Спорт и дом", rating: 4.3, reviews: 28, image: `${CDN}/073368c0-e6eb-4c9f-beba-e73df4379990.jpg`, badge: null },
]

const categories = ["Все", "Электроника", "Обувь", "Одежда", "Аксессуары", "Спорт и дом"]

type SortKey = "popular" | "price-asc" | "price-desc" | "rating"

const reviews = [
  { name: "Кирилл Б.", rating: 5, date: "неделю назад", text: "Заказывал наушники с доставкой по Кургану — привезли на следующий день, всё оригинальное, с гарантией." },
  { name: "Полина Д.", rating: 5, date: "2 недели назад", text: "TechStore на Ленина — удобно забирать самовывозом после работы, всегда есть в наличии то, что нужно." },
  { name: "Артём Н.", rating: 4, date: "месяц назад", text: "Хороший выбор гаджетов для курганцев, цены не выше, чем в федеральных сетях. Буду заказывать ещё." },
]

const faq = [
  { question: "Как быстро доставляют по Кургану?", answer: "Доставка по Кургану — в день заказа при оформлении до 15:00, по области — 1-2 дня." },
  { question: "Можно ли забрать заказ самому?", answer: "Да, самовывоз доступен из нашего шоурума на улице Ленина, 55 — сразу после подтверждения заказа." },
  { question: "Даёте ли гарантию на товары?", answer: "На всю электронику — официальная гарантия производителя от 12 до 24 месяцев, чек и документы приложим к заказу." },
  { question: "Можно ли вернуть товар?", answer: "Да, действует 14 дней на возврат при сохранении товарного вида и упаковки согласно закону о защите прав потребителей." },
]

export default function OnlineShop() {
  const auth = useDemoAuth("shop")
  const cart = useDemoCart("shop")
  const [cartOpen, setCartOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("Все")
  const [sortKey, setSortKey] = useState<SortKey>("popular")

  const filtered = useMemo(() => {
    const list = activeCategory === "Все" ? products : products.filter((p) => p.category === activeCategory)
    const sorted = [...list]
    if (sortKey === "price-asc") sorted.sort((a, b) => a.price - b.price)
    else if (sortKey === "price-desc") sorted.sort((a, b) => b.price - a.price)
    else if (sortKey === "rating") sorted.sort((a, b) => b.rating - a.rating)
    else sorted.sort((a, b) => b.reviews - a.reviews)
    return sorted
  }, [activeCategory, sortKey])

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <DemoNavbar
        brandName="TechStore"
        brandIcon="ShoppingBag"
        navLinks={[
          { href: "#catalog", label: "Каталог" },
          { href: "#about", label: "О магазине" },
          { href: "#reviews", label: "Отзывы" },
          { href: "#contact", label: "Контакты" },
        ]}
        user={auth.user}
        onLogin={auth.login}
        onRegister={auth.register}
        onLogout={auth.logout}
        cartCount={cart.count}
        onCartClick={() => setCartOpen(true)}
        accentClass="text-orange-600"
      />

      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <Badge className="bg-orange-100 text-orange-700 border-none mb-6 animate-fade-in-up">
            Курган, ул. Ленина, 55 · Доставка в день заказа
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up animate-delay-100">
            Технологии для вашей жизни
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
            Работаем в Кургане с 2019 года. Гаджеты, обувь, одежда и товары для дома от проверенных брендов —
            с официальной гарантией и доставкой по всему городу.
          </p>
          <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white animate-fade-in-up animate-delay-300" asChild>
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

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-orange-600 text-white shadow-lg scale-105"
                      : "bg-slate-100 text-slate-600 hover:bg-orange-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <Select value={sortKey} onValueChange={(v) => setSortKey(v as SortKey)}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">По популярности</SelectItem>
                <SelectItem value="rating">По рейтингу</SelectItem>
                <SelectItem value="price-asc">Сначала дешевле</SelectItem>
                <SelectItem value="price-desc">Сначала дороже</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <Card
                key={product.id}
                className="group overflow-hidden border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${(i % 8) * 0.05}s` }}
              >
                <div className="relative aspect-square overflow-hidden bg-slate-50">
                  {product.badge && (
                    <Badge className="absolute top-3 left-3 z-10 bg-orange-600 text-white border-none">
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
                  <h3 className="font-semibold mb-1 truncate">{product.title}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Icon name="Star" className="h-3.5 w-3.5 text-orange-500 fill-current" />
                    <span className="text-xs font-medium">{product.rating}</span>
                    <span className="text-xs text-slate-400">({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-bold text-lg text-orange-600">{product.price} ₽</span>
                    {product.oldPrice && (
                      <span className="text-sm text-slate-400 line-through">{product.oldPrice} ₽</span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white gap-1"
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
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-center">О магазине</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
            <p>
              TechStore работает в Кургане с 2019 года — начинали с небольшого отдела гаджетов на Ленина, а сегодня
              это полноценный шоурум с более чем 20 категориями товаров: от наушников до курток и товаров для дома.
            </p>
            <p>
              Продаём только оригинальные товары с официальной гарантией. Доставка по Кургану — в день заказа,
              по области — 1-2 дня. Всегда можно приехать и посмотреть товар вживую перед покупкой.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 text-center">
            <div>
              <p className="text-3xl font-bold text-orange-600">2019</p>
              <p className="text-sm text-slate-500">Год открытия</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-orange-600">20+</p>
              <p className="text-sm text-slate-500">Категорий товаров</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-orange-600">8 000+</p>
              <p className="text-sm text-slate-500">Довольных покупателей</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-orange-600">4.7</p>
              <p className="text-sm text-slate-500">Средний рейтинг</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Отзывы покупателей</h2>
          <ReviewsSection reviews={reviews} accentClass="text-orange-600" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-10">Частые вопросы</h2>
          <FaqSection items={faq} />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <Icon name="MapPin" className="h-6 w-6 text-orange-600" />
            <p className="text-sm text-slate-600">Курган, ул. Ленина, 55</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon name="Truck" className="h-6 w-6 text-orange-600" />
            <p className="text-sm text-slate-600">Доставка по всей области</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon name="Phone" className="h-6 w-6 text-orange-600" />
            <p className="text-sm text-slate-600">+7 3522 78-90-12</p>
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
