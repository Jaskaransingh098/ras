"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// 13 guest images total to support 6 swapping slots (12 images) + 1 fixed center (1 image)
const guestImages = Array.from({ length: 12 }).map((_, i) => {
  const num = String(i).padStart(4, "0"); // 0000 → 0011

  return {
    id: i + 1,
    src: `/dare/dare to dream_20260412_140731_${num}.png`,
    alt: `Guest ${i + 1}`,
  };
});

const leftCornerSlots = [
  [guestImages[0], guestImages[1]],
  [guestImages[2], guestImages[3]],
];
const leftMidSlot = [guestImages[4], guestImages[5]];
// const centerImg = guestImages[11];
const centerBelowImg = "/dare/image below dare to dream_.png";
const rightMidSlot = [guestImages[6], guestImages[7]];
const rightCornerSlots = [
  [guestImages[8], guestImages[9]],
  [guestImages[10], guestImages[11]],
];

const SWAP_INTERVAL = 6000; // ms between swaps per slot

/** A single slot that swaps between 2 images */
function SwappingSlot({
  images,
  delay,
  className = "flex-1",
}: {
  images: (typeof guestImages)[number][];
  delay: number;
  className?: string;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setActive((p) => (p + 1) % 2);
      }, SWAP_INTERVAL);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`relative w-full overflow-hidden shadow-md bg-gray-100 ${className}`}
    >
      {images.map((img, idx) => (
        <Image
          key={img.id}
          src={img.src}
          alt={img.alt}
          fill
          priority={idx === 0} // preload first image
          className={`object-cover absolute inset-0 transition-all duration-1000 ease-in-out ${
            active === idx
              ? "opacity-100 scale-100 z-10"
              : "opacity-0 scale-100 z-0"
          }`}
          style={{
    willChange: "opacity, transform",
    backfaceVisibility: "hidden",
  }}
          sizes="200px"
          onError={(e) => {
            console.log("FAILED:", img.src);
            const t = e.target as HTMLImageElement;
            t.style.display = "none";
          }}
        />
      ))}
    </div>
  );
}

