"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { X } from "lucide-react";
import { announcement } from "@/content/site";

const STORAGE_KEY = "cadad:banner-dismissed";
const listeners = new Set<() => void>();

function readDismissed(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function dismiss() {
  try {
    window.localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Storage unavailable: the banner will reappear on next visit.
  }
  listeners.forEach((listener) => listener());
}

export function AnnouncementBanner() {
  const dismissed = useSyncExternalStore(subscribe, readDismissed, () => false);
  if (dismissed) return null;

  return (
    <aside aria-label="Aviso" className="border-b border-silver bg-frost">
      <div className="mx-auto flex max-w-[1200px] items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <p className="flex-1 text-center text-sm text-charcoal">
          <span className="mr-2 inline-block rounded-tag bg-marigold px-2 py-0.5 text-xs font-semibold text-onyx">
            Piloto
          </span>
          {announcement.text}{" "}
          <Link href={announcement.href} className="text-link">
            {announcement.linkLabel}
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="rounded-full p-1.5 text-graphite transition-colors hover:bg-silver hover:text-onyx"
          aria-label="Cerrar aviso"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
