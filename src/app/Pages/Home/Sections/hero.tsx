"use client";

import { useEffect, useState, useRef } from "react";

const slides = [
  {
    word: "RELATIONSHIP??",
    image: "/hero/2.mp4",
  },
  {
    word: "BODY??",
    image: "/hero/Body.mp4",
  },
  {
    word: "BUSINESS??",
    image: "/hero/Business_.mp4",
  },
  {
    word: "CAREER??",
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
    <section className="flex flex-col items-center justify-end 2xl:justify-between w-full relative overflow-hidden bg-black/90 h-[56.25vw] min-h-[220px] 2xl:h-[90vh] 2xl:min-h-0">
      {/* Background videos (stacked) */}

      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {slides.map((s, i) => (
          <video
            key={i}
            ref={(el: HTMLVideoElement | null) => { videoRefs.current[i] = el; }}
            className={`absolute inset-0 w-full h-full object-contain object-center 2xl:object-cover transition-opacity duration-1000 ${activeVideo === i ? 'opacity-100 z-0' : 'opacity-0 z-0'}`}
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
      <div className="absolute bottom-[2%] sm:bottom-[5%] left-1/2 -translate-x-1/2 w-full max-w-3xl px-2 sm:px-6 z-30 pointer-events-auto text-center">
        <style jsx>{`
          @keyframes wordReveal {
            0%   { opacity: 0; transform: translateY(32px); letter-spacing: 0.08em; }
            100% { opacity: 1; transform: translateY(0);    letter-spacing: -0.02em; }
          }
          .word-reveal {
            animation: wordReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}</style>

        {/* Glass Container for Hero Text */}
        <div className="inline-block px-2 sm:px-8 2xl:px-10 py-1.5 sm:py-6 2xl:py-8 rounded-[10px] sm:rounded-[32px] 2xl:rounded-[40px] bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl mb-1.5 w-[50%] sm:w-[80%]">
          {/* — Eyebrow label — */}
          <div className="flex items-center justify-center gap-2 mb-1.5 sm:mb-4">
            <span
              className="text-[9px] sm:text-[18px] 2xl:text-[22px] uppercase tracking-[0.08em] sm:tracking-[0.2em] font-extrabold 2xl:font-bold text-white/90 font-[var(--font-dm-sans)]"
            >
              Are You Stuck In Your
            </span>
          </div>

          {/* — Main rotating word — */}
          <h1 className="mb-" style={{ lineHeight: 1 }}>
            <span
              key={slides[index].word}
              className="word-reveal block font-bold italic section-heading"
              style={{
                fontSize: "clamp(14px, 5vw, 65px)",
                letterSpacing: "-0.02em",
                color: "#a51313",
                // textShadow: "0 2px 12px r, 0 4px 24px rgba(0,0,0,0.6)",
              }}
            >
              {slides[index].word}
            </span>
          </h1>
        </div>


        {/* — CTAs — */}
        <div className="flex flex-row items-center justify-center gap-1.5 sm:gap-3 w-full sm:w-auto px-1 sm:px-0">
          <button className="flex items-center justify-center gap-1 sm:gap-2 bg-white hover:bg-white/95 text-[#c42d2d] rounded-full px-2.5 sm:px-6 py-1 sm:py-2.5 transition-all duration-300 shadow-lg shadow-black/40">
            <svg width="10" height="10" className="sm:w-[14px] sm:h-[14px]" viewBox="0 0 24 24" fill="none" stroke="#c42d2d" strokeWidth="2" strokeLinecap="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="text-[10px] sm:text-[15px] tracking-wide font-medium font-[var(--font-outfit)]">
              Book Diagnostic Call
            </span>
          </button>
          <button className="flex items-center justify-center gap-1 sm:gap-2 border border-white/60 text-white hover:bg-white hover:text-[#c42d2d] rounded-full px-2.5 sm:px-6 py-1 sm:py-2.5 transition-all duration-300">
            <svg width="10" height="10" className="sm:w-[14px] sm:h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <span className="text-[10px] sm:text-[15px] tracking-wide font-medium font-[var(--font-outfit)]">
              Watch Session
            </span>
          </button>
        </div>
      </div>


      
    </section>
  );
}
