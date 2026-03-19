import { AnimatedSection, AnimatedItem } from "../components/AnimatedSection";
import { Check, Users, Wrench, Eye, Shield, Cpu, Brain } from "lucide-react";

const values = [
  { icon: Users, title: "Индивидуальный подход", desc: "Подбираем конфигурацию под конкретные задачи и бюджет каждого клиента" },
  { icon: Wrench, title: "Аккуратная сборка", desc: "Чистый кабель-менеджмент, правильная организация внутреннего пространства" },
  { icon: Eye, title: "Внимание к деталям", desc: "Проверка совместимости, оптимальное охлаждение, настройка BIOS" },
  { icon: Shield, title: "Тестирование", desc: "Стресс-тесты температур, стабильности и производительности" },
  { icon: Cpu, title: "Современное железо", desc: "RTX 50 Series, AMD Ryzen 9000, Intel Core Ultra, DDR5" },
  { icon: Brain, title: "ИИ и профессиональные задачи", desc: "Системы для локальных моделей, 3D, монтажа и разработки" },
];

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6">
              Мы собираем компьютеры,
              <br />
              <span className="gradient-text">которые хочется включить сразу.</span>
            </h1>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
              Наша задача — не просто продать комплектующие, а создать систему, которая будет мощной, надёжной, красивой и понятной по логике выбора. Мы ценим аккуратность, производительность и честный подход к каждой конфигурации.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl p-8 md:p-12 mb-20 shadow-card-hover">
            <p className="text-xl text-foreground leading-relaxed text-center">
              Мы собираем системы как для игр, так и для профессиональной работы, 3D, монтажа, разработки, локальных моделей и современных ИИ-задач.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-display text-center mb-12">Наши ценности</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {values.map((v, i) => (
            <AnimatedItem key={i} delay={i * 0.08}>
              <div className="p-6 rounded-2xl bg-card border border-border shadow-card-hover h-full">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                  <v.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            </AnimatedItem>
          ))}
        </div>

        <AnimatedSection delay={0.2}>
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-display mb-6">Цифры</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { num: "500+", label: "Сборок выполнено" },
                { num: "98%", label: "Довольных клиентов" },
                { num: "3 года", label: "На рынке" },
                { num: "24/7", label: "Поддержка" },
              ].map((s, i) => (
                <div key={i} className="p-4 rounded-xl bg-card border border-border">
                  <p className="text-2xl font-bold text-primary font-mono-spec">{s.num}</p>
                  <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
