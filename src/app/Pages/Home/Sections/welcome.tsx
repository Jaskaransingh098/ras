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

  const splitText = (text: string, className: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className={`${className} inline-block`}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  useEffect(() => {
    // 🔥 Ticker always runs
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
          toggleActions: "play none none reset",
        },
      });

      tl.fromTo(
        ".letter-p",
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power4.out",
          stagger: 0.03,
        },
        0,
      );

      tl.fromTo(
        ".letter-h",
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power4.out",
          stagger: 0.04,
        },
        0,
      );
    }, containerRef);

    return () => ctx.revert();
  }, [scrollRef]);

  return (
    <div className="relative px-1.5">
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
          <source src="/home/welcome.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/60 rounded-t-[30px]" />

        <div className="relative z-10 text-center max-w-4xl text-white">
          <p className="text-sm tracking-[0.3em] uppercase mb-6">
            {splitText(
              "Welcome to the work that goes beyond logical mind …",
              "letter-p",
            )}
            <br />
            {splitText("into pure transformation", "letter-p")}
          </p>

          <h1 className="text-[32px] md:text-[64px] leading-[1] font-light">
            {splitText("When Your Energy Shifts,", "letter-h")}
            <br />
            <span className="text-red-600 font-extrabold">
              {splitText("Your Entire Reality Changes", "letter-h")}
            </span>
          </h1>
        </div>
      </div>

      <div className="overflow-hidden border-y border-[#e7e2d9] py-4 bg-[#393636] rounded-b-[30px]">
        <div ref={tickerRef} className="flex whitespace-nowrap w-max">
          {[...Array(4)].map((_, i) => (
            <p
              key={i}
              className="mx-16 text-[#f9f7f7] text-lg md:text-2xl font-medium tracking-wide"
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
