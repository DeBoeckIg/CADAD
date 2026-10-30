import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { trustCaption, trustItems } from "@/content/home";

export function TrustBar() {
  return (
    <div aria-label="VetNet en números" role="group" className="mt-12">
      <p className="text-center text-sm text-graphite">{trustCaption}</p>
      <ul className="mt-8 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-4">
        {trustItems.map(({ icon: Icon, value, label, count }, index) => (
          <Reveal
            as="li"
            key={label}
            delay={index * 80}
            className="flex items-center gap-4 rounded-card border border-silver bg-white p-4"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-button bg-blush text-magenta">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="flex flex-col">
              <span className="font-display text-2xl font-bold text-navy">
                {count ? <CountUp value={value} {...count} /> : value}
              </span>
              <span className="text-sm leading-snug text-graphite">{label}</span>
            </span>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
