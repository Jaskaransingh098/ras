"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";

const screenshots = [
    { id: 1, src: "/linkedin/rec-1.png", alt: "Recommendation 1" },
    { id: 2, src: "/linkedin/rec-2.png", alt: "Recommendation 2" },
    { id: 3, src: "/linkedin/rec-3.png", alt: "Recommendation 3" },
    { id: 4, src: "/linkedin/rec-4.png", alt: "Recommendation 4" },
    { id: 5, src: "/linkedin/rec-5.png", alt: "Recommendation 5" },
    { id: 6, src: "/linkedin/rec-6.png", alt: "Recommendation 6" },
];

export default function LinkedIn() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const animRef = useRef<number | null>(null);

    const checkScroll = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        const halfScroll = el.scrollWidth / 2;
        setCanScrollLeft(el.scrollLeft > 10);
        setCanScrollRight(el.scrollLeft < halfScroll - 10);
    }, []);

    // Continuous auto-scroll
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        let lastTime = 0;
        const speed = 0.5; // px per frame

        function animate(time: number) {
            if (!isPaused && el) {
                const delta = lastTime ? time - lastTime : 16;
                lastTime = time;
                el.scrollLeft += speed * (delta / 16);

                // Reset to start when reaching the duplicate set
                const halfScroll = el.scrollWidth / 2;
                if (el.scrollLeft >= halfScroll) {
                    el.scrollLeft = 0;
                }
            } else {
                lastTime = time;
            }
            animRef.current = requestAnimationFrame(animate);
        }

        animRef.current = requestAnimationFrame(animate);
        return () => {
            if (animRef.current) cancelAnimationFrame(animRef.current);
        };
    }, [isPaused]);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        el.addEventListener("scroll", checkScroll);
        checkScroll();
        return () => el.removeEventListener("scroll", checkScroll);
    }, [checkScroll]);



    // Duplicate screenshots for infinite loop
    const allScreenshots = [...screenshots, ...screenshots];

    return (
        <section
            className="relative min-h-[80dvh] max-h-[90dvh] flex flex-col justify-center overflow-hidden"
            style={{ background: "linear-gradient(180deg, #f5f0ea 0%, #efe8df 50%, #f5f0ea 100%)" }}
        >
            <style jsx>{`
                .scroll-container {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                .scroll-container::-webkit-scrollbar {
                    display: none;
                }
                .rec-card {
                    position: relative;
                    border-radius: 16px;
                    overflow: hidden;
                    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
                    flex-shrink: 0;
                }
                .rec-card:hover {
                    transform: translateY(-6px) scale(1.02);
                    box-shadow: 0 24px 48px -12px rgba(0,0,0,0.12);
                }
            `}</style>

            {/* Background decorations */}
            <div className="absolute top-[15%] right-[8%] w-[250px] h-[250px] bg-[#c42d2d]/[0.02] rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[10%] left-[10%] w-[200px] h-[200px] bg-[#8a7565]/[0.02] rounded-full blur-[80px] pointer-events-none" />

            {/* Decorative quote marks */}
            <div className="absolute top-10 right-10 md:right-16 pointer-events-none select-none">
                <span className="text-[120px] md:text-[160px] font-[var(--font-playfair)] text-black/[0.025] leading-none">&rdquo;</span>
            </div>

            {/* Vertical decorative text — left edge */}
            <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden md:block">
                <p className="text-[10px] uppercase tracking-[.5em] text-black/[0.04] font-bold font-[var(--font-dm-sans)] whitespace-nowrap" style={{ writingMode: 'vertical-lr' }}>
                    Trusted &middot; Verified &middot; Authentic &middot; Recommendations
                </p>
            </div>



            <div className="w-full relative z-10 pt-16 md:pt-20 pb-14 md:pb-16">
                {/* Header row */}
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-end md:justify-between mb-10">
                    <div className="flex items-center gap-5">
                        {/* LinkedIn icon */}
                        {/* <div className="w-13 h-13 rounded-2xl bg-[#c42d2d] flex items-center justify-center shadow-lg shadow-[#c42d2d]/20 flex-shrink-0 p-3.5">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </div> */}
                        <div>
                            <div className="flex items-center gap-3 mb-1.5">
                                <div className="w-8 h-[2px] rounded-full bg-gradient-to-r from-[#c42d2d] to-transparent" />
                                <p className="text-[10px] uppercase tracking-[.35em] text-[#c42d2d]/70 font-semibold font-[var(--font-dm-sans)]">
                                    Verified Recommendations
                                </p>
                            </div>
                            <h2 className="text-[28px] md:text-[42px] font-[var(--font-playfair)] text-[#111] leading-[1.12]">
                                Words That{" "}
                                <span className="italic text-[#c42d2d]">Speak</span> for Themselves
                            </h2>
                        </div>
                    </div>

                    {/* Right-side description */}
                    <p className="text-gray-800 text-[16px] md:text-[18px] max-w-[280px] leading-relaxed font-[var(--font-dm-sans)] mt-4 md:mt-0 md:text-right hidden md:block">
                        Real words from real professionals who experienced a lasting shift.
                    </p>
                </div>

                {/* Full-width scrollable gallery — edge to edge */}
                <div
                    className="relative"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Left fade */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
                        style={{ background: "linear-gradient(to right, #f0e9e0, transparent)" }}
                    />
                    {/* Right fade */}
                    <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
                        style={{ background: "linear-gradient(to left, #f0e9e0, transparent)" }}
                    />

                    <div
                        ref={scrollRef}
                        className="scroll-container flex gap-4 md:gap-5 overflow-x-auto px-4 md:px-6 pb-2"
                    >
                        {allScreenshots.map((s, i) => (
                            <div
                                key={`${s.id}-${i}`}
                                className="rec-card w-[260px] md:w-[300px] bg-white border border-gray-100/80 shadow-lg shadow-black/[0.04]"
                            >
                                {/* Card top bar */}
                                <div className="flex items-center gap-2 px-3.5 py-2 border-b border-gray-100/60">
                                    {/* <svg width="12" height="12" viewBox="0 0 24 24" fill="#c42d2d" opacity="0.5">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg> */}
                                    <span className="text-[9px] text-[#999] font-medium font-[var(--font-dm-sans)] tracking-wide">
                                        Recommendation
                                    </span>
                                </div>
                                {/* Screenshot */}
                                <div className="relative w-full aspect-[3/4]">
                                    <Image
                                        src={s.src}
                                        alt={s.alt}
                                        fill
                                        className="object-cover"
                                        sizes="300px"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom row — stats + badge */}
                <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                        {/* <div className="text-center">
                            <p className="text-[24px] md:text-[28px] font-[var(--font-playfair)] font-bold text-[#111]">
                                {screenshots.length}+
                            </p>
                            <p className="text-[10px] uppercase tracking-[.2em] text-[#999] font-[var(--font-dm-sans)]">
                                Recommendations
                            </p>
                        </div> */}
                        <div className="w-px h-8 bg-gray-300/50" />
                        {/* <div className="text-center">
                            <p className="text-[24px] md:text-[28px] font-[var(--font-playfair)] font-bold text-[#111]">
                                100%
                            </p>
                            <p className="text-[10px] uppercase tracking-[.2em] text-[#999] font-[var(--font-dm-sans)]">
                                Genuine
                            </p>
                        </div> */}
                    </div>

                    <div className="inline-flex items-center gap-2.5 bg-white rounded-full px-5 py-2.5 border border-gray-200/60 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-[#c42d2d] animate-pulse" />
                        <p className="text-[#666] text-[12px] font-[var(--font-dm-sans)]">
                            All sourced from{" "}
                            <span className="text-[#c42d2d] font-semibold">Instagram and Facebook</span> profiles
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
