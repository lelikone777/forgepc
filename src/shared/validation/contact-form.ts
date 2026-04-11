import { z } from "zod";

export const normalizePhone = (value: string) => value.replace(/\D/g, "");

const requiredText = (label: string, min = 2, max = 120) =>
  z
    .string()
    .trim()
    .min(1, `Укажи ${label.toLowerCase()}`)
    .min(min, `${label} должно быть не короче ${min} символов`)
    .max(max, `${label} слишком длинное`);

const optionalText = (max: number, message: string) =>
  z.string().trim().max(max, message);

export const contactFieldSchemas = {
  name: requiredText("Имя", 2, 60),
  phone: z
    .string()
    .trim()
    .min(1, "Укажи телефон")
    .refine((value) => {
      const digits = normalizePhone(value);
      return digits.length === 11 && /^[78]/.test(digits);
    }, "Укажи телефон в формате +7 (999) 123-45-67"),
  email: z
    .string()
    .trim()
    .min(1, "Укажи email")
    .email("Укажи корректный email"),
  useCase: optionalText(700, "Описание задач слишком длинное"),
  budget: optionalText(120, "Поле бюджета слишком длинное"),
  appearancePreferences: optionalText(700, "Описание внешнего вида слишком длинное"),
  comment: optionalText(1000, "Комментарий слишком длинный"),
};

export const contactFormSchema = z.object(contactFieldSchemas);

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ContactFormField = keyof ContactFormData;
export type ContactFormErrors = Partial<Record<ContactFormField, string>>;

export function getContactFieldError(field: ContactFormField, value: string) {
  const result = contactFieldSchemas[field].safeParse(value);

  if (result.success) {
    return null;
  }

  return result.error.issues[0]?.message ?? "Проверь это поле";
}

export function getContactFormErrors(values: ContactFormData): ContactFormErrors {
  const result = contactFormSchema.safeParse(values);

  if (result.success) {
    return {};
  }

  const { fieldErrors } = result.error.flatten();

  return Object.fromEntries(
    Object.entries(fieldErrors).flatMap(([field, errors]) => {
      const firstError = errors?.[0];
      return firstError ? [[field, firstError]] : [];
    }),
  ) as ContactFormErrors;
}

export function formatPhoneForDisplay(value: string) {
  const digits = normalizePhone(value);

  if (digits.length !== 11) {
    return value.trim();
  }

  const normalized = digits.startsWith("8") ? `7${digits.slice(1)}` : digits;

  return `+7 (${normalized.slice(1, 4)}) ${normalized.slice(4, 7)}-${normalized.slice(7, 9)}-${normalized.slice(9, 11)}`;
}

export function formatPhoneInput(value: string) {
  const digits = normalizePhone(value);

  if (!digits) {
    return "+7";
  }

  let normalized = digits;

  if (normalized.startsWith("8")) {
    normalized = `7${normalized.slice(1)}`;
  }

  if (!normalized.startsWith("7")) {
    normalized = `7${normalized}`;
  }

  normalized = normalized.slice(0, 11);

  const country = normalized[0];
  const part1 = normalized.slice(1, 4);
  const part2 = normalized.slice(4, 7);
  const part3 = normalized.slice(7, 9);
  const part4 = normalized.slice(9, 11);

  let result = `+${country}`;

  if (part1) {
    result += ` (${part1}`;
  }

  if (part1.length === 3) {
    result += ")";
  }

  if (part2) {
    result += ` ${part2}`;
  }

  if (part3) {
    result += `-${part3}`;
  }

  if (part4) {
    result += `-${part4}`;
  }

  return result;
}
