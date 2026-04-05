"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const cards = [
    {
        title: "A Calm Mind & Emotional Lightness",
        desc: "Your overthinking quiets. Stress loosens its grip. The heaviness, guilt, abuse, anxiety, grief begins to lift — in just one session.",
        image: "/results/calm-mind.png",
        accent: "#c42d2d",
    },
    {
        title: "Visible Shifts in Life, Work & Money",
        desc: "Doubts stop draining you. Work feels lighter. Opportunities, clients and revenue flow with less resistance.",
        image: "/results/work-money.png",
        accent: "#c42d2d",
    },
    {
        title: "Ease in Relationships & Communication",
        desc: "Emotional triggers lose charge. Personal as well as professional relationships & conversations soften. You respond from calm, not pain.",
        image: "/results/relationships.png",
        accent: "#c42d2d",
    },
    {
        title: "A Lighter, Healthier Body",
        desc: "Your body releases stored pressure. Tension softens. Pain begins to dissolve from the inside out. Your body feels lighter and supported.",
        image: "/results/lighter-body.png",
        accent: "#c42d2d",
    },
    {
        title: "The Safety to Finally Be YOU",
        desc: "The soft you. The peaceful you. The strong you. The ambitious you. The YOU waiting for years to come alive.",
        image: "/results/be-you.png",
        accent: "#c42d2d",
    },
];

