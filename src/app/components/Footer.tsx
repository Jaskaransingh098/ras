"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative w-full min-h-[100dvh] pt-12 md:pt-20 lg:pt-12 bg-gradient-to-b from-[#8a0a0a] to-[#4a0e0e] text-white overflow-hidden mt-0 flex flex-col justify-between">
            <div className="flex justify-center gap-4">
                <a href="#" className="w-15 h-15 rounded-[12px] bg-white/10 hover:bg-white text-white hover:text-[#c42d2d] flex items-center justify-center transition-all duration-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="w-15 h-15 rounded-[12px] bg-white/10 hover:bg-white text-white hover:text-[#c42d2d] flex items-center justify-center transition-all duration-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </a>
                <a href="#" className="w-15 h-15 rounded-[12px] bg-white/10 hover:bg-white text-white hover:text-[#c42d2d] flex items-center justify-center transition-all duration-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 1.46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 1.46-5.33 29 29 0 0 0-1.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                </a>
                {/* <a href="#" className="w-10 h-10 rounded-[12px] bg-white/10 hover:bg-white text-white hover:text-[#c42d2d] flex items-center justify-center transition-all duration-300">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </a> */}
            </div>
            <div className="w-full h-full max-w-[1500px] mx-auto px-4 sm:px-6 md:px-12 relative z-10 flex flex-col justify-between mt-2 md:mt-">

                {/* Central Lotus / Icon element (from reference image) */}
                {/* <div className="absolute top-0 md:top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#111] rounded-full flex items-center justify-center -translate-y-1/2 z-10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] border-4 border-[#8a0a0a]">
                <span className="text-white font-[var(--font-playfair)] italic text-xl">R</span>
            </div> */}

                {/* Main Content Area */}
                <div className="w-full flex justify-between gap-16 lg:gap-8 mb-20 md:mb-16 z-10 flex-col md:flex-row">

                    {/* Left: Branding & Newsletter */}


                    <div className="flex flex-col max-w-sm shrink-0">
                        <img src="/logo/logo ras hindustani zoom.png" alt="" className="h-23 w-23 bg-white rounded-3xl mb-2" />
                        {/* <h2 className="section-heading text-[32px] font-bold font-[var(--font-playfair)] tracking-wide mb-6">
                            raseshvari
                        </h2> */}

                        <p className="text-[14px] md:text-[15px] font-[var(--font-dm-sans)] text-white/90 leading-relaxed mb-8 pr-4">
                            Kaleidoscope - a creative agency specializing in making videos for strategy, marketing and production.
                        </p>

                        <div className="flex flex-col mb-10 w-full max-w-[320px]">
                            <span className="text-[14px] mb-3 font-[var(--font-dm-sans)] font-medium">Subscribe to our newsletter:</span>
                            <form className="flex w-full group">
                                <input
                                    type="email"
                                    placeholder="your email..."
                                    className="bg-white/10 px-4 py-3 rounded-l-[6px] outline-none text-white placeholder-white/60 w-full font-[var(--font-dm-sans)] text-[14px] transition-colors focus:bg-white/20 border-y border-l border-transparent hover:border-white/10 focus:border-white/30"
                                    required
                                />
                                <button type="submit" className="bg-white/10 px-4 py-3 rounded-r-[6px] hover:bg-white/20 transition-colors flex items-center justify-center border-y border-r border-transparent hover:border-white/10 group-focus-within:border-white/30">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80 group-hover:text-white"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </button>
                            </form>
                        </div>

                        {/* Social Icons (From first image) */}
                        {/* <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-[12px] bg-white/10 hover:bg-white text-white hover:text-[#c42d2d] flex items-center justify-center transition-all duration-300">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-[12px] bg-white/10 hover:bg-white text-white hover:text-[#c42d2d] flex items-center justify-center transition-all duration-300">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-[12px] bg-white/10 hover:bg-white text-white hover:text-[#c42d2d] flex items-center justify-center transition-all duration-300">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 1.46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 1.46-5.33 29 29 0 0 0-1.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                            </a> */}
                        {/* <a href="#" className="w-10 h-10 rounded-[12px] bg-white/10 hover:bg-white text-white hover:text-[#c42d2d] flex items-center justify-center transition-all duration-300">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            // </a> */}
                        {/* </div> */}
                    </div>

                    {/* Right: 4-Column Navigation Grid matching Synthesis UX */}
                    <div className="w-full md:w-auto grid grid-cols-2 md:grid-cols-4 gap-x-8 lg:gap-x-12 gap-y-12 font-[var(--font-dm-sans)] text-[12px] lg:text-[13px] tracking-[.1em] uppercase whitespace-nowrap pt-2">
                        <div className="flex flex-col gap-4">
                            <span className="font-bold text-white mb-2">Explore</span>
                            <Link href="#" className="text-white/70 hover:text-white transition-colors">Session</Link>
                            <Link href="#" className="text-white/70 hover:text-white transition-colors">About Us</Link>
                            <Link href="#" className="text-white/70 hover:text-white transition-colors">Dare to Dream</Link>
                        </div>
                        <div className="flex flex-col gap-4">
                            <span className="font-bold text-white mb-2">Activities</span>
                            <Link href="#" className="text-white/70 hover:text-white transition-colors">Services</Link>
                            <Link href="#" className="text-white/70 hover:text-white transition-colors">Contact Us</Link>
                            <Link href="#" className="text-white/70 hover:text-white transition-colors">FAQs</Link>
                        </div>
                        <div className="flex flex-col gap-4">
                            <span className="font-bold text-white mb-2">Community</span>
                            <Link href="#" className="text-white/70 hover:text-white transition-colors">Testimonials</Link>
                            <Link href="#" className="text-white/70 hover:text-white transition-colors">Moms Community</Link>
                            <Link href="#" className="text-white/70 hover:text-white transition-colors">Coming Soon...</Link>
                        </div>
                        <div className="flex flex-col gap-4">
                            <span className="font-bold text-white mb-2">Legal</span>
                            <Link href="#" className="text-white/70 hover:text-white transition-colors">Privacy Policy</Link>
                            <Link href="#" className="text-white/70 hover:text-white transition-colors">Terms & Conditions</Link>
                            <Link href="#" className="text-white/70 hover:text-white transition-colors">Support</Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright & Links Line */}
                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 text-[11px] md:text-[12px] font-[var(--font-dm-sans)] text-white/70 mb-8 md:mb-50 z-10 relative">
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center text-center md:text-left">
                        <span>© Copyright 2025 Abhi . All Rights Reserved</span>
                        <span className="hidden md:inline text-white/40">·</span>
                        <span>Partner with us: raseshvari@rashindustani.com
                        </span>
                    </div>

                </div>

                {/* Giant Cut-off Background Word (Hindustani) */}
                <div className="absolute left-0 -bottom-5 w-full overflow-hidden flex justify-center translate-y-[35%] md:translate-y-[20%] select-none pointer-events-none z-0 px-4">
                    <h1 className="text-[17vw] md:text-[14vw] lg:text-[20vw] font-bold font-[var(--font-playfair)] text-[#fbfbfb] tracking-tighter leading-none whitespace-nowrap opacity-[0.95] w-full text-center">
                        Hindustani
                    </h1>
                </div>

            </div>
        </footer>
    );
}
