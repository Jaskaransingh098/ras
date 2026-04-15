"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const allGraphicQuotes = [
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

export default function AllQuotesPage() {
    const pageRef = useRef<HTMLDivElement>(null);
    const [selectedQuote, setSelectedQuote] = useState<typeof allGraphicQuotes[0] | null>(null);

    const downloadImage = async (src: string, alt: string) => {
        try {
            const response = await fetch(src);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${alt.replace(/\s+/g, '-').toLowerCase()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    useEffect(() => {
        if (!pageRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".quote-item",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: pageRef.current,
                        start: "20% bottom",
                        toggleActions: "play none none reset",
                    },
                }
            );

            gsap.fromTo(
                ".page-header",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                }
            );
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={pageRef} className="min-h-screen bg-gradient-to-b from-[#fdf8f4] to-[#fef5ef]">
            <style jsx>{`
                .modal-backdrop {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(4px);
                    z-index: 40;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.3s ease-out;
                }

                .modal-image {
                    position: relative;
                    max-width: 90vw;
                    max-height: 90vh;
                    animation: scaleIn 0.3s ease-out;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .quote-item {
                    position: relative;
                    border-radius: 16px;
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
                }

                .quote-item:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 24px 48px -12px rgba(80, 20, 20, 0.2);
                }

                .quote-item-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(196, 45, 45, 0.1) 0%, transparent 100%);
                    opacity: 0;
                    transition: opacity 0.3s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .quote-item:hover .quote-item-overlay {
                    opacity: 1;
                }

                .zoom-icon {
                    width: 48px;
                    height: 48px;
                    background: rgba(255, 255, 255, 0.95);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #c42d2d;
                    font-weight: bold;
                    font-size: 24px;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .zoom-icon:hover {
                    background: rgba(255, 255, 255, 1);
                    transform: scale(1.1);
                }
            `}</style>

            {/* Header */}
            <div className="relative pt-12 pb-8">
                {/* Gradient background elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#c42d2d]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -top-20 left-0 w-80 h-80 bg-gradient-to-br from-[#e85d5d]/3 to-transparent rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <Link href="/#blog" className="inline-flex items-center gap-2 text-[#c42d2d] hover:text-[#a01f1f] transition-colors mb-6">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
                        </svg>
                        <span className="text-sm font-semibold font-[var(--font-dm-sans)]">Back to Blog</span>
                    </Link>

                    <div className="page-header">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-[2px] rounded-full bg-gradient-to-r from-[#c42d2d] to-[#e85d5d]" />
                            <p className="text-[10px] md:text-sm uppercase tracking-[.3em] text-[#c42d2d] font-bold font-[var(--font-dm-sans)]">
                                Visual Wisdom
                            </p>
                        </div>

                        <h1 className="text-[36px] md:text-[52px] font-[var(--font-playfair)] font-bold text-[#1a0e0e] leading-[1.1] mb-4">
                            All Graphic<br className="hidden md:block" />
                            <span className="italic text-[#c42d2d]">Quotes</span>
                        </h1>

                        <p className="text-[16px] md:text-[18px] text-[#6a4a3a] max-w-2xl leading-relaxed font-[var(--font-dm-sans)]">
                            A curated collection of transformation wisdom, designed to elevate your energy and shift your perspective.
                        </p>
                    </div>
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allGraphicQuotes.map((quote) => (
                        <div
                            key={quote.id}
                            className="quote-item group relative w-full aspect-square rounded-[16px] overflow-hidden shadow-md bg-white"
                        >
                            <Image
                                src={quote.src}
                                alt={quote.alt}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="400px"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                            />

                            <div className="quote-item-overlay">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setSelectedQuote(quote)}
                                        className="zoom-icon"
                                        title="View full size"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => downloadImage(quote.src, quote.alt)}
                                        className="zoom-icon"
                                        title="Download"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="7 10 12 15 17 10" />
                                            <line x1="12" y1="15" x2="12" y2="3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedQuote && (
                <div
                    className="modal-backdrop"
                    onClick={() => setSelectedQuote(null)}
                >
                    <div className="modal-image" onClick={(e) => e.stopPropagation()}>
                        <Image
                            src={selectedQuote.src}
                            alt={selectedQuote.alt}
                            width={800}
                            height={800}
                            className="object-contain rounded-lg"
                            sizes="90vw"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />

                        {/* Download button */}
                        <button
                            onClick={() => downloadImage(selectedQuote.src, selectedQuote.alt)}
                            className="absolute bottom-4 left-4 bg-white hover:bg-[#c42d2d] text-[#c42d2d] hover:text-white px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 flex items-center gap-2 shadow-lg"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Download
                        </button>

                        {/* Close button */}
                        <button
                            onClick={() => setSelectedQuote(null)}
                            className="absolute -top-10 -right-10 text-white hover:text-[#c42d2d] transition-colors"
                        >
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
