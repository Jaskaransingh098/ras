"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/* ─── DATA (unchanged) ─── */
const servicesData = [
    {
        badge: "Signature",
        title: "Revenue Energetics™",
        p1: "One powerful session that shifts what strategy, effort, and coaching couldn't.",
        p2: "This isn't healing the way you think it is — it's a deeper energy transformation, a shift in your frequency that creates visible change in one session.",
        iconSVG: (
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        ),
        btnText: "Explore",
        btnLink: "#",
        number: "01",
        extra: null,
        tags: ["Energy Shift", "Frequency Work", "One Session"],
    },
    {
        badge: "Paid Diagnostic",
        title: "Energy Diagnostic Call™",
        p1: "A paid energy diagnostic call to understand what's really happening beneath the surface.",
        p2: "You receive a clear energetic roadmap showing what blocks are draining you, what needs to shift, and your next step toward your goals.",
        iconSVG: (
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        ),
        btnText: "Book Call",
        btnLink: "#",
        number: "02",
        extra: (
            <div className="flex flex-wrap gap-2 flex-1 mt-3">
                {['Energy Roadmap', 'Block Identification'].map((f) => (
                    <span key={f} className="feature-chip text-[9px] uppercase tracking-wider text-[#c42d2d] bg-white/70 border border-[#c42d2d]/20 rounded-full px-3 py-1 font-semibold font-[var(--font-dm-sans)] h-fit shadow-sm">
                        {f}
                    </span>
                ))}
            </div>
        ),
        tags: ["Energy Roadmap", "Block Identification"],
    },
    {
        badge: "Quiz",
        title: "Energy Score™ Quiz",
        p1: "A quick, intuitive check-in to see where your energy is dropping right now.",
        p2: "This is not a medical diagnosis — it's a gentle mirror to the hidden energetic patterns your mind may overlook. See what's truly happening beneath the surface.",
        iconSVG: (
            <><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>
        ),
        btnText: "Take the Quiz",
        btnLink: "#",
        number: "03",
        extra: null,
        tags: ["Quick Quiz", "Energy Patterns", "Free"],
    }
];

