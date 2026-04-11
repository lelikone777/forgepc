"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BatteryCharging,
  Box,
  Check,
  CircuitBoard,
  Cpu,
  Fan,
  HardDrive,
  Monitor,
  Server,
} from "lucide-react";
import { AnimatedItem, AnimatedSection } from "@/shared/components/AnimatedSection";
import {
  assemblyService,
  configuratorCategories,
} from "@/shared/data/regardPricingSnapshot";

const modes = [
  "Игры",
  "Стриминг",
  "Монтаж и дизайн",
  "3D и разработка",
  "Локальный ИИ",
  "ИИ-агенты и автоматизация",
  "Рабочая станция",
];

const iconsByLabel = {
  "Процессор": Cpu,
  "Видеокарта": Monitor,
  "Оперативная память": HardDrive,
  "Накопитель": Server,
  "Материнская плата": CircuitBoard,
  "Блок питания": BatteryCharging,
  "Корпус": Box,
  "Охлаждение": Fan,
} as const;

const categories = configuratorCategories.map((category) => ({
  ...category,
  icon: iconsByLabel[category.label as keyof typeof iconsByLabel],
}));

const [
  cpuLabel,
  gpuLabel,
  ramLabel,
  storageLabel,
  motherboardLabel,
  psuLabel,
  caseLabel,
  coolingLabel,
] = categories.map((category) => category.label);

const defaultSelections = Object.fromEntries(
  categories.map((category) => [category.label, 0]),
) as Record<string, number>;

const modePresets: Record<number, Record<string, number>> = {
  0: {
    [cpuLabel]: 1,
    [gpuLabel]: 1,
    [ramLabel]: 1,
    [storageLabel]: 1,
    [motherboardLabel]: 0,
    [psuLabel]: 1,
    [caseLabel]: 1,
    [coolingLabel]: 1,
  },
  1: {
    [cpuLabel]: 1,
    [gpuLabel]: 1,
    [ramLabel]: 1,
    [storageLabel]: 1,
    [motherboardLabel]: 0,
    [psuLabel]: 1,
    [caseLabel]: 1,
    [coolingLabel]: 2,
  },
  2: {
    [cpuLabel]: 2,
    [gpuLabel]: 1,
    [ramLabel]: 2,
    [storageLabel]: 3,
    [motherboardLabel]: 1,
    [psuLabel]: 2,
    [caseLabel]: 1,
    [coolingLabel]: 3,
  },
  3: {
    [cpuLabel]: 4,
    [gpuLabel]: 2,
    [ramLabel]: 2,
    [storageLabel]: 2,
    [motherboardLabel]: 2,
    [psuLabel]: 2,
    [caseLabel]: 1,
    [coolingLabel]: 3,
  },
  4: {
    [cpuLabel]: 2,
    [gpuLabel]: 4,
    [ramLabel]: 3,
    [storageLabel]: 3,
    [motherboardLabel]: 1,
    [psuLabel]: 3,
    [caseLabel]: 2,
    [coolingLabel]: 3,
  },
  5: {
    [cpuLabel]: 5,
    [gpuLabel]: 4,
    [ramLabel]: 3,
    [storageLabel]: 2,
    [motherboardLabel]: 3,
    [psuLabel]: 3,
    [caseLabel]: 2,
    [coolingLabel]: 3,
  },
  6: {
    [cpuLabel]: 2,
    [gpuLabel]: 3,
    [ramLabel]: 3,
    [storageLabel]: 3,
    [motherboardLabel]: 1,
    [psuLabel]: 3,
    [caseLabel]: 2,
    [coolingLabel]: 3,
  },
};

