"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type LogoRevealProps = {
  mp4: string;
  webm?: string;
  poster: string;
  label: string;
  className?: string;
};

/**
 * Looping logo animation, played only while on screen (paused off-screen to
 * save CPU). With prefers-reduced-motion the static poster (the final frame) is
 * shown instead of the video.
 */
export function LogoReveal({ mp4, webm, poster, label, className = "" }: LogoRevealProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={className}>
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="auto"
        width={520}
        height={200}
        aria-label={label}
        className="block aspect-[13/5] h-auto w-full motion-reduce:hidden"
      >
        <source src={webm ?? mp4} type={webm ? "video/webm" : "video/mp4"} />
        {webm && <source src={mp4} type="video/mp4" />}
      </video>
      <Image src={poster} alt={label} width={520} height={200} className="hidden h-auto w-full motion-reduce:block" />
    </div>
  );
}
