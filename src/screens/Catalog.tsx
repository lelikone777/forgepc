"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatedSection, AnimatedItem } from "@/shared/components/AnimatedSection";
import { ChevronRight } from "lucide-react";

const categories = [
  "Все", "Игровые ПК", "Премиальные игровые ПК", "Рабочие станции",
  "ПК для монтажа и 3D", "ПК для локального ИИ", "ПК для разработки и ИИ-агентов",
];

const allBuilds = [
  { id: "start-1", name: "ForgePC Старт", cat: "Игровые ПК", price: "89 900 ₽", gpu: "RTX 4060 8GB", cpu: "Ryzen 5 7600X", ram: "16 ГБ DDR5", ssd: "1 ТБ NVMe", desc: "Уверенный Full HD-гейминг в современных играх" },
  { id: "start-2", name: "ForgePC Старт+", cat: "Игровые ПК", price: "109 900 ₽", gpu: "RTX 4060 Ti 8GB", cpu: "Ryzen 5 7600X", ram: "32 ГБ DDR5", ssd: "1 ТБ NVMe", desc: "Full HD на высоких настройках и стриминг" },
  { id: "opt-1", name: "ForgePC Оптимум", cat: "Игровые ПК", price: "149 900 ₽", gpu: "RTX 4070 Super 12GB", cpu: "Ryzen 7 7800X3D", ram: "32 ГБ DDR5", ssd: "2 ТБ NVMe", desc: "Баланс цены и мощности для 1440p" },
  { id: "perf-1", name: "ForgePC Производительность", cat: "Премиальные игровые ПК", price: "209 900 ₽", gpu: "RTX 5070 Ti 16GB", cpu: "Core Ultra 7 265K", ram: "32 ГБ DDR5", ssd: "2 ТБ NVMe Gen5", desc: "Высокие настройки и серьёзные задачи" },
  { id: "prem-1", name: "ForgePC Премиум", cat: "Премиальные игровые ПК", price: "339 900 ₽", gpu: "RTX 5080 16GB", cpu: "Core Ultra 9 285K", ram: "64 ГБ DDR5", ssd: "4 ТБ NVMe", desc: "Максимум для игр и продуктивности" },
  { id: "prem-2", name: "ForgePC Ультра", cat: "Премиальные игровые ПК", price: "459 900 ₽", gpu: "RTX 5090 32GB", cpu: "Ryzen 9 9950X", ram: "64 ГБ DDR5", ssd: "4 ТБ NVMe Gen5", desc: "Флагман без компромиссов" },
  { id: "work-1", name: "ForgePC Студия", cat: "ПК для монтажа и 3D", price: "189 900 ₽", gpu: "RTX 4070 Super 12GB", cpu: "Ryzen 9 7950X", ram: "64 ГБ DDR5", ssd: "2 ТБ NVMe", desc: "Для монтажа, 3D и дизайна" },
  { id: "work-2", name: "ForgePC Рендер", cat: "Рабочие станции", price: "299 900 ₽", gpu: "RTX 5080 16GB", cpu: "Ryzen 9 9950X", ram: "128 ГБ DDR5", ssd: "4 ТБ NVMe", desc: "Профессиональная рабочая станция" },
  { id: "ai-1", name: "ForgePC Нейро", cat: "ПК для локального ИИ", price: "379 900 ₽", gpu: "RTX 5090 32GB", cpu: "Ryzen 9 7950X", ram: "128 ГБ DDR5", ssd: "4 ТБ NVMe Gen5", desc: "Для локальных LLM и Stable Diffusion" },
  { id: "ai-2", name: "ForgePC Агент", cat: "ПК для разработки и ИИ-агентов", price: "429 900 ₽", gpu: "RTX 5090 32GB", cpu: "Core Ultra 9 285K", ram: "128 ГБ DDR5", ssd: "4 ТБ NVMe Gen5", desc: "ИИ-агенты, Docker, контейнеры, тяжёлая автоматизация" },
];

export default function Catalog() {
  const [activeCat, setActiveCat] = useState("Все");
  const filtered = activeCat === "Все" ? allBuilds : allBuilds.filter((b) => b.cat === activeCat);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-4">Каталог готовых сборок</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Отобранные конфигурации под разные бюджеты и сценарии использования. Можно купить как есть или использовать как основу для кастомной сборки.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCat === c
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((build, i) => (
            <AnimatedItem key={build.id} delay={i * 0.06}>
              <div className="bg-card border border-border rounded-2xl p-6 shadow-card-hover flex flex-col h-full">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">{build.name}</h3>
                    <span className="text-xs text-muted-foreground">{build.cat}</span>
                  </div>
                  <span className="text-xl font-bold text-primary font-mono-spec">{build.price}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{build.desc}</p>
                <div className="space-y-1.5 mb-6 text-sm font-mono-spec text-muted-foreground">
                  <p>GPU: {build.gpu}</p>
                  <p>CPU: {build.cpu}</p>
                  <p>RAM: {build.ram}</p>
                  <p>SSD: {build.ssd}</p>
                </div>
                <div className="mt-auto flex gap-2">
                  <Link
                    href={`/build/${build.id}`}
                    className="flex-1 text-center px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
                  >
                    Подробнее
                  </Link>
                  <Link
                    href="/configurator"
                    className="flex-1 text-center px-4 py-2.5 rounded-xl border border-border text-foreground font-medium text-sm hover:bg-accent transition-colors"
                  >
                    Кастомизировать
                  </Link>
                </div>
              </div>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </div>
  );
}