export default function Configurator() {
  const [activeMode, setActiveMode] = useState(0);
  const [includeAssembly, setIncludeAssembly] = useState(true);
  const [selections, setSelections] = useState<Record<string, number>>(
    modePresets[0] ?? defaultSelections,
  );

  const hardwareTotal = categories.reduce((sum, category) => {
    return sum + category.options[selections[category.label]].price;
  }, 0);
  const total = hardwareTotal + (includeAssembly ? assemblyService.price : 0);

  const handleSelect = (categoryLabel: string, optionIndex: number) => {
    setSelections((prev) => ({ ...prev, [categoryLabel]: optionIndex }));
  };

  const applyModePreset = (modeIndex: number) => {
    setActiveMode(modeIndex);
    setSelections(modePresets[modeIndex] ?? defaultSelections);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-4">Конфигуратор ПК</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Собери систему под свои задачи, бюджет и требования к производительности. Меняй комплектующие,
              сравнивай варианты и смотри итоговую стоимость в реальном времени.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {modes.map((mode, index) => (
              <button
                key={mode}
                onClick={() => applyModePreset(index)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeMode === index
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {categories.map((category, categoryIndex) => (
              <AnimatedItem key={category.label} delay={categoryIndex * 0.05}>
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                      <category.icon size={20} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg text-foreground">{category.label}</h3>
                  </div>

                  <div className="space-y-2">
                    {category.options.map((option, optionIndex) => (
                      <button
                        key={option.name}
                        onClick={() => handleSelect(category.label, optionIndex)}
                        className={`w-full flex flex-col items-start gap-2 p-3 sm:flex-row sm:items-center sm:justify-between rounded-xl transition-all text-left ${
                          selections[category.label] === optionIndex
                            ? "bg-primary/10 border border-primary/30"
                            : "bg-accent/30 border border-transparent hover:border-border"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              selections[category.label] === optionIndex
                                ? "border-primary"
                                : "border-muted-foreground/30"
                            }`}
                          >
                            {selections[category.label] === optionIndex && (
                              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                            )}
                          </div>
                          <div>
                            <span
                              className={`block text-sm font-medium ${
                                selections[category.label] === optionIndex ? "text-foreground" : "text-muted-foreground"
                              }`}
                            >
                              {option.name}
                            </span>
                          </div>
                        </div>
                        <span className="pl-8 text-sm font-mono-spec text-muted-foreground sm:pl-0">
                          {option.price.toLocaleString("ru-RU")} ₽
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
                    {categories.map((category) => (
                      <div key={category.label} className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-start sm:gap-2">
                        <div>
                          <p className="text-xs text-muted-foreground">{category.label}</p>
                          <p className="text-sm font-medium text-foreground">
                            {category.options[selections[category.label]].name}
                          </p>
                        </div>
                        <span className="text-xs font-mono-spec text-muted-foreground">
                          {category.options[selections[category.label]].price.toLocaleString("ru-RU")} ₽
                        </span>
                      </div>
                    ))}

                    <label className="flex items-start gap-3 rounded-xl border border-border bg-accent/20 p-3">
                      <input
                        type="checkbox"
                        checked={includeAssembly}
                        onChange={(event) => setIncludeAssembly(event.target.checked)}
                        className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{assemblyService.label}</p>
                        <p className="text-xs text-muted-foreground">
                          Опционально: сборка, кабель-менеджмент, стресс-тесты и финальная проверка.
                        </p>
                      </div>
                      <span className="text-xs font-mono-spec text-muted-foreground">
                        {assemblyService.price.toLocaleString("ru-RU")} ₽
                      </span>
                    </label>
                  </div>

                  <div className="border-t border-border pt-4 mb-6">
                    <div className="flex justify-between items-center mb-2 text-sm text-muted-foreground">
                      <span>Железо</span>
                      <span className="font-mono-spec">{hardwareTotal.toLocaleString("ru-RU")} ₽</span>
                    </div>
                    {includeAssembly && (
                      <div className="flex justify-between items-center mb-2 text-sm text-muted-foreground">
                        <span>Сборка</span>
                        <span className="font-mono-spec">{assemblyService.price.toLocaleString("ru-RU")} ₽</span>
                      </div>
                    )}
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
                      <span>Конкретные комплектующие и актуальная коммерческая стоимость</span>
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
