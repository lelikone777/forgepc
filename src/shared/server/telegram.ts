import type { ContactFormData } from "@/shared/validation/contact-form";
import { formatPhoneForDisplay } from "@/shared/validation/contact-form";

type TelegramDeliveryResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "delivery_failed"; message: string };

function getTelegramConfig() {
  return {
    botToken: process.env.TELEGRAM_BOT_TOKEN,
    chatId: process.env.TELEGRAM_CHAT_ID,
  };
}

function formatTelegramMessage(data: ContactFormData) {
  const lines = [
    "Новая заявка с сайта ForgePC",
    "",
    `Имя: ${data.name}`,
    `Телефон: ${formatPhoneForDisplay(data.phone)}`,
    `Email: ${data.email}`,
    `Для каких задач нужен ПК: ${data.useCase || "Не указано"}`,
    `Бюджет: ${data.budget || "Не указан"}`,
    `Пожелания по внешнему виду: ${data.appearancePreferences || "Не указаны"}`,
    `Комментарий: ${data.comment || "Не указан"}`,
  ];

  return lines.join("\n");
}

export async function sendContactLeadToTelegram(data: ContactFormData): Promise<TelegramDeliveryResult> {
  const { botToken, chatId } = getTelegramConfig();

  if (!botToken || !chatId) {
    return {
      ok: false,
      reason: "not_configured",
      message: "Интеграция Telegram ещё не настроена. Добавь TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID.",
    };
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatTelegramMessage(data),
      }),
      cache: "no-store",
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok || !payload?.ok) {
      return {
        ok: false,
        reason: "delivery_failed",
        message: "Не удалось отправить заявку в Telegram. Проверь настройки бота и chat id.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      reason: "delivery_failed",
      message: "Не удалось связаться с Telegram Bot API. Попробуй ещё раз.",
    };
  }
}
