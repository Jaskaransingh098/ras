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
            start: "20% bottom",
            toggleActions: "play none none reset",
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
            start: "20% bottom",
            toggleActions: "play none none reset",
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

        {/* TWO-COLUMN LAYOUT: Left = 162 + stats | Right = welcome quote + description */}
        <div className="grid md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-start">

          {/* LEFT COLUMN: 162 number + stat years */}
          <div>
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

            {/* BOTTOM: Years stats */}
            <div className="exp-reveal flex flex-wrap gap-8 sm:gap-12 lg:gap-16 pl-2 mt-4">
              <div className="flex flex-col">
                <h2 className="section-heading flex items-baseline gap-2 font-[var(--font-playfair)] mb-2">
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
                <h2 className="section-heading flex items-baseline gap-2 font-[var(--font-playfair)] mb-2">
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
                <p className="text-[#444] text-[15px] md:text-[16px] font-medium whitespace-nowrap font-[var(--font-dm-sans)]">
                  of spiritual mastery
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Welcome quote at the top, aligned with 162 */}
          <div className="exp-reveal max-w-[460px] self-start pt-2 border-l-2 border-[#d36041]/40 pl-8 md:pl-10">

            {/* Intro quote line — accent pull-quote at top-right */}
            <div className="flex items-start gap-3 mb-26">
              {/* <div className="w-[3px] self-stretch min-h-[2.5em] rounded-full bg-[#a51313] flex-shrink-0" /> */}
              <p className="text-[#a51313] text-[15px] md:text-[20px] font-[var(--font-dm-sans)] font-bold leading-[1.4] tracking-wide uppercase">
                Welcome to the work that goes beyond the logical mind — into pure transformation
              </p>
            </div>

            <p className="text-black text-[16px] md:text-[20px] leading-[1.7] font-[var(--font-dm-sans)]">
              Raseshvari Hindustani creates transformations that feel
              miraculous yet deeply embodied and real. That&apos;s why she&apos;s known
              as the{" "}
              <strong className="italic text-[#3a495e] font-bold">
                Walking Talking Miracle
              </strong>{" "}
              of possibilities.
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
