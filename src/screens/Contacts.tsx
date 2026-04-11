"use client";

import { useState } from "react";
import { AnimatedSection } from "@/shared/components/AnimatedSection";
import { cn } from "@/shared/lib/utils";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import {
  contactFormSchema,
  formatPhoneInput,
  getContactFieldError,
  getContactFormErrors,
  type ContactFormData,
  type ContactFormErrors,
  type ContactFormField,
} from "@/shared/validation/contact-form";
import { Send, MapPin, Mail } from "lucide-react";

function TelegramButtonIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0">
      <circle cx="12" cy="12" r="12" fill="#24A1DE" />
      <path
        fill="#FFFFFF"
        d="M17.8 7.2 6.9 11.4c-.75.3-.74.72-.14.9l2.8.87 1.08 3.42c.13.36.06.5.45.5.3 0 .43-.14.6-.3l1.45-1.4 3.01 2.23c.55.3.95.15 1.09-.52l1.86-8.77c.2-.82-.3-1.2-.84-.97Zm-6.56 7.18-.24-2.45 5.67-3.6c.25-.15.48-.07.3.09l-4.85 4.37-.88 1.59Z"
      />
    </svg>
  );
}

const initialFormData: ContactFormData = {
  name: "",
  phone: "",
  email: "",
  useCase: "",
  budget: "",
  appearancePreferences: "",
  comment: "",
};

const contactCards = [
  { icon: Mail, label: "Email", value: "info@forgepc.ru" },
  { icon: MapPin, label: "Адрес", value: "Москва, Россия" },
];

function FieldError({ error }: { error?: string }) {
  if (!error) {
    return null;
  }

  return <p className="mt-1.5 text-sm text-destructive">{error}</p>;
}

