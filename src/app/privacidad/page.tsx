import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { privacy } from "@/content/legal";

export const metadata: Metadata = {
  title: privacy.title,
  description: privacy.description,
  alternates: { canonical: "/privacidad" },
};

export default function PrivacyPage() {
  return <LegalPage doc={privacy} />;
}
