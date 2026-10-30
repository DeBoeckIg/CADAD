import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { beta } from "@/content/home";

export function BetaProgram() {
  return (
    <div id="beta" role="region" aria-labelledby="beta-title" className="mt-24">
      {/* The dog photo is cut on its right and bottom edges, so it sits flush in the card's bottom-right corner. */}
      <Reveal className="grid overflow-hidden rounded-feature bg-forest text-white lg:grid-cols-[1.3fr_1fr]">
        <div className="p-6 sm:p-10 lg:p-16 lg:pr-4">
          <Chip tone="marigold">{beta.eyebrow}</Chip>
          <h3 id="beta-title" className="mt-6 font-display text-[2rem] leading-[1.1] font-black !text-white sm:text-[2.75rem]">
            {beta.title}
          </h3>
          <p className="mt-4 text-lg leading-[1.55] text-white/85">{beta.body}</p>
          <ul className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {beta.perks.map((perk) => (
              <li key={perk} className="flex items-start gap-2 text-[15px] leading-snug text-white/90">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-marigold" aria-hidden="true" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
          <ButtonLink href={beta.cta.href} variant="inverse" className="mt-8">
            {beta.cta.label}
          </ButtonLink>
        </div>
        <div className="flex justify-end self-end">
          <Image
            src={beta.image.src}
            alt=""
            width={beta.image.width}
            height={beta.image.height}
            sizes="(min-width: 1024px) 420px, 60vw"
            className="h-auto w-3/5 max-w-[420px] sm:w-2/5 lg:w-full"
          />
        </div>
      </Reveal>
    </div>
  );
}
