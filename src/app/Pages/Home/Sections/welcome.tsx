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
          start: "top 80%",
          toggleActions: "play none none none",
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
    <div className="relative px-1.5 mt-4">
      {/* VIDEO SECTION */}
      <div
        ref={containerRef}
        className="relative h-[40vh] rounded-t-[30px] flex items-center justify-center px-6 md:px-20 overflow-hidden"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover rounded-t-[30px]"
        >
          <source src="/hero/welcome.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/60 rounded-t-[30px]" />

        <div className="relative z-10 text-center max-w-4xl text-white drop-shadow-md">
          <p className="text-sm tracking-[0.3em] font-medium uppercase mb-6 drop-shadow-lg font-[var(--font-dm-sans)]">
            {splitWords(
              "Welcome to the work that goes beyond logical mind …",
              "word-p",
            )}
            <br />
            {splitWords("into pure transformation", "word-p")}
          </p>

          <h1 className="text-[32px] md:text-[62px] leading-[1.1] font-semibold drop-shadow-xl font-[var(--font-outfit)]">
            {splitLetters("When Your Energy Shifts,", "letter-h")}
            <br />
            <span className="text-red-600 font-black drop-shadow-2xl">
              {splitLetters("Your Entire Reality Changes", "letter-h")}
            </span>
          </h1>
        </div>
      </div>

      <div className="overflow-hidden border-y border-[#e7e2d9] py-4 bg-black/90 rounded-b-[30px]">
        <div ref={tickerRef} className="flex whitespace-nowrap w-max">
          {[...Array(4)].map((_, i) => (
            <p
              key={i}
              className="mx-16 text-[#f9f7f7] text-lg md:text-2xl font-medium tracking-wide font-[var(--font-cormorant)] italic"
            >
              First Indian who officially changed her surname to{" "}
              <span className="text-[#f63434] font-semibold text-3xl">
                Hindustani
              </span>{" "}
              •
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
