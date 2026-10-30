import type { ReactNode } from "react";

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "default" | "inverse";
};

export function SectionHeading({ id, eyebrow, title, lead, align = "left", tone = "default" }: SectionHeadingProps) {
  const centered = align === "center" ? "mx-auto text-center" : "";
  const inverse = tone === "inverse";
  return (
    <div className={`max-w-3xl ${centered}`}>
      {eyebrow && (
        <p className={`mb-4 text-sm font-semibold uppercase tracking-[0.12em] ${inverse ? "text-sky-light" : "text-sky"}`}>
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={`font-display text-[2rem] leading-[1.1] font-black sm:text-[2.75rem] ${inverse ? "!text-white" : ""}`}
      >
        {title}
      </h2>
      {lead && (
        <p className={`mt-4 text-lg leading-[1.5] ${inverse ? "text-white/80" : "text-graphite"}`}>{lead}</p>
      )}
    </div>
  );
}
