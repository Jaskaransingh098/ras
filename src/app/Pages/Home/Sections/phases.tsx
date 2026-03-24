"use client";

import { useState, useEffect } from "react";

const cases = [
    {
        id: 0,
        num: "01",
        category: "BUSINESS",
        tagline: "Stuck Deal... Started Moving",
        session: "Single 60-min Revenue Energetics session",
        shift: "Mental fog, old patterns & resistance cleared — next steps became obvious",
        result: "Deal moved within 48 hours, revenue started flowing",
        accent: "#c42d2d",
    },
    {
        id: 1,
        num: "02",
        category: "PHYSICAL RELIEF",
        tagline: "From bedridden to restored mobility",
        session: "High-Energy Transformation",
        shift: "Pain eased, deeper sleep, sense of lightness",
        result: "Regained the ability to stand and walk within 4 days",
        accent: "#8a7565",
    },
    {
        id: 2,
        num: "03",
        category: "EMOTIONS",
        tagline: "Two decades of trauma... Vanished",
        session: "One Powerful Energy Transformation",
        shift: "Intense release of grief and pain through tears in 30 minutes",
        result: "Immediate lightness, emotional relief & felt like a new life",
        accent: "#e85d5d",
    },
];

export default function Phases() {
    const [active, setActive] = useState(0);
    const [visible, setVisible] = useState(true);
    const c = cases[active];

    // Auto-cycle
    useEffect(() => {
        const timer = setInterval(() => {
            switchTo((active + 1) % cases.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [active]);

    function switchTo(next: number) {
        if (next === active) return;
        setVisible(false);
        setTimeout(() => {
            setActive(next);
            setVisible(true);
        }, 350);
    }

    return (
        <section
            className="relative min-h-[100dvh] max-h-[100dvh] flex items-center overflow-hidden"
            style={{ background: "linear-gradient(160deg, #0a0a0a 0%, #151515 50%, #0e0e0e 100%)" }}
        >
            <style jsx>{`
                @keyframes progress {
                    from { width: 0%; }
                    to { width: 100%; }
                }
                @keyframes progress-v {
                    from { height: 0%; }
                    to { height: 100%; }
                }
                .flow-panel {
                    transition: opacity 0.35s ease, transform 0.35s ease;
                }
                .flow-panel.hidden-panel {
                    opacity: 0;
                    transform: translateY(12px);
                }
                .flow-panel.visible-panel {
                    opacity: 1;
                    transform: translateY(0);
                }
                .case-selector {
                    position: relative;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .case-selector:hover {
                    transform: translateX(4px);
                }
                .case-selector.active-case {
                    transform: translateX(8px);
                }
                .flow-step {
                    position: relative;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .flow-step:hover {
                    transform: translateX(6px);
                }
                .progress-bar {
                    animation: progress 6s linear forwards;
                }
                .progress-bar-v {
                    animation: progress-v 6s linear forwards;
                }
            `}</style>

            {/* Background glow — static, color changes on switch */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none opacity-[0.12]"
                style={{ backgroundColor: c.accent, transition: 'background-color 0.7s ease' }}
            />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 py-12">
                {/* Layout: Left selector + Right content */}
                <div className="flex flex-col md:flex-row gap-10 md:gap-16 lg:gap-20">

                    {/* LEFT — Case Selector */}
                    <div className="md:w-[38%] flex flex-col justify-center">
                        {/* Section label */}
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-[2px] rounded-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${c.accent}, transparent)` }} />
                            <p className="text-[10px] uppercase tracking-[.35em] text-white/70 font-semibold font-[var(--font-dm-sans)]">
                                Real Transformations
                            </p>
                        </div>

                        <h2 className="text-[24px] md:text-[36px] font-[var(--font-playfair)] text-white leading-[1.15] mb-6">
                            One Session.<br />
                            <span className="italic text-white/55">Everything Shifts.</span>
                        </h2>

                        {/* Descriptive text */}
                        <p className="text-white text-[15px] md:text-[16px] leading-[1.65] mb-10 max-w-[95%] font-[var(--font-dm-sans)]">
                            Real people. Real results. Real transformations that happen when deeply stuck patterns dissolve and your true potential emerges. 
                            Discover the profound shifts that occur in a single session.
                        </p>

                        {/* 3 Case selectors */}
                        <div className="flex flex-col gap-3">
                            {cases.map((item, i) => (
                                <button
                                    key={item.id}
                                    onClick={() => switchTo(i)}
                                    className={`case-selector text-left rounded-2xl p-5 border transition-all duration-500 ${active === i ? "active-case" : ""
                                        }`}
                                    style={active === i ? {
                                        background: `linear-gradient(135deg, ${item.accent}12, ${item.accent}05)`,
                                        borderColor: `${item.accent}30`,
                                        boxShadow: `0 8px 32px ${item.accent}10`,
                                    } : {
                                        background: "rgba(255,255,255,0.015)",
                                        borderColor: "rgba(255,255,255,0.04)",
                                    }}
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Number */}
                                        <span
                                            className="text-[32px] font-[var(--font-playfair)] font-bold leading-none transition-all duration-500 select-none"
                                            style={{ color: active === i ? `${item.accent}60` : "rgba(255,255,255,0.06)" }}
                                        >
                                            {item.num}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1.5">
                                                {active === i && (
                                                    <div
                                                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                                                        style={{ backgroundColor: item.accent }}
                                                    />
                                                )}
                                                <span
                                                    className="text-[9px] font-bold uppercase tracking-[.2em] font-[var(--font-dm-sans)] transition-colors duration-500"
                                                    style={{ color: active === i ? item.accent : "rgba(255,255,255,0.55)" }}
                                                >
                                                    {item.category}
                                                </span>
                                            </div>
                                            <p
                                                className="text-[14px] md:text-[15px] font-[var(--font-playfair)] leading-snug transition-colors duration-500 truncate"
                                                style={{ color: active === i ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.6)" }}
                                            >
                                                {item.tagline}
                                            </p>
                                        </div>
                                        {/* Arrow */}
                                        <svg
                                            width="16" height="16" viewBox="0 0 24 24" fill="none"
                                            stroke={active === i ? item.accent : "rgba(255,255,255,0.1)"}
                                            strokeWidth="2" strokeLinecap="round"
                                            className="flex-shrink-0 transition-all duration-500"
                                            style={{ opacity: active === i ? 1 : 0.5 }}
                                        >
                                            <path d="M9 18l6-6-6-6" />
                                        </svg>
                                    </div>
                                    {/* Progress bar for active */}
                                    {active === i && (
                                        <div className="mt-3 h-[2px] rounded-full overflow-hidden" style={{ backgroundColor: `${item.accent}10` }}>
                                            <div
                                                key={`prog-${active}`}
                                                className="h-full rounded-full progress-bar"
                                                style={{ backgroundColor: `${item.accent}50` }}
                                            />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT — Flow Visualization */}
                    <div className="md:w-[62%] flex items-center">
                        <div
                            className={`w-full flow-panel ${visible ? 'visible-panel' : 'hidden-panel'}`}
                        >
                            {/* Flow: 3 steps with vertical connecting line */}
                            <div className="relative pl-8 md:pl-10">
                                {/* Static background line */}
                                <div
                                    className="absolute left-[11px] md:left-[15px] top-6 bottom-6 w-px"
                                    style={{ background: `${c.accent}15`, transition: 'background 0.7s ease' }}
                                />
                                {/* Animated progress line over the static one */}
                                <div
                                    className="absolute left-[11px] md:left-[15px] top-6 bottom-6 w-px overflow-hidden"
                                >
                                    <div
                                        key={`vp-${active}`}
                                        className="w-full progress-bar-v"
                                        style={{ background: `linear-gradient(180deg, ${c.accent}, ${c.accent}40)` }}
                                    />
                                </div>

                                {[
                                    { label: "SESSION", sub: "The beginning", text: c.session },
                                    { label: "SHIFT", sub: "The transformation", text: c.shift },
                                    { label: "RESULT", sub: "The outcome", text: c.result },
                                ].map((step, si) => (
                                    <div
                                        key={si}
                                        className="flow-step flex gap-5 md:gap-7 mb-8 last:mb-0"
                                        style={{ animationDelay: `${si * 0.12}s` }}
                                    >
                                        {/* Dot on the timeline */}
                                        <div className="relative flex-shrink-0 -ml-8 md:-ml-10 w-6 md:w-8 flex justify-center pt-5">
                                            <div
                                                className="w-3 h-3 rounded-full border-2 bg-[#0e0e0e] relative z-10"
                                                style={{
                                                    borderColor: c.accent,
                                                    boxShadow: si === 2 ? `0 0 10px ${c.accent}40` : 'none',
                                                }}
                                            />
                                        </div>

                                        {/* Step content card */}
                                        <div
                                            className="flex-1 rounded-2xl p-6 md:p-7 border transition-all duration-400"
                                            style={{
                                                background: si === 2
                                                    ? `linear-gradient(135deg, ${c.accent}08, rgba(255,255,255,0.025))`
                                                    : "rgba(255,255,255,0.025)",
                                                borderColor: si === 2 ? `${c.accent}20` : "rgba(255,255,255,0.05)",
                                            }}
                                        >
                                            {/* Label row */}
                                            <div className="flex items-center gap-3 mb-3">
                                                <div
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold font-[var(--font-outfit)]"
                                                    style={{
                                                        background: `${c.accent}15`,
                                                        color: c.accent,
                                                        border: `1px solid ${c.accent}20`,
                                                    }}
                                                >
                                                    {String(si + 1).padStart(2, "0")}
                                                </div>
                                                <div>
                                                    <span
                                                        className="text-[11px] font-bold uppercase tracking-[.2em] font-[var(--font-dm-sans)] block"
                                                        style={{ color: c.accent }}
                                                    >
                                                        {step.label}
                                                    </span>
                                                    <span className="text-white/60 text-[9px] tracking-wider font-[var(--font-dm-sans)]">
                                                        {step.sub}
                                                    </span>
                                                </div>

                                                {si === 2 && (
                                                    <div className="ml-auto flex items-center gap-1.5" style={{ color: `${c.accent}70` }}>
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                                            <path d="M20 6L9 17l-5-5" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Text */}
                                            <p className="text-white/95 text-[15px] md:text-[16px] leading-[1.75] font-[var(--font-dm-sans)]">
                                                {step.text}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Final tagline under the flow */}
                            <div className="mt-8 pl-8 md:pl-10">
                                <div className="inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 border"
                                    style={{
                                        background: `${c.accent}06`,
                                        borderColor: `${c.accent}15`,
                                    }}
                                >
                                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: `${c.accent}60` }} />
                                    <p className="text-white/70 text-[12px] font-[var(--font-dm-sans)]">
                                        Shift happened in{" "}
                                        <span className="font-semibold font-[var(--font-outfit)]" style={{ color: `${c.accent}` }}>
                                            one session
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Corner watermark */}
            <div className="absolute bottom-6 right-8 md:right-12 pointer-events-none">
                <p className="text-white/[0.03] text-[10px] uppercase tracking-[.5em] font-[var(--font-dm-sans)]">Raseshvari Hindustani</p>
            </div>
        </section>
    );
}
