"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AnimatedItem, AnimatedSection } from "@/shared/components/AnimatedSection";
import { catalogBuilds, catalogCategories, formatCatalogPrice } from "@/shared/data/catalogBuilds";

export default function Catalog() {
  const [activeCat, setActiveCat] = useState("Все");
  const filtered =
    activeCat === "Все"
      ? catalogBuilds
      : catalogBuilds.filter((build) => build.category === activeCat);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-4">Каталог готовых сборок</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Отобранные конфигурации под разные бюджеты и сценарии использования. Можно купить как есть или
              использовать как основу для кастомной сборки.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Цены в каталоге пересчитаны по текущей политике: ориентир на рыночную стоимость комплектующих плюс 10%.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {catalogCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCat(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCat === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((build, index) => (
            <AnimatedItem key={build.id} delay={index * 0.06}>
              <div className="bg-card border border-border rounded-2xl p-6 shadow-card-hover flex flex-col h-full">
                <div className="flex justify-between items-start mb-3 gap-4">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">{build.name}</h3>
                    <span className="text-xs text-muted-foreground">{build.category}</span>
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-primary font-mono-spec">
                    {formatCatalogPrice(build.price)}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{build.description}</p>

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
