"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
gsap.registerPlugin(ScrollTrigger);

const dailyQuotes = [
    {
        text: "Energy is the foundation of everything. When you shift your frequency, reality shifts with you.",
        author: "Raseshvari",
        label: "Morning Energy",
        image: "/quotes/1.png",
    },
    {
        text: "The blocks you carry are not flaws—they're patterns waiting to transform.",
        author: "Raseshvari",
        label: "Energy Thought",
        image: "/quotes/2.png",
    },
    {
        text: "Success without alignment is exhaustion. Purpose with presence is power.",
        author: "Raseshvari",
        label: "Night Reflection",
        image: "/quotes/3.png",
    },
];

export default function Quotes() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(
                section.querySelectorAll(".q-card"),
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
                    scrollTrigger: { trigger: section, start: "20% bottom", toggleActions: "play none none reset" },
                }
            );
        }, section);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} className="relative overflow-hidden">
            <style jsx>{`
                .quote-box {
                    position: relative;
                    border-radius: 20px;
                    overflow: hidden;
                    background: linear-gradient(145deg, #6b1414 0%, #9e2626 40%, #c43030 75%, #e05555 100%);
                    border: 1px solid rgba(196, 45, 45, 0.3);
                    box-shadow: 0 12px 40px -10px rgba(100, 10, 10, 0.45);
                    transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);
                }
                .quote-box:hover {
                    box-shadow: 0 20px 50px -8px rgba(80, 20, 20, 0.5);
                    transform: translateY(-4px);
                }
                .quote-box::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0;
                    width: 100%; height: 2px;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
                }
                .quote-box::after {
                    content: '';
                    position: absolute;
                    bottom: -30px; right: -30px;
                    width: 160px; height: 160px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.045);
                    pointer-events: none;
                }
            `}</style>

            {/* 3 separate quote cards in a grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {dailyQuotes.map((q, i) => (
                    <div key={i} className="q-card quote-box flex flex-col">
                        {/* Cross-hatch subtle pattern */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
                            backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.5) 0, rgba(255,255,255,0.5) 1px, transparent 0, transparent 50%)",
                            backgroundSize: "14px 14px",
                        }} />
                        {/* Glow */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
                            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)" }} />

                        {/* Quote image */}
                        <div className="relative w-full aspect-[5/5] overflow-hidden">
                            <Image
                                src={q.image}
                                alt={q.label}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                            />
                        </div>

                        {/* Bottom info strip */}
                        <div className="relative z-10 px-4 py-3 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] uppercase tracking-[.18em] font-bold font-[var(--font-dm-sans)] text-white/60">
                                    {q.label}
                                </p>
                                <p className="text-[11px] font-[var(--font-dm-sans)] font-bold text-white/90 mt-0.5">
                                    — {q.author}
                                </p>
                            </div>
                            <div
                                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{ border: "1px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.08)" }}
                            >
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" strokeLinecap="round">
                                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Show All button */}
            <div className="mt-6 flex items-center justify-center">
                <Link
                    href="/blog/quotes"
                    className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-[var(--font-outfit)] font-bold text-[11px] uppercase tracking-[0.12em] transition-all duration-300 hover:scale-105"
                    style={{
                        background: "linear-gradient(135deg, #c42d2d, #9b1c1c)",
                        color: "#fff",
                        boxShadow: "0 10px 28px -8px rgba(196,45,45,0.3)",
                    }}
                >
                    Show All Quotes
                    <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}
