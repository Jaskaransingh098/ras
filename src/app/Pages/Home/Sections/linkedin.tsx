"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// const screenshots = [
//     { id: 1, containerHeight: 500, images: [{ src: "/recommendations/1.png", alt: "Recommendation 1" }] },
//     { id: 2, containerHeight: 520, images: [{ src: "/recommendations/2.png", alt: "Recommendation 2" }] },
//     { id: 3, containerHeight: 480, images: [{ src: "/recommendations/3.png", alt: "Recommendation 3" }] },
//     { id: 4, containerHeight: 510, images: [{ src: "/recommendations/4.png", alt: "Recommendation 4" }] },
//     { id: 5, containerHeight: 490, images: [{ src: "/recommendations/5.png", alt: "Recommendation 5" }] },
//     { id: 6, containerHeight: 530, images: [{ src: "/recommendations/6.png", alt: "Recommendation 6" }] },
//     { id: 7, containerHeight: 500, images: [{ src: "/recommendations/7.png", alt: "Recommendation 7" }] },
//     { id: 8, containerHeight: 515, images: [{ src: "/recommendations/8.png", alt: "Recommendation 8" }] },
//     { id: 9, containerHeight: 495, images: [{ src: "/recommendations/9.png", alt: "Recommendation 9" }] },
//     { id: 10, containerHeight: 505, images: [{ src: "/recommendations/10.png", alt: "Recommendation 10" }] },
//     { id: 11, containerHeight: 520, images: [{ src: "/recommendations/11.png", alt: "Recommendation 11" }] },
//     { id: 12, containerHeight: 485, images: [{ src: "/recommendations/12.png", alt: "Recommendation 12" }] },
//     { id: 13, containerHeight: 510, images: [{ src: "/recommendations/13.png", alt: "Recommendation 13" }] },
// ];
const screenshots = [
    { id: 1, src: "/linkedin/1.png" },
    { id: 2, src: "/linkedin/2.png" },
    { id: 3, src: "/linkedin/3.png" },
    { id: 4, src: "/linkedin/4.png" },
    { id: 5, src: "/linkedin/5.png" },
    { id: 6, src: "/linkedin/6.png" },
    { id: 7, src: "/linkedin/7.png" },
    { id: 8, src: "/linkedin/8.png" },
    { id: 9, src: "/linkedin/9.png" },
    { id: 10, src: "/linkedin/10.png" },
];
export default function LinkedIn() {
    const sectionRef = useRef<HTMLElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const animRef = useRef<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 640);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

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



    useEffect(() => {
        const s = sectionRef.current;
        if (!s) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(
                s.querySelectorAll(".li-reveal"),
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power3.out",
                    scrollTrigger: { trigger: s, start: "20% bottom", toggleActions: "play none none reset" },
                }
            );
        }, s);
        return () => ctx.revert();
    }, []);

    // Duplicate screenshots for infinite loop
    // const allScreenshots = [...screenshots, ...screenshots];
    const loopScreenshots = [...screenshots, ...screenshots];

    return (
        <section ref={sectionRef}
            className="relative min-h-auto flex flex-col justify-center overflow-hidden py-12 md:py-4"
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
                    background: white;
                    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
                    flex-shrink: 0;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                }
                .rec-card:hover {
                    transform: translateY(-6px) scale(1.02);
                    box-shadow: 0 24px 48px -12px rgba(0,0,0,0.12);
                }
                .rec-card.blurred {
                    transform: scale(0.95);
                }
                .rec-card.zoomed {
                    transform: scale(1.05) translateY(10px);
                    z-index: 20;
                    filter: blur(0px);
                    opacity: 1;
                    box-shadow: 0 32px 64px -12px rgba(196, 45, 45, 0.2);
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



            <div className="w-full relative z-10 pt-8 md:pt-20 pb-8 md:pb-16">
                {/* Header row */}
                <div className="li-reveal max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col md:flex-row md:items-end md:justify-between mb-6 md:mb-10">
                    <div className="flex items-center gap-5">
                        <div>
                            <div className="flex items-center gap-3 mb-1.5">
                                <div className="w-8 h-[2px] rounded-full bg-gradient-to-r from-[#c42d2d] to-transparent" />
                                <p className="text-[10px] uppercase tracking-[.35em] text-[#c42d2d]/70 font-semibold font-[var(--font-dm-sans)]">
                                    Verified Recommendations
                                </p>
                            </div>
                            <h2 className="section-heading text-[24px] sm:text-[28px] md:text-[42px] font-bold font-[var(--font-playfair)] text-[#111] leading-[1.12]">
                                Words That{" "}
                                <span className="italic font-bold text-[#c42d2d]">Speak</span> for Themselves
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
                    <div
                        className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
                        style={{
                            background:
                                "linear-gradient(to right, #f5f0ea, transparent)",
                        }}
                    />

                    {/* Right fade */}
                    <div
                        className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
                        style={{
                            background:
                                "linear-gradient(to left, #f5f0ea, transparent)",
                        }}
                    />

                    <div
                        ref={scrollRef}
                        className="scroll-container flex gap-5 overflow-x-auto px-6 pb-8"
                    >
                        {loopScreenshots.map((item, index) => {
                            const id = `${item.id}-${index}`;

                            return (
                                <div
                                    key={id}
                                    className={`rec-card relative flex-shrink-0 ${hoveredId === id
                                            ? "zoomed"
                                            : hoveredId !== null
                                                ? "blurred"
                                                : ""
                                        }`}
                                    onMouseEnter={() => setHoveredId(id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    style={{
                                        width: isMobile ? "440px" : "450px",
                                        height: isMobile ? "350px" : "440px",
                                    }}
                                >
                                    <Image
                                        src={item.src}
                                        fill
                                        className="object-cover"
                                        alt="Recommendation"
                                        unoptimized
                                    />

                                    {/* Overlay */}
                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            background:
                                                "linear-gradient(to top, rgba(0,0,0,0.12), transparent)",
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>


            </div>


        </section>
    );
}
