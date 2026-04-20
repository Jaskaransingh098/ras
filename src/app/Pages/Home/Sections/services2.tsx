"use client";

import { useState, useRef } from 'react';


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
        extra: null
        
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
        )
       
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
        extra: null
     
    }
];

// const METEORS = [
//     { top: '-80px',  right: '5%',   delay: '0s',    duration: '1.2s' },
//     { top: '-50px',  right: '22%',  delay: '0.45s', duration: '1.5s' },
//     { top: '-100px', right: '40%',  delay: '0.8s',  duration: '1.0s' },
//     { top: '5%',     right: '12%',  delay: '0.2s',  duration: '1.4s' },
//     { top: '12%',    right: '50%',  delay: '0.65s', duration: '1.3s' },
//     { top: '-30px',  right: '62%',  delay: '1.05s', duration: '1.6s' },
//     { top: '20%',    right: '30%',  delay: '0.3s',  duration: '1.1s' },
//     { top: '-60px',  right: '75%',  delay: '0.75s', duration: '1.45s'},
// ];



/* ════════════════════════════════════════════════
   NEW DESIGN  –  Editorial / Magazine layout
   (matches reference image 1)
════════════════════════════════════════════════ */
interface Sparkle {
    id: number;
    x: number;
    y: number;
    delay: number;
    duration: number;
    size: number;
    cardIndex: number;
    xOffset: number;
}

