"use client";

export default function Services() {
    return (
        <section className="min-h-[98vh] bg-gradient-to-b from-[#4a0e0e] via-[#7a1a1a] to-[#9b1c1c] relative overflow-hidden flex flex-col justify-center py-16">
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
                .service-card:hover {
                    transform: translateY(-8px) scale(1.01);
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
                .icon-ring-brown::after {
                    border-color: #8a7565;
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
            `}</style>

            {/* Animated background orbs */}
            <div className="absolute top-[10%] right-[15%] w-[300px] h-[300px] bg-[#c42d2d]/10 rounded-full blur-[100px] floating-orb pointer-events-none" />
            <div className="absolute bottom-[15%] left-[10%] w-[250px] h-[250px] bg-[#e85d5d]/8 rounded-full blur-[80px] floating-orb pointer-events-none" style={{ animationDelay: '-3s' }} />
            <div className="absolute top-[50%] left-[50%] w-[400px] h-[400px] bg-white/[0.015] rounded-full blur-[120px] floating-orb pointer-events-none" style={{ animationDelay: '-5s' }} />

            {/* Large watermark text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <span className="text-[140px] md:text-[220px] font-[var(--font-playfair)] font-bold text-white/[0.025] tracking-tight whitespace-nowrap select-none">
                    SHIFT
                </span>
            </div>

            {/* Corner decorative texts */}
            <div className="absolute top-8 left-8 md:left-12 pointer-events-none">
                <p className="text-white/15 text-[10px] uppercase tracking-[.4em] font-medium">Energy &middot; Frequency &middot; Transformation</p>
            </div>
            <div className="absolute top-8 right-8 md:right-12 pointer-events-none text-right">
                <p className="text-white/10 text-[64px] md:text-[80px] font-[var(--font-playfair)] font-bold leading-none">03</p>
                <p className="text-white/20 text-[9px] uppercase tracking-[.3em] mt-1">Ways to begin</p>
            </div>
            <div className="absolute bottom-8 left-8 md:left-12 pointer-events-none">
                <p className="text-white/10 text-[11px] italic font-[var(--font-playfair)] max-w-[180px] leading-relaxed">
                    &ldquo;The shift happens when you stop trying to fix — and allow transformation.&rdquo;
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
                {/* Section header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
                    <div className="max-w-lg">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-[2px] rounded-full bg-gradient-to-r from-[#c42d2d] to-[#e85d5d]" />
                            <p className="text-[10px] md:text-xs uppercase tracking-[.3em] text-white/50 font-medium">
                                Services
                            </p>
                        </div>
                        <h2 className="text-[26px] md:text-[38px] font-[var(--font-playfair)] text-white leading-[1.15]">
                            Shift the One Thing That{' '}
                            <span className="italic text-white/70">Changes Everything</span>
                        </h2>
                    </div>
                    <p className="text-white/30 text-[13px] max-w-xs mt-3 md:mt-0 leading-relaxed md:text-right">
                        When effort hasn&rsquo;t matched results and something still feels stuck — here are three ways to begin.
                    </p>
                </div>

                {/* 3 Service cards */}
                <div className="grid md:grid-cols-3 gap-5 md:gap-6">

                    {/* Card 1 — Glassmorphic White */}
                    <div className="service-card group bg-white/95 backdrop-blur-xl flex flex-col" style={{ borderRadius: '24px' }}>
                        <div className="card-glow bg-[#c42d2d]" />
                        {/* Top accent line */}
                        <div className="h-[3px] rounded-t-3xl bg-gradient-to-r from-transparent via-[#c42d2d] to-transparent opacity-80" />
                        <div className="p-6 md:p-7 flex-1 flex flex-col">
                            {/* Icon & Badge */}
                            <div className="flex items-start justify-between mb-5">
                                <div className="icon-ring icon-ring-red w-14 h-14 rounded-2xl bg-gradient-to-br from-[#c42d2d]/10 to-[#c42d2d]/5 border border-[#c42d2d]/15 flex items-center justify-center group-hover:from-[#c42d2d]/20 group-hover:to-[#c42d2d]/10 transition-all duration-500">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c42d2d" strokeWidth="1.8" strokeLinecap="round" className="group-hover:scale-110 transition-transform duration-500">
                                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                    </svg>
                                </div>
                                <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#c42d2d]/10 to-[#c42d2d]/5 text-[#c42d2d] text-[9px] font-bold uppercase tracking-wider rounded-full px-3 py-1 border border-[#c42d2d]/15 shadow-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#c42d2d] animate-pulse" />
                                    Signature
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-[20px] md:text-[24px] font-[var(--font-playfair)] text-[#111] font-bold leading-tight mb-3">
                                Revenue Energetics&trade;
                            </h3>
                            <p className="text-[#333] text-[13px] leading-relaxed mb-2 font-medium">
                                One powerful session that shifts what strategy, effort, and coaching couldn&rsquo;t.
                            </p>
                            <p className="text-gray-400 text-[12px] leading-[1.7] flex-1">
                                This isn&rsquo;t healing the way you think it is &mdash; it&rsquo;s a deeper energy transformation, a shift in your frequency that creates visible change in one session.
                            </p>

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

                            {/* Footer */}
                            <div className="flex items-center justify-between">
                                <a href="#" className="shine-btn inline-flex items-center gap-2 bg-gradient-to-r from-[#c42d2d] to-[#b02525] text-white px-5 py-2.5 rounded-full text-[11px] font-bold shadow-lg shadow-[#c42d2d]/25 hover:shadow-xl hover:shadow-[#c42d2d]/35 transition-all duration-300 group/btn">
                                    Explore
                                    <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                                        <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                                    </svg>
                                </a>
                                <span className="text-[#c42d2d]/10 text-[42px] font-[var(--font-playfair)] font-bold leading-none group-hover:text-[#c42d2d]/20 transition-colors duration-500">01</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 — Warm Glass */}
                    <div className="service-card group bg-[#f5ede4]/95 backdrop-blur-xl flex flex-col" style={{ borderRadius: '24px' }}>
                        <div className="card-glow bg-[#d4a574]" />
                        <div className="h-[3px] rounded-t-3xl bg-gradient-to-r from-transparent via-[#c4956d] to-transparent opacity-60" />
                        <div className="p-6 md:p-7 flex-1 flex flex-col">
                            {/* Icon & Badge */}
                            <div className="flex items-start justify-between mb-5">
                                <div className="icon-ring icon-ring-brown w-14 h-14 rounded-2xl bg-gradient-to-br from-[#111]/8 to-[#111]/3 border border-[#111]/10 flex items-center justify-center group-hover:from-[#111]/15 group-hover:to-[#111]/8 transition-all duration-500">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round" className="group-hover:scale-110 transition-transform duration-500">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                </div>
                                <span className="inline-flex items-center bg-[#111]/5 text-[#7a6a58] text-[9px] font-bold uppercase tracking-wider rounded-full px-3 py-1 border border-[#111]/8 shadow-sm">
                                    Paid Diagnostic
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-[20px] md:text-[24px] font-[var(--font-playfair)] text-[#111] font-bold leading-tight mb-3">
                                Energy Diagnostic Call&trade;
                            </h3>
                            <p className="text-[#333] text-[13px] leading-relaxed mb-2 font-medium">
                                A paid energy diagnostic call to understand what&rsquo;s really happening beneath the surface.
                            </p>
                            <p className="text-[#6b5e52] text-[12px] leading-[1.7] mb-3">
                                You receive a clear energetic roadmap showing what blocks are draining you, what needs to shift, and your next step toward your goals.
                            </p>

                            {/* Feature chips */}
                            <div className="flex flex-wrap gap-2 flex-1">
                                {['Energy Roadmap', 'Block Identification', 'Clear Next Steps'].map((f) => (
                                    <span key={f} className="feature-chip text-[9px] uppercase tracking-wider text-[#8a7565] bg-white/70 border border-[#d4c4b0]/60 rounded-full px-3 py-1 font-semibold h-fit shadow-sm">
                                        {f}
                                    </span>
                                ))}
                            </div>

                            {/* Divider with decorative dots */}
                            <div className="flex items-center gap-2 my-5">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4c4b0]/50 to-transparent" />
                                <div className="flex gap-1">
                                    <div className="w-1 h-1 rounded-full bg-[#8a7565]/30" />
                                    <div className="w-1 h-1 rounded-full bg-[#8a7565]/20" />
                                    <div className="w-1 h-1 rounded-full bg-[#8a7565]/10" />
                                </div>
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4c4b0]/50 to-transparent" />
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between">
                                <a href="#" className="shine-btn inline-flex items-center gap-2 bg-gradient-to-r from-[#111] to-[#2a2a2a] text-white px-5 py-2.5 rounded-full text-[11px] font-bold shadow-lg hover:shadow-xl transition-all duration-300 group/btn">
                                    Book Call
                                    <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                                        <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                                    </svg>
                                </a>
                                <span className="text-[#111]/8 text-[42px] font-[var(--font-playfair)] font-bold leading-none group-hover:text-[#111]/15 transition-colors duration-500">02</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 — Dark Premium */}
                    <div className="service-card group bg-[#111]/95 backdrop-blur-xl flex flex-col" style={{ borderRadius: '24px' }}>
                        <div className="card-glow bg-[#c42d2d]" />
                        <div className="h-[3px] rounded-t-3xl bg-gradient-to-r from-transparent via-[#c42d2d] to-transparent opacity-60" />
                        {/* Subtle inner glow */}
                        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#c42d2d]/5 rounded-full blur-[60px] pointer-events-none" />
                        <div className="p-6 md:p-7 flex-1 flex flex-col relative z-[1]">
                            {/* Icon & Badge */}
                            <div className="flex items-start justify-between mb-5">
                                <div className="icon-ring icon-ring-red w-14 h-14 rounded-2xl bg-gradient-to-br from-[#c42d2d]/20 to-[#c42d2d]/8 border border-[#c42d2d]/20 flex items-center justify-center group-hover:from-[#c42d2d]/30 group-hover:to-[#c42d2d]/15 transition-all duration-500">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c42d2d" strokeWidth="1.8" strokeLinecap="round" className="group-hover:scale-110 transition-transform duration-500">
                                        <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                    </svg>
                                </div>
                                <span className="inline-flex items-center gap-1.5 bg-[#c42d2d]/15 text-[#c42d2d] text-[9px] font-bold uppercase tracking-wider rounded-full px-3 py-1 border border-[#c42d2d]/20 shadow-sm shadow-[#c42d2d]/10">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#c42d2d] animate-pulse" />
                                    Quiz
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-[20px] md:text-[24px] font-[var(--font-playfair)] text-white font-bold leading-tight mb-3">
                                Energy Score&trade; Quiz
                            </h3>
                            <p className="text-white/70 text-[13px] leading-relaxed mb-2 font-medium">
                                A quick, intuitive check-in to see where your energy is dropping right now.
                            </p>
                            <p className="text-white/35 text-[12px] leading-[1.7] flex-1">
                                This is not a medical diagnosis &mdash; it&rsquo;s a gentle mirror to the hidden energetic patterns your mind may overlook. See what&rsquo;s truly happening beneath the surface.
                            </p>

                            {/* Divider with decorative dots */}
                            <div className="flex items-center gap-2 my-5">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                <div className="flex gap-1">
                                    <div className="w-1 h-1 rounded-full bg-[#c42d2d]/40" />
                                    <div className="w-1 h-1 rounded-full bg-[#c42d2d]/25" />
                                    <div className="w-1 h-1 rounded-full bg-[#c42d2d]/10" />
                                </div>
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between">
                                <a href="#" className="shine-btn inline-flex items-center gap-2 bg-gradient-to-r from-white to-gray-100 text-[#c42d2d] px-5 py-2.5 rounded-full text-[11px] font-bold shadow-lg shadow-white/10 hover:shadow-xl hover:shadow-white/20 transition-all duration-300 group/btn">
                                    Take the Quiz
                                    <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="#c42d2d" strokeWidth="2.5" strokeLinecap="round">
                                        <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                                    </svg>
                                </a>
                                <span className="text-white/5 text-[42px] font-[var(--font-playfair)] font-bold leading-none group-hover:text-white/10 transition-colors duration-500">03</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Not sure where to begin? */}
                <div className="mt-10 text-center">
                    <div className="inline-flex items-center gap-3 bg-white/[0.08] backdrop-blur-md rounded-full px-6 py-3.5 border border-white/10 shadow-lg shadow-black/10 hover:bg-white/[0.12] transition-all duration-300 group">
                        <div className="w-2 h-2 rounded-full bg-white/40 animate-pulse flex-shrink-0" />
                        <p className="text-white/50 text-[13px]">
                            Not sure where to begin?{' '}
                            <a href="#" className="text-white font-bold hover:text-[#e85d5d] transition-colors duration-300 underline decoration-white/20 underline-offset-2 hover:decoration-[#e85d5d]/50">
                                The Energy Diagnostic Call&trade;
                            </a>{' '}
                            is the easiest first step.
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom-right decorative text */}
            <div className="absolute bottom-8 right-8 md:right-12 pointer-events-none text-right">
                <p className="text-white/8 text-[11px] uppercase tracking-[.5em]">Raseshvari Hindustani</p>
            </div>
        </section>
    );
}
