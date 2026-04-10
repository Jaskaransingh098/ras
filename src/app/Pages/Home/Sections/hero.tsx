"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const slides = [
  {
    word: "RELATIONSHIP",
    image: "/hero/2.mp4",
  },
  {
    word: "LIFE",
    image: "/hero/Body.mp4",
  },
  {
    word: "BUSINESS",
    image: "/hero/Business_.mp4",
  },
  {
    word: "CAREER",
    image: "/hero/3.mp4",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  // Video crossfade refs/state (one ref per slide)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeVideo, setActiveVideo] = useState<number>(0);

  // Start first video on mount
  useEffect(() => {
    const v0 = videoRefs.current[0];
    if (v0) {
      v0.currentTime = 0;
      v0.play().catch(() => { });
      setActiveVideo(0);
    }
  }, []);

  // When `index` changes (text slider), crossfade videos to match
  useEffect(() => {
    const prev = activeVideo;
    const next = index;
    if (prev === next) return;

    const nextV = videoRefs.current[next];
    const curV = videoRefs.current[prev];
    if (nextV) {
      nextV.currentTime = 0;
      nextV.play().catch(() => { });
    }

    // let next start, then fade
    setTimeout(() => setActiveVideo(next), 60);
    setTimeout(() => { if (curV) { curV.pause(); curV.currentTime = 0; } }, 1200);
  }, [index]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col md:flex-row items-center justify-between w-full h-[90vh] relative overflow-hidden">
      {/* Background videos (stacked) */}
      {/*
        Two videos are stacked and crossfaded. Videos must be in `public/hero`:
        - /hero/final-01.mp4
        - /hero/final-02.mp4
      */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {slides.map((s, i) => (
          <video
            key={i}
            ref={(el: HTMLVideoElement | null) => { videoRefs.current[i] = el; }}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${activeVideo === i ? 'opacity-100 z-0' : 'opacity-0 z-0'}`}
            src={s.image}
            playsInline
            muted
            loop
            preload="auto"
            aria-hidden={true}
          />
        ))}

        {/* removed bottom label; "Are you stuck in" moved to top of centered overlay */}

        {/* Dim overlay to improve text contrast */}
        <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />
      </div>
      {/* LEFT SIDE (moved to centered overlay on video) */}
      <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-full max-w-3xl px-6 z-30 pointer-events-auto text-center">
        <style jsx>{`
          @keyframes wordReveal {
            0%   { opacity: 0; transform: translateY(32px); letter-spacing: 0.08em; }
            100% { opacity: 1; transform: translateY(0);    letter-spacing: -0.02em; }
          }
          .word-reveal {
            animation: wordReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}</style>

        {/* — Eyebrow label — */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="flex-1 max-w-[60px] h-px bg-white/30" />
          <span
            className="text-[17px] uppercase tracking-[0.2em] font-bold text-white/90 font-[var(--font-dm-sans)]"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.95), 0 0 20px rgba(0,0,0,0.7)" }}
          >
            Are You Stuck In Your
          </span>
          <div className="flex-1 max-w-[60px] h-px bg-white/30" />
        </div>

        {/* — Main rotating word — */}
        <h1 className="mb-4" style={{ lineHeight: 1 }}>
          <span
            key={slides[index].word}
            className="word-reveal block font-bold italic section-heading"
            style={{
              fontSize: "clamp(44px, 8vw, 95px)",
              letterSpacing: "-0.02em",
              color: "#c42d2d",
              textShadow: "0 2px 12px rgba(196,45,45,0.65), 0 4px 24px rgba(0,0,0,0.6)",
            }}
          >
            {slides[index].word}
          </span>
        </h1>

        {/* — Counter + symmetric rules — */}
        <div className="flex items-center justify-center gap-4 mb-7">
          <div className="h-px flex-1 bg-white/20" />
          <span
            className="text-[10px] tracking-[0.25em] text-white/35 font-[var(--font-dm-sans)] tabular-nums"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
          >
            {String(index + 1).padStart(2, "0")} &nbsp;/&nbsp; {String(slides.length).padStart(2, "0")}
          </span>
          <div className="h-px flex-1 bg-white/20" />
        </div>

        {/* — CTAs — */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button className="flex items-center gap-2 bg-white hover:bg-white/95 text-[#c42d2d] rounded-full px-6 py-2.5 transition-all duration-300 shadow-lg shadow-black/40">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c42d2d" strokeWidth="2" strokeLinecap="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="text-[15px] tracking-wide font-medium font-[var(--font-outfit)]">
              Book Your Diagnostic Call
            </span>
          </button>
          <button className="flex items-center gap-2 border border-white/60 text-white hover:bg-white hover:text-[#c42d2d] rounded-full px-6 py-2.5 transition-all duration-300">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <span className="text-[15px] tracking-wide font-medium font-[var(--font-outfit)]">
              Watch One Session Shift
            </span>
          </button>
        </div>
      </div>


      {/* Scrolling marquee strip */}
      {/* <div className="mt-10 overflow-hidden max-w-[450px] relative">
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="flex whitespace-nowrap" style={{ animation: 'marquee 20s linear infinite' }}>
            {[...Array(2)].map((_, loop) => (
              <div key={loop} className="flex items-center gap-4 pr-4">
                {['Energy', 'Frequency', 'Healing', 'Abundance', 'Clarity', 'Transformation', 'Shift'].map((w) => (
                  <span key={`${loop}-${w}`} className="flex items-center gap-4">
                    <span className="text-[11px] uppercase tracking-[.25em] text-gray-300 font-medium font-[var(--font-dm-sans)] text-[13px]">{w}</span>
                    <span className="text-[#c42d2d]/20 text-[8px]">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div> */}

      {/* Scroll down indicator */}
      {/* <div className="mt-8 hidden md:flex items-center gap-3 text-gray-400">
          <div className="w-px h-8 bg-gradient-to-b from-gray-300 to-transparent" />
          <div className="flex flex-col items-center gap-1" style={{ animation: 'bounce-slow 2s ease-in-out infinite' }}>
            <span className="text-[9px] uppercase tracking-[.3em] font-medium font-[var(--font-dm-sans)]">Scroll</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 5v14" /><path d="M19 12l-7 7-7-7" />
            </svg>
          </div>
        </div> */}
      {/* </div> */}

      {/* OVERLAPPING STAR ASSET */}
      {/* <div className="absolute left-[50%] md:left-[55%] lg:left-[50%] top-[40%] md:top-[30%] -translate-x-[50%] md:-translate-x-12 z-20 pointer-events-none hidden md:block">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#2c533e] drop-shadow-xl animate-spin-slow">
          <path d="M50 0L56.5 43.5L100 50L56.5 56.5L50 100L43.5 56.5L0 50L43.5 43.5L50 0Z" fill="currentColor"/>
          <path d="M14.5 14.5L45.5 45.5L85.5 14.5L54.5 45.5L85.5 85.5L54.5 54.5L14.5 85.5L45.5 54.5L14.5 14.5Z" fill="currentColor"/>
        </svg>
      </div> */}

      {/* RIGHT SIDE */}
      {/* <div className="md:w-[45%] lg:w-[51%] w-full relative h-[60dvh] md:h-[95dvh] md:absolute md:right-3 md:top-3 md:rounded-[40px] overflow-hidden shadow-2xl">

        <Image
          key={slides[index].image}
          src={slides[index].image}
          alt="hero image"
          fill
          priority
          className="object-cover animate-fadeUp"
        /> */}

      {/* Gradient Overlay */}
      {/* <div className="absolute inset-0 bg-black/10 z-10" /> */}

      {/* TOP RIGHT LANGUAGE SWITCHER */}
      {/* <div className="absolute top-8 right-8 z-30 flex gap-4 text-white text-sm font-medium tracking-wide drop-shadow-md">
          <button className="hover:text-gray-200 transition">EN</button>
          <button className="text-white/60 hover:text-white transition">FR</button>
        </div> */}

      {/* BOTTOM PILLS OVERLAY */}
      {/* <div className="absolute bottom-12 left-8 md:left-12 z-30 flex flex-col gap-4">
          <div className="flex gap-4 flex-wrap">
            <div className="px-6 py-3 rounded-full border border-white text-white text-lg font-light backdrop-blur-sm shadow-lg font-[var(--font-dm-sans)]">
              Calm Mind
            </div>
            <div className="px-6 py-3 rounded-full bg-white text-[#c42d2d] text-lg font-medium shadow-lg font-[var(--font-dm-sans)]">
              Clear Direction
            </div>
          </div>
          <div className="px-6 py-3 rounded-full bg-white text-[#c42d2d] text-lg font-medium shadow-lg inline-block w-max font-[var(--font-dm-sans)]">
            Visible Life Shifts
          </div>
        </div>
      </div> */}
    </section>
  );
}