export default function Services() {
    const [sparkles, setSparkles] = useState<Sparkle[]>([]);
    const sparkleIdRef = useRef(0);

    const createSparkles = (cardIndex: number) => {
        const newSparkles: Sparkle[] = [];
        const count = 50; // Optimized count for mobile + desktop smoothness
        
        for (let i = 0; i < count; i++) {
            newSparkles.push({
                id: sparkleIdRef.current++,
                x: 10 + Math.random() * 80,
                y: 75 + Math.random() * 25,
                delay: Math.random() * 0.4,
                duration: 2 + Math.random() * 1.5,
                size: 6 + Math.random() * 10,
                cardIndex,
                xOffset: (Math.random() - 0.5) * 80
            });
        }
        
        setSparkles(prev => [...prev, ...newSparkles]);
        
        // Cleanup sparkles after the longest animation completes
        setTimeout(() => {
            setSparkles(prev => prev.filter(s => !newSparkles.find(ns => ns.id === s.id)));
        }, 4500);
    };
return (
        <section className="min-h-[98dvh] bg-gradient-to-b from-[#8a0a0a] to-[#4a0e0e] relative overflow-hidden flex flex-col justify-center py-16">
            <style jsx>{`
                @keyframes borderRotate {
                    0% { --angle: 0deg; }
                    100% { --angle: 360deg; }
               }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-8px); }
               
               }
                @keyframes shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
             
               }
                @keyframes glow-pulse {
                    0%, 100% { opacity: 0.4; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.15); }
              
               }
                @keyframes orb-drift {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(15px, -10px) scale(1.05); }
                    66% { transform: translate(-10px, 8px) scale(0.95); }
                
               }

                @keyframes sparkleFloat {
                    0% {
                        opacity: 0;
                        transform: translate3d(0, 0, 0) scale(0);
                    }
                    10% {
                        opacity: 1;
                        transform: translate3d(var(--x-offset, 0), -20px, 0) scale(1);
                    }
                    90% {
                        opacity: 1;
                        transform: translate3d(var(--x-offset, 0), -350px, 0) scale(0.7);
                    }
                    100% {
                        opacity: 0;
                        transform: translate3d(var(--x-offset, 0), -400px, 0) scale(0);
                    }
                }

                .sparkle {
                    position: absolute;
                    pointer-events: none;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23ffeb3b' d='M50 0 L62 38 L100 50 L62 62 L50 100 L38 62 L0 50 L38 38 Z'/%3E%3C/svg%3E");
                    background-size: contain;
                    background-repeat: no-repeat;
                    z-index: 100;
                    animation-name: sparkleFloat;
                    will-change: transform, opacity;
                    backface-visibility: hidden;
                }
                
                .service-card {
                    position: relative;
                    border-radius: 24px;
                    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
            
               }
                .service-card::before {
                    content: '';
                    position: absolute;
                    inset: -1px;
                    border-radius: 25px;
                    padding: 1.5px;
                    background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent 40%, transparent 60%, rgba(255,255,255,0.1));
                    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                    pointer-events: none;
                    transition: opacity 0.5s;
               
               }
                .service-card:hover::before {
                    background: linear-gradient(135deg, rgba(196,45,45,0.5), transparent 40%, transparent 60%, rgba(232,93,93,0.4));
                
               }
                .card-glow {
                    position: absolute;
                    bottom: -30%;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 80%;
                    height: 50%;
                    border-radius: 50%;
                    filter: blur(40px);
                    opacity: 0;
                    transition: opacity 0.5s;
                    pointer-events: none;
                }
                .service-card:hover .card-glow {
                    opacity: 0.3;
                }
                .icon-ring {
                    position: relative;
           
               }
                .icon-ring::after {
                    content: '';
                    position: absolute;
                    inset: -4px;
                    border-radius: 16px;
                    border: 1.5px dashed;
                    opacity: 0;
                    transition: all 0.4s;
                    animation: glow-pulse 3s ease-in-out infinite;
           
               }
                .service-card:hover .icon-ring::after {
                    opacity: 0.4;
         
               }
                .shine-btn {
                    position: relative;
          
                   overflow: hidden;
                    
               }
                .shine-btn::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 60%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: left 0.6s;
                }
                .shine-btn:hover::after {
                    left: 120%;
                }
                .icon-ring-red::after {
                    border-color: #c42d2d;
               
               }
                .floating-orb {
                    animation: orb-drift 8s ease-in-out infinite;
               
               }
                .feature-chip {
                    backdrop-filter: blur(8px);
                    transition: all 0.3s;
               
               }
                .feature-chip:hover {
                    transform: translateY(-1px);
             
               }
                /* === Shooting-star / meteor animation === */
                .meteor {
                    position: absolute;
                    /* tall needle = long tail */
                    width: 2px;
                    height: 120px;
                    border-radius: 9999px;
                    /* tail fades from transparent (back) → bright white head (front) */
                    background: linear-gradient(
                        to bottom,
                        transparent 0%,
                        rgba(196,45,45,0.15) 35%,
                        rgba(255,160,160,0.7) 75%,
                        rgba(255,255,255,0.95) 100%
                    );
                    /* soft glow around the head */
                    filter: drop-shadow(0 4px 6px rgba(255,120,120,0.9))
                            drop-shadow(0 6px 14px rgba(196,45,45,0.6));
                    /* tilt -45° so the streak points top-right → bottom-left */
                    transform: rotate(-45deg) translateY(-100%);
                    opacity: 0;
                    pointer-events: none;
                }
                .service-card:hover .meteor {
                    animation: shoot var(--dur, 1.4s) linear var(--delay, 0s) infinite;
                }
                @keyframes shoot {
                    /* translateY in the -45° rotated frame moves bottom-left in world space */
                    0%   { transform: rotate(-45deg) translateY(-100%); opacity: 0; }
                    6%   { opacity: 1; }
                    88%  { opacity: 0.85; }
                    100% { transform: rotate(-45deg) translateY(700px);  opacity: 0; }
                }
               
           `}</style>

            {/* Animated background orbs */}
            {/* <div className="absolute top-[10%] right-[15%] w-[300px] h-[300px] bg-[#c42d2d]/10 rounded-full blur-[100px] floating-orb pointer-events-none" />
            <div className="absolute bottom-[15%] left-[10%] w-[250px] h-[250px] bg-[#e85d5d]/8 rounded-full blur-[80px] floating-orb pointer-events-none" style={{ animationDelay: '-3s' }} /> */}
            {/* <div className="absolute top-[50%] left-[50%] w-[400px] h-[400px] bg-white/[0.015] rounded-full blur-[120px] floating-orb pointer-events-none" style={{ animationDelay: '-5s' }} /> */}
            {/* Decorative compass top-right */}
           
            {/* <div className="max-w-8xl mx-auto px-6 md:px-12 w-full pt-8 pb-10"> */}

            {/* Large watermark text */}
            {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <span className="text-[140px] md:text-[220px] font-[var(--font-playfair)] font-bold text-white/[0.025] tracking-tight whitespace-nowrap select-none">
                    SHIFT
                </span>
            </div> */}

            {/* Corner decorative texts */}
            {/* <div className="absolute top-8 left-8 md:left-12 pointer-events-none">
                <p className="text-white/15 text-[10px] uppercase tracking-[.4em] font-medium font-[var(--font-dm-sans)]">Energy &middot; Frequency &middot; Transformation</p>
            </div> */}
            {/* <div className="absolute top-8 right-8 md:right-12 pointer-events-none text-right">
                <p className="text-white/70 text-[64px] md:text-[80px] font-[var(--font-playfair)] font-bold leading-none">03</p>
                <p className="text-white/70 text-[9px] uppercase tracking-[.3em] mt-1">Ways to begin</p>
            </div> */}
            {/* <div className="absolute bottom-8 left-8 md:left-12 pointer-events-none">
                <p className="text-white/10 text-[11px] italic font-[var(--font-playfair)] max-w-[180px] leading-relaxed">
                    &ldquo;The shift happens when you stop trying to fix — and allow transformation.&rdquo;
                </p>
            </div> */}

            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
                {/* Section header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
                {/* ── Original section header ── */}
                {/* <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-5"> */}
<div className="max-w-lg">
                        <div className="flex items-center gap-3 mb-3">
                        {/* <div className="flex items-center gap-3 mb-2"> */}
<div className="w-8 h-[2px] rounded-full bg-gradient-to-r from-[#c42d2d] to-[#e85d5d]" />
<p className="text-[10px] md:text-sm uppercase tracking-[.3em] text-white font-medium font-[var(--font-dm-sans)]">
Services
</p>
</div>
                        <h2 className="text-[28px] md:text-[42px] font-[var(--font-playfair)] text-white leading-[1.15]">
                        {/* <h2 className="text-[22px] md:text-[34px] font-[var(--font-playfair)] text-white leading-[1.15]"> */}
Shift the One Thing That{' '}
<span className="italic text-white">Changes Everything</span>
</h2>
</div>
                    <p className="text-white/90 text-[16px] md:text-[18px] max-w-[400px] mt-3 md:mt-0 leading-relaxed md:text-right">
                       Most people come to me after trying everything…<br/>
when effort hasn't matched results and something still feels stuck.
                   
</p>
</div>

                {/* 3 Service cards generated from array */}
                <div className="grid md:grid-cols-3 gap-5 md:gap-6">
                    {servicesData.map((svc, index) => (
                        <div key={index} className="service-card group bg-white/95 backdrop-blur-xl flex flex-col relative" style={{ borderRadius: '24px' }}>
                            <div className="card-glow bg-[#c42d2d]" />
                            <div className="absolute inset-0 overflow-hidden rounded-[24px] pointer-events-none z-30">
                                {/* {METEORS.map((m, i) => (
                                    <div
                                        key={i}
                                        className="meteor"
                                        style={{
                                            top: m.top,
                                            right: m.right,
                                            ['--delay' as string]: m.delay,
                                            ['--dur' as string]: m.duration,
                                        }}
                                    />
                                ))} */}

                                {/* Sparkles Container - Individual for each card */}
                                {sparkles.filter(s => s.cardIndex === index).map((sparkle) => (
                                    <div
                                        key={sparkle.id}
                                        className="sparkle"
                                        style={{
                                            left: `${sparkle.x}%`,
                                            top: `${sparkle.y}%`,
                                            width: `${sparkle.size}px`,
                                            height: `${sparkle.size}px`,
                                            animationDuration: `${sparkle.duration}s`,
                                            animationDelay: `${sparkle.delay}s`,
                                            animationTimingFunction: 'ease-out',
                                            animationFillMode: 'forwards',
                                            '--x-offset': `${sparkle.xOffset}px`
                                        } as React.CSSProperties}
                                    />
                                ))}
                            </div>
               

                            {/* Top accent line */}
                            <div className="h-[3px] rounded-t-3xl bg-gradient-to-r from-transparent via-[#c42d2d] to-transparent opacity-80" />
             

                            <div className="p-6 md:p-7 flex-1 flex flex-col relative z-10">
                                {/* Icon & Badge */}
                                <div className="flex items-start justify-between mb-5">
                                    <div className="icon-ring icon-ring-red w-14 h-14 rounded-2xl bg-gradient-to-br from-[#c42d2d]/10 to-[#c42d2d]/5 border border-[#c42d2d]/15 flex items-center justify-center group-hover:from-[#c42d2d]/20 group-hover:to-[#c42d2d]/10 transition-all duration-500 z-10 bg-white">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c42d2d" strokeWidth="1.8" strokeLinecap="round" className="transition-transform duration-500 group-hover:scale-110">
                                            {svc.iconSVG}
                                        </svg>
                                    </div>
                                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#c42d2d]/10 to-[#c42d2d]/5 text-[#c42d2d] text-[9px] font-bold uppercase tracking-wider rounded-full px-3 py-1 border border-[#c42d2d]/15 shadow-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#c42d2d] animate-pulse" />
                                        {svc.badge}
                                    </span>
                                </div>
                {/* ── Service rows ── */}
               

                                {/* Title */}
                                <h3 className="text-[20px] md:text-[24px] font-[var(--font-playfair)]  text-center text-[#111] font-bold leading-tight mb-7">
                                    {svc.title}
                                </h3>
                                <p className="text-[#333] text-center text-[19px] leading-[1.3] mb-7 font-semibold font-[var(--font-playfair)]">
                                    {svc.p1}
                                </p>
                                <p className="text-gray-900 text-[15px] leading-[1.7] flex-1 font-style: italic text-center">
                                    {svc.p2}
                                </p>
                       

                                {svc.extra}
                        {/* Tags column */}
                     

                                {/* Divider with decorative dots */}
                                <div className="flex items-center gap-2 my-5">
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                                    <div className="flex gap-1">
                                        <div className="w-1 h-1 rounded-full bg-[#c42d2d]/30" />
                                        <div className="w-1 h-1 rounded-full bg-[#c42d2d]/20" />
                                        <div className="w-1 h-1 rounded-full bg-[#c42d2d]/10" />
                                    </div>
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                                </div>
                        {/* Description */}
                        {/* <p className="svc-row-desc">{svc.p1}&nbsp;{svc.p2}</p> */}

                                {/* Footer */}
                                <div className="flex items-center justify-center mt-auto">
                                    {svc.btnText === "Book Call" ? (
                                        <button 
                                            onClick={() => createSparkles(index)}
                                            className="shine-btn inline-flex items-center gap-2 bg-gradient-to-r from-[#c42d2d] to-[#b02525] text-white px-5 py-2.5 rounded-full text-[11px] font-bold font-[var(--font-outfit)] shadow-lg shadow-[#c42d2d]/25 hover:shadow-xl hover:shadow-[#c42d2d]/35 transition-all duration-300 group/btn relative z-20"
                                        >
                                            {svc.btnText}
                                            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                                                <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    ) : (
                                        <a 
                                            href={svc.btnLink} 
                                            onClick={(e) => {
                                                if (svc.btnLink === "#") {
                                                    e.preventDefault();
                                                    createSparkles(index);
                                                }
                                            }}
                                            className="shine-btn inline-flex items-center gap-2 bg-gradient-to-r from-[#c42d2d] to-[#b02525] text-white px-5 py-2.5 rounded-full text-[11px] font-bold font-[var(--font-outfit)] shadow-lg shadow-[#c42d2d]/25 hover:shadow-xl hover:shadow-[#c42d2d]/35 transition-all duration-300 group/btn relative z-20"
                                        >
                                            {svc.btnText}
                                            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                                                <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                                            </svg>
                                        </a>
                                    )}
                                    {/* <span className="text-[#c42d2d]/40 text-[42px] font-[var(--font-playfair)] font-bold leading-none group-hover:text-[#c42d2d]/20 transition-colors duration-500">
                                        {svc.number}
                                    </span> */}
                                </div>
                            </div>
                        {/* Image / visual */}
                       
</div>
                    ))}
                   
</div>
            </div>


               <div className="mt-10 text-center">
                    <div className="inline-flex items-center gap-3 bg-white/[0.08] backdrop-blur-2xl rounded-full px-6 py-3.5 border border-white/10 shadow-xl shadow-black/30 hover:bg-white/[0.12] transition-all duration-300 group">
                        <div className="w-2 h-2 rounded-full bg-white/90 animate-pulse flex-shrink-0" />
                        <p className="text-white/90 text-[20px]">
                            Not sure where to begin?{' '}
                            <a 
                                href="#" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    // Trigger sparkles on the first card (Revenue Energetics) as a sample
                                    createSparkles(0); 
                                }}
                                className="text-white font-bold font-[var(--font-outfit)] hover:text-[#e85d5d] transition-colors duration-300 underline decoration-white/20 underline-offset-2 hover:decoration-[#e85d5d]/50"
                            >
                                The Energy Diagnostic Call&trade;
                            </a>{' '}
                            is the easiest first step.
                        </p>
                    </div>
                </div>

            {/* Bottom-right decorative text */}
            {/* <div className="absolute bottom-8 right-8 md:right-12 pointer-events-none text-right">
                <p className="text-white/8 text-[11px] uppercase tracking-[.5em]">Raseshvari Hindustani</p>
            </div> */}


</section>
);
}