"use client";

import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface Props {
  scrollRef: RefObject<HTMLElement | null>;
}

const AVATAR_COUNT = 12;

export default function Experience({ scrollRef }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mainNumberRef = useRef<HTMLHeadingElement>(null);
  const year1Ref = useRef<HTMLHeadingElement>(null);
  const year2Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll(".exp-reveal"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      const counter = (el: HTMLElement, endValue: number, suffix = "") => {
        const obj = { value: 0 };
        gsap.to(obj, {
          value: endValue,
          duration: 2.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.innerText = Math.floor(obj.value) + suffix;
          },
        });
      };

      if (mainNumberRef.current) counter(mainNumberRef.current, 162, "");
      if (year1Ref.current) counter(year1Ref.current, 15, "+");
      if (year2Ref.current) counter(year2Ref.current, 25, "+");
    }, section);

    return () => ctx.revert();
  }, []);

  // Duplicate the array so the CSS marquee loop is seamless
  const avatars = [...Array(AVATAR_COUNT)].map((_, i) => i + 1);
  const allAvatars = [...avatars, ...avatars]; // duplicated for infinite loop

  return (
    <section
      ref={sectionRef}
      className="relative bg-white pt-24 pb-9 overflow-hidden"
    >
      <style>{`
        @keyframes marquee-x {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .avatar-track {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: marquee-x 35s linear infinite;
        }
        .avatar-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        {/* TOP LEFT (162) */}
        <div className="exp-reveal mb-8 pl-2">
          <h1 className="text-[#a51313] text-[120px] md:text-[140px] font-[var(--font-playfair)] font-bold leading-[0.8] tracking-[-0.03em]">
            <span ref={mainNumberRef}>0</span>
          </h1>
          <p className="text-[#454545] text-xl md:text-[22px] mt-6 font-medium leading-[1.35] font-[var(--font-dm-sans)]">
            Lives transformed in just one single <br className="hidden sm:block" />
            private online session
          </p>
        </div>

        {/* BOTTOM ROW (Years + Text) */}
        <div className="grid md:grid-cols-[auto_auto_1fr] md:gap-12 lg:gap-16 items-center pl-2">
          {/* LEFT: YEARS */}
          <div className="exp-reveal flex flex-wrap gap-8 sm:gap-12 lg:gap-16">
            <div className="flex flex-col">
              <h2 className="flex items-baseline gap-2 font-[var(--font-playfair)] mb-2">
                <span
                  ref={year1Ref}
                  className="text-[#a51313] text-[50px] md:text-[54px] font-bold leading-none"
                >
                  0
                </span>
                <span className="text-[#222] text-[28px] md:text-[34px] font-bold leading-none">
                  years
                </span>
              </h2>
              <p className="text-[#444] text-[15px] md:text-[16px] font-medium whitespace-nowrap font-[var(--font-dm-sans)]">
                of professional energy work
              </p>
            </div>
            <div className="flex flex-col">
              <h2 className="flex items-baseline gap-2 font-[var(--font-playfair)] mb-2">
                <span
                  ref={year2Ref}
                  className="text-[#a51313] text-[50px] md:text-[54px] font-bold leading-none"
                >
                  0
                </span>
                <span className="text-[#222] text-[28px] md:text-[34px] font-bold leading-none">
                  years
                </span>
              </h2>
              <p className="text-[#444] text-[15px] md:text-[16px] font-medium whitespace-nowrap">
                of spiritual mastery
              </p>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="hidden md:block w-px h-[100px] bg-[#d36041] exp-reveal"></div>
          <div className="md:hidden w-16 h-px bg-[#d36041] exp-reveal my-10"></div>

          {/* RIGHT: TEXT */}
          <div className="exp-reveal max-w-[480px]">
            <p className="text-[#516075] text-[19px] md:text-[21px] leading-[1.6] font-[var(--font-inter)]">
              Raseshvari Hindustani creates transformations that feel
              miraculous yet deeply embodied and real. That's why she's known
              as the{" "}
              <strong className="italic text-[#3a495e] font-bold">
                Walking Talking Miracle
              </strong>{" "}
              of possibilities
            </p>
          </div>
        </div>
      </div>

      {/* AVATAR CAROUSEL — infinite CSS marquee */}
      <div className="mt-28 md:mt-15 overflow-hidden">
        <div className="avatar-track px-6">
          {allAvatars.map((num, i) => (
            <img
              key={i}
              src={`/clients/${num}.png`}
              alt={`Client ${num}`}
              className="w-[120px] h-[120px] md:w-[140px] md:h-[140px] rounded-[30px] object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
