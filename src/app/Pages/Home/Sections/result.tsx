"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/* ─── ORIGINAL DATA (unchanged) ─── */
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

/* ════════════════════════════════════════════════
   NEW DESIGN — Bento grid (reference image 2)
   Background: white  |  Accent: #c42d2d
════════════════════════════════════════════════ */
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
                    y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out",
                    scrollTrigger: { trigger: section, start: "20% bottom", toggleActions: "play none none reset" },
                }
            );
            gsap.fromTo(
                section.querySelectorAll(".bc"),
                { y: 50, opacity: 0, scale: 0.96 },
                {
                    y: 0, opacity: 1, scale: 1, duration: 0.65, stagger: 0.09, ease: "power3.out",
                    scrollTrigger: { trigger: section.querySelector(".bg-grid"), start: "20% bottom", toggleActions: "play none none reset" },
                }
            );
        }, section);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative bg-white overflow-hidden py-6 md:py-0"
        >
            <style>{`
                /* ══ NEW bento styles (white bg, red accent) ══ */

                /* Arrow badge */
                .bc-arrow {
                    position: absolute;
                    top: 14px; right: 14px;
                    width: 30px; height: 30px;
                    border-radius: 50%;
                    background: rgba(196,45,45,0.08);
                    border: 1px solid rgba(196,45,45,0.15);
                    display: flex; align-items: center; justify-content: center;
                    color: #c42d2d;
                    font-size: 14px;
                    transition: background 0.3s, color 0.3s;
                    z-index: 2;
                }
                .bc:hover .bc-arrow {
                    background: #c42d2d;
                    color: #fff;
                }

                /* Tag pill */
                .bc-tag {
                    display: inline-block;
                    font-size: 10px;
                    font-weight: 600;
                    color: #c42d2d;
                    background: rgba(196,45,45,0.08);
                    border: 1px solid rgba(196,45,45,0.15);
                    border-radius: 100px;
                    padding: 3px 10px;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    font-family: var(--font-dm-sans), sans-serif;
                }

                /* Base card */
                .bc {
                    border-radius: 20px;
                    border: 1px solid rgba(196,45,45,0.12);
                    background: #fff;
                    position: relative;
                    overflow: hidden;
                    transition: transform 0.4s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s, border-color 0.3s;
                }
                .bc:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 24px 60px rgba(196,45,45,0.1);
                    border-color: rgba(196,45,45,0.28);
                    z-index: 2;
                }

                /* Subtle inner top accent bar */
                .bc-bar {
                    height: 3px;
                    background: linear-gradient(90deg, transparent, #c42d2d55, transparent);
                    border-radius: 20px 20px 0 0;
                }

                /* Bento grid layout */
                .bg-grid {
                    display: grid;
                    gap: 10px;
                    grid-template-columns: 1.1fr 1fr 1fr;
                    grid-template-rows: 180px 260px;
                }
                @media (max-width: 480px) {
                    .bg-grid {
                        grid-template-rows: auto;
                    }
                }
                @media (max-width: 900px) {
                    .bg-grid {
                        grid-template-columns: 1fr 1fr;
                        grid-template-rows: auto;
                    }
                    .bc-tall  { grid-row: span 1 !important; }
                    .bc-wide  { grid-column: span 2 !important; }
                }
                @media (max-width: 580px) {
                    .bg-grid {
                        grid-template-columns: 1fr;
                    }
                    .bc-wide  { grid-column: span 1 !important; }
                }

                /* tall card = left col, spans both rows */
                .bc-tall { grid-row: span 2; }
                /* wide card = bottom center, spans 2 cols */
                .bc-wide { grid-column: span 2; }

                /* Gradient overlay at bottom of image cards */
                .bc-img-overlay {
                    position: absolute;
                    bottom: 0; left: 0; right: 0;
                    padding: 18px 16px 16px;
                    background: linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 55%, transparent 100%);
                }
                .bc-img-title {
                    font-size: 13px;
                    font-weight: 700;
                    color: #111;
                    font-family: var(--font-playfair), serif;
                    line-height: 1.3;
                    margin-bottom: 3px;
                }
                .bc-img-desc {
                    font-size: 11px;
                    color: #555;
                    line-height: 1.55;
                    font-family: var(--font-dm-sans), sans-serif;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                /* Discover-more pill button (on image cards) */
                .bc-pill-btn {
                    position: absolute;
                    top: 50%; left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(255,255,255,0.85);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(196,45,45,0.25);
                    color: #c42d2d;
                    font-size: 11px;
                    font-weight: 700;
                    padding: 8px 20px;
                    border-radius: 100px;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: background 0.3s, color 0.3s;
                    z-index: 3;
                    font-family: var(--font-dm-sans), sans-serif;
                }
                .bc-pill-btn:hover {
                    background: #c42d2d;
                    color: #fff;
                }

                /* Text-body card padding */
                .bc-text-pad {
                    padding: 14px 16px 12px;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }
                .bc-text-num {
                    display: none;
                }
                .bc-text-title {
                    font-size: clamp(14px,1.6vw,18px);
                    font-weight: 700;
                    font-family: var(--font-playfair), serif;
                    color: #111;
                    line-height: 1.35;
                    margin-bottom: 8px;
                }
                .bc-text-desc {
                    font-size: 12px;
                    color: #555;
                    line-height: 1.6;
                    font-family: var(--font-dm-sans), sans-serif;
                    flex: 1;
                }
                .bc-explore-link {
                    font-size: 11px;
                    font-weight: 700;
                    color: #c42d2d;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    margin-top: 14px;
                    transition: gap 0.25s;
                }
                .bc-explore-link:hover { gap: 10px; }

                /* Wide featured card (card 4) */
                .bc-featured-inner {
                    padding: 14px 16px 12px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 100%;
                    position: relative;
                    z-index: 1;
                }
                .bc-featured-title {
                    font-size: clamp(20px, 3vw, 32px);
                    font-weight: 800;
                    font-family: var(--font-playfair), serif;
                    color: #111;
                    line-height: 1.2;
                    max-width: 340px;
                }
                .bc-featured-desc {
                    font-size: 13px;
                    color: #555;
                    line-height: 1.6;
                    font-family: var(--font-dm-sans), sans-serif;
                    max-width: 400px;
                    margin-top: 8px;
                    flex: 1;
                }

                /* Number badge on tall card */
                .bc-num-badge {
                    position: absolute;
                    bottom: 16px; right: 16px;
                    font-size: 80px;
                    font-weight: 900;
                    font-family: var(--font-playfair), serif;
                    color: rgba(196,45,45,0.07);
                    line-height: 1;
                    pointer-events: none;
                    z-index: 0;
                    user-select: none;
                }

                /* CTA link at bottom right of header */
                .res-cta-link {
                    font-size: 13px;
                    font-weight: 600;
                    color: #c42d2d;
                    text-decoration: underline;
                    text-decoration-color: rgba(196,45,45,0.3);
                    text-underline-offset: 3px;
                    transition: color 0.3s, text-decoration-color 0.3s;
                    white-space: nowrap;
                    align-self: flex-end;
                    font-family: var(--font-dm-sans), sans-serif;
                }
                .res-cta-link:hover {
                    color: #8a0a0a;
                    text-decoration-color: #8a0a0a;
                }
            `}</style>

            <div className="w-full px-4 md:px-8" style={{ maxWidth: '96vw', margin: '0 auto', paddingTop: '24px', paddingBottom: '24px' }}>

                {/* ── Header ── */}
                <div className="r-reveal flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-4">
                    <div>
                        {/* Label */}
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-6 h-[2px] rounded-full bg-gradient-to-r from-[#c42d2d] to-[#e85d5d]" />
                            <p className="text-[10px] uppercase tracking-[.3em] text-[#c42d2d]/80 font-semibold font-[var(--font-dm-sans)]">
                                The Transformation
                            </p>
                        </div>
                        {/* Headline */}
                        <h2 className="text-[22px] md:text-[36px] font-[var(--font-playfair)] text-[#1a1a1a] leading-[1.1] font-bold">
                            Who You Become{" "}
                            <span className="italic text-[#c42d2d] font-bold">in This Space</span>
                        </h2>
                    </div>
                    <a href="#" className="res-cta-link">Book a Session →</a>
                </div>

                {/* ══ BENTO GRID ══ */}
                <div className="bg-grid">

                    {/* ── CELL 1 ── Tall left: image card (calm-mind) */}
                    <div className="bc bc-tall" style={{ gridRow: 'span 2' }}>
                        <div className="bc-bar" />
                        {/* Image */}
                        <div style={{ position: 'relative', width: '100%', height: 'calc(100% - 3px)', minHeight: '200px' }}>
                            <Image
                                src={cards[0].image}
                                alt={cards[0].title}
                                fill
                                className="object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                }}
                            />
                            {/* Fallback gradient */}
                            <div style={{
                                position: 'absolute', inset: 0,
                                background: 'linear-gradient(160deg, #fdf0f0 0%, #fce8e8 50%, #f5d0d0 100%)'
                            }} />
                            {/* Floating number */}
                            <span className="bc-num-badge">01</span>
                        </div>
                        {/* Arrow */}
                        <div className="bc-arrow">↗</div>
                        {/* Tag */}
                        <span className="bc-tag" style={{ position: 'absolute', top: 14, left: 14, zIndex: 2 }}>
                            Calm Mind
                        </span>
                        {/* Bottom overlay */}
                        <div className="bc-img-overlay">
                            <p className="bc-img-title">{cards[0].title}</p>
                            <p className="bc-img-desc">{cards[0].desc}</p>
                        </div>
                    </div>

                    {/* ── CELL 2 ── Top-center: image card (work-money) with pill */}
                    <div className="bc" style={{ position: 'relative', overflow: 'hidden' }}>
                        <div className="bc-bar" />
                        <div style={{ position: 'absolute', inset: 0, top: 3 }}>
                            <Image
                                src={cards[1].image}
                                alt={cards[1].title}
                                fill
                                className="object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                }}
                            />
                            <div style={{
                                position: 'absolute', inset: 0,
                                background: 'linear-gradient(160deg, rgba(255,240,240,0.4) 0%, rgba(252,232,232,0.2) 100%)'
                            }} />
                        </div>
                        <span className="bc-tag" style={{ position: 'absolute', top: 16, left: 14, zIndex: 2 }}>
                            Life &amp; Work
                        </span>
                        <div className="bc-arrow">↗</div>
                        {/* Discover pill */}
                        <button className="bc-pill-btn">Discover More</button>
                        <div className="bc-img-overlay">
                            <p className="bc-img-title">{cards[1].title}</p>
                        </div>
                    </div>

                    {/* ── CELL 3 ── Top-right: pure text card (relationships) */}
                    <div className="bc">
                        <div className="bc-bar" />
                        <div className="bc-text-pad">
                            <div>
                                <span className="bc-tag">Relationships</span>
                                <p className="bc-text-num" style={{ marginTop: 12 }}>03</p>
                                <p className="bc-text-title">{cards[2].title}</p>
                                <p className="bc-text-desc">{cards[2].desc}</p>
                            </div>
                            <a href="#" className="bc-explore-link">
                                Book Now
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                    <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                        <div className="bc-arrow">↗</div>
                    </div>

                    {/* ── CELL 4 ── Bottom-center wide: featured card (lighter body) */}
                    <div className="bc bc-wide" style={{ gridColumn: 'span 2', overflow: 'hidden' }}>
                        <div className="bc-bar" />
                        {/* Subtle decorative circle */}
                        <div style={{
                            position: 'absolute', top: '-40px', right: '-40px',
                            width: '220px', height: '220px', borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(196,45,45,0.06) 0%, transparent 70%)',
                            pointerEvents: 'none'
                        }} />
                        {/* Image right side */}
                        <div style={{ position: 'absolute', right: 0, top: 3, bottom: 0, width: '35%', overflow: 'hidden', borderRadius: '0 20px 20px 0' }}>
                            <Image
                                src={cards[3].image}
                                alt={cards[3].title}
                                fill
                                className="object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                }}
                            />
                            <div style={{
                                position: 'absolute', inset: 0,
                                background: 'linear-gradient(to right, #fff 0%, transparent 40%)'
                            }} />
                        </div>
                        <div className="bc-featured-inner">
                            <div>
                                <span className="bc-tag">Body &amp; Health</span>
                                <p className="bc-featured-title" style={{ marginTop: 14 }}>{cards[3].title}</p>
                                <p className="bc-featured-desc">{cards[3].desc}</p>
                            </div>
                            <a href="#" className="bc-explore-link">
                                Start Your Shift
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                    <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                        <div className="bc-arrow">↗</div>
                    </div>

                    {/* ── CELL 5 ── Bottom-right: text card (be you) */}
                    <div className="bc bc-wide">
                        <div className="bc-bar" />
                        <div className="bc-text-pad">
                            <div>
                                <span className="bc-tag">Be YOU</span>
                                <p className="bc-text-num" style={{ marginTop: 12 }}>05</p>
                                <p className="bc-text-title">{cards[4].title}</p>
                                <p className="bc-text-desc">{cards[4].desc}</p>
                            </div>
                            <a href="#" className="bc-explore-link">
                                Come Alive
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                    <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                        <div className="bc-arrow">↗</div>
                    </div>

                </div>{/* end bento grid */}
            </div>

            {/*
            ══════════════════════════════════════════════════════
            PREVIOUS DESIGN — commented out as requested
            ══════════════════════════════════════════════════════

            <section ref={sectionRef} className="relative bg-white overflow-hidden flex flex-col justify-center" style={{ minHeight: "100dvh", maxHeight: "110dvh" }}>
                <style jsx>{`
                    .r-card-inner {
                        position: relative; border-radius: 22px;
                        border: 1px solid rgba(255,255,255,0.2);
                        transition: all 0.45s cubic-bezier(0.23,1,0.32,1); overflow: hidden;
                    }
                    .r-card-inner:hover { transform: translateY(-8px); box-shadow: 0 24px 48px -12px rgba(0,0,0,0.1); }
                    .r-card-inner::before { ... gradient border mask ... }
                    .r-img { animation: gentle-float 5s ease-in-out infinite; }
                    .hl-text { background: linear-gradient(90deg,#c42d2d,#e85d5d); -webkit-background-clip: text; ... }
                `}</style>

                ── Header row (split layout) ──
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4 r-reveal">
                    <div className="max-w-lg">
                        <span>The Transformation</span>
                        <h2>Who You Become <span className="italic text-[#c42d2d] font-bold">in This Space</span></h2>
                    </div>
                    <p>This is the safe space where you finally get to breathe…</p>
                </div>

                ── Quote ──
                <p className="r-reveal mb-2 italic">
                    What if you didn't have to carry everyone's world on your shoulders? ...
                </p>

                ── 5-column card grid ──
                <div className="r-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 mb-8 md:mb-10">
                    {cards.map((card, i) => (
                        <div key={i} className="r-card">
                            <div className="r-card-inner group border border-red-500 text-white h-full flex flex-col">
                                <div className="h-[2.5px]" [accent bar] />
                                <div className="p-4 md:p-5 flex-1 flex flex-col">
                                    <Image src={card.image} alt={card.title} width={120} height={120} ... />
                                    <span [numbered]>0{i+1}</span>
                                    <h3>{card.title}</h3>
                                    <p>{card.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            ══════════════════════════════════════════════════════
            */}
        </section>
    );
}
