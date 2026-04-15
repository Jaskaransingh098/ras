"use client";

import { useEffect, useRef, useState, useCallback } from "react";
// import Script from "next/script";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
gsap.registerPlugin(ScrollTrigger);

/* ─── Editable Data ─── */

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

// All available graphic quotes
const graphicQuotes = [
    { id: 1, src: "/quotes/1.png", alt: "Graphic Quote 1" },
    { id: 2, src: "/quotes/2.png", alt: "Graphic Quote 2" },
    { id: 3, src: "/quotes/3.png", alt: "Graphic Quote 3" },
    { id: 4, src: "/quotes/4.png", alt: "Graphic Quote 4" },
    { id: 5, src: "/quotes/5.png", alt: "Graphic Quote 5" },
    { id: 6, src: "/quotes/6.png", alt: "Graphic Quote 6" },
    { id: 7, src: "/quotes/Grey Brown Minimal Pastel Paper Motivation Quotes Instagram Post_20260412_152038_0007.png", alt: "Graphic Quote 7" },
    { id: 8, src: "/quotes/Grey Brown Minimal Pastel Paper Motivation Quotes Instagram Post_20260412_152038_0008.png", alt: "Graphic Quote 8" },
    { id: 9, src: "/quotes/Grey Brown Minimal Pastel Paper Motivation Quotes Instagram Post_20260412_152038_0009.png", alt: "Graphic Quote 9" },
    { id: 10, src: "/quotes/Grey Brown Minimal Pastel Paper Motivation Quotes Instagram Post_20260412_152039_0010.png", alt: "Graphic Quote 10" },
    { id: 11, src: "/quotes/Grey Brown Minimal Pastel Paper Motivation Quotes Instagram Post_20260412_152039_0011.png", alt: "Graphic Quote 11" },
    { id: 12, src: "/quotes/Grey Brown Minimal Pastel Paper Motivation Quotes Instagram Post_20260412_152039_0012.png", alt: "Graphic Quote 12" },
    { id: 13, src: "/quotes/Grey Brown Minimal Pastel Paper Motivation Quotes Instagram Post_20260412_152039_0013.png", alt: "Graphic Quote 13" },
    { id: 14, src: "/quotes/Grey Brown Minimal Pastel Paper Motivation Quotes Instagram Post_20260412_152039_0014.png", alt: "Graphic Quote 14" },
    { id: 15, src: "/quotes/Grey Brown Minimal Pastel Paper Motivation Quotes Instagram Post_20260412_152039_0015.png", alt: "Graphic Quote 15" },
    { id: 16, src: "/quotes/Grey Brown Minimal Pastel Paper Motivation Quotes Instagram Post_20260412_152039_0016.png", alt: "Graphic Quote 16" },
    { id: 17, src: "/quotes/Grey Brown Minimal Pastel Paper Motivation Quotes Instagram Post_20260412_152039_0017.png", alt: "Graphic Quote 17" },
    { id: 18, src: "/quotes/Grey Brown Minimal Pastel Paper Motivation Quotes Instagram Post_20260412_152039_0018.png", alt: "Graphic Quote 18" },
    { id: 19, src: "/quotes/19.png", alt: "Graphic Quote 19" },
    { id: 20, src: "/quotes/20.png", alt: "Graphic Quote 20" },
];

