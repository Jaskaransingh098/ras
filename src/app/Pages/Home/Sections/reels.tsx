"use client";

import { useRef, RefObject } from "react";
import gsap from "gsap";

interface Props {
  scrollRef: RefObject<HTMLElement | null>;
}

export default function Reel({ scrollRef }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    const scrollAmount = 350;

    gsap.to(sliderRef.current, {
      x: direction === "left" ? "+=" + scrollAmount : "-=" + scrollAmount,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const cards = [
    {
      title: "15 Years of",
      highlight: "Corporate Turmoil",
      sub: "Shifted in",
      badge: "One Session",
      name: "Kamal Girdhar",
      role: "Banking Professional",
      location: "New Delhi",
      image: "/reels/1.jpg",
    },
    {
      title: "Pain to Power",
      highlight: "",
      sub: "in just one",
      badge: "Energy Shift Session",
      name: "Dr. Rajpreet",
      role: "Dentist",
      location: "",
      image: "/reels/2.jpg",
    },
    {
      title: "From Stuck to",
      highlight: "Business Growth",
      sub: "in just one",
      badge: "Revenue Energetic Session",
      name: "Shashank Singh",
      role: "Founder Blackwik",
      location: "New Delhi",
      image: "/reels/3.jpg",
    },
  ];

  return (
    <section className="py-8 rounded-2xl bg-[#FFFDE1]">
      <div className="text-center mb-20">
        <p className="text-sm uppercase tracking-widest text-[#c42d2d] mb-4">
          Our Clients Brag About Us
        </p>

        <h2 className="text-[48px] md:text-[64px] font-[var(--font-playfair)] text-[#111] leading-tight max-w-4xl mx-auto">
          Don’t believe us? Hear it straight from them.
        </h2>
      </div>

      {/* SLIDER */}
      <div className="relative max-w-7xl mx-auto overflow-hidden">
        <div ref={sliderRef} className="flex gap-8 w-max">
          {cards.map((card, i) => (
            <div
              key={i}
              className="relative w-[320px] h-[520px] rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-[#c42d2d] to-[#ff6a6a]"
            >
              {/* GRID OVERLAY */}
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:30px_30px]" />

              {/* CONTENT */}
              <div className="relative z-10 p-8 text-white h-full flex flex-col justify-between">
                {/* TOP TEXT */}
                <div>
                  <h3 className="text-2xl font-bold leading-snug">
                    {card.title}
                  </h3>

                  {card.highlight && (
                    <h3 className="text-2xl font-extrabold uppercase mt-1">
                      {card.highlight}
                    </h3>
                  )}

                  <p className="mt-3">{card.sub}</p>

                  <div className="mt-3 inline-block bg-white text-[#c42d2d] px-4 py-1 rounded-full text-sm font-semibold">
                    {card.badge}
                  </div>
                </div>

                {/* BOTTOM PROFILE */}
                <div>
                  <img
                    src={card.image}
                    className="w-full h-48 object-cover rounded-2xl mb-4"
                  />

                  <p className="font-semibold">{card.name}</p>
                  <p className="text-sm opacity-80">{card.role}</p>
                  <p className="text-sm opacity-70">{card.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* NAVIGATION */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={() => scroll("left")}
            className="w-12 h-12 rounded-full bg-[#c42d2d] text-white text-xl"
          >
            ←
          </button>

          <div className="w-32 h-2 bg-[#e7e2d9] rounded-full relative">
            <div className="absolute left-0 top-0 h-full w-1/3 bg-[#c42d2d] rounded-full"></div>
          </div>

          <button
            onClick={() => scroll("right")}
            className="w-12 h-12 rounded-full bg-[#c42d2d] text-white text-xl"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
