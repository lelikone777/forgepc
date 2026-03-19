import { Link } from "react-router-dom";
import { AnimatedSection, AnimatedItem } from "../components/AnimatedSection";
import { motion } from "framer-motion";
import {
  Gamepad2, Monitor, Cpu, Palette, Brain, Bot, Cog, Thermometer,
  Shield, Wrench, Zap, Eye, Star, ChevronRight, ArrowRight,
  Server, HardDrive, Fan, Box, CircuitBoard, BatteryCharging,
  Check, Quote
} from "lucide-react";

const taskCards = [
  { icon: Gamepad2, title: "Под современные AAA-игры", desc: "Высокий FPS, стабильная работа, запас по мощности" },
  { icon: Monitor, title: "Под высокий FPS и стриминг", desc: "Производительность в игре и в трансляции одновременно" },
  { icon: Palette, title: "Под монтаж, графику и 3D", desc: "Быстрый рендер, работа с тяжёлыми проектами и многозадачность" },
  { icon: Cpu, title: "Под разработку и локальный ИИ", desc: "Надёжность под долгие нагрузки и профессиональные задачи" },
  { icon: Brain, title: "Под тяжёлые рабочие сценарии", desc: "Запуск локальных моделей, генерация, инференс, работа с нейросетями" },
  { icon: Thermometer, title: "Под тихую и холодную работу", desc: "Оптимальное охлаждение без компромиссов по шуму" },
];

const qualityPoints = [
  { icon: Shield, text: "Точная совместимость комплектующих" },
  { icon: Wrench, text: "Чистая и аккуратная сборка" },
  { icon: Fan, text: "Оптимальное охлаждение и воздушные потоки" },
  { icon: Zap, text: "Стресс-тесты перед выдачей" },
  { icon: Cog, text: "Настройка BIOS и системы" },
  { icon: ArrowRight, text: "Потенциал для будущего апгрейда" },
];

const useCards = [
  { icon: Gamepad2, title: "Для игр", desc: "Высокий FPS, стабильная работа, запас по мощности" },
  { icon: Monitor, title: "Для стриминга", desc: "Производительность в игре и в трансляции одновременно" },
  { icon: Palette, title: "Для монтажа и дизайна", desc: "Быстрый рендер, работа с тяжёлыми проектами и многозадачность" },
  { icon: Cpu, title: "Для 3D и разработки", desc: "Надёжность под долгие нагрузки и профессиональные задачи" },
  { icon: Brain, title: "Для локального ИИ", desc: "Запуск локальных моделей, генерация, инференс, работа с нейросетями" },
  { icon: Bot, title: "Для ИИ-агентов и автоматизации", desc: "Разработка, тестирование, контейнеры, базы данных, векторные индексы" },
];

const configParts = [
  { icon: Cpu, label: "Процессор" },
  { icon: Monitor, label: "Видеокарта" },
  { icon: HardDrive, label: "Оперативная память" },
  { icon: Server, label: "Накопитель" },
  { icon: CircuitBoard, label: "Материнская плата" },
  { icon: BatteryCharging, label: "Блок питания" },
  { icon: Box, label: "Корпус" },
  { icon: Fan, label: "Охлаждение" },
];

const games = [
  "Counter-Strike 2", "ARC Raiders", "Resident Evil 9", "Cyberpunk 2077",
  "Warzone", "Dota 2", "Apex Legends", "Black Myth: Wukong",
  "Alan Wake 2", "S.T.A.L.K.E.R. 2", "GTA VI ready", "Forza Horizon 5",
  "Red Dead Redemption 2", "Fortnite", "Escape from Tarkov", "Helldivers 2",
];

const programs = [
  "Blender", "Unreal Engine 5", "Adobe Premiere Pro", "DaVinci Resolve",
  "After Effects", "Photoshop", "AutoCAD", "3ds Max", "Houdini",
  "Docker", "PyTorch", "Stable Diffusion", "ComfyUI", "Ollama",
];

const aiCards = [
  "Локальные нейросети и LLM", "Stable Diffusion и ComfyUI",
  "Разработка ИИ-агентов", "Python и ML-стек",
  "Docker и контейнеризация", "Unreal Engine и 3D",
  "Видеомонтаж и рендер", "Многозадачная профессиональная работа",
];

