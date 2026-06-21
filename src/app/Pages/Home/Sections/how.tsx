"use client";

import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface Props {
    scrollRef: RefObject<HTMLElement | null>;
}

export default function How({ scrollRef }: Props) {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const s = sectionRef.current;
        if (!s) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(s.querySelectorAll(".hw"), { y: 40, opacity: 0 }, {
                y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out",
                scrollTrigger: { trigger: s, start: "20% bottom", toggleActions: "play none none reset" },
            });
        }, s);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-8 md:py-14 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">

                {/* ── HEADER ── */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10">
                    <div className="hw">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-1 rounded-full bg-[#c42d2d]" />
                            <p className="text-sm uppercase tracking-[.2em] text-[#c42d2d] font-semibold font-[var(--font-dm-sans)]">
                                The science behind it
                            </p>
                        </div>
                        <h2 className="section-heading text-[28px] md:text-[42px] font-[var(--font-playfair)] font-semibold text-[#111] leading-[0.9]">
                            How it
                            <span className="italic text-[#c42d2d] pl-2 font-bold">Works</span>
                        </h2>
                    </div>
                </div>

                {/* ── YOUTUBE VIDEO ── */}
                <div className="hw">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-800/50 bg-black">
                        {/* 16:9 aspect ratio */}
                        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src="https://www.youtube.com/embed/bfFz5HcO20E?rel=0&modestbranding=1"
                                title="How it Works — Raseshvari Hindustani"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>

                {/* ── CAPTION ── */}
                <div className="mt-5 md:mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hw">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#c42d2d] animate-pulse" />
                        <p className="text-gray-800 text-[15px] sm:text-xl font-[var(--font-dm-sans)] italic font-semibold">
                            One session, one shift, ultimate unlimited possibilities
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
