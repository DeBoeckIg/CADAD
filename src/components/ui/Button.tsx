import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "ghost" | "inverse" | "inverse-ghost";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-button font-semibold tracking-[0.006em] transition-colors duration-200 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-navy text-white shadow-cta hover:bg-blue",
  ghost: "bg-white text-navy border border-navy hover:bg-sky-pale",
  inverse: "bg-white text-navy hover:bg-sky-pale",
  "inverse-ghost": "border border-white/70 text-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-4 text-base",
  sm: "px-4 py-2 text-sm",
};

type ButtonLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  href: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

/** Link styled as a button. External URLs open in a new tab. */
export function ButtonLink({ href, variant = "primary", size = "md", className = "", children, ...rest }: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {children}
        <span className="sr-only"> (se abre en una pestaña nueva)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
