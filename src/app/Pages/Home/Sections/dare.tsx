"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Placeholder data for the interactive grid
const guests = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    src: `/guests/guest-${(i % 5) + 1}.jpg`,
    alt: `Featured Guest ${i + 1}`,
}));

export default function DareToDream() {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Auto-play loop
    useEffect(() => {
        if (isHovering) {
            if (timerRef.current) clearInterval(timerRef.current);
            return;
        }

        timerRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % guests.length);
        }, 3500); // Change image every 3.5 seconds

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isHovering]);

    return (
        <section className="relative min-h-[70dvh] max-h-[90dvh] flex flex-col items-center justify-center overflow-hidden py-16 px-6 md:px-12 bg-gradient-to-br from-[#4a0e0e] via-[#7a1a1a] to-[#9b1c1c]">
            {/* Dark premium red gradient background overlay */}
            <div className="absolute inset-0 bg-[#4a0e0e]/20" />

            {/* Background glows */}
            <div className="absolute top-[20%] left-[15%] w-[300px] h-[300px] bg-[#e85d5d]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] bg-[#c42d2d]/15 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">

                {/* Left Content Area - Compact */}
                <div className="w-full md:w-[40%] flex flex-col items-start">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-8 h-[2px] bg-gradient-to-r from-white/70 to-transparent" />
                        <span className="text-white/80 text-[10px] uppercase tracking-[.4em] font-semibold font-[var(--font-dm-sans)]">
                            Interview Series
                        </span>
                    </div>

                    <h2 className="text-[44px] md:text-[60px] font-[var(--font-playfair)] text-white font-bold leading-[1.05] tracking-tight mb-5 drop-shadow-lg">
                        Dare to <br className="hidden md:block" />
                        <span className="italic font-light text-[#f0cfb1]">Dream.</span>
                    </h2>

                    <p className="text-white/80 text-[15px] md:text-[16px] font-[var(--font-dm-sans)] max-w-[360px] mb-8 leading-relaxed">
                        A deep dive into the minds of visionaries, leaders, and creators. Discover the energy, pressure, and choices that shaped their extraordinary paths.
                    </p>

                    <div className="flex items-center gap-5 mb-10">
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
                            <span className="text-white/60 text-[10px] uppercase tracking-[.15em] font-[var(--font-dm-sans)]">Featured Guests</span>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <a
                        href="#"
                        className="group relative flex items-center gap-4 bg-white text-[#9b1c1c] px-7 py-3.5 rounded-full font-bold text-[13px] uppercase tracking-[.1em] font-[var(--font-outfit)] shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300 overflow-hidden"
                    >
                        <span className="relative z-10">Check the Series</span>
                        <div className="relative z-10 w-7 h-7 rounded-full bg-[#9b1c1c]/10 flex items-center justify-center group-hover:bg-[#9b1c1c]/20 transition-colors">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" />
                                <path d="M12 5l7 7-7 7" />
                            </svg>
                        </div>
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                    </a>
                </div>

                {/* Right Area - Interactive Expanding Gallery */}
                <div className="w-full md:w-[60%] h-[400px] md:h-[500px] flex gap-2 md:gap-3 perspective-[1000px]">
                    <style jsx>{`
                        @keyframes shimmer {
                            100% { transform: translateX(100%); }
                        }
                    `}</style>

                    {guests.map((guest, index) => {
                        // Calculate if this item is expanded
                        const isExpanded = activeIndex === index;

                        return (
                            <div
                                key={guest.id}
                                className={`relative h-full rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isExpanded
                                    ? "grow-[5] md:grow-[7] basis-0 shadow-2xl opacity-100"
                                    : "grow-[1] basis-0 shadow-md opacity-60 hover:opacity-80"
                                    }`}
                                onMouseEnter={() => {
                                    setIsHovering(true);
                                    setActiveIndex(index);
                                }}
                                onMouseLeave={() => setIsHovering(false)}
                            >
                                {/* Gradient overlay for non-expanded cards */}
                                <div className={`absolute inset-0 bg-[#5a1616]/40 mix-blend-multiply transition-opacity duration-500 z-10 ${isExpanded ? 'opacity-0' : 'opacity-100'}`} />

                                <Image
                                    src={guest.src}
                                    alt={guest.alt}
                                    fill
                                    className={`object-cover transition-transform duration-700 ${isExpanded ? 'scale-100' : 'scale-110'}`}
                                    sizes={isExpanded ? "(max-width: 768px) 50vw, 400px" : "(max-width: 768px) 15vw, 100px"}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-white/10 text-white/50 text-[10px] tracking-widest font-bold border border-white/20">IMG</div>`;
                                    }}
                                />

                                {/* Expanded State Content Overlay */}
                                <div className={`absolute bottom-0 left-0 right-0 p-6 pt-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20 transition-all duration-500 ${isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#c42d2d] flex items-center justify-center shadow-lg">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                                                <polygon points="5 3 19 12 5 21 5 3" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-white text-[10px] uppercase tracking-[.2em] font-bold font-[var(--font-dm-sans)] mb-0.5">
                                                Episode {index + 1}
                                            </p>
                                            <p className="text-white/80 text-[13px] font-[var(--font-playfair)] italic">
                                                Dare to Dream
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
