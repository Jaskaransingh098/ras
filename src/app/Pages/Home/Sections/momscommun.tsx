"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// 15 moms images - widescreen layout
const momsImages = Array.from({ length: 16 }).map((_, i) => ({
  id: i + 1,
  src: `/moms/${i + 1}.png`,
  alt: `Moms Community ${i + 1}`,
}));

export default function MomsCommunity() {
  const sectionRef = useRef<HTMLElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const pos1Ref = useRef(0);
  const pos2Ref = useRef(0);

  useEffect(() => {
    const s = sectionRef.current;
    if (!s) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        s.querySelectorAll(".mc-reveal"),
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

  useEffect(() => {
    const col1 = col1Ref.current;
    const col2 = col2Ref.current;
    if (!col1 || !col2) return;

    let animFrame: number;

    // let pos1 = 0;
    // let pos2 = -col2.scrollHeight / 2;
    pos1Ref.current = 0;
    pos2Ref.current = -col2.scrollHeight / 2;

    let isPaused1 = false;
    let isPaused2 = false;

    const totalH1 = col1.scrollHeight / 2;
    const totalH2 = col2.scrollHeight / 2;

    const speed = 1;


    const col1Container = col1.parentElement;
    const col2Container = col2.parentElement;

    const enter1 = () => (isPaused1 = true);
    const leave1 = () => (isPaused1 = false);

    const enter2 = () => (isPaused2 = true);
    const leave2 = () => (isPaused2 = false);

    col1Container?.addEventListener("mouseenter", enter1);
    col1Container?.addEventListener("mouseleave", leave1);

    col2Container?.addEventListener("mouseenter", enter2);
    col2Container?.addEventListener("mouseleave", leave2);

    const animate = () => {
      if (!isPaused1) pos1Ref.current -= speed;
      if (!isPaused2) pos2Ref.current -= speed;

      // 🔥 NEW LOOP LOGIC
      if (pos1Ref.current <= -totalH1) pos1Ref.current += totalH1;
      if (pos1Ref.current >= 0) pos1Ref.current -= totalH1;

      if (pos2Ref.current <= -totalH2) pos2Ref.current += totalH2;
      if (pos2Ref.current >= 0) pos2Ref.current -= totalH2;

      col1.style.transform = `translateY(${pos1Ref.current}px)`;
      col2.style.transform = `translateY(${pos2Ref.current}px)`;

      animFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrame);

      col1Container?.removeEventListener("mouseenter", enter1);
      col1Container?.removeEventListener("mouseleave", leave1);

      col2Container?.removeEventListener("mouseenter", enter2);
      col2Container?.removeEventListener("mouseleave", leave2);
    };
  }, []);

  // Splitting 15 images: first 7 in col 1, remaining 8 in col 2
  const col1Base = momsImages.slice(0, 7);
  const col2Base = momsImages.slice(7, 16);

  const col1Images = [...col1Base, ...col1Base];
  const col2Images = [...col2Base, ...col2Base];
  let interval: any = null;

  const startScroll = (col: "c1" | "c2", direction: "up" | "down") => {
    const speed = 4; // faster than auto

    interval = setInterval(() => {
      if (col === "c1") {
        pos1Ref.current += direction === "up" ? speed : -speed;
      } else {
        pos2Ref.current += direction === "up" ? speed : -speed;
      }
    }, 16); // ~60fps
  };

  const stopScroll = () => {
    clearInterval(interval);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70dvh] flex flex-col items-center justify-center overflow-hidden py-5 px- sm:px- md:px- bg-[#4a0e0e]/8"
    >
      {/* Left-side subtle tint only (keeps scroller neutral) */}
      <div className="absolute inset-y-0 left-0 w-[46%] z-0 pointer-events-none" />

      {/* Subtle background glows placed behind content */}
      <div className="absolute top-[18%] left-[8%] w-[220px] h-[220px] bg-[#e85d5d]/6 rounded-full blur-[90px] pointer-events-none z-0" />
      <div className="absolute bottom-[6%] left-[4%] w-[320px] h-[320px] bg-[#c42d2d]/8 rounded-full blur-[110px] pointer-events-none z-0" />

      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-20">
        {/* Left Content Area */}
        <div className="mc-reveal w-full md:w-[40%] flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-[2px] bg-gradient-to-r from-black/10 to-transparent" />
            <span className="text-[#c42d2d] text-[13px] uppercase tracking-[.4em] font-semibold font-[var(--font-dm-sans)]">
              Initiative
            </span>
          </div>

          <h2 className="section-heading font-[var(--font-playfair)] text-[#111] font-bold tracking-tight mb-5">
            <span className="block text-[32px] sm:text-[36px] md:text-[40px] leading-none">
              MOMS
            </span>
            <span className="block font-semibold text-[14px] sm:text-[16px] md:text-[18px] leading-tight py-1">
              (Multitasking Outstanding Mothers Space)
            </span>
            <span className="block italic font-bold text-[#c42d2d] text-[30px] sm:text-[34px] md:text-[38px] leading-none">
              COMMUNITY
            </span>
          </h2>

          <p className="text-black text-[14px] sm:text-[16px] md:text-[18px] font-[var(--font-dm-sans)] max-w-[360px] mb-6 md:mb-8 leading-relaxed mx-auto md:mx-0">
            {/* I&apos;m invited to speak with institutions, organizations, leaders, and young minds on how energy shapes choices and decisions—bringing clarity and ease, especially in high-pressure environments. */}
            Raseshvari founded a pan india beautiful nurturing space where
            mother's came together to co-create, co-relate and co-elevate each
            other.
          </p>

          {/* Call to Action */}
          <a
            href="#"
            className="group relative flex items-center gap-4 bg-[#111] text-white px-7 py-3.5 rounded-full font-bold text-[13px] uppercase tracking-[.1em] font-[var(--font-outfit)] shadow-[0_6px_20px_rgba(17,17,17,0.18)] hover:shadow-[0_0_40px_rgba(17,17,17,0.28)] hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">Explore More</span>
            <div className="relative z-10 w-7 h-7 rounded-full bg-white/8 flex items-center justify-center group-hover:bg-white/12 transition-colors">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </div>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/14 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
          </a>
        </div>

        {/* Right Area — 2-column infinite vertical scroll gallery */}
        <div className="mc-reveal w-full md:w-[70%] h-[300px] sm:h-[400px] md:h-[600px] lg:h-[800px] flex gap-3 overflow-hidden rounded-2xl md:rounded-3xl relative">
          {/* Fade top/bottom */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

          {/* Column 1 */}
          <div className="flex-1 relative group">
            {/* TOP ARROW */}
            {/* <button
              //   onClick={() => scrollUp("c1")}
              onMouseDown={() => startScroll("c1", "up")}
              onMouseUp={stopScroll}
              onMouseLeave={stopScroll}
              className="absolute top-2 left-1/2 -translate-x-1/2 z-20 bg-white/80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
            >
              ▲
            </button> */}

            <div className="overflow-hidden h-full">
              <div
                ref={col1Ref}
                className="flex flex-col gap-3 will-change-transform"
              >
                {col1Images.map((img, idx) => (
                  <div
                    key={`c1-${idx}`}
                    className="relative w-full rounded-xl overflow-hidden shadow-md flex-shrink-0"
                    style={{ height: "260px" }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* BOTTOM ARROW */}
            <button
              //   onClick={() => scrollDown("c1")}onMouseDown={() => startScroll("c1", "up")}
              onMouseDown={() => startScroll("c1", "down")}
              onMouseUp={stopScroll}
              onMouseLeave={stopScroll}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 bg-white/80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
              //   onMouseUp={stopScroll}
              //   onMouseLeave={stopScroll}
              //   className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 bg-white/80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
            >
              ▼
            </button>
          </div>

          {/* Column 2 */}
          <div className="flex-1 relative group">
            {/* TOP ARROW */}
            {/* <button

              onMouseDown={() => startScroll("c2", "up")}
              onMouseUp={stopScroll}
              onMouseLeave={stopScroll}
              className="absolute top-2 left-1/2 -translate-x-1/2 z-20 bg-white/80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
            >
              ▲
            </button> */}

            <div className="overflow-hidden h-full">
              <div
                ref={col2Ref}
                className="flex flex-col gap-3 will-change-transform"
              >
                {col2Images.map((img, idx) => (
                  <div
                    key={`c2-${idx}`}
                    className="relative w-full rounded-xl overflow-hidden shadow-md flex-shrink-0"
                    style={{ height: "320px" }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* BOTTOM ARROW */}
            <button
              //   onClick={() => scrollDown("c2")}
              onMouseDown={() => startScroll("c2", "down")}
              onMouseUp={stopScroll}
              onMouseLeave={stopScroll}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 bg-white/80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
            >
              ▼
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
