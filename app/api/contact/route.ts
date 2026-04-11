import { NextResponse } from "next/server";
import { sendContactLeadToTelegram } from "@/shared/server/telegram";
import {
  contactFormSchema,
  type ContactFormErrors,
} from "@/shared/validation/contact-form";

function mapFieldErrors(fieldErrors: Record<string, string[] | undefined>) {
  return Object.fromEntries(
    Object.entries(fieldErrors).flatMap(([field, errors]) => {
      const firstError = errors?.[0];
      return firstError ? [[field, firstError]] : [];
    }),
  ) as ContactFormErrors;
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Некорректный формат запроса." },
      { status: 400 },
    );
  }

  const validation = contactFormSchema.safeParse(payload);

  if (!validation.success) {
    return NextResponse.json(
      {
        message: "Проверь заполнение формы.",
        fieldErrors: mapFieldErrors(validation.error.flatten().fieldErrors),
      },
      { status: 400 },
    );
  }

  const delivery = await sendContactLeadToTelegram(validation.data);

  if ("reason" in delivery) {
    return NextResponse.json(
      { message: delivery.message },
      { status: delivery.reason === "not_configured" ? 503 : 502 },
    );
  }

  return NextResponse.json({
    message: "Заявка отправлена. Мы свяжемся с тобой в ближайшее время.",
  });
}