export default function DareToDream() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const s = sectionRef.current;
    if (!s) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        s.querySelectorAll(".dare-reveal"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: s,
            start: "20% bottom",
            toggleActions: "play none none reset",
          },
        },
      );
    }, s);
    return () => ctx.revert();
  }, []);
  return (
    <section
      ref={sectionRef}
      className="relative min-h-[92dvh] flex justify-center items-center py-8 md:py-4 bg-gradient-to-b from-[#8a0a0a] to-[#4a0e0e] overflow-hidden"
    >
      <div className="relative z-10 w-full h-full max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="w-full h-full flex gap-2 sm:gap-3 md:gap-4">

          {/* LEFT TALL COLUMN — hidden on mobile, visible on md+ */}
          <div className="hidden md:flex flex-1 flex-col gap-3 md:gap-4 h-[85dvh]">
            {leftCornerSlots.map((imgs, i) => (
              <SwappingSlot
                key={i}
                images={imgs}
                delay={i * 800}
                className="flex-1 rounded-2xl md:rounded-[36px]"
              />
            ))}
          </div>

          {/* LEFT-CENTER spacer col — hidden on mobile & sm, visible on lg+ */}
          <div className="hidden lg:flex flex-[1.1] flex-col h-[85dvh] pt-[8%] pb-[2%]">
            <SwappingSlot
              images={leftMidSlot}
              delay={1200}
              className="h-[75%] rounded-[24px] md:rounded-[36px]"
            />
          </div>

          {/* CENTER COLUMN — always visible */}
          <div className="flex-1 lg:flex-[1.8] flex flex-col items-center text-center pt-4 md:pt-[5%] pb-3 px-2 md:h-[85dvh] md:justify-between">
            {/* Text Content */}
            <div className="dare-reveal flex flex-col items-center">
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <div className="w-6 h-px bg-gradient-to-r from-transparent to-[#c42d2d]" />
                <span className="text-white text-[9px] md:text-[11px] uppercase tracking-[.2em] md:tracking-[.3em] font-semibold font-[var(--font-dm-sans)]">
                  Instagram Live Diaries Series
                </span>
                <div className="w-6 h-px bg-gradient-to-l from-transparent to-[#c42d2d]" />
              </div>

              <h2 className="section-heading text-[32px] sm:text-[38px] md:text-[42px] font-[var(--font-playfair)] text-white font-bold leading-[1.05] tracking-tight mb-2">
                Dare to{" "}
                <span className="font-light italic text-white">Dream.</span>
              </h2>

              <div className="w-full max-w-[280px] sm:max-w-[330px] h-[140px] sm:h-[180px] md:h-[180px] rounded-[20px] md:rounded-[36px] overflow-hidden shadow-lg bg-gray-100 relative mt-2">
                <Image
                  src={centerBelowImg}
                  alt="Center inspiration image"
                  fill
                  className="object-cover"
                  sizes="800px"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>

              <p className="text-white text-[12px] sm:text-[14px] md:text-[16px] font-semibold font-[var(--font-dm-sans)] max-w-[300px] sm:max-w-md leading-relaxed mb-3 mt-2">
                Raseshvari Hindustani hosted an Instagram Live series featuring
                52 renowned and honoured voices including Padma Shri awardees,
                leaders, artists and professionals from diverse fields all
                across India and beyond— not to showcase success, but to
                humanize it. So people watching can feel: <br />
                <span className="italic">
                  {" "}
                  "If this is possible for them… it is possible for me too !
                </span>
              </p>

              <button className="bg-[#1a1a1a] text-white hover:bg-[#c42d2d] transition-colors px-6 sm:px-8 py-2.5 sm:py-3 rounded-[12px] font-medium text-[13px] sm:text-[14px] font-[var(--font-outfit)] shadow-md">
                Check the Series
              </button>
            </div>

            {/* ── MOBILE ONLY: horizontal scrollable strip of all 6 guest image slots ── */}
            <div className="md:hidden w-screen -mx-4 mt-5 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style>{`.dare-strip::-webkit-scrollbar{display:none}`}</style>
              <div className="dare-strip flex gap-2.5 px-4" style={{ width: 'max-content' }}>
                {([...leftCornerSlots, [leftMidSlot[0], leftMidSlot[1]], [rightMidSlot[0], rightMidSlot[1]], ...rightCornerSlots] as (typeof guestImages)[number][][]).map((imgs, i) => (
                  <div key={i} className="flex-shrink-0 w-[100px] h-[140px] rounded-[16px] overflow-hidden relative bg-white/10 shadow-md border border-white/10">
                    <SwappingSlot
                      images={imgs}
                      delay={i * 500}
                      className="w-full h-full rounded-[16px]"
                    />
                  </div>
                ))}
              </div>
            </div>

            <style jsx>{`
              @keyframes centerImageSlideUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .center-image-container {
                animation: centerImageSlideUp 0.8s ease-out forwards;
              }
            `}</style>
          </div>

          {/* RIGHT-CENTER spacer col — hidden on mobile & sm, visible on lg+ */}
          <div className="hidden lg:flex flex-[1.1] flex-col h-[85dvh] pt-[8%] pb-[2%]">
            <SwappingSlot
              images={rightMidSlot}
              delay={1600}
              className="h-[75%] rounded-[24px] md:rounded-[36px]"
            />
          </div>

          {/* RIGHT TALL COLUMN — hidden on mobile, visible on md+ */}
          <div className="hidden md:flex flex-1 flex-col gap-3 md:gap-4 h-[85dvh]">
            {rightCornerSlots.map((imgs, i) => (
              <SwappingSlot
                key={i}
                images={imgs}
                delay={i * 800 + 400}
                className="flex-1 rounded-2xl md:rounded-[36px]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
