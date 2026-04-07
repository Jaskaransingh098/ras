"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";

// 15 moms images - widescreen layout
const momsImages = Array.from({ length: 15 }).map((_, i) => ({
    id: i + 1,
    src: `/moms/${i + 1}.png`,
    alt: `Moms Community ${i + 1}`,
}));

// Duplicate for seamless infinite loop


export default function MomsCommunity() {
    const col1Ref = useRef<HTMLDivElement>(null);
    const col2Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Split into 2 columns
        const col1 = col1Ref.current;
        const col2 = col2Ref.current;
        if (!col1 || !col2) return;

        let animFrame: number;
        let pos1 = 0;
        let pos2 = -col2.scrollHeight / 2; // start col2 offset so they aren't in sync

        const totalH1 = col1.scrollHeight / 2;
        const totalH2 = col2.scrollHeight / 2;

        const speed = 1; // px per frame

        const animate = () => {
            pos1 -= speed;
            pos2 -= speed;

            // Reset when half the duplicated height is scrolled
            if (Math.abs(pos1) >= totalH1) pos1 = 0;
            if (Math.abs(pos2) >= totalH2) pos2 = -col2.scrollHeight / 2 % totalH2;

            col1.style.transform = `translateY(${pos1}px)`;
            col2.style.transform = `translateY(${pos2}px)`;

            animFrame = requestAnimationFrame(animate);
        };

        animFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animFrame);
    }, []);

    // Splitting 15 images: first 7 in col 1, remaining 8 in col 2
    const col1Base = momsImages.slice(0, 7);
    const col2Base = momsImages.slice(7, 15);

    const col1Images = [...col1Base, ...col1Base];
    const col2Images = [...col2Base, ...col2Base];

    return (
        <section className="relative min-h-[70dvh] max-h-[100dvh] flex flex-col items-center justify-center overflow-hidden py-16 px-6 md:px-12 bg-white">
            {/* Left-side subtle tint only (keeps scroller neutral) */}
            <div className="absolute inset-y-0 left-0 w-[46%] bg-[#4a0e0e]/8 z-0 pointer-events-none" />

            {/* Subtle background glows placed behind content */}
            <div className="absolute top-[18%] left-[8%] w-[220px] h-[220px] bg-[#e85d5d]/6 rounded-full blur-[90px] pointer-events-none z-0" />
            <div className="absolute bottom-[6%] left-[4%] w-[320px] h-[320px] bg-[#c42d2d]/8 rounded-full blur-[110px] pointer-events-none z-0" />

            <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">

                {/* Left Content Area */}
                <div className="w-full md:w-[40%] flex flex-col items-start">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-8 h-[2px] bg-gradient-to-r from-black/10 to-transparent" />
                        <span className="text-[#c42d2d] text-[13px] uppercase tracking-[.4em] font-semibold font-[var(--font-dm-sans)]">
                            Initiative
                        </span>
                    </div>

                    <h2 className="text-[28px] md:text-[42px] font-[var(--font-playfair)] text-[#111] font-bold leading-[1.05] tracking-tight mb-5">
                        MOMS <br className="hidden md:block" />
                        <span className="italic font-light text-[#c42d2d]">COMMUNITY</span>
                    </h2>

                    <p className="text-black text-[16px] md:text-[18px] font-[var(--font-dm-sans)] max-w-[360px] mb-8 leading-relaxed">
                        {/* I&apos;m invited to speak with institutions, organizations, leaders, and young minds on how energy shapes choices and decisions—bringing clarity and ease, especially in high-pressure environments. */}
                        A pan india beautiful nurturing space where mother's came together to co create co relate and co elevate each other Initiated by Beyond Imagination Club
                    </p>

                   

                    {/* Call to Action */}
                    <a
                        href="#"
                        className="group relative flex items-center gap-4 bg-[#111] text-white px-7 py-3.5 rounded-full font-bold text-[13px] uppercase tracking-[.1em] font-[var(--font-outfit)] shadow-[0_6px_20px_rgba(17,17,17,0.18)] hover:shadow-[0_0_40px_rgba(17,17,17,0.28)] hover:scale-105 transition-all duration-300 overflow-hidden"
                    >
                        <span className="relative z-10">Join Community</span>
                        <div className="relative z-10 w-7 h-7 rounded-full bg-white/8 flex items-center justify-center group-hover:bg-white/12 transition-colors">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" />
                                <path d="M12 5l7 7-7 7" />
                            </svg>
                        </div>
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/14 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                    </a>
                </div>

                {/* Right Area — 2-column infinite vertical scroll gallery */}
                <div className="w-full md:w-[70%] h-[400px] md:h-[700px] flex gap-3 overflow-hidden rounded-2xl md:rounded-3xl relative ">
                    {/* Fade top/bottom */}
                    <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

                    {/* Column 1 */}
                    <div className="flex-1 overflow-hidden">
                        <div ref={col1Ref} className="flex flex-col gap-3 will-change-transform">
                            {col1Images.map((img, idx) => (
                                <div
                                    key={`c1-${idx}`}
                                    className="relative w-full rounded-xl overflow-hidden shadow-md flex-shrink-0"
                                    style={{ height: "260px" }}
                                >
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        quality={100}
                                        sizes="(max-width: 768px) 50vw, 30vw"
                                        className="object-cover"
                                        onError={(e) => {
                                            const t = e.target as HTMLImageElement;
                                            t.style.display = "none";
                                            t.parentElement!.style.background = "rgba(255,255,255,0.08)";
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="flex-1 overflow-hidden">
                        <div ref={col2Ref} className="flex flex-col gap-3 will-change-transform">
                            {col2Images.map((img, idx) => (
                                <div
                                    key={`c2-${idx}`}
                                    className="relative w-full rounded-xl overflow-hidden shadow-md flex-shrink-0"
                                    style={{ height: "340px" }}
                                >
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        quality={100}
                                        sizes="(max-width: 768px) 50vw, 30vw"
                                        className="object-cover"
                                        onError={(e) => {
                                            const t = e.target as HTMLImageElement;
                                            t.style.display = "none";
                                            t.parentElement!.style.background = "rgba(255,255,255,0.08)";
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
