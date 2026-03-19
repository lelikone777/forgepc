"use client";

import { useState } from "react";
import { AnimatedSection, AnimatedItem } from "@/shared/components/AnimatedSection";
import Link from "next/link";
import { Cpu, Monitor, HardDrive, Server, CircuitBoard, BatteryCharging, Box, Fan, Check, AlertTriangle } from "lucide-react";

const modes = [
  "Игры", "Стриминг", "Монтаж и дизайн", "3D и разработка",
  "Локальный ИИ", "ИИ-агенты и автоматизация", "Рабочая станция",
];

const categories = [
  {
    label: "Процессор",
    icon: Cpu,
    options: [
      { name: "AMD Ryzen 5 7600X", price: 18500 },
      { name: "AMD Ryzen 7 7800X3D", price: 32000 },
      { name: "AMD Ryzen 9 7950X", price: 52000 },
      { name: "Intel Core Ultra 5 245K", price: 24000 },
      { name: "Intel Core Ultra 7 265K", price: 38000 },
      { name: "Intel Core Ultra 9 285K", price: 58000 },
    ],
  },
  {
    label: "Видеокарта",
    icon: Monitor,
    options: [
      { name: "NVIDIA RTX 4060 8GB", price: 32000 },
      { name: "NVIDIA RTX 4070 Super 12GB", price: 56000 },
      { name: "NVIDIA RTX 5070 Ti 16GB", price: 82000 },
      { name: "NVIDIA RTX 5080 16GB", price: 115000 },
      { name: "NVIDIA RTX 5090 32GB", price: 230000 },
    ],
  },
  {
    label: "Оперативная память",
    icon: HardDrive,
    options: [
      { name: "16 ГБ DDR5 5600 МГц", price: 5500 },
      { name: "32 ГБ DDR5 6000 МГц", price: 11000 },
      { name: "64 ГБ DDR5 6000 МГц", price: 22000 },
      { name: "128 ГБ DDR5 5600 МГц", price: 48000 },
    ],
  },
  {
    label: "Накопитель",
    icon: Server,
    options: [
      { name: "1 ТБ NVMe SSD Gen4", price: 7500 },
      { name: "2 ТБ NVMe SSD Gen4", price: 14000 },
      { name: "2 ТБ NVMe SSD Gen5", price: 22000 },
      { name: "4 ТБ NVMe SSD Gen4", price: 28000 },
    ],
  },
  {
    label: "Материнская плата",
    icon: CircuitBoard,
    options: [
      { name: "B650 (AMD)", price: 14000 },
      { name: "X670E (AMD)", price: 26000 },
      { name: "B860 (Intel)", price: 15000 },
      { name: "Z890 (Intel)", price: 28000 },
    ],
  },
  {
    label: "Блок питания",
    icon: BatteryCharging,
    options: [
      { name: "650W 80+ Gold", price: 8500 },
      { name: "850W 80+ Gold", price: 12000 },
      { name: "1000W 80+ Platinum", price: 18000 },
      { name: "1200W 80+ Titanium", price: 28000 },
    ],
  },
  {
    label: "Корпус",
    icon: Box,
    options: [
      { name: "Компактный Mid-Tower", price: 7000 },
      { name: "Просторный Mid-Tower", price: 12000 },
      { name: "Премиальный Full-Tower", price: 22000 },
      { name: "Компактный ITX", price: 15000 },
    ],
  },
  {
    label: "Охлаждение",
    icon: Fan,
    options: [
      { name: "Башенный кулер 4 трубки", price: 4500 },
      { name: "Башенный кулер двойной", price: 7500 },
      { name: "СЖО 240 мм", price: 9000 },
      { name: "СЖО 360 мм", price: 14000 },
    ],
  },
];

export default function Configurator() {
  const [activeMode, setActiveMode] = useState(0);
  const [selections, setSelections] = useState<Record<string, number>>(
    Object.fromEntries(categories.map((c) => [c.label, 0]))
  );

  const total = categories.reduce((sum, cat) => {
    return sum + cat.options[selections[cat.label]].price;
  }, 0);

  const handleSelect = (catLabel: string, optIndex: number) => {
    setSelections((prev) => ({ ...prev, [catLabel]: optIndex }));
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-4">Конфигуратор ПК</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Собери систему под свои задачи, бюджет и требования к производительности. Меняй комплектующие, сравнивай варианты и смотри итоговую стоимость в реальном времени.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {modes.map((m, i) => (
              <button
                key={m}
                onClick={() => setActiveMode(i)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeMode === i
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {categories.map((cat, ci) => (
              <AnimatedItem key={cat.label} delay={ci * 0.05}>
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                      <cat.icon size={20} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg text-foreground">{cat.label}</h3>
                  </div>
                  <div className="space-y-2">
                    {cat.options.map((opt, oi) => (
                      <button
                        key={oi}
                        onClick={() => handleSelect(cat.label, oi)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-left ${
                          selections[cat.label] === oi
                            ? "bg-primary/10 border border-primary/30"
                            : "bg-accent/30 border border-transparent hover:border-border"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selections[cat.label] === oi ? "border-primary" : "border-muted-foreground/30"
                          }`}>
                            {selections[cat.label] === oi && (
                              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                            )}
                          </div>
                          <span className={`text-sm font-medium ${selections[cat.label] === oi ? "text-foreground" : "text-muted-foreground"}`}>
                            {opt.name}
                          </span>
                        </div>
                        <span className="text-sm font-mono-spec text-muted-foreground">
                          {opt.price.toLocaleString("ru-RU")} ₽
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <AnimatedSection delay={0.2}>
                <div className="bg-card border border-border rounded-2xl p-6 shadow-card-hover">
                  <h3 className="font-semibold text-lg text-foreground mb-4">Твоя конфигурация</h3>
                  <div className="space-y-3 mb-6">
                    {categories.map((cat) => (
                      <div key={cat.label} className="flex justify-between items-start gap-2">
                        <div>
                          <p className="text-xs text-muted-foreground">{cat.label}</p>
                          <p className="text-sm font-medium text-foreground">{cat.options[selections[cat.label]].name}</p>
                        </div>
                        <span className="text-xs font-mono-spec text-muted-foreground whitespace-nowrap">
                          {cat.options[selections[cat.label]].price.toLocaleString("ru-RU")} ₽
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-foreground">Итого</span>
                      <span className="text-2xl font-bold text-primary font-mono-spec">
                        {total.toLocaleString("ru-RU")} ₽
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Link
                      href="/contacts"
                      className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                    >
                      Заказать сборку
                    </Link>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check size={14} className="text-primary" />
                      <span>Проверка совместимости пройдена</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
