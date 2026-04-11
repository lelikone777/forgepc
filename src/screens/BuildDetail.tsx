"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { AnimatedSection, AnimatedItem } from "@/shared/components/AnimatedSection";
import { ArrowLeft, Check, Cpu, Monitor, HardDrive, Server } from "lucide-react";
import { formatCatalogPrice, getCatalogBuildById } from "@/shared/data/catalogBuilds";

type BuildDetailProps = {
  id?: string;
};

const categoryDescriptions: Record<string, string> = {
  "Игровые ПК":
    "Сбалансированная конфигурация для уверенной игры в современных проектах с нормальным запасом по производительности и комфортом на каждый день.",
  "Премиальные игровые ПК":
    "Сборка с выраженным запасом по GPU и платформе для high refresh, 1440p, 4K и тяжёлых современных релизов без компромиссов по плавности.",
  "Рабочие станции":
    "Профессиональная система под длительные рендеры, сложные сцены, многозадачность и стабильную нагрузку в рабочих приложениях.",
  "ПК для монтажа и 3D":
    "Конфигурация с упором на монтаж, визуализацию, тяжёлые ассеты, рендер и плавную работу с профессиональным софтом.",
  "ПК для локального ИИ":
    "Система с большим запасом по VRAM, RAM и общей вычислительной мощности для локальных моделей, генерации и inference-сценариев.",
  "ПК для разработки и ИИ-агентов":
    "Сборка под контейнеры, Python-стек, локальные модели, автоматизацию, многозадачные dev-сценарии и тяжёлую рабочую среду.",
};

const categoryFeatures: Record<string, string[]> = {
  "Игровые ПК": [
    "Стабильный FPS в современных играх",
    "Подходит как база для апгрейда",
    "Проверка совместимости и нагрузочное тестирование",
    "Возможность кастомизации под твои задачи",
  ],
  "Премиальные игровые ПК": [
    "Запас под 1440p и 4K-гейминг",
    "Подходит для high refresh мониторов",
    "Стабильная работа под длительной нагрузкой",
    "Возможность кастомизации под твои задачи",
  ],
  "Рабочие станции": [
    "Рассчитано на тяжёлую профессиональную нагрузку",
    "Многозадачность без явных узких мест",
    "Подходит для рендера, компиляции и больших проектов",
    "Возможность кастомизации под твои задачи",
  ],
  "ПК для монтажа и 3D": [
    "Упор на монтаж, viewport и рендер",
    "Запас памяти под большие сцены и проекты",
    "Быстрый рабочий отклик системы",
    "Возможность кастомизации под твои задачи",
  ],
  "ПК для локального ИИ": [
    "Подходит для локальных LLM и генерации",
    "Большой запас по памяти и вычислениям",
    "Уверенная работа в тяжёлых AI-сценариях",
    "Возможность кастомизации под твои задачи",
  ],
  "ПК для разработки и ИИ-агентов": [
    "Подходит для Docker, IDE и контейнеров",
    "Комфортная среда для Python и ML-стека",
    "Нормальный запас под автоматизацию и локальные сервисы",
    "Возможность кастомизации под твои задачи",
  ],
};

const defaultBuild = {
  name: "ForgePC Сборка",
  category: "Кастомный ПК",
  price: null,
  description: "Кастомная конфигурация под ваши задачи",
};

export default function BuildDetail({ id: initialId }: BuildDetailProps) {
  const params = useParams<{ id: string }>();
  const resolvedId = initialId ?? params?.id;
  const build = resolvedId ? getCatalogBuildById(resolvedId) : undefined;
  const currentBuild = build ?? defaultBuild;

  const specs = [
    { label: "Процессор", value: build?.cpu ?? "Подбирается под задачу", icon: Cpu },
    { label: "Видеокарта", value: build?.gpu ?? "Подбирается под задачу", icon: Monitor },
    { label: "Оперативная память", value: build?.ram ?? "Подбирается под задачу", icon: HardDrive },
    { label: "Накопитель", value: build?.ssd ?? "Подбирается под задачу", icon: Server },
  ];

  const features = build
    ? categoryFeatures[build.category] ?? [
        "Точная конфигурация под реальные задачи",
        "Проверка совместимости и стабильности",
        "Возможность кастомизации",
      ]
    : [
        "Точная конфигурация под реальные задачи",
        "Проверка совместимости и стабильности",
        "Возможность кастомизации",
      ];

  const fullDescription = build
    ? categoryDescriptions[build.category] ??
      "Эта сборка подобрана под конкретные задачи и бюджет. Каждый ключевой компонент сбалансирован по роли, а сама конфигурация может быть доработана под ваши требования."
    : "Эта сборка подбирается под конкретные задачи и бюджет. Все ключевые компоненты согласуются по совместимости, сценарию нагрузки и потенциалу дальнейшего апгрейда.";

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <Link
            href="/catalog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={18} />
            Назад к каталогу
          </Link>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <AnimatedSection>
              <div className="mb-8">
                <span className="text-sm text-muted-foreground">{currentBuild.category}</span>
                <h1 className="mt-1 mb-2 text-3xl font-display sm:text-4xl md:text-5xl">{currentBuild.name}</h1>
                <p className="text-lg text-muted-foreground md:text-xl">{currentBuild.description}</p>
              </div>
              <p className="mb-8 text-muted-foreground leading-relaxed">{fullDescription}</p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="mb-6 text-2xl font-display">Характеристики</h2>
              <div className="space-y-3">
                {specs.map((spec, index) => (
                  <AnimatedItem key={spec.label} delay={index * 0.04}>
                    <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent">
                        <spec.icon size={20} className="text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">{spec.label}</p>
                        <p className="truncate text-sm font-medium text-foreground sm:text-base">{spec.value}</p>
                      </div>
                    </div>
                  </AnimatedItem>
                ))}
              </div>
            </AnimatedSection>
          </div>

          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24">
              <AnimatedSection delay={0.2}>
                <div className="mb-6 rounded-2xl border border-border bg-card p-6 shadow-card-hover">
                  <p className="mb-4 text-3xl font-bold text-primary font-mono-spec">
                    {build ? formatCatalogPrice(build.price) : "По запросу"}
                  </p>
                  <div className="mb-6 space-y-2">
                    {features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Check size={16} className="shrink-0 text-primary" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <Link
                      href="/contacts"
                      className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-center font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      Заказать эту сборку
                    </Link>
                    <Link
                      href="/configurator"
                      className="inline-flex w-full items-center justify-center rounded-xl border border-border px-6 py-3 text-center font-semibold text-foreground transition-colors hover:bg-accent"
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
