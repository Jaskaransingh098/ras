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
        <section className="relative min-h-[70dvh] max-h-[90dvh] flex flex-col items-center justify-center overflow-hidden py-16 px-6 md:px-12 bg-gradient-to-br from-[#4a0e0e] via-[#7a1a1a] to-[#9b1c1c]">
            {/* Dark premium red gradient background overlay */}
            <div className="absolute inset-0 bg-[#4a0e0e]/20" />

            {/* Background glows */}
            <div className="absolute top-[20%] left-[15%] w-[300px] h-[300px] bg-[#e85d5d]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] bg-[#c42d2d]/15 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">

                {/* Left Content Area */}
                <div className="w-full md:w-[40%] flex flex-col items-start">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-8 h-[2px] bg-gradient-to-r from-white/70 to-transparent" />
                        <span className="text-white text-[13px] uppercase tracking-[.4em] font-semibold font-[var(--font-dm-sans)]">
                            Initiative
                        </span>
                    </div>

                    <h2 className="text-[44px] md:text-[60px] font-[var(--font-playfair)] text-white font-bold leading-[1.05] tracking-tight mb-5 drop-shadow-lg">
                        MOMS <br className="hidden md:block" />
                        <span className="italic font-light text-[#f0cfb1]">COMMUNITY</span>
                    </h2>

                    <p className="text-white text-[15px] md:text-[20px] font-[var(--font-dm-sans)] max-w-[360px] mb-8 leading-relaxed">
                        {/* I&apos;m invited to speak with institutions, organizations, leaders, and young minds on how energy shapes choices and decisions—bringing clarity and ease, especially in high-pressure environments. */}
                        A pan india beautiful nurturing space where mother's came together to co create co relate and co elevate each other Initiated by Beyond Imagination Club
                    </p>

                    {/* <div className="flex items-center gap-5 mb-10">
                        <div className="flex -space-x-2">
                            <div className="w-9 h-9 rounded-full border-2 border-[#7a1a1a] bg-white/10" />
                            <div className="w-9 h-9 rounded-full border-2 border-[#7a1a1a] bg-white/20" />
                            <div className="w-9 h-9 rounded-full border-2 border-[#7a1a1a] bg-white/30" />
                            <div className="w-9 h-9 rounded-full border-2 border-[#7a1a1a] bg-gradient-to-r from-[#e85d5d] to-[#c42d2d] flex items-center justify-center text-[10px] font-bold text-white">
                                +49
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white font-bold text-[16px] leading-none mb-0.5">52</span>
                            <span className="text-white/60 text-[10px] uppercase tracking-[.15em] font-[var(--font-dm-sans)]">Active Members</span>
                        </div>
                    </div> */}

                    {/* Call to Action */}
                    <a
                        href="#"
                        className="group relative flex items-center gap-4 bg-white text-[#9b1c1c] px-7 py-3.5 rounded-full font-bold text-[13px] uppercase tracking-[.1em] font-[var(--font-outfit)] shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300 overflow-hidden"
                    >
                        <span className="relative z-10">Join Community</span>
                        <div className="relative z-10 w-7 h-7 rounded-full bg-[#9b1c1c]/10 flex items-center justify-center group-hover:bg-[#9b1c1c]/20 transition-colors">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" />
                                <path d="M12 5l7 7-7 7" />
                            </svg>
                        </div>
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                    </a>
                </div>

                {/* Right Area — 2-column infinite vertical scroll gallery */}
                <div className="w-full md:w-[70%] h-[400px] md:h-[650px] flex gap-3 overflow-hidden rounded-2xl md:rounded-3xl relative">
                    {/* Fade top/bottom */}
                    <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#7a1a1a] to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#7a1a1a] to-transparent z-10 pointer-events-none" />

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
