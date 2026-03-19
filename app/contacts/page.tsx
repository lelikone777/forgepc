import type { Metadata } from "next";
import Contacts from "@/screens/Contacts";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Свяжитесь с ForgePC: консультация по сборке ПК, подбор под бюджет и задачи, ответы на технические вопросы.",
  alternates: {
    canonical: "/contacts",
  },
};

export default function ContactsPage() {
  return <Contacts />;
}
