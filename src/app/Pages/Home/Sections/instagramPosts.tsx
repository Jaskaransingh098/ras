"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function InstagramPosts() {
    const sectionRef = useRef<HTMLElement>(null);
    const [igPosts, setIgPosts] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/instagram")
            .then((res) => res.json())
            .then((data) => {
                if (data.posts) setIgPosts(data.posts);
            });
    }, []);

    useEffect(() => {
        const s = sectionRef.current;
        if (!s) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(
                s.querySelectorAll(".ig-reveal"),
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: s,
                        start: "20% bottom",
                        toggleActions: "play none none reset",
                    },
                }
            );
        }, s);
        return () => ctx.revert();
    }, []);

    if (!igPosts.length) return null;

    // Show up to 5 posts in a single row
    const displayPosts = igPosts.slice(0, 5);

    return (
        <section
            ref={sectionRef}
            className="relative py-8 md:py-12 overflow-hidden"
            style={{
                background: "linear-gradient(160deg, #fdf8f4 0%, #fef5ef 60%, #fdf0e8 100%)",
            }}
        >
            <style jsx>{`
                .ig-post-card {
                    position: relative;
                    border-radius: 16px;
                    overflow: hidden;
                    background: rgba(255,255,255,0.8);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(220, 180, 160, 0.2);
                    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
                }
                .ig-post-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 16px 40px -8px rgba(80, 20, 20, 0.12);
                    border-color: rgba(196, 45, 45, 0.15);
                }
            `}</style>

            <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-12 w-full">
                {/* Header */}
                <div className="ig-reveal flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-[14px] font-bold font-[var(--font-dm-sans)] text-[#1a0e0e]">
                                @beyondimagination.club
                            </p>
                            <p className="text-[11px] font-[var(--font-dm-sans)] text-[#b08070]">
                                Latest Posts
                            </p>
                        </div>
                    </div>
                    <a
                        href="https://www.instagram.com/beyondimagination.club/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[.1em] font-[var(--font-outfit)] transition-all duration-300 hover:scale-105"
                        style={{
                            background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                            color: "#fff",
                            boxShadow: "0 4px 16px -4px rgba(220,39,67,0.3)",
                        }}
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                        </svg>
                        Follow
                    </a>
                </div>

                {/* Single row of 5 posts */}
                <div className="ig-reveal grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
                    {displayPosts.map((post) => (
                        <a
                            key={post.id}
                            href={post.permalink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ig-post-card block group"
                        >
                            <div
                                className="w-full aspect-square"
                                style={{
                                    background: `url(${post.mediaUrl}) center/contain no-repeat`,
                                }}
                            />
                            <div className="p-2.5">
                                <p className="text-[10px] line-clamp-2 text-[#6a4a3a] font-[var(--font-dm-sans)] leading-snug">
                                    {post.caption}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