export default function Contacts() {
  const [formData, setFormData] = useState(initialFormData);
  const [fieldErrors, setFieldErrors] = useState<ContactFormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: ContactFormField, value: string) => {
    const nextValue = field === "phone" ? formatPhoneInput(value) : value;

    setFormData((prev) => ({ ...prev, [field]: nextValue }));

    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleBlur = (field: ContactFormField) => {
    const error = getContactFieldError(field, formData[field]);

    setFieldErrors((prev) => ({
      ...prev,
      [field]: error ?? undefined,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const clientValidation = contactFormSchema.safeParse(formData);

    if (!clientValidation.success) {
      setFieldErrors(getContactFormErrors(formData));
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        if (payload?.fieldErrors) {
          setFieldErrors(payload.fieldErrors as ContactFormErrors);
        }

        setSubmitError(payload?.message ?? "Не удалось отправить заявку. Попробуй ещё раз.");
        return;
      }

      setSubmitted(true);
      setFieldErrors({});
      setFormData(initialFormData);
    } catch {
      setSubmitError("Не удалось отправить заявку. Проверь соединение и попробуй ещё раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-4">Свяжись с нами</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Расскажи, для чего тебе нужен ПК, какой у тебя бюджет и что для тебя важно.
              Мы поможем подобрать конфигурацию и ответим на вопросы.
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
                  <h2 className="text-2xl font-display mb-2">Заявка отправлена</h2>
                  <p className="text-muted-foreground">
                    Мы свяжемся с тобой в ближайшее время.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">Имя</label>
                      <Input
                        value={formData.name}
                        onChange={(event) => handleChange("name", event.target.value)}
                        onBlur={() => handleBlur("name")}
                        placeholder="Как тебя зовут"
                        aria-invalid={Boolean(fieldErrors.name)}
                        className={cn(
                          "h-12 rounded-xl bg-accent/50 border-border",
                          fieldErrors.name && "border-destructive focus-visible:ring-destructive/30",
                        )}
                      />
                      <FieldError error={fieldErrors.name} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">Телефон</label>
                      <Input
                        value={formData.phone}
                        onChange={(event) => handleChange("phone", event.target.value)}
                        onBlur={() => handleBlur("phone")}
                        placeholder="+7 (___) ___-__-__"
                        inputMode="tel"
                        autoComplete="tel-national"
                        aria-invalid={Boolean(fieldErrors.phone)}
                        className={cn(
                          "h-12 rounded-xl bg-accent/50 border-border",
                          fieldErrors.phone && "border-destructive focus-visible:ring-destructive/30",
                        )}
                      />
                      <FieldError error={fieldErrors.phone} />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(event) => handleChange("email", event.target.value)}
                      onBlur={() => handleBlur("email")}
                      placeholder="email@example.com"
                      aria-invalid={Boolean(fieldErrors.email)}
                      className={cn(
                        "h-12 rounded-xl bg-accent/50 border-border",
                        fieldErrors.email && "border-destructive focus-visible:ring-destructive/30",
                      )}
                    />
                    <FieldError error={fieldErrors.email} />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">Для каких задач нужен ПК</label>
                    <Textarea
                      rows={5}
                      value={formData.useCase}
                      onChange={(event) => handleChange("useCase", event.target.value)}
                      onBlur={() => handleBlur("useCase")}
                      placeholder="Игры, работа, стриминг, локальный ИИ, 3D, монтаж..."
                      aria-invalid={Boolean(fieldErrors.useCase)}
                      className={cn(
                        "min-h-[132px] rounded-xl bg-accent/50 border-border px-4 py-3 resize-y",
                        fieldErrors.useCase && "border-destructive focus-visible:ring-destructive/30",
                      )}
                    />
                    <FieldError error={fieldErrors.useCase} />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">Бюджет</label>
                    <Input
                      value={formData.budget}
                      onChange={(event) => handleChange("budget", event.target.value)}
                      onBlur={() => handleBlur("budget")}
                      placeholder="Например: 180 000 ₽ или до 250000"
                      inputMode="numeric"
                      aria-invalid={Boolean(fieldErrors.budget)}
                      className={cn(
                        "h-12 w-full rounded-xl bg-accent/50 border-border",
                        fieldErrors.budget && "border-destructive focus-visible:ring-destructive/30",
                      )}
                    />
                    <FieldError error={fieldErrors.budget} />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">Комментарий</label>
                    <Textarea
                      rows={5}
                      value={formData.comment}
                      onChange={(event) => handleChange("comment", event.target.value)}
                      onBlur={() => handleBlur("comment")}
                      placeholder="Дополнительные пожелания или вопросы"
                      aria-invalid={Boolean(fieldErrors.comment)}
                      className={cn(
                        "min-h-[132px] rounded-xl bg-accent/50 border-border px-4 py-3 resize-y",
                        fieldErrors.comment && "border-destructive focus-visible:ring-destructive/30",
                      )}
                    />
                    <FieldError error={fieldErrors.comment} />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">Пожелания по внешнему виду</label>
                    <Textarea
                      rows={5}
                      value={formData.appearancePreferences}
                      onChange={(event) => handleChange("appearancePreferences", event.target.value)}
                      onBlur={() => handleBlur("appearancePreferences")}
                      placeholder="Белый корпус, без RGB, минималистичный стиль, стекло, тихая сборка..."
                      aria-invalid={Boolean(fieldErrors.appearancePreferences)}
                      className={cn(
                        "min-h-[132px] rounded-xl bg-accent/50 border-border px-4 py-3 resize-y",
                        fieldErrors.appearancePreferences && "border-destructive focus-visible:ring-destructive/30",
                      )}
                    />
                    <FieldError error={fieldErrors.appearancePreferences} />
                  </div>

                  {submitError ? (
                    <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                      {submitError}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity glow-primary flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? "Отправляем заявку..." : "Отправить заявку"} <TelegramButtonIcon />
                  </button>
                </form>
              )}
            </AnimatedSection>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <AnimatedSection delay={0.2}>
              {contactCards.map((card) => (
                <div key={card.label} className="mb-4 flex items-center gap-4 rounded-xl border border-border bg-card p-5">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-accent flex items-center justify-center">
                    <card.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{card.label}</p>
                    <p className="text-sm font-medium text-foreground">{card.value}</p>
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
