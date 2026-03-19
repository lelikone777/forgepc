"use client";

import { useState } from "react";
import { AnimatedSection } from "@/shared/components/AnimatedSection";
import { Send, MapPin, Mail, Phone } from "lucide-react";

export default function Contacts() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-4">Свяжись с нами</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Расскажи, для чего тебе нужен ПК, какой у тебя бюджет и что для тебя важно. Мы поможем подобрать конфигурацию и ответим на вопросы.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          <div className="lg:col-span-3">
            <AnimatedSection delay={0.1}>
              {submitted ? (
                <div className="bg-card border border-border rounded-2xl p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Send size={28} className="text-primary" />
                  </div>
                  <h2 className="text-2xl font-display mb-2">Заявка отправлена!</h2>
                  <p className="text-muted-foreground">Мы свяжемся с тобой в ближайшее время.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Имя</label>
                      <input required className="w-full px-4 py-3 rounded-xl bg-accent/50 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Как тебя зовут" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Телефон</label>
                      <input className="w-full px-4 py-3 rounded-xl bg-accent/50 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="+7 (___) ___-__-__" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl bg-accent/50 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="email@example.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Для каких задач нужен ПК</label>
                    <input className="w-full px-4 py-3 rounded-xl bg-accent/50 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Игры, работа, стриминг, ИИ..." />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Бюджет</label>
                      <input className="w-full px-4 py-3 rounded-xl bg-accent/50 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="100 000 — 200 000 ₽" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Пожелания по внешнему виду</label>
                      <input className="w-full px-4 py-3 rounded-xl bg-accent/50 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Белый корпус, RGB..." />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Комментарий</label>
                    <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-accent/50 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" placeholder="Дополнительные пожелания или вопросы" />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity glow-primary flex items-center justify-center gap-2"
                  >
                    Отправить заявку <Send size={18} />
                  </button>
                </form>
              )}
            </AnimatedSection>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <AnimatedSection delay={0.2}>
              {[
                { icon: Mail, label: "Email", value: "info@forgepc.ru" },
                { icon: Phone, label: "Телефон", value: "+7 (999) 123-45-67" },
                { icon: MapPin, label: "Адрес", value: "Москва, Россия" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
                    <c.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{c.label}</p>
                    <p className="font-medium text-foreground text-sm">{c.value}</p>
                  </div>
                </div>
              ))}
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}