/* ════════════════════════════════════════════════
   NEW DESIGN  –  Editorial / Magazine layout
   (matches reference image 1)
════════════════════════════════════════════════ */
export default function Services() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const s = sectionRef.current;
        if (!s) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(
                s.querySelectorAll(".svc-reveal"),
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power3.out",
                    scrollTrigger: { trigger: s, start: "20% bottom", toggleActions: "play none none reset" },
                }
            );
        }, s);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="svc-root bg-gradient-to-b from-[#8a0a0a] to-[#4a0e0e] relative overflow-hidden" style={{ height: '115dvh', maxHeight: '115dvh' }}>
            <style>{`
                /* ── NEW editorial styles ── */
                .svc-root {
                    font-family: var(--font-dm-sans), sans-serif;
                }
                .svc-hero-title {
                    font-size: clamp(72px, 14vw, 160px);
                    font-weight: 900;
                    line-height: 0.88;
                    letter-spacing: -0.03em;
                    color: #fff;
                    font-family: var(--font-playfair), serif;
                    text-transform: uppercase;
                    mix-blend-mode: normal;
                }
                .svc-row {
                    display: grid;
                    grid-template-columns: 56px 200px 1fr 1fr auto;
                    align-items: center;
                    gap: 0 32px;
                    padding: 18px 0;
                    border-bottom: 1px solid rgba(255,255,255,0.12);
                    transition: background 0.3s;
                    cursor: pointer;
                }
                @media (max-width: 900px) {
                    .svc-row {
                        grid-template-columns: 40px 1fr;
                        grid-template-rows: auto auto auto;
                        gap: 10px 16px;
                        padding: 20px 0;
                    }
                    .svc-row-tags { display: none; }
                    .svc-row-img  { display: none; }
                }
                .svc-row:hover {
                    background: rgba(255,255,255,0.04);
                    border-radius: 8px;
                }
                .svc-row:hover .svc-row-num {
                    color: #e85d5d;
                }
                .svc-row-num {
                    font-size: 13px;
                    font-weight: 700;
                    color: rgba(255,255,255,0.35);
                    font-family: var(--font-dm-sans), sans-serif;
                    letter-spacing: 0.05em;
                    transition: color 0.3s;
                    align-self: center;
                }
                .svc-row-title {
                    font-size: clamp(28px, 4vw, 52px);
                    font-weight: 800;
                    color: #fff;
                    font-family: var(--font-playfair), serif;
                    line-height: 1.05;
                    letter-spacing: -0.01em;
                }
                .svc-row-tags-wrap {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }
                .svc-row-tag {
                    font-size: 11px;
                    font-weight: 600;
                    color: #fbf1f1ff;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    font-family: var(--font-dm-sans), sans-serif;
                }
                .svc-row-desc {
                    font-size: 14px;
                    color: rgba(255, 255, 255, 1);
                    line-height: 1.65;
                    font-family: var(--font-dm-sans), sans-serif;
                    max-width: 340px;
                }
                .svc-row-img-box {
                    width: 100px;
                    height: 72px;
                    border-radius: 12px;
                    overflow: hidden;
                    background: rgba(255,255,255,0.08);
                    border: 1px solid rgba(255,255,255,0.12);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    position: relative;
                }
                .svc-row-img-box svg {
                    opacity: 0.45;
                }
                /* gradient bar inside image placeholder */
                .svc-img-grad {
                    position: absolute;
                    inset: 0;
                    border-radius: 12px;
                }
                .svc-cta-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-top: 18px;
                    flex-wrap: wrap;
                    gap: 16px;
                }
                .svc-cta-text {
                    font-size: clamp(14px, 2vw, 18px);
                    color: rgba(255,255,255,0.85);
                    font-family: var(--font-dm-sans), sans-serif;
                }
                .svc-cta-link {
                    color: #fff;
                    font-weight: 700;
                    text-decoration: underline;
                    text-decoration-color: rgba(255,255,255,0.3);
                    text-underline-offset: 3px;
                    transition: color 0.3s, text-decoration-color 0.3s;
                }
                .svc-cta-link:hover {
                    color: #e85d5d;
                    text-decoration-color: #e85d5d;
                }
                .svc-compass {
                    width: 32px;
                    height: 32px;
                    opacity: 0.5;
                    position: absolute;
                    top: 24px;
                    right: 24px;
                    animation: svc-spin 20s linear infinite;
                }
               
            `}</style>

            {/* Decorative compass top-right */}
           
            <div className="max-w-8xl mx-auto px-6 md:px-12 w-full pt-8 pb-10">

                {/* ── Original section header ── */}
                <div className="svc-reveal flex flex-col md:flex-row md:items-end md:justify-between mb-5">
                    <div className="max-w-lg">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-[2px] rounded-full bg-gradient-to-r from-[#c42d2d] to-[#e85d5d]" />
                            <p className="text-[10px] md:text-sm uppercase tracking-[.3em] text-white font-medium font-[var(--font-dm-sans)]">
                                Services
                            </p>
                        </div>
                        <h2 className="text-[22px] md:text-[34px] font-[var(--font-playfair)] text-white leading-[1.15]">
                            Shift the One Thing That{' '}
                            <span className="italic text-white">Changes Everything</span>
                        </h2>
                    </div>
                    <p className="text-white/80 text-[13px] md:text-[15px] max-w-sm mt-2 md:mt-0 leading-relaxed md:text-right font-[var(--font-dm-sans)]">
                        &ldquo;Most people come to me after trying everything.&rdquo;
                    </p>
                </div>

                {/* ── Giant headline ── */}
                {/* <div className="mb-4 overflow-hidden">
                    <h2 className="svc-hero-title">Services</h2>
                </div> */}

                {/* ── Divider top ── */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }} />

                {/* ── Service rows ── */}
                {servicesData.map((svc, i) => (
                    <div key={i} className="svc-row group">
                        {/* Number */}
                        <span className="svc-row-num">{svc.number}</span>

                        {/* Title */}
                        <h3 className="svc-row-title">{svc.title.replace('™', '')}<sup style={{ fontSize: '0.4em', verticalAlign: 'super', color: '#e85d5d' }}>™</sup></h3>

                        {/* Tags column */}
                        <div className="svc-row-tags svc-row-tags-wrap pl-30">
                            {svc.tags.map((t) => (
                                <span key={t} className="svc-row-tag">{t}</span>
                            ))}
                        </div>

                        {/* Description */}
                        <p className="svc-row-desc">{svc.p1}&nbsp;{svc.p2}</p>

                        {/* Image / visual */}
                        <div className="svc-row-img svc-row-img-box">
                            <div
                                className="svc-img-grad"
                                style={{
                                    background: i === 0
                                        ? 'linear-gradient(135deg, #8a0a0a 0%, #c42d2d 50%, #2a0505 100%)'
                                        : i === 1
                                        ? 'linear-gradient(135deg, #1a1a2e 0%, #c42d2d 60%, #4a0e0e 100%)'
                                        : 'linear-gradient(135deg, #2d0000 0%, #e85d5d 55%, #8a0a0a 100%)'
                                }}
                            />
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'relative', zIndex: 1 }}>
                                {svc.iconSVG}
                            </svg>
                        </div>
                        {/* CTA Button */}
                        <a
                            href={svc.btnLink}
                            className="svc-row-btn"
                        >
                            {svc.btnText}
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
                            </svg>
                        </a>
                    </div>
                ))}

                {/* ── CTA row at bottom ── */}
                <div className="svc-cta-row">
                    <p className="svc-cta-text">
                        Not sure where to begin?{' '}
                        <a href="#" className="svc-cta-link">
                            The Energy Diagnostic Call™
                        </a>{' '}
                        is the easiest first step.
                    </p>
                    <a
                        href="#"
                        style={{
                            background: 'linear-gradient(135deg, #c42d2d, #b02525)',
                            color: '#fff',
                            padding: '12px 28px',
                            borderRadius: '100px',
                            fontSize: '12px',
                            fontWeight: 700,
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontFamily: 'var(--font-outfit)',
                            boxShadow: '0 8px 24px rgba(196,45,45,0.35)',
                            transition: 'box-shadow 0.3s, transform 0.3s',
                        }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 12px 32px rgba(196,45,45,0.5)';
                            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 24px rgba(196,45,45,0.35)';
                            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                        }}
                    >
                        Explore All
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
