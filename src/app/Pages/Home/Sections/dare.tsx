"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// 13 guest images total to support 6 swapping slots (12 images) + 1 fixed center (1 image)
const guestImages = Array.from({ length: 13 }).map((_, i) => ({
    id: i + 1,
    src: `/dare/${(i % 6) + 1}.png`,
    alt: `Guest ${i + 1}`,
}));

const leftCornerSlots = [
    [guestImages[0], guestImages[1]],
    [guestImages[2], guestImages[3]],
];
const leftMidSlot = [guestImages[4], guestImages[5]];
const centerImg = guestImages[12];
const rightMidSlot = [guestImages[6], guestImages[7]];
const rightCornerSlots = [
    [guestImages[8], guestImages[9]],
    [guestImages[10], guestImages[11]],
];

const SWAP_INTERVAL = 2500; // ms between swaps per slot

/** A single slot that swaps between 2 images */
function SwappingSlot({ images, delay, className = "flex-1" }: { images: (typeof guestImages)[number][]; delay: number; className?: string }) {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            const interval = setInterval(() => {
                setActive((p) => (p + 1) % 2);
            }, SWAP_INTERVAL);
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <div className={`relative w-full overflow-hidden shadow-md bg-gray-100 ${className}`}>
            {images.map((img, idx) => (
                <Image
                    key={img.id}
                    src={img.src}
                    alt={img.alt}
                    fill
                    className={`object-cover transition-opacity duration-700 ${active === idx ? "opacity-100" : "opacity-0"}`}
                    sizes="200px"
                    onError={(e) => {
                        const t = e.target as HTMLImageElement;
                        t.style.display = "none";
                    }}
                />
            ))}
        </div>
    );
}

export default function DareToDream() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const s = sectionRef.current;
        if (!s) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(
                s.querySelectorAll(".dare-reveal"),
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power3.out",
                    scrollTrigger: { trigger: s, start: "20% bottom", toggleActions: "play none none reset" },
                }
            );
        }, s);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative h-[90dvh] flex justify-center items-center py-6 md:py-4 bg-gradient-to-b from-[#8a0a0a] to-[#4a0e0e] overflow-hidden">
            <div className="relative z-10 w-full h-full max-w-[1400px] mx-auto px-4 md:px-8">

                {/* 5-Column Grid Layout spanning full height */}
                <div className="w-full h-full flex gap-3 md:gap-5 px-">

                    {/* LEFT TALL COLUMN (Corner) — 2 swapping slots */}
                    <div className="flex-1 flex flex-col gap-3 md:gap-4 h-full pt-[%]">
                        {leftCornerSlots.map((imgs, i) => (
                            <SwappingSlot key={i} images={imgs} delay={i * 600} className="flex-1 rounded-2xl md:rounded-[36px]" />
                        ))}
                    </div>

                    {/* LEFT-CENTER spacer col — 1 tall swapping slot */}
                    <div className="flex-[1.1] flex flex-col h-full pt-[8%] pb-[2%]">
                        <SwappingSlot images={leftMidSlot} delay={1200} className="h-[75%] rounded-[24px] md:rounded-[36px]" />
                    </div>

                    {/* CENTER COLUMN — Text + fixed wide image at bottom */}
                    <div className="flex-[1.8] flex flex-col h-full justify-between items-center text-center pt-[5%] pb-[1%] px-2">

                        {/* Text Content */}
                        <div className="dare-reveal flex flex-col items-center">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-6 h-px bg-gradient-to-r from-transparent to-[#c42d2d]" />
                                <span className="text-white text-[10px] md:text-[11px] uppercase tracking-[.3em] font-semibold font-[var(--font-dm-sans)]">
                                    Instagram Live Diaries Series
                                </span>
                                <div className="w-6 h-px bg-gradient-to-l from-transparent to-[#c42d2d]" />
                            </div>

                            <h2 className="section-heading text-[28px] md:text-[42px] font-[var(--font-playfair)] text-white font-bold leading-[1.05] tracking-tight mb-4">
                                Dare to <span className="font-light italic text-white">Dream.</span>
                            </h2>


                            <p className="text-white/90 text-[16px] md:text-[18px] font-semibold font-[var(--font-dm-sans)] max-w-md leading-relaxed mb-6 mt-23">
                                Raseshvari Hindustani hosted an Instagram Live series featuring 52 renowned and honoured voices including Padma Shri awardees, leaders, artists and professionals from diverse fields all across India and beyond— not to showcase success, but to humanize it.
 So people watching can feel: <br/><span className="italic"> “If this is possible for them… it is possible for me too !</span>
                            </p>

                            <button className="bg-[#1a1a1a] text-white hover:bg-[#c42d2d] transition-colors px-8 py-3 rounded-[12px] font-medium text-[14px] font-[var(--font-outfit)] shadow-md">
                                Check the Series
                            </button>
                        </div>

                        {/* Fixed center wide image */}
                        {/* <div className="relative w-full flex-1 rounded-[24px] md:rounded-[36px] overflow-hidden shadow-md mt-8 bg-gray-100">
                            <Image
                                src={centerImg.src}
                                alt={centerImg.alt}
                                fill
                                className="object-cover"
                                sizes="400px"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                            />
                        </div> */}
                    </div>

                    {/* RIGHT-CENTER spacer col — 1 tall swapping slot */}
                    <div className="flex-[1.1] flex flex-col h-full pt-[8%] pb-[2%]">
                        <SwappingSlot images={rightMidSlot} delay={1800} className="h-[75%] rounded-[24px] md:rounded-[36px]" />
                    </div>

                    {/* RIGHT TALL COLUMN (Corner) — 2 swapping slots */}
                    <div className="flex-1 flex flex-col gap-3 md:gap-4 h-full pt-[%]">
                        {rightCornerSlots.map((imgs, i) => (
                            <SwappingSlot key={i} images={imgs} delay={i * 600 + 2400} className="flex-1 rounded-2xl md:rounded-[36px]" />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