const builds = [
  { tier: "Старт", price: "от 85 000 ₽", desc: "Для уверенного Full HD-гейминга", specs: "RTX 4060 • Ryzen 5 • 16 ГБ" },
  { tier: "Оптимум", price: "от 135 000 ₽", desc: "Баланс цены и мощности", specs: "RTX 4070 Super • Ryzen 7 • 32 ГБ" },
  { tier: "Производительность", price: "от 195 000 ₽", desc: "Для высоких настроек и серьёзных задач", specs: "RTX 5070 Ti • Core Ultra 7 • 32 ГБ" },
  { tier: "Премиум", price: "от 320 000 ₽", desc: "Максимум возможностей без компромиссов", specs: "RTX 5080 • Core Ultra 9 • 64 ГБ" },
  { tier: "ИИ и рабочие станции", price: "от 400 000 ₽", desc: "Для локального ИИ и тяжёлых рабочих процессов", specs: "RTX 5090 • Ryzen 9 • 128 ГБ" },
];

const brands = [
  "ASUS", "MSI", "GIGABYTE", "NVIDIA", "AMD", "Intel", "Kingston", "Corsair",
  "DeepCool", "be quiet!", "Samsung", "WD Black", "Lian Li", "NZXT", "ASRock",
  "Noctua", "Fractal Design", "Cooler Master", "Seasonic", "Crucial",
];

const processSteps = [
  { num: "01", title: "Подбор конфигурации", desc: "Определяем задачи, бюджет и ожидаемую производительность" },
  { num: "02", title: "Подготовка комплектующих", desc: "Подбираем совместимые и оптимальные компоненты" },
  { num: "03", title: "Сборка и кабель-менеджмент", desc: "Собираем аккуратно, чисто и с правильной организацией" },
  { num: "04", title: "Тестирование", desc: "Проверяем температуры, стабильность и работу под нагрузкой" },
  { num: "05", title: "Настройка", desc: "Подготавливаем систему к запуску, обновляем и оптимизируем" },
  { num: "06", title: "Передача клиенту", desc: "Ты получаешь готовую к работе систему" },
];

const advantages = [
  "Подбор под реальные задачи, а не по шаблону",
  "Прозрачная логика выбора комплектующих",
  "Аккуратная сборка и чистый кабель-менеджмент",
  "Проверка совместимости и тестирование",
  "Современные комплектующие",
  "Поддержка и консультация после покупки",
  "Конфигурации под игры, работу, ИИ и тяжёлые вычисления",
  "Грамотный баланс видеокарты, процессора, памяти и охлаждения",
];

const reviews = [
  { text: "Получил именно ту производительность, на которую рассчитывал. Всё работает тихо, быстро и стабильно.", author: "Алексей М." },
  { text: "Очень понравилась аккуратность сборки и то, как помогли подобрать конфиг без переплаты.", author: "Дмитрий К." },
  { text: "Компьютер выглядит дорого, а в играх показывает отличный результат.", author: "Максим В." },
  { text: "Подобрали систему под локальные модели и тяжёлые рабочие задачи, всё работает очень уверенно.", author: "Анна С." },
];

const faqItems = [
  { q: "Можно ли собрать ПК под мой бюджет?", a: "Да, можно подобрать конфигурацию под конкретную сумму." },
  { q: "Можно ли собрать ПК под конкретную игру или программу?", a: "Да, можно подобрать сборку под конкретные игры и рабочие задачи." },
  { q: "Вы проверяете совместимость комплектующих?", a: "Да, каждая конфигурация подбирается с учётом совместимости." },
  { q: "Будет ли ПК протестирован перед выдачей?", a: "Да, система проходит тестирование перед передачей клиенту." },
  { q: "Можно ли потом улучшить сборку?", a: "Да, сборка может иметь понятный потенциал для будущего апгрейда." },
  { q: "Можно ли собрать ПК под локальный ИИ и нейросети?", a: "Да, можно собрать ПК под локальные модели, генерацию и инференс." },
  { q: "Подойдут ли ваши сборки для разработки ИИ-агентов?", a: "Да, можно собрать систему под ИИ-агентов, контейнеры, базы данных, Python-стек и тяжёлую многозадачную работу." },
];

import { useState } from "react";

