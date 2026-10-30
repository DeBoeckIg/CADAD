"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { BrowserFrame } from "./ProductFrame";

type ProductVideoFrameProps = {
  mp4: string;
  webm?: string;
  poster: string;
  label: string;
  /**
   * Whether this video may play (e.g. it belongs to the selected tab).
   * Turning it on restarts the clip from 0; turning it off pauses it.
   */
  active?: boolean;
  className?: string;
};

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * Browser frame with a muted, looping product video.
 * Playback is started from JS only when motion is allowed, the video is active
 * and the frame is on screen (paused off-screen to save CPU). With
 * prefers-reduced-motion or no JS the poster screenshot is shown and the user
 * can still press play.
 *
 * No transforms are applied to the frame or its ancestors on purpose: animating
 * them makes Chrome switch between hardware overlay and GPU compositing, which
 * convert video colors differently and produce visible color jumps.
 */
export function ProductVideoFrame({ mp4, webm, poster, label, active = true, className = "" }: ProductVideoFrameProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const visible = useRef(false);
  const activeRef = useRef(active);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia(REDUCED_MOTION).matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
        if (entry.isIntersecting && activeRef.current && !userPaused.current) video.play().catch(() => {});
        else if (!entry.isIntersecting) video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    activeRef.current = active;
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    if (video.currentTime > 0) video.currentTime = 0;
    if (!active) return;
    userPaused.current = false;
    if (visible.current && !window.matchMedia(REDUCED_MOTION).matches) video.play().catch(() => {});
  }, [active]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  const Icon = playing ? Pause : Play;
  return (
    <BrowserFrame
      className={className}
      action={
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pausar video" : "Reproducir video"}
          className="flex h-6 w-6 items-center justify-center rounded-md text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      }
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload={active ? "metadata" : "none"}
        poster={poster}
        width={1280}
        height={800}
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="block aspect-[16/10] h-auto w-full rounded-[10px] bg-onyx object-cover"
      >
        <source src={mp4} type="video/mp4" />
        {webm && <source src={webm} type="video/webm" />}
      </video>
    </BrowserFrame>
  );
}
