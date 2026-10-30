import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { terms } from "@/content/legal";

export const metadata: Metadata = {
  title: terms.title,
  description: terms.description,
  alternates: { canonical: "/terminos" },
};

export default function TermsPage() {
  return <LegalPage doc={terms} />;
}
