"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { AnimatedSection, AnimatedItem } from "@/shared/components/AnimatedSection";
import { ArrowLeft, Check, Cpu, Monitor, HardDrive, Server, Fan, Box, BatteryCharging, CircuitBoard } from "lucide-react";

const builds: Record<string, {
  name: string; cat: string; price: string; desc: string; fullDesc: string;
  specs: { label: string; value: string; icon: any }[];
  features: string[];
}> = {
  "start-1": {
    name: "ForgePC Старт", cat: "Игровые ПК", price: "89 900 ₽",
    desc: "Уверенный Full HD-гейминг в современных играх",
    fullDesc: "Сбалансированная конфигурация для комфортной игры в Full HD. Отличный старт для тех, кто хочет качественный игровой ПК без переплаты. Подходит для Counter-Strike 2, Fortnite, Dota 2, Apex Legends и других популярных игр на высоких настройках.",
    specs: [
      { label: "Процессор", value: "AMD Ryzen 5 7600X", icon: Cpu },
      { label: "Видеокарта", value: "NVIDIA RTX 4060 8GB", icon: Monitor },
      { label: "Оперативная память", value: "16 ГБ DDR5 5600 МГц", icon: HardDrive },
      { label: "Накопитель", value: "1 ТБ NVMe SSD Gen4", icon: Server },
      { label: "Материнская плата", value: "B650 (AMD)", icon: CircuitBoard },
      { label: "Блок питания", value: "650W 80+ Gold", icon: BatteryCharging },
      { label: "Корпус", value: "Компактный Mid-Tower", icon: Box },
      { label: "Охлаждение", value: "Башенный кулер 4 трубки", icon: Fan },
    ],
    features: ["Full HD 60-144+ FPS в AAA", "Тихая работа", "Потенциал для апгрейда", "Стресс-тест пройден"],
  },
};

const defaultBuild = {
  name: "ForgePC Сборка", cat: "Кастомный ПК", price: "По запросу",
  desc: "Кастомная конфигурация под ваши задачи",
  fullDesc: "Эта сборка подобрана под конкретные задачи и бюджет. Каждый компонент проверен на совместимость, система протестирована под нагрузкой и готова к работе.",
  specs: [
    { label: "Процессор", value: "AMD Ryzen 7 7800X3D", icon: Cpu },
    { label: "Видеокарта", value: "NVIDIA RTX 5070 Ti 16GB", icon: Monitor },
    { label: "Оперативная память", value: "32 ГБ DDR5 6000 МГц", icon: HardDrive },
    { label: "Накопитель", value: "2 ТБ NVMe SSD Gen4", icon: Server },
    { label: "Материнская плата", value: "X670E (AMD)", icon: CircuitBoard },
    { label: "Блок питания", value: "850W 80+ Gold", icon: BatteryCharging },
    { label: "Корпус", value: "Просторный Mid-Tower", icon: Box },
    { label: "Охлаждение", value: "СЖО 360 мм", icon: Fan },
  ],
  features: ["2K 165+ FPS в AAA", "4K 60+ FPS", "Тихая работа под нагрузкой", "Стресс-тест пройден", "Чистая сборка и кабель-менеджмент"],
};

export default function BuildDetail() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const build = (id && builds[id]) || defaultBuild;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <Link href="/catalog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft size={18} /> Назад к каталогу
          </Link>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <AnimatedSection>
              <div className="mb-8">
                <span className="text-sm text-muted-foreground">{build.cat}</span>
                <h1 className="text-4xl md:text-5xl font-display mt-1 mb-2">{build.name}</h1>
                <p className="text-xl text-muted-foreground">{build.desc}</p>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-8">{build.fullDesc}</p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="text-2xl font-display mb-6">Характеристики</h2>
              <div className="space-y-3">
                {build.specs.map((s, i) => (
                  <AnimatedItem key={i} delay={i * 0.04}>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                      <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
                        <s.icon size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{s.label}</p>
                        <p className="font-medium text-foreground font-mono-spec text-sm">{s.value}</p>
                      </div>
                    </div>
                  </AnimatedItem>
                ))}
              </div>
            </AnimatedSection>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <AnimatedSection delay={0.2}>
                <div className="bg-card border border-border rounded-2xl p-6 shadow-card-hover mb-6">
                  <p className="text-3xl font-bold text-primary font-mono-spec mb-4">{build.price}</p>
                  <div className="space-y-2 mb-6">
                    {build.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check size={16} className="text-primary shrink-0" />
                        <span className="text-sm text-foreground">{f}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <Link
                      href="/contacts"
                      className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                    >
                      Заказать эту сборку
                    </Link>
                    <Link
                      href="/configurator"
                      className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl border border-border text-foreground font-semibold hover:bg-accent transition-colors"
                    >
                      Кастомизировать
                    </Link>
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
