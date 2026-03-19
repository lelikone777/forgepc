"use client";

import { AnimatedSection, AnimatedItem } from "@/shared/components/AnimatedSection";
import { ArrowRight, Clock } from "lucide-react";

const articles = [
  { slug: "pc-for-games-2026", title: "Как выбрать ПК для игр в 2026 году", excerpt: "Разбираем актуальные конфигурации для Full HD, 2K и 4K гейминга. RTX 50 Series, AMD Ryzen 9000 и Intel Core Ultra — что выбрать.", date: "15 марта 2026", readTime: "8 мин" },
  { slug: "gpu-stable-diffusion", title: "Какая видеокарта нужна для Stable Diffusion и ComfyUI", excerpt: "Сравниваем RTX 4060, 5070 Ti и 5090 для генерации изображений. Сколько VRAM нужно и на что обратить внимание.", date: "12 марта 2026", readTime: "6 мин" },
  { slug: "pc-local-llm", title: "ПК для локальных LLM: что важно", excerpt: "Запуск Llama 3, Mistral и других моделей локально. Требования по VRAM, ОЗУ и выбор процессора.", date: "8 марта 2026", readTime: "10 мин" },
  { slug: "build-unreal-engine-5", title: "Сборка для Unreal Engine 5", excerpt: "Оптимальная конфигурация для разработки на UE5. Nanite, Lumen и требования к железу.", date: "5 марта 2026", readTime: "7 мин" },
  { slug: "pc-davinci-resolve", title: "Лучший ПК для монтажа и DaVinci Resolve", excerpt: "Конфигурация для комфортного монтажа в 4K и 8K. GPU-ускорение, объём ОЗУ и быстрые накопители.", date: "1 марта 2026", readTime: "7 мин" },
  { slug: "ram-ai-agents", title: "Сколько ОЗУ нужно для ИИ-агентов и контейнеров", excerpt: "Docker, WSL, Python, базы данных, векторные индексы — считаем реальные требования к памяти.", date: "25 февраля 2026", readTime: "5 мин" },
  { slug: "pc-arc-raiders-re9", title: "Как выбрать ПК под ARC Raiders, Resident Evil 9 и современные AAA-игры", excerpt: "Анализируем системные требования и подбираем конфигурации под новейшие AAA-проекты 2025-2026.", date: "20 февраля 2026", readTime: "9 мин" },
];

export default function Blog() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-4">Блог о сборках, железе и производительности</h1>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              Обзоры комплектующих, советы по выбору ПК, сравнения видеокарт и процессоров, подбор сборок под игры, 3D, монтаж, локальный ИИ, нейросети и реальные рабочие сценарии без лишнего шума.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {articles.map((a, i) => (
            <AnimatedItem key={a.slug} delay={i * 0.06}>
              <div className="bg-card border border-border rounded-2xl p-6 shadow-card-hover flex flex-col h-full group">
                <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                  <span>{a.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {a.readTime}</span>
                </div>
                <h2 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {a.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{a.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Читать <ArrowRight size={14} />
                </span>
              </div>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </div>
  );
}
