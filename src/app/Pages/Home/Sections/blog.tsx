"use client";

import { useEffect, useRef, useState, useCallback } from "react";
// import Script from "next/script";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/* ─── Editable Data ─── */

const dailyQuotes = [
    {
        text: "Good morning, beautiful soul. Your energy today is your offering to the world.",
        author: "Raseshvari",
        label: "Morning Energy",
    },
    {
        text: "The universe doesn't respond to what you want — it responds to who you're being.",
        author: "Raseshvari",
        label: "Energy Thought",
    },
    {
        text: "Good night. Let go of today's weight — tomorrow, you rise lighter.",
        author: "Raseshvari",
        label: "Night Reflection",
    },
];

const blogs = [
    {
        title: "Why High-Achieving Women Still Feel Empty Inside",
        excerpt:
            "You've done everything right — the career, the milestones, the hustle. Yet something still feels missing.",
        tag: "Energy & Frequency",
        date: "Feb 2025",
        readTime: "5 min read",
    },
    {
        title: "The Real Reason Your Business Isn't Growing",
        excerpt:
            "Beneath every stuck revenue plateau is a blocked energetic pattern. Until you shift it, no funnel will save you.",
        tag: "Revenue Energetics™",
        date: "Jan 2025",
        readTime: "4 min read",
    },
];

/* ─── Component ─── */

