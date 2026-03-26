"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// 13 guest images total to support 6 swapping slots (12 images) + 1 fixed center (1 image)
const guestImages = Array.from({ length: 13 }).map((_, i) => ({
    id: i + 1,
    src: `/guests/guest-${(i % 5) + 1}.jpg`,
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
    return (
        <section className="relative h-[90dvh] flex justify-center items-center py-6 md:py-10 bg-white overflow-hidden">
            <div className="relative z-10 w-full h-full max-w-[1400px] mx-auto px-4 md:px-8">

                {/* 5-Column Grid Layout spanning full height */}
                <div className="w-full h-full flex gap-3 md:gap-5 px-2">

                    {/* LEFT TALL COLUMN (Corner) — 2 swapping slots */}
                    <div className="flex-1 flex flex-col gap-3 md:gap-4 h-full pt-[3%]">
                        {leftCornerSlots.map((imgs, i) => (
                            <SwappingSlot key={i} images={imgs} delay={i * 600} className="flex-1 rounded-2xl md:rounded-[36px]" />
                        ))}
                    </div>

                    {/* LEFT-CENTER spacer col — 1 tall swapping slot */}
                    <div className="flex-[1.1] flex flex-col h-full pt-[8%] pb-[2%]">
                        <SwappingSlot images={leftMidSlot} delay={1200} className="h-[85%] rounded-[24px] md:rounded-[36px]" />
                    </div>

                    {/* CENTER COLUMN — Text + fixed wide image at bottom */}
                    <div className="flex-[1.8] flex flex-col h-full justify-between items-center text-center pt-[5%] pb-[1%] px-2">

                        {/* Text Content */}
                        <div className="flex flex-col items-center">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-6 h-px bg-gradient-to-r from-transparent to-[#c42d2d]" />
                                <span className="text-[#c42d2d] text-[10px] md:text-[11px] uppercase tracking-[.3em] font-semibold font-[var(--font-dm-sans)]">
                                    Interview Series
                                </span>
                                <div className="w-6 h-px bg-gradient-to-l from-transparent to-[#c42d2d]" />
                            </div>

                            <h2 className="text-[34px] md:text-[46px] lg:text-[54px] font-[var(--font-playfair)] text-[#111] font-bold leading-[1.05] tracking-tight mb-4">
                                Dare to <br /> <span className="font-light italic text-[#c42d2d]">Dream.</span>
                            </h2>

                            <p className="text-[#555] text-[14px] md:text-[15px] lg:text-[18px] font-semibold font-[var(--font-dm-sans)] max-w-md leading-relaxed mb-6">
                                A deep dive into the minds of visionaries, leaders, and creators. Discover the energy, pressure, and choices that shaped their extraordinary paths.
                            </p>

                            <button className="bg-[#1a1a1a] text-white hover:bg-[#c42d2d] transition-colors px-8 py-3 rounded-[12px] font-medium text-[14px] font-[var(--font-dm-sans)] shadow-md">
                                Check the Series
                            </button>
                        </div>

                        {/* Fixed center wide image */}
                        <div className="relative w-full flex-1 rounded-[24px] md:rounded-[36px] overflow-hidden shadow-md mt-8 bg-gray-100">
                            <Image
                                src={centerImg.src}
                                alt={centerImg.alt}
                                fill
                                className="object-cover"
                                sizes="400px"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                            />
                        </div>
                    </div>

                    {/* RIGHT-CENTER spacer col — 1 tall swapping slot */}
                    <div className="flex-[1.1] flex flex-col h-full pt-[8%] pb-[2%]">
                        <SwappingSlot images={rightMidSlot} delay={1800} className="h-[85%] rounded-[24px] md:rounded-[36px]" />
                    </div>

                    {/* RIGHT TALL COLUMN (Corner) — 2 swapping slots */}
                    <div className="flex-1 flex flex-col gap-3 md:gap-4 h-full pt-[2%]">
                        {rightCornerSlots.map((imgs, i) => (
                            <SwappingSlot key={i} images={imgs} delay={i * 600 + 2400} className="flex-1 rounded-2xl md:rounded-[36px]" />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