export default function Index() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [fpsGame, setFpsGame] = useState(0);

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/30" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }} />
        <div className="relative container mx-auto px-4 pt-32 pb-20 text-center">
          <AnimatedSection>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display leading-[0.95] mb-6">
              Максимум мощности.
              <br />
              <span className="gradient-text">Собран под тебя.</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
              Кастомные ПК на заказ для игр, стриминга, работы, монтажа, 3D, разработки, локального ИИ и тяжёлых задач. Точный подбор комплектующих, современный дизайн сборки, тестирование и производительность без компромиссов.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/configurator"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all glow-primary"
              >
                Собрать свой ПК <ArrowRight size={20} />
              </Link>
              <Link
                to="/catalog"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass-surface font-semibold text-lg text-foreground hover:bg-accent transition-all"
              >
                Посмотреть готовые сборки
              </Link>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.45}>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground font-mono-spec">
              {["RTX 50 Series", "AMD Ryzen", "Intel Core Ultra", "Гарантия", "Стресс-тесты", "Чистая сборка"].map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-full border border-border bg-card/50">{t}</span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* МОЩНОСТЬ */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display mb-4">Мощность, которую видно сразу.</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Каждая сборка проектируется под реальные задачи. Без случайных комплектующих, без слабых звеньев, без переплаты за ненужное.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {taskCards.map((card, i) => (
              <AnimatedItem key={i} delay={i * 0.08}>
                <div className="p-6 rounded-2xl bg-card border border-border shadow-card-hover group cursor-default h-full">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                    <card.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{card.title}</h3>
                  <p className="text-muted-foreground text-sm">{card.desc}</p>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </section>

      {/* КАЧЕСТВО */}
      <section className="section-padding bg-card/50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display mb-4">
                Не просто компьютер.
                <br />
                <span className="gradient-text">Продуманная система.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Мы собираем ПК так, как собирали бы для себя: с вниманием к совместимости, охлаждению, шуму, кабель-менеджменту, стабильности питания и удобству дальнейшего апгрейда.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {qualityPoints.map((p, i) => (
              <AnimatedItem key={i} delay={i * 0.07}>
                <div className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <p.icon size={20} className="text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{p.text}</span>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </section>

      {/* ПОДБОР ПОД ЗАДАЧУ */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display mb-4">Подбираем не по шаблону, а под твою задачу.</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                Игровой ПК, рабочая станция, универсальная домашняя система, сборка для стриминга, система для разработки ИИ-агентов или мощная машина для 3D и тяжёлых вычислений — конфигурация должна подходить именно под твои сценарии.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCards.map((card, i) => (
              <AnimatedItem key={i} delay={i * 0.08}>
                <div className="relative p-6 rounded-2xl bg-card border border-border shadow-card-hover group overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                      <card.icon size={24} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground">{card.title}</h3>
                    <p className="text-muted-foreground text-sm">{card.desc}</p>
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </section>

      {/* ПРЕВЬЮ КОНФИГУРАТОРА */}
      <section className="section-padding bg-card/50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-display mb-4">Собери свою конфигурацию.</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Выбирай процессор, видеокарту, память, накопители, корпус и охлаждение. Смотри итоговую цену, сравнивай варианты и подбирай систему, которая подходит именно тебе.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl p-6 md:p-10 shadow-card-hover">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {configParts.map((p, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-accent/50 border border-border hover:border-primary/30 transition-colors cursor-default group"
                  >
                    <p.icon size={28} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm font-medium text-foreground">{p.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Цена обновляется в реальном времени", "Проверка совместимости", "Подбор под игру и бюджет", "Подбор под рабочие задачи", "Подбор под локальный ИИ"].map((t) => (
                  <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-accent text-accent-foreground border border-border">{t}</span>
                ))}
              </div>
              <Link
                to="/configurator"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                Открыть полный конфигуратор <ChevronRight size={18} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FPS СЕКЦИЯ */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-display mb-4">
                Видно не только по характеристикам.
                <br />
                <span className="gradient-text">Видно в реальных задачах.</span>
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                Ориентируйся не только на список комплектующих, но и на ожидаемую производительность в современных играх и рабочих программах.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Игры</h3>
              <div className="flex flex-wrap gap-2">
                {games.map((g, i) => (
                  <button
                    key={g}
                    onClick={() => setFpsGame(i)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      fpsGame === i
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {[
                { label: "Full HD 1080p", fps: "240+" },
                { label: "2K 1440p", fps: "165+" },
                { label: "4K 2160p", fps: "90+" },
              ].map((r) => (
                <div key={r.label} className="p-6 rounded-2xl bg-card border border-border text-center">
                  <p className="text-sm text-muted-foreground mb-2">{r.label}</p>
                  <p className="text-4xl font-mono-spec font-bold text-primary">{r.fps}</p>
                  <p className="text-xs text-muted-foreground mt-1">FPS</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Программы</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {programs.map((p) => (
                  <span key={p} className="px-3 py-1.5 rounded-lg bg-card border border-border text-sm text-muted-foreground">{p}</span>
                ))}
              </div>
              <p className="text-xs text-muted-foreground italic">
                Показатели FPS и производительности являются ориентировочными и зависят от настроек, разрешения, сцены нагрузки, версии ПО и конкретной конфигурации.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ИИ И ТЯЖЁЛЫЕ ЗАДАЧИ */}
      <section className="section-padding bg-card/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }} />
        <div className="container mx-auto px-4 relative">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display mb-4">
                Не только игры.
                <br />
                <span className="gradient-text">Система для реальной тяжёлой работы.</span>
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                Подберём конфигурацию для запуска локальных моделей, генерации изображений, разработки ИИ-агентов, работы с Python-стеком, контейнерами, рендером, 3D, монтажом, симуляциями и многозадачными окружениями.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {aiCards.map((card, i) => (
              <AnimatedItem key={i} delay={i * 0.06}>
                <div className="p-5 rounded-xl bg-card border border-border shadow-card-hover text-center group h-full flex items-center justify-center min-h-[100px]">
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">{card}</span>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </section>

      {/* ГОТОВЫЕ СБОРКИ */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display mb-4">Готовые сборки, с которых можно начать.</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Подобрали популярные конфигурации под разный бюджет и задачи. Можно выбрать готовый вариант или использовать его как основу для своей кастомной сборки.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {builds.map((b, i) => (
              <AnimatedItem key={i} delay={i * 0.08}>
                <div className="p-6 rounded-2xl bg-card border border-border shadow-card-hover flex flex-col h-full">
                  <h3 className="font-semibold text-lg text-foreground mb-1">{b.tier}</h3>
                  <p className="text-2xl font-bold text-primary font-mono-spec mb-2">{b.price}</p>
                  <p className="text-sm text-muted-foreground mb-3">{b.desc}</p>
                  <p className="text-xs text-muted-foreground font-mono-spec mb-6">{b.specs}</p>
                  <div className="mt-auto flex gap-2">
                    <Link to="/catalog" className="flex-1 text-center px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                      Подробнее
                    </Link>
                    <Link to="/configurator" className="flex-1 text-center px-3 py-2 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-accent transition-colors">
                      Кастомизировать
                    </Link>
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </section>

      {/* ЦЕНЫ */}
      <section className="section-padding bg-card/50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display mb-4">
                Понятные цены.
                <br />
                <span className="gradient-text">Честный подбор.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Стоимость зависит от задач, комплектующих и уровня производительности. Мы не перегружаем сборку лишним, а подбираем то, что действительно даёт результат.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "Базовые игровые", price: "85 000 — 120 000 ₽", desc: "Для уверенного старта и популярных игр" },
              { title: "Продвинутые игровые", price: "130 000 — 200 000 ₽", desc: "Для высоких настроек и запаса по мощности" },
              { title: "Премиальные сборки", price: "200 000 — 400 000 ₽", desc: "Для максимального FPS и флагманского железа" },
              { title: "Рабочие станции и ИИ", price: "от 350 000 ₽", desc: "Для локальных моделей, рендера и тяжёлых вычислений" },
            ].map((p, i) => (
              <AnimatedItem key={i} delay={i * 0.08}>
                <div className="p-6 rounded-2xl bg-card border border-border shadow-card-hover text-center h-full flex flex-col">
                  <h3 className="font-semibold text-lg text-foreground mb-2">{p.title}</h3>
                  <p className="text-xl font-bold text-primary font-mono-spec mb-3">{p.price}</p>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </AnimatedItem>
            ))}
          </div>
          <AnimatedSection delay={0.3}>
            <p className="text-center text-sm text-muted-foreground mt-8">
              Можно собрать ПК под конкретный бюджет или подобрать лучший вариант в нужном диапазоне стоимости.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* БРЕНДЫ */}
      <section className="section-padding overflow-hidden">
        <div className="container mx-auto px-4 mb-10">
          <AnimatedSection>
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-display mb-4">Работаем с лучшими брендами индустрии.</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Используем современные комплектующие и проверенные решения от ведущих производителей.
              </p>
            </div>
          </AnimatedSection>
        </div>
        <div className="relative overflow-hidden py-6">
          <div className="marquee-track">
            {[...brands, ...brands].map((b, i) => (
              <span
                key={i}
                className="inline-flex items-center justify-center px-8 py-3 mx-2 rounded-xl bg-card border border-border text-muted-foreground font-semibold text-sm whitespace-nowrap hover:text-primary hover:border-primary/30 transition-colors"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ПРОЦЕСС */}
      <section className="section-padding bg-card/50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display mb-4">Как рождается твой ПК.</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Каждая сборка проходит путь от подбора комплектующих до финального тестирования.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((s, i) => (
              <AnimatedItem key={i} delay={i * 0.08}>
                <div className="p-6 rounded-2xl bg-card border border-border shadow-card-hover h-full">
                  <span className="text-3xl font-mono-spec font-bold text-primary/30">{s.num}</span>
                  <h3 className="font-semibold text-lg text-foreground mt-2 mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </section>

      {/* ВНЕШНИЙ ВИД */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display mb-4">
                Снаружи — эффектно.
                <br />
                <span className="gradient-text">Внутри — безупречно.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Красивый ПК — это не только RGB. Это чистая архитектура сборки, правильный корпус, аккуратная укладка кабелей, продуманное охлаждение и ощущение цельного премиального продукта.
              </p>
            </div>
          </AnimatedSection>
          <div className="flex flex-wrap justify-center gap-3">
            {["RGB и подсветка", "Минималистичные сборки", "Белые и чёрные конфигурации", "Корпуса под любой стиль", "Чистый внутренний вид"].map((t, i) => (
              <AnimatedItem key={i} delay={i * 0.06}>
                <span className="px-6 py-3 rounded-xl bg-card border border-border text-foreground font-medium shadow-card-hover inline-block">
                  {t}
                </span>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </section>

      {/* ПРЕИМУЩЕСТВА */}
      <section className="section-padding bg-card/50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-display text-center mb-12">Почему выбирают нас.</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {advantages.map((a, i) => (
              <AnimatedItem key={i} delay={i * 0.05}>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                  <Check size={18} className="text-primary shrink-0" />
                  <span className="text-foreground text-sm font-medium">{a}</span>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </section>

      {/* ОТЗЫВЫ */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display mb-4">Что говорят клиенты.</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Для нас важен не только момент покупки, но и то, какое впечатление остаётся после первого запуска, первых игр и первых рабочих проектов.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {reviews.map((r, i) => (
              <AnimatedItem key={i} delay={i * 0.1}>
                <div className="p-6 rounded-2xl bg-card border border-border shadow-card-hover h-full">
                  <Quote size={24} className="text-primary/30 mb-3" />
                  <p className="text-foreground mb-4 italic">«{r.text}»</p>
                  <p className="text-sm text-muted-foreground font-medium">— {r.author}</p>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-card/50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-display text-center mb-12">Частые вопросы.</h2>
          </AnimatedSection>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqItems.map((faq, i) => (
              <AnimatedItem key={i} delay={i * 0.05}>
                <div className="rounded-xl bg-card border border-border overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full text-left px-6 py-4 flex justify-between items-center gap-4"
                  >
                    <span className="font-medium text-foreground">{faq.q}</span>
                    <ChevronRight
                      size={18}
                      className={`text-muted-foreground shrink-0 transition-transform duration-300 ${
                        activeFaq === i ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-4 text-muted-foreground text-sm">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </section>

      {/* ФИНАЛЬНЫЙ CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="container mx-auto px-4 relative text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6">
              Собери ПК, который будет
              <br />
              <span className="gradient-text">работать на тебя.</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-10">
              От идеи до готовой системы — поможем подобрать, собрать и настроить компьютер, который действительно соответствует твоим задачам, бюджету и ожиданиям.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/configurator"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all glow-primary"
              >
                Начать сборку <ArrowRight size={20} />
              </Link>
              <Link
                to="/contacts"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass-surface font-semibold text-lg text-foreground hover:bg-accent transition-all"
              >
                Получить консультацию
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