// Function to get random 3 unique quotes
const getRandomQuotes = (quotes: typeof graphicQuotes, count = 3) => {
    const shuffled = [...quotes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

const blogs = [
    {
        id: 1,
        title: "But You Create Miracles For Others... How Can You Feel Low?",
        excerpt:
            "Every coach, healer, and leader carries silent pain. But here's the truth: the healer also needs healing.",
        tag: "Energy & Frequency",
        date: "Mar 2025",
        readTime: "6 min read",
        content: "\"But you create miracles for others… how can you ever feel low?\" 😳\n\nI smile when people ask me this.\n\nBecause yes - I help others heal, transform and reconnect with their bodies…\nBut I am also human.\n\nWhat most people don't realize is that coaches, healers, leaders too have moments of doubt, heaviness and silence.\n\nOur lives are not without ups and downs. The only difference is, even in those moments, we choose to spread more light in the world.\n\nAnd here's something I've seen again and again:\n\nWhen I speak with coaches or energy workers, they don't even have to tell me ..\nI can perceive the energy of their past still weighing on them. Old hurts still bothering them.\n\nBut because they are \"the coach\"… they feel they cannot admit it.\n\nBecause they are \"the healer\"… they hide it out of fear of judgment.\n\nAnd honestly — that breaks my heart. 💔\n\nSo much silent pain, carried quietly… just because of the pressure to appear perfect.\n\nBut here's the truth:\n• The healer also needs healing.\n• The giver also needs to receive.\n• The leader also needs a space to be vulnerable.\n\nThe days are gone when vulnerability was seen as weakness.\n\nToday, vulnerability is courage. It is leadership.\n\nSo to every coach, healer, leader reading this ..\nplease remember:\n• You are human.\n• You are allowed to ask for help.\n• You are allowed to receive.\n\nBecause unless we are truly happy inside out, how can we spread more happiness in the world?\n\nAnd from my heart ❤️\ndeep gratitude to every one of you…\n\nFor the light you spread.\nFor the courage you show.\nFor choosing, again and again, to contribute to others at your fullest.\n\nBut remember -\nyou don't have to walk alone.\n\nI'm here for you. Always.\nIf you've been waiting for a hand to hold, this is it.\n\nLet's come forward. Let's hold each other's hands.\n\nBecause together, we can create a world where even healers, coaches and leaders feel safe to receive.\n\nEase & magic\nRaseshvari"
    },
    {
        id: 2,
        title: "Peace or Pressure — What Are You Still Holding Onto?",
        excerpt:
            "Three years back, life forced me to pause. I chose peace over pressure and released everything. Here's what I learned.",
        tag: "Revenue Energetics™",
        date: "Feb 2025",
        readTime: "7 min read",
        content: "PEACE or PRESSURE - what are you still holding on to, just because you once created it?\n\nThree years back, life forced me to pause.\nNot a gentle pause...  a complete collapse!!\n\nMy body gave up.\nMy mind went blank.\n\nAnd suddenly, all the things I had built - my community, my organization, my brand, didn't matter anymore.\n\nI didn't have the strength to handle them.\nI didn't even have the will to continue.\n\nSo I made a decision most people are scared to make..\nYes, I decided to let it all go.\n\nA few of my close friends said,\n\"Ras, you were doing so well. Don't leave everything.\"\n\nBut deep down, I knew that for me, peace was more important than pressure.\n\nWhat's the point of holding something just because you once created it,\nif it's not contributing to your happiness in the present?\n\nSo I released it all.\nThe name. The work. The identity I had built for years.\n\nIt wasn't easy.\nBut the moment I let go, I felt light.\n\nFree from the weight.\nAlmost like a child again :) no pressure, no roles, no masks.\n\nAnd today, when I look back, I know, it was the wisest decision of my life.\n\nYes, I had to start again from zero.\nBut there's no baggage.\nJust excitement, peace and a comeback that feels like a phoenix rising from the ashes.\n\nSo I ask you:\n👉 What are you still holding on to, just because you once created it?\n👉 What if letting go is the real act of leadership?\n\nBecause when you keep holding things that no longer serve your present,  the energy becomes heavy.\n\nAnd heaviness will always pull you down,\nno matter how high your title or success.\n\nAt some point, you have to choose -\n✨ Peace or Pressure.!!\n\nWe all have that choice. 💫\nWhat's yours?"
    }
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
                        start: "20% bottom",
                        toggleActions: "play none none reset",
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
                        start: "20% bottom",
                        toggleActions: "play none none reset",
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

                /* ── Graphic-style quote card ── */
                .quote-card {
                    position: relative;
                    border-radius: 20px;
                    overflow: hidden;
                    background: linear-gradient(145deg, #6b1414 0%, #9e2626 40%, #c43030 75%, #e05555 100%);
                    border: 1px solid rgba(196, 45, 45, 0.3);
                    box-shadow: 0 20px 60px -15px rgba(100, 10, 10, 0.55);
                    transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);
                }
                .quote-card:hover {
                    box-shadow: 0 28px 70px -12px rgba(80, 20, 20, 0.5);
                    transform: translateY(-3px);
                }
                /* Top shimmer line */
                .quote-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0;
                    width: 100%; height: 2px;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent);
                }
                /* Decorative circle backdrop */
                .quote-card::after {
                    content: '';
                    position: absolute;
                    bottom: -40px; right: -40px;
                    width: 220px; height: 220px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.055);
                    pointer-events: none;
                }
                /* Label badge on quote card */
                .quote-label-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: rgba(255,255,255,0.14);
                    border: 1px solid rgba(255,255,255,0.25);
                    border-radius: 999px;
                    padding: 4px 12px;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.9);
                    backdrop-filter: blur(6px);
                }

                /* Horizontal Carousel Slider */
                .quote-carousel-container {
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                    margin-bottom: 1rem;
                }

                .quote-carousel-track {
                    display: flex;
                    transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
                }

                .quote-slide {
                    flex: 0 0 100%;
                    min-width: 100%;
                    position: relative;
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
                    0%   { opacity: 0; transform: scale(0.97); }
                    100% { opacity: 1; transform: scale(1); }
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
                            className="section-heading font-[var(--font-playfair)] leading-[1.1] font-bold"
                            style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "#1a0e0e" }}
                        >
                            Words That{" "}
                            <span className="italic text-[#c42d2d] font-bold">
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

                    {/* ── Daily Wisdom Quote Card — Graphic Style ── */}
                    <div className="b-card lg:col-span-5 flex">
                        <div className="quote-card w-full flex flex-col p-7 md:p-4 relative overflow-hidden">

                            {/* Large decorative circle glow top-right */}
                            <div
                                className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
                                style={{ background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)" }}
                            />
                            {/* Small accent circle bottom-left */}
                            <div
                                className="absolute bottom-10 -left-8 w-40 h-40 rounded-full pointer-events-none"
                                style={{ background: "radial-gradient(circle, rgba(255,180,180,0.08) 0%, transparent 70%)" }}
                            />
                            {/* Fine cross-hatch decorative lines */}
                            <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
                                backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.5) 0, rgba(255,255,255,0.5) 1px, transparent 0, transparent 50%)",
                                backgroundSize: "14px 14px",
                            }} />

                            <div className="relative z-10 flex flex-col h-full">

                                {/* Top row: label badge + View All link */}
                                <div className="flex items-center justify-between mb-4">
                                    <span className="quote-label-badge font-[var(--font-dm-sans)]">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                                        Daily Wisdom
                                    </span>
                                    <Link 
                                        href="/blog/quotes"
                                        className="text-[10px] font-bold uppercase tracking-[.12em] font-[var(--font-dm-sans)] px-3 py-1.5 rounded-full transition-all duration-300 hover:scale-105"
                                        style={{
                                            color: "#ffffff",
                                            border: "1px solid rgba(255,255,255,0.3)",
                                            background: "rgba(255,255,255,0.1)",
                                        }}
                                    >
                                        View All
                                    </Link>
                                </div>

                                {/* Rotating Graphic Quote Image - Horizontal Carousel */}
                                <div className="quote-carousel-container mb-4">
                                    <div 
                                        className="quote-carousel-track"
                                        style={{
                                            transform: `translateX(-${quoteIndex * 100}%)`,
                                        }}
                                    >
                                        {dailyQuotes.map((q, index) => (
                                            <div key={index} className="quote-slide">
                                                <div className="relative w-full h-[390px] aspect-square rounded-lg overflow-hidden shadow-md">
                                                    <Image
                                                        src={q.image}
                                                        alt="Daily wisdom graphic"
                                                        fill
                                                        className="object-cover"
                                                        sizes="300px"
                                                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Divider */}
                                {/* <div className="mb-1" style={{ height: "1px", background: "linear-gradient(90deg, rgba(255,255,255,0.4), transparent)" }} /> */}

                                {/* Quote text — the centrepiece */}
                                {/* <blockquote
                                    key={quoteIndex}
                                    className="font-[var(--font-playfair)] leading-[1.3] quote-fade-enter mb-4"
                                    style={{ fontSize: "clamp(14px, 1.8vw, 18px)", color: "#ffffff", fontStyle: "italic", textShadow: "0 2px 20px rgba(0,0,0,0.25)" }}
                                >
                                    {quote.text}
                                </blockquote> */}

                                {/* Thin accent divider */}
                                {/* <div className="mt-auto" style={{ height: "1px", background: "linear-gradient(90deg, rgba(255,255,255,0.4), transparent)" }} /> */}

                                {/* Author row + nav arrows */}
                                <div className="flex items-center justify-between mt-">
                                    <div>
                                        <p className="text-[12px] font-[var(--font-dm-sans)] font-bold tracking-wide" style={{ color: "rgba(255,255,255,0.95)" }}>
                                            — {quote.author}
                                        </p>
                                        {/* <p className="text-[9px] font-[var(--font-dm-sans)] uppercase tracking-[.22em] mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                                            {quote.label}
                                        </p> */}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setQuoteIndex((prev) => (prev - 1 + dailyQuotes.length) % dailyQuotes.length)}
                                            className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/20"
                                            style={{ border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.1)" }}
                                        >
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round">
                                                <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => setQuoteIndex((prev) => (prev + 1) % dailyQuotes.length)}
                                            className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/20"
                                            style={{ border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.1)" }}
                                        >
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round">
                                                <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Progress dots */}
                                <div className="flex gap-1.5 mt-3">
                                    {dailyQuotes.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setQuoteIndex(i)}
                                            className="h-[2px] flex-1 rounded-full transition-all duration-500"
                                            style={{ background: i === quoteIndex ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.25)" }}
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
                                    style={{ color: "#3d2010" }}
                                >
                                    {blog.excerpt}
                                </p>

                                <div className="decor-line mb-3" />

                                <Link href={`/blog/${blog.id}`} className="read-arrow font-[var(--font-dm-sans)]">
                                    Read Article
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                        <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                                    </svg>
                                </Link>
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
                            className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-[var(--font-outfit)] font-bold text-[11px] uppercase tracking-[0.12em] transition-all duration-300 hover:scale-105"
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
                            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-[var(--font-outfit)] font-bold text-[11px] uppercase tracking-[0.12em] transition-all duration-300 hover:scale-105"
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
