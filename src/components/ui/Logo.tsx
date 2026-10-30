type LogoMarkProps = {
  /** "brand" = blue arch on light bg, "inverse" = white arch for dark bg. */
  variant?: "brand" | "inverse";
  className?: string;
  title?: string;
};

/** CADAD isotype: colonial arch + console prompt + cursor. */
export function LogoMark({ variant = "brand", className, title }: LogoMarkProps) {
  const arch = variant === "brand" ? "#1E3A8A" : "#ffffff";
  const prompt = variant === "brand" ? "#0284C7" : "#7DD3FC";
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path d="M24 108 V52 A36 36 0 0 1 96 52 V108" fill="none" stroke={arch} strokeWidth="10" strokeLinejoin="round" />
      <line x1="10" y1="110" x2="110" y2="110" stroke={arch} strokeWidth="8" strokeLinecap="round" />
      <polyline
        points="44,62 57,75 44,88"
        fill="none"
        stroke={prompt}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="63" y="83" width="18" height="7" rx="2" fill={prompt} />
    </svg>
  );
}

type LogoProps = { variant?: "brand" | "inverse"; showTagline?: boolean; className?: string };

export function Logo({ variant = "brand", showTagline = false, className = "" }: LogoProps) {
  const wordColor = variant === "brand" ? "text-navy" : "text-white";
  const taglineColor = variant === "brand" ? "text-slate" : "text-sky-pale/80";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark variant={variant} className="h-9 w-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-2xl font-bold tracking-[0.01em] ${wordColor}`}>CADAD</span>
        {showTagline && (
          <span className={`mt-1 text-xs font-medium tracking-[0.04em] ${taglineColor}`}>
            Software y soluciones · Tucumán
          </span>
        )}
      </span>
    </span>
  );
}
