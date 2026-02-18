"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Welcome() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        rotationY: x / 20,
        rotationX: -y / 20,
        transformPerspective: 1000,
        transformOrigin: "center",
        ease: "power3.out",
        duration: 0.6,
      });
    };

    const handleLeave = () => {
      gsap.to(el, {
        rotationY: 0,
        rotationX: 0,
        ease: "power3.out",
        duration: 0.8,
      });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen bg-white rounded-t-[40px] flex items-center justify-center px-6 md:px-20"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover rounded-t-[40px]"
      >
        <source src="/home/welcome.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/40 rounded-t-[40px]"></div>
      <div className="relative z-10 text-center max-w-4xl text-white">
        <p className="text-sm tracking-[0.3em] uppercase mb-6">
          Welcome to the work that goes beyond logical mind …
          <br />
          into pure transformation
        </p>

        <h1
          ref={headlineRef}
          className="text-[32px] md:text-[76px] leading-[1.1] font-light font-[var(--font-playfair)] text-[#fff] cursor-pointer transition-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          When Your Energy Shifts,
          <br />
          <span className="bg-gradient-to-r from-[#7965ff] to-[#9c6ef7] bg-clip-text text-transparent font-extrabold">
            Your Entire Reality Changes
          </span>
        </h1>
      </div>
    </div>
  );
}
