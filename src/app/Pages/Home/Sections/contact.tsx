"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const [inquiryType, setInquiryType] = useState<"services" | "speaking" | "">("");

    useEffect(() => {
        const s = sectionRef.current;
        if (!s) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(
                s.querySelectorAll(".ct-reveal"),
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.9, stagger: 0.2, ease: "power3.out",
                    scrollTrigger: { trigger: s, start: "20% bottom", toggleActions: "play none none reset" },
                }
            );
        }, s);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative h-[90dvh] py-16 px-6 md:px-12 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#8a0a0a] to-[#4a0e0e]">
            {/* Dark premium red gradient background overlay */}
            <div className="absolute inset-0 bg-[#4a0e0e]/20" />

            {/* Background glows */}
            <div className="absolute top-[20%] left-[15%] w-[300px] h-[300px] bg-[#e85d5d]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] bg-[#c42d2d]/15 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-[1300px] h-[95%] mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center justify-center">

                {/* Left Side Typography & Info */}
                <div className="ct-reveal w-full md:w-5/12 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-px bg-gradient-to-r from-transparent to-[#f0cfb1]" />
                        <span className="text-[#f0cfb1] text-[12px] uppercase tracking-[.3em] font-semibold font-[var(--font-dm-sans)]">
                            Contact
                        </span>
                        <div className="w-10 h-px bg-gradient-to-l from-transparent to-[#f0cfb1]" />
                    </div>

                    <h2 className="text-[54px] md:text-[76px] font-[var(--font-playfair)] text-white font-bold leading-[1] tracking-tight mb-8 drop-shadow-lg">
                        Let&apos;s <br className="hidden md:block" /> ignite <span className="italic font-light text-[#f0cfb1]">change.</span>
                    </h2>

                    <p className="text-white/80 text-[16px] md:text-[18px] font-[var(--font-dm-sans)] leading-relaxed max-w-sm mb-16">
                        I&apos;m always open to discussing new opportunities, whether it&apos;s speaking at your next event or collaborating on transformative services. Let&apos;s make it happen.
                    </p>

                    <div className="flex flex-col gap-2">
                        <h4 className="text-white/60 text-[11px] uppercase tracking-[.25em] font-[var(--font-dm-sans)] font-bold">Email Directly</h4>
                        <a href="mailto:hello@raseshvari.com" className="group flex items-center gap-3 text-white text-[22px] font-medium transition-colors font-[var(--font-outfit)] w-max">
                            <span className="group-hover:text-[#f0cfb1] transition-colors"> Raseshvari@rashindustani.com </span>
                            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#f0cfb1] group-hover:bg-[#f0cfb1] transition-colors">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="stroke-white group-hover:stroke-[#9b1c1c] transition-colors" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Right Side Form Card */}
                <div className="ct-reveal w-full md:w-7/12 relative flex justify-center h-full items-center">
                    {/* Artistic Shadow/Backing */}
                    <div className="absolute inset-0 bg-[#3a0b0b] blur-2xl rounded-[50px] -z-10 translate-y-4 translate-x-4 opacity-50" />

                    <form className="w-full relative bg-gradient-to-b from-white to-[#fcfcfc] p-10 md:p-14 rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.15)] flex flex-col gap-8 md:gap-10">

                        {/* Decorative floating badge */}
                        {/* <div className="absolute -top-4 -right-4 bg-[#c42d2d] text-white px-6 py-2 rounded-full text-[10px] uppercase tracking-[.2em] font-bold font-[var(--font-dm-sans)] shadow-lg rotate-3 z-20">
                            Say Hello
                        </div> */}

                        <div className="flex flex-col sm:flex-row gap-6 md:gap-8">
                            {/* First Name */}
                            <div className="relative w-full group">
                                <input
                                    type="text"
                                    id="firstName"
                                    className="peer w-full bg-gray-50/50 border border-gray-400/80 rounded-[16px] px-5 py-4 text-[#111] text-[15px] font-[var(--font-dm-sans)] placeholder-transparent focus:outline-none focus:border-[#c42d2d] focus:bg-white focus:shadow-[0_4px_20px_rgba(196,45,45,0.08)] transition-all"
                                    placeholder="First Name"
                                    required
                                />
                                <label
                                    htmlFor="firstName"
                                    className="absolute left-5 top-[18px] text-gray-800 text-[15px] font-[var(--font-dm-sans)] transition-all peer-focus:-top-3 peer-focus:left-4 peer-focus:text-[10px] peer-focus:text-[#c42d2d] peer-focus:tracking-[.1em] peer-focus:font-bold peer-focus:uppercase peer-focus:bg-white peer-focus:px-2 peer-valid:-top-3 peer-valid:left-4 peer-valid:text-[10px] peer-valid:text-gray-400 peer-valid:tracking-[.1em] peer-valid:uppercase peer-valid:font-bold peer-valid:bg-white peer-valid:px-2 pointer-events-none"
                                >
                                    First Name
                                </label>
                            </div>

                            {/* Last Name */}
                            <div className="relative w-full group">
                                <input
                                    type="text"
                                    id="lastName"
                                    className="peer w-full bg-gray-50/50 border border-gray-400/80 rounded-[16px] px-5 py-4 text-[#111] text-[15px] font-[var(--font-dm-sans)] placeholder-transparent focus:outline-none focus:border-[#c42d2d] focus:bg-white focus:shadow-[0_4px_20px_rgba(196,45,45,0.08)] transition-all"
                                    placeholder="Last Name"
                                    required
                                />
                                <label
                                    htmlFor="lastName"
                                    className="absolute left-5 top-[18px] text-gray-800 text-[15px] font-[var(--font-dm-sans)] transition-all peer-focus:-top-3 peer-focus:left-4 peer-focus:text-[10px] peer-focus:text-[#c42d2d] peer-focus:tracking-[.1em] peer-focus:font-bold peer-focus:uppercase peer-focus:bg-white peer-focus:px-2 peer-valid:-top-3 peer-valid:left-4 peer-valid:text-[10px] peer-valid:text-gray-400 peer-valid:tracking-[.1em] peer-valid:uppercase peer-valid:font-bold peer-valid:bg-white peer-valid:px-2 pointer-events-none"
                                >
                                    Last Name
                                </label>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="relative w-full group">
                            <input
                                type="email"
                                id="email"
                                className="peer w-full bg-gray-50/50 border border-gray-400/80 rounded-[16px] px-5 py-4 text-[#111] text-[15px] font-[var(--font-dm-sans)] placeholder-transparent focus:outline-none focus:border-[#c42d2d] focus:bg-white focus:shadow-[0_4px_20px_rgba(196,45,45,0.08)] transition-all"
                                placeholder="Email Address"
                                required
                            />
                            <label
                                htmlFor="email"
                                className="absolute left-5 top-[18px] text-gray-800 text-[15px] font-[var(--font-dm-sans)] transition-all peer-focus:-top-3 peer-focus:left-4 peer-focus:text-[10px] peer-focus:text-[#c42d2d] peer-focus:tracking-[.1em] peer-focus:font-bold peer-focus:uppercase peer-focus:bg-white peer-focus:px-2 peer-valid:-top-3 peer-valid:left-4 peer-valid:text-[10px] peer-valid:text-gray-400 peer-valid:tracking-[.1em] peer-valid:uppercase peer-valid:font-bold peer-valid:bg-white peer-valid:px-2 pointer-events-none"
                            >
                                Email Address
                            </label>
                        </div>

                        {/* Inquiry Regarding */}
                        <div className="mt-2">
                            <p className="text-gray-400 text-[11px] uppercase tracking-[.2em] font-[var(--font-dm-sans)] mb-4 font-bold">Inquiry Regarding:</p>
                            <div className="flex flex-col sm:flex-row gap-4">

                                <label className="flex-1 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="inquiry"
                                        value="services"
                                        className="sr-only"
                                        onChange={() => setInquiryType('services')}
                                    />
                                    <div className={`relative px-6 py-5 rounded-[20px] border-2 transition-all duration-300 flex items-center justify-between ${inquiryType === 'services'
                                        ? 'border-[#c42d2d] bg-[#fff5f5]'
                                        : 'border-gray-100 hover:border-gray-200 bg-gray-50/50 hover:bg-gray-50'
                                        }`}>
                                        <div className="flex flex-col">
                                            <span className={`text-[12px] font-bold font-[var(--font-dm-sans)] tracking-widest mb-1 ${inquiryType === 'services' ? 'text-[#c42d2d]/60' : 'text-gray-400'}`}>01</span>
                                            <span className={`font-[var(--font-playfair)] font-medium text-[20px] ${inquiryType === 'services' ? 'text-[#c42d2d]' : 'text-[#333]'}`}>
                                                Services
                                            </span>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${inquiryType === 'services' ? 'border-[#c42d2d]' : 'border-gray-300'}`}>
                                            {inquiryType === 'services' && <div className="w-2.5 h-2.5 rounded-full bg-[#c42d2d]" />}
                                        </div>
                                    </div>
                                </label>

                                <label className="flex-1 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="inquiry"
                                        value="speaking"
                                        className="sr-only"
                                        onChange={() => setInquiryType('speaking')}
                                    />
                                    <div className={`relative px-6 py-5 rounded-[20px] border-2 transition-all duration-300 flex items-center justify-between ${inquiryType === 'speaking'
                                        ? 'border-[#c42d2d] bg-[#fff5f5]'
                                        : 'border-gray-100 hover:border-gray-200 bg-gray-50/50 hover:bg-gray-50'
                                        }`}>
                                        <div className="flex flex-col">
                                            <span className={`text-[12px] font-bold font-[var(--font-dm-sans)] tracking-widest mb-1 ${inquiryType === 'speaking' ? 'text-[#c42d2d]/60' : 'text-gray-400'}`}>02</span>
                                            <span className={`font-[var(--font-playfair)] font-medium text-[20px] ${inquiryType === 'speaking' ? 'text-[#c42d2d]' : 'text-[#333]'}`}>
                                                Speaking events
                                            </span>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${inquiryType === 'speaking' ? 'border-[#c42d2d]' : 'border-gray-300'}`}>
                                            {inquiryType === 'speaking' && <div className="w-2.5 h-2.5 rounded-full bg-[#c42d2d]" />}
                                        </div>
                                    </div>
                                </label>

                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="w-full bg-[#111] text-white py-5 rounded-[20px] font-bold text-[14px] uppercase tracking-[.2em] font-[var(--font-dm-sans)] transition-all hover:bg-[#c42d2d] hover:shadow-[0_15px_30px_-5px_rgba(196,45,45,0.3)] hover:-translate-y-1"
                            >
                                Send Message
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </section>
    );
}