export default function Result() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                section.querySelectorAll(".r-reveal"),
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power3.out",
                    scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none none" },
                }
            );
            gsap.fromTo(
                section.querySelectorAll(".r-card"),
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out",
                    scrollTrigger: { trigger: section.querySelector(".r-grid"), start: "top 88%", toggleActions: "play none none none" },
                }
            );
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative bg-white overflow-hidden flex flex-col justify-center"
            style={{ minHeight: "100dvh", maxHeight: "110dvh" }}
        >
            <style jsx>{`
                // @keyframes gentle-float {
                //     0%, 100% { transform: translateY(0px); }
                //     50% { transform: translateY(-8px); }
                // }
                .r-card-inner {
                    position: relative;
                    border-radius: 22px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);
                    overflow: hidden;
                    // background: linear-gradient(135deg, rgba(196,45,45,0.28), rgba(255,255,255,0.22));
                    // backdrop-filter: blur(8px);
                    // box-shadow: inset 0 0 0 1px rgba(255,255,255,0.25);
                }
                .r-card-inner:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 24px 48px -12px rgba(0,0,0,0.1);
                }
                .r-card-inner::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    border-radius: 22px;
                    padding: 1px;
                    background: linear-gradient(135deg, rgba(196,45,45,0.24), transparent 50%, rgba(196,45,45,0.12));
                    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                    pointer-events: none;
                    transition: all 0.45s;
                }
                .r-card-inner:hover::before {
                    background: linear-gradient(135deg, rgba(196,45,45,0.35), transparent 50%, rgba(196,45,45,0.22));
                }
                .r-img {
                    animation: gentle-float 5s ease-in-out infinite;
                }
                .hl-text {
                    background: linear-gradient(90deg, #c42d2d, #e85d5d);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    font-weight: 700;
                }
            `}</style>

            {/* Subtle bg glow */}
            {/* <div className="absolute top-[10%] right-[8%] w-[250px] h-[250px] bg-[#c42d2d]/[0.025] rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[10%] left-[8%] w-[200px] h-[200px] bg-[#e85d5d]/[0.025] rounded-full blur-[80px] pointer-events-none" /> */}

            {/* Watermark */}
            {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <span className="text-[90px] md:text-[180px] font-[var(--font-playfair)] font-bold text-[#c42d2d]/[0.02] tracking-tight whitespace-nowrap select-none">
                    BECOME
                </span>
            </div> */}

            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 py-12 md:py-14">

                {/* ─── HEADER: Split layout ─── */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4 r-reveal">
                    <div className="max-w-lg">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-[2px] rounded-full bg-gradient-to-r from-[#c42d2d] to-[#e85d5d]" />
                            <p className="text-[10px] md:text-lg uppercase tracking-[.3em] text-[#c42d2d]/80 font-semibold font-[var(--font-dm-sans)]">
                                The Transformation
                            </p>
                        </div>
                        <h2 className="text-[28px] md:text-[42px] font-[var(--font-playfair)] text-[#1a1a1a] leading-[1.12] font-bold">
                            Who You Become{" "}
                            <span className="italic text-[#c42d2d]/80 font-semibold">in This Space</span>
                        </h2>
                    </div>
                    <p className="text-[#777] text-[13px] md:text-[19px] max-w-xl leading-relaxed md:text-right font-semibold font-[var(--font-dm-sans)]">
                       This is the safe space where you finally get to breathe… where the pain, pressure, expectations and unspoken emotions you’ve carried for years begin to loosen and release.
                    </p>
                </div>

                {/* Questions + highlight */}
                <div className="r-reveal mb-2 flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                    <p className="text-[#555] text-[13px] md:text-[18px] italic font-[var(--font-playfair)]">
                        What if you didn’t have to carry everyone’s world on your shoulders?
                        What if you felt safe to be the REAL YOU—
                        behind the smile, behind the strength, behind the pressure?
                        {/* What if you felt safe to be the{" "}
                        <span className="font-bold not-italic text-[#1a1a1a]">REAL YOU</span>
                        &mdash; behind the smile, behind the strength? */}
                    </p>
                    {/* <span className="hl-text text-[14px] md:text-[16px] font-[var(--font-playfair)] whitespace-nowrap">
                        This work opens that door.
                    </span> */}
                </div>

                {/* Transition */}
                {/* <p className="r-reveal text-[#bbb] text-[11px] md:text-[12px] italic font-[var(--font-playfair)] mb-6 md:mb-8">
                    Here&rsquo;s what begins to shift when your energy aligns&mdash;
                </p> */}

                {/* ─── CARDS: 5 in a row on desktop ─── */}
                <div className="r-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 mb-8 md:mb-10">
                    {cards.map((card, i) => (
                        <div key={i} className="r-card">
                            <div className="r-card-inner group border border-red-500 text-white h-full flex flex-col ">
                                {/* Accent bar */}
                                <div
                                    className="h-[2.5px] rounded-t-[22px]"
                                    style={{ background: `linear-gradient(90deg, transparent, ${card.accent}50, transparent)` }}
                                />
                                <div className="p-4 md:p-5 flex-1 flex flex-col">
                                    {/* Illustration */}
                                    <div
                                        className="r-img w-full h-[100px] md:h-[110px] relative mb-3 flex items-center justify-center"
                                        style={{ animationDelay: `${i * -1.2}s` }}
                                    >
                                        <div
                                            className="absolute inset-0 rounded-xl"
                                            style={{ background: `radial-gradient(ellipse at center, ${card.accent}08, transparent 70%)` }}
                                        />
                                        <Image
                                            src={card.image}
                                            alt={card.title}
                                            width={120}
                                            height={120}
                                            className="relative z-10 w-auto h-[85px] md:h-[95px] object-contain  group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Number */}
                                    <span
                                        className="text-[32px] font-[var(--font-playfair)] font-bold leading-none mb-1 opacity-[0.88] group-hover:opacity-[0.3] transition-opacity duration-500"
                                        style={{ color: card.accent }}
                                    >
                                        0{i + 1}
                                    </span>

                                    {/* Title */}
                                    <h3 className="text-[14px] md:text-[18px] font-[var(--font-playfair)] text-[#222] font-bold leading-snug mb-2">
                                        {card.title}
                                    </h3>

                                    {/* Desc */}
                                    <p className="text-[#383434] font-semibold text-[11px] md:text-[15px] leading-[1.45] font-[var(--font-dm-sans)] flex-1">
                                        {card.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ─── CLOSING ─── */}
                {/* <div className="r-reveal text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#c42d2d]/15" />
                        <div className="flex gap-1">
                            <div className="w-1 h-1 rounded-full bg-[#c42d2d]/20" />
                            <div className="w-1 h-1 rounded-full bg-[#c42d2d]/12" />
                            <div className="w-1 h-1 rounded-full bg-[#c42d2d]/20" />
                        </div>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#c42d2d]/15" />
                    </div>
                    <p className="text-[#aaa] text-[13px] font-[var(--font-dm-sans)] italic mb-1.5">
                        This space isn&rsquo;t about fixing you.
                    </p>
                    <p className="text-[#333] text-[16px] md:text-[19px] font-[var(--font-playfair)] font-bold leading-[1.5] max-w-xl mx-auto">
                        It&rsquo;s about returning you to the{" "}
                        <span className="text-[#c42d2d]">leader</span>, the{" "}
                        <span className="italic font-light">human</span>, the{" "}
                        <span className="underline decoration-[#c42d2d]/30 underline-offset-4">self</span>{" "}
                        you always knew you could be.
                    </p>
                </div> */}
            </div>
        </section>
    );
}
