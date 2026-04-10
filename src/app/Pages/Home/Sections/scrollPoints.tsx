"use client"

import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack'

const cards = [
    {
        title: "First Indian Hindustani",
        description: "Socially acclaimed First Indian to consciously adopt 'Hindustani' as her surname — standing for unity beyond caste, creed and religion.",
        image: "/scrollCards/1.png",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c42d2d" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
        ),
    },
    {
        title: "UGC NET Qualified Lecturer",
        description: "A former UGC NET qualified lecturer with deep academic roots and a passion for shaping minds through knowledge and energy-led work.",
        image: "/scrollCards/2.png",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c42d2d" strokeWidth="2" strokeLinecap="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
        ),
    },
    {
        title: "25+ Years of Spiritual Mastery",
        description: "25+ years of deep spiritual experience with over a decade of applied energy transformation — turning ancient wisdom into real-world results.",
        image: "/scrollCards/3.png",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c42d2d" strokeWidth="2" strokeLinecap="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
            </svg>
        ),
    },
    {
        title: "Invited Speaker & Thought Leader",
        description: "Invited speaker at universities, institutions, and organisations — shaping young minds and emerging leaders through energy-led transformation.",
        image: "/scrollCards/4.png",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c42d2d" strokeWidth="2" strokeLinecap="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 7V5a4 4 0 0 0-8 0v2" />
            </svg>
        ),
    },
    {
        title: "Guest of Honour at BSE",
        description: "Been a Guest of Honour at the Bombay Stock Exchange and various other renowned platforms, sharing space with senior national leadership.",
        image: "/scrollCards/5.png",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c42d2d" strokeWidth="2" strokeLinecap="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
        ),
    },
    {
        title: "Founder of MOMS Community",
        description: "Founder of MOMS (Multitasking Outstanding Mothers) community — a national movement empowering women emotionally and professionally.",
        image: "/scrollCards/6.png",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c42d2d" strokeWidth="2" strokeLinecap="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },
    {
        title: "National Media Recognition",
        description: "Featured across leading national media platforms for her work and thought leadership — a trusted voice in the world of energy transformation.",
        image: "/scrollCards/7.png",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c42d2d" strokeWidth="2" strokeLinecap="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        ),
    },
    {
        title: "Global Impact — 5+ Countries",
        description: "Has delivered single-session transformations for clients across 5+ countries, entirely online. Not a coach. Not a therapist. Not a healer — she shifts energy. Everything changes.",
        image: "/scrollCards/8.png",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c42d2d" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" />
            </svg>
        ),
    },
];

export default function ScrollPoints() {
    return (
        <section className="h-[112vh] bg-gradient-to-b from-[#8a0a0a] to-[#4a0e0e] flex flex-col relative overflow-hidden">
            {/* Subtle decorative bg elements */}
            {/* <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/[0.08] rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl pointer-events-none" /> */}

            {/* Header */}
            <div className="text-center pt-8 pb-0 px-6 flex-shrink-0 relative z-10">
                <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="w-6 h-px bg-white/40" />
                    <p className="text-[10px] md:text-sm uppercase tracking-[.3em] text-white/80 font-medium font-[var(--font-dm-sans)]">
                        The Lady behind Real-World Miracles
                    </p>
                    <div className="w-6 h-px bg-white/40" />
                </div>
                <h2 className="section-heading text-[28px] md:text-[42px] font-[var(--font-playfair)] text-white leading-[1.1] font-bold">
                    Raseshvari Hindustani
                </h2>
                <p className="mt-2 text-white/80 text-[16px] md:text-[18px] font-medium tracking-wide font-[var(--font-dm-sans)]">
                    A walking, talking miracle of possibilities.
                </p>
            </div>

            {/* ScrollStack fills remaining space only */}
            <div className="flex-1 min-h-0 relative z-10">
                <ScrollStack
                    itemDistance={50}
                    itemStackDistance={15}
                >
                    {cards.map((card, i) => (
                        <ScrollStackItem
                            key={i}
                            itemClassName="!h-auto !p-0 !rounded-2xl !shadow-xl bg-white border border-gray-100"
                        >
                            <div className="flex flex-col md:flex-row overflow-hidden rounded-2xl">
                                <div className="md:w-[50%] h-[280px] md:h-[380px] overflow-hidden flex-shrink-0 relative">
                                    <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5" />
                                    <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
                                        <span className="text-[#c42d2d] text-xs font-bold font-[var(--font-dm-sans)]">{String(i + 1).padStart(2, "0")}</span>
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col justify-center p-6 md:p-10">
                                    <div className="w-12 h-12 rounded-xl bg-[#c42d2d]/10 flex items-center justify-center mb-5 border border-[#c42d2d]/10">
                                        {card.icon}
                                    </div>
                                    <h3 className="text-[22px] md:text-[28px] font-[var(--font-playfair)] text-[#111] font-bold leading-tight mb-3">
                                        {card.title}
                                    </h3>
                                    <p className="text-gray-800 text-sm md:text-[23px] leading-relaxed max-w-md font-[var(--font-dm-sans)]">
                                        {card.description}
                                    </p>
                                </div>
                            </div>
                        </ScrollStackItem>
                    ))}
                </ScrollStack>
            </div>

            {/* Bottom bar */}
            <div className="flex-shrink-0 relative z-10 px-6 md:px-12 pb-5 pt-2">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
                        <p className="text-white/90 text-xs md:text-lg italic font-[var(--font-playfair)]">
                            She does not fix people, she shifts energy. Everything changes.
                        </p>
                    </div>
                    {/* <button className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-5 py-2 rounded-full text-xs font-semibold font-[var(--font-outfit)] border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300">
                        Step into her journey
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                        </svg>
                    </button> */}
                </div>
            </div>
        </section>
    );
}