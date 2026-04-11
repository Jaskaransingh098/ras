"use client";

import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  scrollRef: RefObject<HTMLElement | null>;
}

export default function Welcome({ scrollRef }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  const splitWords = (text: string, className: string) => {
    return text.split(" ").map((word, i) => (
      <span key={`word-${i}`} className="inline-block overflow-hidden pb-2 -mb-2 align-bottom">
        <span className={`${className} inline-block origin-bottom-left`}>{word}</span>
        {i !== text.split(" ").length - 1 && <span className="inline-block">&nbsp;</span>}
      </span>
    ));
  };

  const splitLetters = (text: string, className: string) => {
    return text.split("").map((char, i) => (
      <span key={`char-${i}`} className={`${className} inline-block will-change-transform`}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  useEffect(() => {

    if (tickerRef.current) {
      gsap.to(tickerRef.current, {
        x: "-50%",
        duration: 20,
        ease: "linear",
        repeat: -1,
      });
    }

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "20% bottom",
          toggleActions: "play none none reset",
        },
      });

      tl.fromTo(
        ".word-p",
        { y: "150%", opacity: 0, rotationZ: 5 },
        {
          y: "0%",
          opacity: 1,
          rotationZ: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.04,
        },
        0,
      );

      tl.fromTo(
        ".letter-h",
        { y: 40, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.02,
        },
        0.2,
      );
    }, containerRef);

    return () => ctx.revert();
  }, [scrollRef]);

  return (
    <div className="relative px- mt-">
      {/* VIDEO SECTION */}
     

      <div className="overflow-hidden border-y border-[#e7e2d9] py-4 bg-black/90 ">
        <div ref={tickerRef} className="flex whitespace-nowrap w-max">
          {[...Array(4)].map((_, i) => (
            <p
              key={i}
              className="mx-2 text-[#f9f7f7] text-lg md:text-2xl font-medium tracking-wide font-[var(--font-dm-sans)] italic"
            >
              First Indian who officially changed her surname to{" "}
              <span className="text-[#a51313] font-semibold text-3xl">
                Hindustani
              </span>{" "}
              •
              <span className="pl-10">•</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
