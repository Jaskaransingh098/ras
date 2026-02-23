"use client";

import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface Props {
  scrollRef: RefObject<HTMLElement | null>;
}

export default function Experience({ scrollRef }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const mainNumberRef = useRef<HTMLHeadingElement>(null);
  const year1Ref = useRef<HTMLHeadingElement>(null);
  const year2Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll(".exp-reveal"),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reset",
          },
        },
      );

      // 🔥 Infinite ticker
      if (tickerRef.current) {
        gsap.to(tickerRef.current, {
          x: "-50%",
          duration: 20,
          ease: "linear",
          repeat: -1,
        });
      }

      // 🔥 Infinite avatars
      if (avatarRef.current) {
        gsap.to(avatarRef.current, {
          x: "-50%",
          duration: 25,
          ease: "linear",
          repeat: -1,
        });
      }

      const counter = (el: HTMLElement, endValue: number, suffix = "") => {
        const obj = { value: 0 };

        gsap.to(obj, {
          value: endValue,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reset",
          },
          onUpdate: () => {
            el.innerText = Math.floor(obj.value) + suffix;
          },
        });
      };

      if (mainNumberRef.current) counter(mainNumberRef.current, 162, "+");
      if (year1Ref.current) counter(year1Ref.current, 15, "+");
      if (year2Ref.current) counter(year2Ref.current, 25, "+");
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#feebfb] py-20 overflow-hidden rounded-[30px] "
    >
      {/* 🔥 TOP TICKER */}
      {/* <div className="overflow-hidden border-y border-[#e7e2d9] py-4 bg-[#FFF8CC]">
        <div ref={tickerRef} className="flex whitespace-nowrap w-max">
          {[...Array(4)].map((_, i) => (
            <p
              key={i}
              className="mx-16 text-[#111] text-lg md:text-xl font-medium tracking-wide"
            >
              First Indian who officially changed her surname to{" "}
              <span className="text-[#c42d2d] font-semibold">Hindustani</span> •
            </p>
          ))}
        </div>
      </div> */}

      {/* MAIN CONTENT */}
      <div className="max-w-8xl mx-auto px-12 grid md:grid-cols-2 gap-20 items-center">
        {/* LEFT */}
        {/* LEFT - Masonry Stats */}
        <div className="exp-reveal grid grid-cols-2 auto-rows-[140px] gap-6 pr-10 border-r-1 border-[#c42d2d]">
          {/* BIG MAIN CARD */}
          <div className="col-span-2 row-span-1 bg-gradient-to-br from-[#c42d2d] to-[#ff6a6a] text-white rounded-3xl p-10 flex flex-col justify-center shadow-xl">
            <h1
              ref={mainNumberRef}
              className="text-[80px] font-[var(--font-playfair)] leading-none"
            >
              0
            </h1>
            <p className="mt-4 text-sm opacity-90">
              Lives transformed in one powerful session
            </p>
          </div>

          {/* SMALL CARD 1 */}
          <div className="bg-[#fff8cc] rounded-3xl p-6 flex flex-col justify-center shadow-md hover:scale-105 transition">
            <h2
              ref={year1Ref}
              className="text-6xl font-[var(--font-playfair)] text-[#c42d2d]"
            >
              0
            </h2>
            <p className="text-md text-gray-600 mt-2">
              Years of professional energy work
            </p>
          </div>

          {/* TALL CARD */}
          <div className="row-span-2 bg-[#ffe4e4] rounded-3xl p-6 flex flex-col justify-center shadow-md hover:scale-105 transition">
            <h2
              ref={year2Ref}
              className="text-8xl font-[var(--font-playfair)] text-[#111]"
            >
              0
            </h2>
            <p className="text-md text-gray-600 mt-2">
              Years of spiritual mastery
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="exp-reveal text-[#6b6b6b] text-3xl leading-relaxed max-w-2xl">
          Raseshvari Hindustani creates transformations that feel miraculous yet
          deeply embodied and real. That’s why she’s known as the{" "}
          <span className="italic font-semibold text-[#111]">
            Walking Talking Miracle
          </span>{" "}
          of possibilities.
        </div>
      </div>

      <div className="mt-10 overflow-hidden">
        <div ref={avatarRef} className="flex gap-10 w-max">
          {[...Array(12)].map((_, i) => (
            <img
              key={i}
              src={`/avatars/${(i % 4) + 1}.jpg`}
              className="w-24 h-24 rounded-2xl object-cover border-2 border-[#FFFDE1] shadow-sm"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
