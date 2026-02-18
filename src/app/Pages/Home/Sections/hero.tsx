"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const slides = [
  {
    word: "RELATIONSHIP",
    image: "/home/relationship.jpg",
  },
  {
    word: "LIFE",
    image: "/home/life.jpg",
  },
  {
    word: "BUSINESS",
    image: "/home/business.jpg",
  },
  {
    word: "CAREER",
    image: "/home/career.jpg",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="grid md:grid-cols-2 gap-12 ">
      {/* LEFT SIDE */}
      <div
        className="relative h-[82vh] bg-gradient-to-br from-[#faf9ff] to-[#f1efff]
 rounded-3xl px-16 py-16 flex flex-col justify-between shadow-xl border border-[#e7e2d9] mt-5"
      >
        {/* TOP CONTENT */}
        <div>
          <h1 className="text-[64px] leading-[1.08] font-light text-[#111] font-[var(--font-inter)]">
            ARE YOU STUCK IN
            <br />
            <span className="relative h-[80px] overflow-hidden align-bottom">
              <span
                key={slides[index].word}
                className="block font-[var(--font-playfair)] italic font-bold text-[#6a5acd] transition-all duration-500 ease-in-out transform animate-fadeUp"
              >
                {slides[index].word}?
              </span>
            </span>
          </h1>

          <p className="mt-6 text-[#6b6b6b] text-lg max-w-lg leading-relaxed">
            Break through confusion and gain clarity with our expert sessions.
            Your transformation starts with one step.
          </p>

          {/* CTA */}
          <button className="mt-8 flex items-center bg-black text-white rounded-full px-6 py-3 shadow-md hover:scale-105 transition-all duration-300">
            <span className="mr-4 text-sm tracking-wide">
              Book Your Diagnostic Call
            </span>

            <span className="bg-[#c7f36b] text-black w-8 h-8 flex items-center justify-center rounded-full">
              →
            </span>
          </button>
        </div>

        {/* BOTTOM REVIEW SECTION */}
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-[54px] font-light text-black font-[var(--font-playfair)]">
              2k+
            </h2>
            <p className="text-sm text-[#6b6b6b] -mt-2">positive reviews</p>

            <div className="flex -space-x-3 mt-4">
              <img
                src="/avatars/1.jpg"
                className="w-9 h-9 rounded-full border-2 border-[#fbfaf7]"
              />
              <img
                src="/avatars/2.jpg"
                className="w-9 h-9 rounded-full border-2 border-[#fbfaf7]"
              />
              <img
                src="/avatars/3.jpg"
                className="w-9 h-9 rounded-full border-2 border-[#fbfaf7]"
              />
              <img
                src="/avatars/4.jpg"
                className="w-9 h-9 rounded-full border-2 border-[#fbfaf7]"
              />
            </div>
          </div>

          <p className="text-right text-sm text-[#6b6b6b] max-w-[240px] leading-relaxed">
            More than 2K happy client recommend us for our subtle and elegant
            finishes.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div
        className="
  relative
  h-[300px]
  md:absolute md:top-0 md:right-0 md:w-1/2 md:h-screen
  overflow-hidden p-1
"
      >
        <div className="relative w-full h-full">
          {/* IMAGE */}
          <Image
            key={slides[index].image}
            src={slides[index].image}
            alt="hero image"
            fill
            priority
            className="object-cover rounded-[50px] animate-fadeUp"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#6a5acd]/20 to-transparent z-10 rounded-[50px]" />

          {/* CURVED CUT SHAPE */}
          <div className="absolute -top-1 right-0 w-[190px] h-[95px] bg-[#f6f4ef] rounded-bl-[20px] rounded-[30px] z-0"></div>
        </div>
      </div>
    </section>
  );
}
