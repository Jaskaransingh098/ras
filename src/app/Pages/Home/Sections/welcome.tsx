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

  const splitText = (text: string, className: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className={`${className} inline-block`}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const navbar = document.getElementById("main-navbar");

    if (navbar && containerRef.current) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        scroller: scrollRef.current,
        start: "top 80%",
        end: "bottom 20%",

        // Hide navbar when entering Welcome
        onEnter: () => {
          gsap.to(navbar, { y: -100, autoAlpha: 0, duration: 0.4 });
        },

        // Hide again if scrolling back down into Welcome
        onEnterBack: () => {
          gsap.to(navbar, { y: -100, autoAlpha: 0, duration: 0.4 });
        },

        // Show navbar when leaving Welcome going down
        onLeave: () => {
          gsap.to(navbar, { y: 0, autoAlpha: 1, duration: 0.4 });
        },

        // Show navbar when leaving Welcome going up
        onLeaveBack: () => {
          gsap.to(navbar, { y: 0, autoAlpha: 1, duration: 0.4 });
        },
      });
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          scroller: scrollRef.current,
          start: "top 70%",
          toggleActions: "play none none reset",
          // once: true,
        },
      });

      // Paragraph letters
      tl.fromTo(
        ".letter-p",
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          stagger: 0.03,
        },
        0,
      );

      // Heading letters (start same time)
      tl.fromTo(
        ".letter-h",
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          stagger: 0.04,
        },
        0,
      );
    }, containerRef);

    return () => ctx.revert();
  }, [scrollRef]);

  return (
    <div
      ref={containerRef}
      className="relative h-[50vh] rounded-[30px] flex items-center justify-center px-6 md:px-20 overflow-hidden"
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

      <div className="absolute inset-0 bg-black/40 rounded-t-[30px]" />

      <div className="relative z-10 text-center max-w-4xl text-white">
        <p className="text-sm tracking-[0.3em] uppercase mb-6">
          {splitText(
            "Welcome to the work that goes beyond logical mind …",
            "letter-p",
          )}
          <br />
          {splitText("into pure transformation", "letter-p")}
        </p>

        <h1 className="text-[32px] md:text-[76px] leading-[1.1] font-light">
          {splitText("When Your Energy Shifts,", "letter-h")}
          <br />
          <span className="text-red-600 font-extrabold">
            {splitText("Your Entire Reality Changes", "letter-h")}
          </span>
        </h1>
      </div>
    </div>
  );
}