export default function Blog() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [igPosts, setIgPosts] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/instagram")
            .then((res) => res.json())
            .then((data) => {
                if (data.posts) setIgPosts(data.posts);
            });
    }, []);

    /* ── Rotate quotes every 8 seconds ── */
    const nextQuote = useCallback(() => {
        setQuoteIndex((prev) => (prev + 1) % dailyQuotes.length);
    }, []);

    useEffect(() => {
        const interval = setInterval(nextQuote, 8000);
        return () => clearInterval(interval);
    }, [nextQuote]);

    /* ── GSAP animations ── */
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                section.querySelectorAll(".b-reveal"),
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.12,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );
            gsap.fromTo(
                section.querySelectorAll(".b-card"),
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section.querySelector(".b-grid"),
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }, section);

        return () => ctx.revert();
    }, []);

    const quote = dailyQuotes[quoteIndex];

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden"
            style={{
                background: "linear-gradient(160deg, #fdf8f4 0%, #fef5ef 60%, #fdf0e8 100%)",
                minHeight: "100dvh",
                paddingTop: "3rem",
                paddingBottom: "2.5rem",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <style jsx>{`
                .b-glass {
                    position: relative;
                    border-radius: 20px;
                    overflow: hidden;
                    background: rgba(255,255,255,0.75);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border: 1px solid rgba(220, 180, 160, 0.22);
                    transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);
                }
                .b-glass:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 24px 48px -12px rgba(80, 20, 20, 0.1);
                    border-color: rgba(196, 45, 45, 0.15);
                    background: rgba(255,255,255,0.92);
                }

                .quote-card {
                    position: relative;
                    border-radius: 20px;
                    overflow: hidden;
                    background: linear-gradient(160deg, #9e4545ff 0%, #bd4747ff 50%, #d5acacff 100%);
                    border: 1px solid rgba(196, 45, 45, 0.15);
                    transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);
                }
                .quote-card:hover {
                    box-shadow: 0 24px 48px -12px rgba(80, 20, 20, 0.35);
                    border-color: rgba(196, 45, 45, 0.3);
                }
                .quote-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 3px;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
                    opacity: 0.5;
                }

                .ig-section {
                    position: relative;
                    border-radius: 20px;
                    overflow: hidden;
                    background: rgba(255,255,255,0.75);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border: 1px solid rgba(220, 180, 160, 0.22);
                    transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);
                }
                .ig-section:hover {
                    box-shadow: 0 24px 48px -12px rgba(80, 20, 20, 0.1);
                    border-color: rgba(196, 45, 45, 0.15);
                }

                .b-tag {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 9px;
                    font-weight: 700;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    padding: 4px 12px;
                    border-radius: 999px;
                    border: 1px solid rgba(196,45,45,0.2);
                    background: rgba(196,45,45,0.06);
                    color: #c42d2d;
                }

                .read-arrow {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: #c42d2d;
                    transition: gap 0.3s ease;
                }
                .read-arrow:hover { gap: 10px; }

                .decor-line {
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(196,45,45,0.15), transparent);
                }

                .quote-fade-enter {
                    animation: quoteCrossFade 0.5s ease forwards;
                }
                @keyframes quoteCrossFade {
                    0%   { opacity: 0; filter: blur(4px); }
                    100% { opacity: 1; filter: blur(0); }
                }
            `}</style>

            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 flex flex-col flex-1">

                {/* ── Section Header ── */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8 flex-shrink-0">
                    <div className="max-w-lg b-reveal">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-[2px] rounded-full" style={{ background: "linear-gradient(90deg, #c42d2d, #e85d5d)" }} />
                            <p
                                className="text-[10px] md:text-xs uppercase tracking-[.3em] font-semibold font-[var(--font-dm-sans)]"
                                style={{ color: "rgba(198, 16, 16, 0.55)" }}
                            >
                                Insights & Inspiration
                            </p>
                        </div>
                        <h2
                            className="font-[var(--font-playfair)] leading-[1.1] font-bold"
                            style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "#1a0e0e" }}
                        >
                            Words That{" "}
                            <span className="italic font-semibold" style={{ color: "rgba(196,45,45,0.75)" }}>
                                Shift Things
                            </span>
                        </h2>
                    </div>
                    <p
                        className="b-reveal text-[13px] md:text-[18px] font-semibold max-w-lg leading-relaxed md:text-right font-[var(--font-dm-sans)]"
                        style={{ color: "#ee5151ff" }}
                    >
                        Daily wisdom, Instagram energy, and journal entries — all in one place.
                    </p>
                </div>

                {/* ── Bento Grid ── */}
                <div className="b-grid grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 min-h-0">

                    {/* ══ TOP ROW ══ */}

                    {/* ── Daily Wisdom Quote Card ── */}
                    <div className="b-card lg:col-span-5 flex">
                        <div className="quote-card w-full flex flex-col p-7 md:p-9 relative">
                            {/* Ambient glow */}
                            <div
                                className="absolute top-[-20%] right-[-10%] w-56 h-56 rounded-full pointer-events-none"
                                style={{ background: "radial-gradient(circle, rgba(196,45,45,0.15) 0%, transparent 70%)", filter: "blur(50px)" }}
                            />

                            <div className="relative z-10 flex flex-col h-full">
                                {/* Top Row: Label + Counter */}
                                <div className="flex items-center justify-between mb-auto">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                                        <span
                                            className="text-[12px] font-bold uppercase tracking-[.3em] font-[var(--font-dm-sans)]"
                                            style={{ color: "rgba(255, 255, 255, 1)" }}
                                        >
                                            Daily Wisdom
                                        </span>
                                    </div>
                                    <span
                                        className="text-[12px] font-[var(--font-dm-sans)] tabular-nums"
                                        style={{ color: "rgba(255,255,255,0.7)" }}
                                    >
                                        {String(quoteIndex + 1).padStart(2, "0")} / {String(dailyQuotes.length).padStart(2, "0")}
                                    </span>
                                </div>

                                {/* Big decorative quote mark */}
                                <div
                                    className="font-[var(--font-playfair)] select-none pointer-events-none leading-none mt-4"
                                    style={{ fontSize: "clamp(50px, 7vw, 80px)", color: "rgba(255,255,255,0.2)" }}
                                >
                                    “
                                </div>

                                {/* Quote text */}
                                <blockquote
                                    key={quoteIndex}
                                    className="font-[var(--font-playfair)] italic leading-[1.25] quote-fade-enter -mt-6"
                                    style={{ fontSize: "clamp(18px, 2vw, 24px)", color: "#ffffff" }}
                                >
                                    {quote.text}
                                </blockquote>

                                {/* Divider */}
                                <div className="mt-auto pt-5">
                                    <div className="h-[1px] w-full" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.3), transparent)" }} />
                                </div>

                                {/* Author + Navigation */}
                                <div className="flex items-center justify-between mt-3">
                                    <div>
                                        <p className="text-[12px] font-[var(--font-dm-sans)] font-semibold" style={{ color: "rgba(255, 255, 255, 1)" }}>
                                            — {quote.author}
                                        </p>
                                        <p className="text-[9px] font-[var(--font-dm-sans)] uppercase tracking-[.2em] mt-1" style={{ color: "rgba(255, 255, 255, 1)" }}>
                                            {quote.label}
                                        </p>
                                    </div>

                                    {/* Nav arrows */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setQuoteIndex((prev) => (prev - 1 + dailyQuotes.length) % dailyQuotes.length)}
                                            className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                            style={{ border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.1)" }}
                                        >
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round">
                                                <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => setQuoteIndex((prev) => (prev + 1) % dailyQuotes.length)}
                                            className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                            style={{ border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.1)" }}
                                        >
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round">
                                                <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Progress bar */}
                                <div className="flex gap-1.5 mt-3">
                                    {dailyQuotes.map((_, i) => (
                                        <div
                                            key={i}
                                            className="h-[2px] flex-1 rounded-full transition-all duration-500"
                                            style={{ background: i === quoteIndex ? "#ffffff" : "rgba(255,255,255,0.3)" }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Instagram Live Feed (LightWidget) ── */}
                    <div className="b-card lg:col-span-7 flex">
                        <div className="ig-section p-5 w-full flex flex-col">
                            {/* Instagram header */}
                            <div className="flex items-center justify-between mb-4 flex-shrink-0">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                                        style={{ background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-bold font-[var(--font-dm-sans)]" style={{ color: "#1a0e0e" }}>
                                            @beyondimagination.club
                                        </p>
                                        <p className="text-[10px] font-[var(--font-dm-sans)]" style={{ color: "#b08070" }}>
                                            Live Feed
                                        </p>
                                    </div>
                                </div>
                                <a
                                    href="https://www.instagram.com/beyondimagination.club/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] font-bold uppercase tracking-[.12em] font-[var(--font-dm-sans)] px-3 py-1.5 rounded-full transition-all duration-300 hover:scale-105"
                                    style={{
                                        color: "#c42d2d",
                                        border: "1px solid rgba(196,45,45,0.2)",
                                        background: "rgba(196,45,45,0.04)",
                                    }}
                                >
                                    Follow
                                </a>
                            </div>

                            {/* LightWidget Instagram Feed */}
                            <div className="rounded-xl overflow-hidden flex-1">
                                <div className="grid grid-cols-2 gap-3">
                                    {igPosts?.length > 0 &&
                                        igPosts.map((post) => (
                                            <a
                                                key={post.id}
                                                href={post.permalink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block group"
                                            >
                                                <div
                                                    className="w-full h-[160px] rounded-lg overflow-hidden"
                                                    style={{
                                                        background: `url(${post.mediaUrl}) center/cover no-repeat`,
                                                    }}
                                                />

                                                <p className="text-[11px] mt-2 line-clamp-2 text-[#6a4a3a]">
                                                    {post.caption}
                                                </p>
                                            </a>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ══ BOTTOM ROW: 2 Blog Cards ══ */}
                    {blogs.map((blog, i) => (
                        <div key={i} className="b-card lg:col-span-6">
                            <div className="b-glass h-full flex flex-col p-5">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="b-tag">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#c42d2d]" />
                                        {blog.tag}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-[var(--font-dm-sans)]" style={{ color: "#7f2828ff" }}>
                                            {blog.date}
                                        </span>
                                        <span className="w-1 h-1 rounded-full" style={{ background: "#d4b0a0" }} />
                                        <span className="text-[10px] font-[var(--font-dm-sans)]" style={{ color: "#c4a090" }}>
                                            {blog.readTime}
                                        </span>
                                    </div>
                                </div>

                                <h3
                                    className="font-[var(--font-playfair)] font-bold leading-[1.2] mb-2"
                                    style={{ fontSize: "clamp(15px, 1.8vw, 20px)", color: "#1a0e0e" }}
                                >
                                    {blog.title}
                                </h3>
                                <p
                                    className="text-[15px] leading-[1.6] mb-3 font-[var(--font-dm-sans)] flex-1 font-semibold"
                                    style={{ color: "#8a6a5a" }}
                                >
                                    {blog.excerpt}
                                </p>

                                <div className="decor-line mb-3" />

                                <a href="#" className="read-arrow font-[var(--font-dm-sans)]">
                                    Read Article
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                        <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Bottom CTA ── */}
                <div className="b-reveal mt-6 flex flex-col md:flex-row items-center justify-between gap-4 flex-shrink-0">
                    {/* <p
                        className="font-[var(--font-playfair)] italic text-center md:text-left"
                        style={{ fontSize: "clamp(14px, 1.6vw, 18px)", color: "#51291cff" }}
                    >
                        &ldquo;The truth in these words is the shift itself.&rdquo;
                    </p> */}
                    <div className="flex items-center gap-3">
                        <a
                            href="https://www.instagram.com/beyondimagination.club/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-[var(--font-dm-sans)] font-bold text-[11px] uppercase tracking-[0.12em] transition-all duration-300 hover:scale-105"
                            style={{
                                color: "#c42d2d",
                                border: "1px solid rgba(196,45,45,0.2)",
                                background: "rgba(196,45,45,0.04)",
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                            Follow Us
                        </a>
                        <a
                            href="#"
                            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-[var(--font-dm-sans)] font-bold text-[11px] uppercase tracking-[0.12em] transition-all duration-300 hover:scale-105"
                            style={{
                                background: "linear-gradient(135deg, #c42d2d, #9b1c1c)",
                                color: "#fff",
                                boxShadow: "0 10px 28px -8px rgba(196,45,45,0.3)",
                            }}
                        >
                            View All Articles
                            <svg
                                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            >
                                <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
