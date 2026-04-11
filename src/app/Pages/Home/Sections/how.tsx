"use client";

import { useEffect, useRef, useState, RefObject, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface Props {
    scrollRef: RefObject<HTMLElement | null>;
}

export default function How({ scrollRef }: Props) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState("0:00");
    const [duration, setDuration] = useState("0:00");
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    const togglePlay = useCallback(() => {
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) { v.play(); setIsPlaying(true); }
        else { v.pause(); setIsPlaying(false); }
    }, []);

    const toggleMute = useCallback(() => {
        const v = videoRef.current;
        if (!v) return;
        v.muted = !v.muted;
        setIsMuted(v.muted);
    }, []);

    const toggleFullscreen = useCallback(() => {
        const container = sectionRef.current?.querySelector(".video-container") as HTMLElement;
        if (!container) return;
        if (!document.fullscreenElement) { container.requestFullscreen(); setIsFullscreen(true); }
        else { document.exitFullscreen(); setIsFullscreen(false); }
    }, []);

    const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const v = videoRef.current;
        const bar = progressRef.current;
        if (!v || !bar) return;
        const rect = bar.getBoundingClientRect();
        v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration;
    }, []);

    const handleMouseMove = useCallback(() => {
        setShowControls(true);
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        hideTimerRef.current = setTimeout(() => { if (isPlaying) setShowControls(false); }, 3000);
    }, [isPlaying]);

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        const onTime = () => { setProgress((v.currentTime / v.duration) * 100); setCurrentTime(formatTime(v.currentTime)); };
        const onMeta = () => setDuration(formatTime(v.duration));
        const onEnded = () => { setIsPlaying(false); setShowControls(true); };
        v.addEventListener("timeupdate", onTime);
        v.addEventListener("loadedmetadata", onMeta);
        v.addEventListener("ended", onEnded);
        return () => { v.removeEventListener("timeupdate", onTime); v.removeEventListener("loadedmetadata", onMeta); v.removeEventListener("ended", onEnded); };
    }, []);

    useEffect(() => {
        const s = sectionRef.current;
        if (!s) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(s.querySelectorAll(".hw"), { y: 40, opacity: 0 }, {
                y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out",
                scrollTrigger: { trigger: s, start: "20% bottom", toggleActions: "play none none reset" },
            });
        }, s);
        return () => ctx.revert();
    }, []);

    // const steps = [
    //     { num: "01", title: "Book a Call", desc: "Schedule your free diagnostic session" },
    //     { num: "02", title: "Energy Shift", desc: "Experience the transformation live" },
    //     { num: "03", title: "New Reality", desc: "Watch your life transform rapidly" },
    // ];

    return (
        <section ref={sectionRef} className="py-14 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* ── TOP ROW: Header + Steps ── */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10">
                    {/* Left: Header */}
                    <div className="hw">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-1 rounded-full bg-[#c42d2d]" />
                            <p className="text-sm uppercase tracking-[.2em] text-[#c42d2d] font-semibold font-[var(--font-dm-sans)]">
                                The science behind it
                            </p>
                        </div>
                        <h2 className="section-heading text-[28px] md:text-[42px] font-[var(--font-playfair)] font-semibold text-[#111] leading-[0.9]">
                            How it
                            <span className="italic text-[#c42d2d] pl-2 font-bold">Works</span>
                        </h2>
                    </div>

                    {/* Right: 3 Steps */}
                    {/* <div className="hw flex gap-6 md:gap-10">
                        {steps.map((step) => (
                            <div key={step.num} className="flex items-start gap-3">
                                <span className="text-[28px] font-[var(--font-playfair)] text-[#c42d2d] font-bold leading-none">
                                    {step.num}
                                </span>
                                <div>
                                    <p className="text-[#111] text-sm font-bold leading-tight font-[var(--font-dm-sans)]">{step.title}</p>
                                    <p className="text-gray-400 text-xs mt-0.5 font-[var(--font-dm-sans)]">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div> */}
                </div>

                {/* ── VIDEO PLAYER ── */}
                <div className="hw">
                    <div
                        className="video-container relative rounded-2xl overflow-hidden shadow-2xl bg-black group cursor-pointer border border-gray-800/50"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => { if (isPlaying) setShowControls(false); }}
                    >
                        {/* 16:9 ratio */}
                        <div className="relative w-full" style={{ paddingBottom: "42.85%" }}>
                            <video
                                ref={videoRef}
                                className="absolute inset-0 w-full h-full object-cover"
                                playsInline
                                muted={isMuted}
                                preload="metadata"
                                poster="/home/video-poster.jpg"
                            >
                                <source src="/home/how-it-works.mp4" type="video/mp4" />
                            </video>

                            {/* Big play overlay */}
                            {!isPlaying && (
                                <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/30" onClick={togglePlay}>
                                    <div className="w-18 h-18 md:w-20 md:h-20 rounded-full bg-[#c42d2d] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 ring-4 ring-white/20"
                                        style={{ width: "72px", height: "72px" }}>
                                        <svg width="24" height="28" viewBox="0 0 18 20" fill="none" className="ml-1">
                                            <path d="M0 0L18 10L0 20V0Z" fill="white" />
                                        </svg>
                                    </div>
                                </div>
                            )}

                            {isPlaying && <div className="absolute inset-0 z-10" onClick={togglePlay} />}

                            {/* Controls */}
                            <div className={`absolute bottom-0 left-0 right-0 z-30 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                                <div className="bg-gradient-to-t from-black/80 via-black/30 to-transparent pt-12 pb-4 px-5 md:px-6">
                                    {/* Progress */}
                                    <div
                                        ref={progressRef}
                                        className="w-full h-1 bg-white/20 rounded-full cursor-pointer mb-3 group/prog hover:h-2 transition-all"
                                        onClick={handleProgressClick}
                                    >
                                        <div className="h-full bg-[#c42d2d] rounded-full relative" style={{ width: `${progress}%` }}>
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md opacity-0 group-hover/prog:opacity-100 transition-opacity" />
                                        </div>
                                    </div>

                                    {/* Bottom row */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <button onClick={togglePlay} className="text-white hover:text-white/80 transition-colors">
                                                {isPlaying ? (
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
                                                ) : (
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M5 3L19 12L5 21V3Z" /></svg>
                                                )}
                                            </button>
                                            <button onClick={toggleMute} className="text-white hover:text-white/80 transition-colors">
                                                {isMuted ? (
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
                                                ) : (
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>
                                                )}
                                            </button>
                                            <span className="text-white/60 text-[11px] font-medium tabular-nums">{currentTime} / {duration}</span>
                                        </div>
                                        <button onClick={toggleFullscreen} className="text-white hover:text-white/80 transition-colors">
                                            {isFullscreen ? (
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M8 3v3a2 2 0 0 1-2 2H3" /><path d="M21 8h-3a2 2 0 0 1-2-2V3" /><path d="M3 16h3a2 2 0 0 1 2 2v3" /><path d="M16 21v-3a2 2 0 0 1 2-2h3" /></svg>
                                            ) : (
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M8 3H5a2 2 0 0 0-2 2v3" /><path d="M21 8V5a2 2 0 0 0-2-2h-3" /><path d="M3 16v3a2 2 0 0 0 2 2h3" /><path d="M16 21h3a2 2 0 0 0 2-2v-3" /></svg>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── BOTTOM ROW: Caption + CTA ── */}
                <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hw">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#c42d2d] animate-pulse" />
                        <p className="text-gray-800 text-xl font-[var(--font-dm-sans)] italic text-base font-semibold">
                            One session, one shift, ultimate unlimited possibilities
                        </p>
                    </div>
                    {/* <button className="flex items-center gap-2 bg-[#c42d2d] text-white px-6 py-2.5 rounded-full text-sm font-bold font-[var(--font-outfit)] shadow-lg shadow-[#c42d2d]/20 hover:bg-[#a82525] transition-all">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        Book Your Session
                    </button> */}
                </div>
            </div>
        </section>
    );
}
