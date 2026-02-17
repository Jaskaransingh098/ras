"use client";

import { useState, useEffect, useRef } from "react";
import { Arsenal, Racing_Sans_One, Mandali } from "next/font/google";
import gsap from "gsap";
import Squares from "@/components/Squares";
import CardSwap, { Card } from "@/components/CardSwap";

const slides = [
  {
    word: "LIFE?",
    image: "/home/life.jpg",
  },
  {
    word: "CAREER?",
    image: "/home/career.jpg",
  },
  {
    word: "RELATIONSHIP?",
    image: "/home/relationship.jpg",
  },
  {
    word: "BUSINESS?",
    image: "/home/business.jpg",
  },
];

const sekuya = Arsenal({
  subsets: ["latin"],
  weight: "400",
  // style: "italic",
});

const racing = Racing_Sans_One({
  subsets: ["latin"],
  weight: "400",
});

const aboreto = Mandali({
  subsets: ["latin"],
  weight: "400",
});

export default function Hero() {
  const [index, setIndex] = useState(0);
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!wordRef.current) return;

    const tl = gsap.timeline();

    tl.to(wordRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    }).fromTo(
      wordRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      },
    );
  }, [index]);

  return (
    <section className=" relative w-full h-[99vh] overflow-hidden bg-white">
      <div className="absolute inset-0 z-1">
        <Squares
          speed={0.4}
          squareSize={55}
          direction="diagonal"
          borderColor="rgba(0, 0, 0, 0.08)"
          hoverFillColor="#dc2626"
        />
      </div>
      <div className="relative w-[90vw] h-[99vh] mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* LEFT SIDE */}
        <div className="flex-1 pr-10 mt-20">
          <h1 className={`${racing.className} relative z-20 text-5xl md:text-6xl leading-tight text-black`}>
            ARE YOU STUCK IN <br />
            <span ref={wordRef} className={`${sekuya.className} text-red-600 inline-block`}>
              {slides[index].word}
            </span>
          </h1>

          <p className={`${aboreto.className} relative z-20 mt-6 text-gray-800 text-md max-w-lg`}>
            Break through confusion and gain clarity with our expert sessions.
            Your transformation starts with one step.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="relative bg-red-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-red-700 transition z-20">
              Book Your Diagnostic Call
            </button>
            
            <button className="relative z-20 border bg-white border-gray-300 px-8 py-4 rounded-full font-semibold text-gray-700 hover:bg-gray-100 transition">
              Watch one session shift
            </button>
          </div>
        </div>

        {/* RIGHT SIDE - CardSwap */}
        <div className="flex-1 relative h-[500px] mr-20 no-grid-hover z-10">
          <CardSwap
            width={750}
            height={530}
            cardDistance={100}
            verticalDistance={70}
            delay={5000}
            pauseOnHover={false}
            easing="elastic"
            onCardClick={(activeIndex) => setIndex(activeIndex)}
          >
            {slides.map((slide, i) => (
              <Card
                key={i}
                customClass="bg-white shadow-2xl flex items-center justify-center overflow-hidden"
              >
                <img
                  src={slide.image}
                  alt={slide.word}
                  className="w-full h-full object-cover rounded-xl"
                />
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </section>
  );
}
