"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const slides = [
  {
    word: "RELATIONSHIP",
    image: "/hero/relationship.jpg",
  },
  {
    word: "LIFE",
    image: "/hero/life.jpg",
  },
  {
    word: "BUSINESS",
    image: "/hero/business.jpg",
  },
  {
    word: "CAREER",
    image: "/hero/career.jpg",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  // Video crossfade refs/state
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([null, null]);
  const [activeVideo, setActiveVideo] = useState<number>(0);

  useEffect(() => {
    const handlers: Array<(this: HTMLVideoElement, ev: Event) => void> = [
      () => {
        const next = 1;
        const nextV = videoRefs.current[next];
        const curV = videoRefs.current[0];
        if (nextV) {
          nextV.currentTime = 0;
          nextV.play().catch(() => {});
        }
        // let next start, then fade
        setTimeout(() => setActiveVideo(next), 60);
        setTimeout(() => { if (curV) { curV.pause(); curV.currentTime = 0; } }, 1200);
      },
      () => {
        const next = 0;
        const nextV = videoRefs.current[next];
        const curV = videoRefs.current[1];
        if (nextV) {
          nextV.currentTime = 0;
          nextV.play().catch(() => {});
        }
        setTimeout(() => setActiveVideo(next), 60);
        setTimeout(() => { if (curV) { curV.pause(); curV.currentTime = 0; } }, 1200);
      },
    ];

    const v0 = videoRefs.current[0];
    const v1 = videoRefs.current[1];
    if (v0) v0.addEventListener("ended", handlers[0]);
    if (v1) v1.addEventListener("ended", handlers[1]);

    // Start first video
    if (v0) {
      v0.currentTime = 0;
      v0.play().catch(() => {});
      setActiveVideo(0);
    }

    return () => {
      if (v0) v0.removeEventListener("ended", handlers[0]);
      if (v1) v1.removeEventListener("ended", handlers[1]);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col md:flex-row items-center justify-between w-full h-screen relative overflow-hidden">
      {/* Background videos (stacked) */}
      {/*
        Two videos are stacked and crossfaded. Videos must be in `public/hero`:
        - /hero/final-01.mp4
        - /hero/final-02.mp4
      */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <video
          ref={(el: HTMLVideoElement | null) => { videoRefs.current[0] = el; }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${activeVideo === 0 ? 'opacity-100 z-0' : 'opacity-0 z-0'}`}
          src="/hero/final-01.mp4"
          playsInline
          muted
          aria-hidden={true}
        />

        <video
          ref={(el: HTMLVideoElement | null) => { videoRefs.current[1] = el; }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${activeVideo === 1 ? 'opacity-100 z-0' : 'opacity-0 z-0'}`}
          src="/hero/final-02.mp4"
          playsInline
          muted
          aria-hidden={true}
        />

        {/* Dim overlay to improve text contrast */}
        <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />
      </div>
      {/* LEFT SIDE */}
      <div className="flex-1 w-full max-w-2xl px-6 md:pl-16 lg:pl-18 pt-32 md:pt-20 pb-16 z-10 mx-auto md:mx-0">
        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(6px); }
          }
        `}</style>

        <div className="flex items-center gap-3 mb-6">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#c42d2d]">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="12" r="4" fill="currentColor" />
          </svg>
          <span className="text-[15px] tracking-[0.2em] font-medium text-[#c42d2d]/70 uppercase font-[var(--font-dm-sans)]">
            Are you stuck in
          </span>
        </div>

        {/* Headline + vertical slide indicator */}
        <div className="flex items-start gap-6">
          <h1 className="text-[56px] md:text-[80px] leading-[1.05] font-light text-[#1f201d] font-[var(--font-outfit)] tracking-tight mb-3 flex-1">
            <span className="relative h-[90px] md:h-[110px] overflow-hidden align-bottom inline-block w-full">
              <span
                key={slides[index].word}
                className="block font-semibold transition-all duration-500 ease-in-out transform animate-fadeUp"
              >
                {slides[index].word}
              </span>
            </span>
          </h1>

          {/* Vertical slide indicator */}
          <div className="hidden md:flex flex-col items-center gap-1.5 pt-4">
            {slides.map((s, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className="group flex items-center gap-2.5 cursor-pointer"
              >
                <span className={`text-[10px] uppercase tracking-widest font-medium font-[var(--font-dm-sans)] transition-all duration-500 ${i === index ? 'text-[#c42d2d] opacity-100' : 'text-transparent opacity-0 group-hover:text-gray-400 group-hover:opacity-100'}`}>
                  {s.word.slice(0, 3)}
                </span>
                <div className={`rounded-full transition-all duration-500 ${i === index ? 'w-2.5 h-2.5 bg-[#c42d2d] shadow-md shadow-[#c42d2d]/30' : 'w-1.5 h-1.5 bg-gray-300 group-hover:bg-gray-400'}`} />
              </button>
            ))}
            <div className="w-px h-6 bg-gradient-to-b from-gray-200 to-transparent mt-1" />
          </div>
        </div>

        <hr className="border-t border-gray-300 w-[95%] mb-3" />

        <p className="text-[#6b6b6b] text-base md:text-sm max-w-[420px] leading-relaxed font-light font-[var(--font-inter)]">
          Welcome to the work that goes beyond the logical mind… into pure transformation.
          When your energy shifts, your entire reality changes.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-3">
          <button className="flex items-center gap-2 bg-[#c42d2d] hover:bg-[#a82525] text-white rounded-full px-6 py-2.5 transition-all duration-300 w-full sm:w-auto justify-center shadow-lg shadow-[#c42d2d]/25">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="text-[16px] tracking-wide font-medium font-[var(--font-outfit)]">
              Book Your Diagnostic Call
            </span>
          </button>
          <button className="flex items-center gap-2 border-2 border-[#c42d2d] text-[#c42d2d] hover:bg-[#c42d2d] hover:text-white rounded-full px-6 py-2.5 transition-all duration-300 w-full sm:w-auto justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <span className="text-[16px] tracking-wide font-medium font-[var(--font-outfit)]">
              Watch One Session Shift
            </span>
          </button>
        </div>

        {/* Scrolling marquee strip */}
        <div className="mt-10 overflow-hidden max-w-[450px] relative">
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="flex whitespace-nowrap" style={{ animation: 'marquee 20s linear infinite' }}>
            {[...Array(2)].map((_, loop) => (
              <div key={loop} className="flex items-center gap-4 pr-4">
                {['Energy', 'Frequency', 'Healing', 'Abundance', 'Clarity', 'Transformation', 'Shift'].map((w) => (
                  <span key={`${loop}-${w}`} className="flex items-center gap-4">
                    <span className="text-[11px] uppercase tracking-[.25em] text-gray-300 font-medium font-[var(--font-cormorant)] italic text-[13px]">{w}</span>
                    <span className="text-[#c42d2d]/20 text-[8px]">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="mt-8 hidden md:flex items-center gap-3 text-gray-400">
          <div className="w-px h-8 bg-gradient-to-b from-gray-300 to-transparent" />
          <div className="flex flex-col items-center gap-1" style={{ animation: 'bounce-slow 2s ease-in-out infinite' }}>
            <span className="text-[9px] uppercase tracking-[.3em] font-medium font-[var(--font-dm-sans)]">Scroll</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 5v14" /><path d="M19 12l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

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
