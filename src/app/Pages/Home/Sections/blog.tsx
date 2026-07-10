"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
gsap.registerPlugin(ScrollTrigger);

const blogs = [
    {
        id: 1,
        title: "But You Create Miracles For Others... How Can You Feel Low?",
        excerpt:
            "Every coach, healer and leader carries silent pain. But here's the truth: the healer also needs healing.",
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

export default function Blog() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(
                section.querySelectorAll(".b-card"),
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
                    scrollTrigger: { trigger: section, start: "20% bottom", toggleActions: "play none none reset" },
                }
            );
        }, section);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} className="relative overflow-hidden">
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
            `}</style>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {blogs.map((blog, i) => (
                    <div key={i} className="b-card">
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

            {/* Bottom CTA */}
            <div className="mt-6 flex items-center justify-center gap-3">
                <a href="#"
                    className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-[var(--font-outfit)] font-bold text-[11px] uppercase tracking-[0.12em] transition-all duration-300 hover:scale-105"
                    style={{ background: "linear-gradient(135deg, #c42d2d, #9b1c1c)", color: "#fff", boxShadow: "0 10px 28px -8px rgba(196,45,45,0.3)" }}
                >
                    View All Articles
                    <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                    </svg>
                </a>
            </div>
        </div>
    );
}
