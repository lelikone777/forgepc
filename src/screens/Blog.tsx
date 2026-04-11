"use client";

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { AnimatedItem, AnimatedSection } from "@/shared/components/AnimatedSection";
import { blogArticles } from "@/shared/data/blogArticles";

export default function Blog() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="mb-16 text-center">
            <h1 className="mb-4 text-4xl font-display md:text-5xl lg:text-6xl">
              Блог о сборках, железе и производительности
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              Обзоры комплектующих, советы по выбору ПК и практические материалы для игр, стриминга,
              монтажа, разработки, локального ИИ и рабочих станций.
            </p>
          </div>
        </AnimatedSection>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogArticles.map((article, index) => (
            <AnimatedItem key={article.slug} delay={index * 0.06}>
              <Link
                href={`/blog/${article.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card-hover"
              >
                <div className="aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={article.thumbnail}
                    alt={article.thumbnailAlt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="rounded-full border border-border px-2 py-1">{article.category}</span>
                    <span>{article.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {article.readTime}
                    </span>
                  </div>
                  <h2 className="mb-3 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                    {article.title}
                  </h2>
                  <p className="mb-4 flex-1 text-sm text-muted-foreground">{article.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Читать
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </div>
  );
}
