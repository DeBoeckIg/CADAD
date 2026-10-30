import Image from "next/image";
import type { ReactNode } from "react";

type BrowserFrameProps = {
  children: ReactNode;
  url?: string;
  /** Optional control rendered at the right of the toolbar (e.g. play/pause). */
  action?: ReactNode;
  className?: string;
};

/** Dark browser-like frame (#181d26) used around real product media. */
export function BrowserFrame({ children, url = "vetnetmvp.vercel.app", action, className = "" }: BrowserFrameProps) {
  return (
    <figure className={`overflow-hidden rounded-card bg-onyx p-1.5 shadow-frame sm:p-2 ${className}`}>
      <div className="flex items-center gap-3 px-2 pb-2 pt-1 sm:px-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span
          aria-hidden="true"
          className="mx-auto hidden max-w-xs flex-1 truncate rounded-md bg-white/10 px-3 py-1 text-center text-xs text-white/60 sm:block"
        >
          {url}
        </span>
        <span className="ml-auto flex min-w-[42px] justify-end sm:ml-0">{action}</span>
      </div>
      {children}
    </figure>
  );
}

type ProductFrameProps = {
  src: string;
  alt: string;
  url?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

/** Browser frame holding a real product screenshot. */
export function ProductFrame({
  src,
  alt,
  url,
  priority = false,
  sizes = "(min-width: 1200px) 1136px, 100vw",
  className = "",
}: ProductFrameProps) {
  return (
    <BrowserFrame url={url} className={className}>
      <Image
        src={src}
        alt={alt}
        width={1920}
        height={1200}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        sizes={sizes}
        className="h-auto w-full rounded-[10px]"
      />
    </BrowserFrame>
  );
}
