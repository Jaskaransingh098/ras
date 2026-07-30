"use client";

import Link from 'next/link';


/* ─── DATA (unchanged) ─── */
const servicesData = [
     {
        badge: "Paid Diagnostic",
        title: "Energy Diagnostic Call",
        p1: "A paid energy diagnostic call to understand what's really happening beneath the surface.",
        p2: "You receive a clear energetic roadmap showing what blocks are draining you, what needs to shift and your next step toward your goals.",
        iconSVG: "/services/Energy-diagnostic.png",
        btnText: "Book Call",
        btnLink: "#",
        number: "01",
        extra: (
            <div className="flex flex-wrap gap-2 flex-1 mt-3">
                {['Energy Roadmap', 'Block Identification', 'Online Session'].map((f) => (
                    <span key={f} className="feature-chip text-[9px] uppercase tracking-wider text-[#c42d2d] bg-white/70 border border-[#c42d2d]/20 rounded-full px-3 py-1 font-semibold font-[var(--font-dm-sans)] h-fit shadow-sm">
                        {f}
                    </span>
                ))}
            </div>
        )

    },
    {
        badge: "Signature",
        title: "Revenue Energetic",
        p1: "One powerful online session that shifts what strategy, effort and coaching couldn't.",
        p2: "This isn't healing the way you think it is, it's a deeper energy transformation, a shift in your frequency that creates visible change in one session.",
        iconSVG: "/services/Revenue-energetic.png",
        btnText: "Explore",
        btnLink: "#",
        number: "02",
        extra: null

    },
    {
        badge: "Quiz",
        title: "Energy Score Quiz",
        p1: "A quick, intuitive check-in to see where your energy is dropping right now.",
        p2: "This is not a medical diagnosis, it's a gentle mirror to the hidden energetic patterns your mind may overlook. See what's truly happening beneath the surface.",
        iconSVG: "/services/Energy-score.png",
        btnText: "Take the Quiz",
        btnLink: "#",
        number: "03",
        extra: null

    }
];


export default function Services() {
    return (
        <section className="min-h-auto md:min-h-[98dvh] bg-gradient-to-b from-[#8a0a0a] to-[#4a0e0e] relative overflow-hidden flex flex-col justify-center py-10 md:py-16">
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
            //     @keyframes glow-pulse {
            //         0%, 100% { opacity: 0.4; transform: scale(1); }
            //         50% { opacity: 0.8; transform: scale(1.15); }
              
            //    }
                @keyframes orb-drift {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(15px, -10px) scale(1.05); }
                    66% { transform: translate(-10px, 8px) scale(0.95); }
                
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



            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full relative z-10">
                {/* Section header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-12">
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
                        <h2 className="text-[24px] sm:text-[28px] md:text-[42px] font-[var(--font-playfair)] text-white leading-[1.15]">
                            {/* <h2 className="text-[22px] md:text-[34px] font-[var(--font-playfair)] text-white leading-[1.15]"> */}
                            Shift the One Thing That{' '}
                            <span className="italic text-white">Changes Everything</span>
                        </h2>
                    </div>
                    <p className="text-white/90 text-[14px] sm:text-[16px] md:text-[18px] max-w-[400px] mt-3 md:mt-0 leading-relaxed md:text-right">
                        Most people come to me after trying everything…<br />
                        when effort hasn't matched results and something still feels stuck.

                    </p>
                </div>

                {/* 3 Service cards generated from array */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {servicesData.map((svc, index) => (
                        <div key={index} className="service-card group bg-white/95 backdrop-blur-xl flex flex-col relative" style={{ borderRadius: '24px' }}>
                            <div className="card-glow bg-[#c42d2d]" />



                            {/* Top accent line */}
                            <div className="h-[3px] rounded-t-3xl bg-gradient-to-r from-transparent via-[#c42d2d] to-transparent opacity-80" />


                            <div className="p-5 sm:p-6 md:p-7 flex-1 flex flex-col relative z-10">
                                {/* Icon & Badge */}
                                <div className="flex items-start justify-between mb-5">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c42d2d]/10 to-[#c42d2d]/5 border border-[#c42d2d]/15 flex items-center justify-center transition-all duration-500 scale-150 z-10 bg-white">
                                        <img
                                            src={svc.iconSVG}
                                            alt={svc.title}
                                            className="w-16 h-16 object-contain transition-transform duration-500 group-hover:scale-120"
                                        />
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
                                    <Link
                                        href={svc.btnText === "Book Call" ? "/energy-diagnostic-call" : svc.btnLink === "#" ? "/energy-diagnostic-call" : svc.btnLink}
                                        className="shine-btn inline-flex items-center gap-2 bg-gradient-to-r from-[#c42d2d] to-[#b02525] text-white px-5 py-2.5 rounded-full text-[11px] font-bold font-[var(--font-outfit)] shadow-lg shadow-[#c42d2d]/25 hover:shadow-xl hover:shadow-[#c42d2d]/35 transition-all duration-300 group/btn relative z-20"
                                    >
                                        {svc.btnText}
                                        <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                                            <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                                        </svg>
                                    </Link>
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
                    <p className="text-white/90 text-[13px] sm:text-[16px] md:text-[20px]">
                        Not sure where to begin?{' '}
                        <Link
                            href="/energy-diagnostic-call"
                            className="text-white font-bold font-[var(--font-outfit)] hover:text-[#e85d5d] transition-colors duration-300 underline decoration-white/20 underline-offset-2 hover:decoration-[#e85d5d]/50"
                        >
                            The Energy Diagnostic Call
                        </Link>{' '}
                        is the easiest first step.
                    </p>
                </div>
            </div>

            {/* Know More Button */}
            <div className="mt-8 text-center">
                <Link
                    href="/services"
                    className="group inline-flex items-center gap-3 bg-white text-[#8a0a0a] px-8 py-4 rounded-full font-bold text-[14px] uppercase tracking-[.12em] font-[var(--font-outfit)] shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_40px_rgba(196,45,45,0.3)] hover:scale-105 hover:bg-white transition-all duration-400"
                >
                    Know More
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>

            {/* Bottom-right decorative text */}
            {/* <div className="absolute bottom-8 right-8 md:right-12 pointer-events-none text-right">
                <p className="text-white/8 text-[11px] uppercase tracking-[.5em]">Raseshvari Hindustani</p>
            </div> */}


        </section>
    );
}