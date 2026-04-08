"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const faqData = [
    {
        question: "What exactly is Energy Transformation?",
        answer: (
            <>
                <p>Energy Transformation is the process of shifting the underlying patterns that shape your life - mentally, emotionally, physically and materially.</p>
                <p className="mt-2">Every experience leaves an imprint.<br />Those imprints influence how you react, decide, receive, earn, lead, relate and even how your body responds.</p>
            </>
        )
    },
    {
        question: "Is this like therapy, counselling, or coaching?",
        answer: (
            <>
                <p>No. Therapy focuses on understanding your past.<br />Coaching focuses on strategy and action.</p>
                <p className="mt-2">Energy Transformation works at the level beneath both — shifting the patterns that drive your thoughts, reactions, health and results.</p>
            </>
        )
    },
    {
        question: "What happens in a single session?",
        answer: (
            <>
                <p>I begin with a brief conversation about what feels stuck, heavy, or unclear in your life.</p>
                <p className="mt-4">From there, I identify the deeper pattern behind it and facilitate the shift at its root.</p>
                <p className="mt-4">You don&apos;t need to prepare, perform, or “do” anything — simply being present is enough.</p>
                <p className="mt-4">You remain fully conscious and in control throughout.</p>
            </>
        )
    },
    {
        question: "How soon can I expect results?",
        answer: (
            <>
                <p>Most people experience an internal shift in just one session. This may feel like clarity, calm, peace, joy, or a deep sense of lightness.</p>
                <p className="mt-2">External movement in work, money, relationships, or decisions begins within hours or days. In few cases it unfolds gradually.</p>
                <p className="mt-4 font-medium text-[#c42d2d]">This work actually creates real movement in your life.</p>
            </>
        )
    },
    {
        question: "How many sessions will I need?",
        answer: (
            <>
                <p>For one specific issue, one focused session is usually enough.</p>
                <p className="mt-2">This work is designed to address the root of a problem directly. When that shifts, it often creates movement in other areas of life as well.</p>
                <p className="mt-4">If you are working through multiple themes or deeper transitions, additional sessions may be supportive.<br />There are no ongoing packages or long commitments. Each session stands complete in itself.</p>
            </>
        )
    },
    {
        question: "Who is this work best suited for?",
        answer: (
            <>
                <p>This work is open to anyone who genuinely wants change, ease, and greater happiness in their life.</p>
                <p className="mt-2">It supports people who are ready to let go of struggle and move toward clarity, confidence and fulfilment.<br />There are no age or gender limitations. Students, professionals, entrepreneurs, homemakers and individuals navigating health or personal challenges can all benefit.</p>
                <p className="mt-4 font-medium text-[#c42d2d]">What matters most is willingness. If you are ready for change, this work can support you.</p>
            </>
        )
    },
    {
        question: "Do I need to be physically present for a session?",
        answer: (
            <>
                <p>No.<br />All sessions are conducted online via Zoom.</p>
                <p className="mt-2">This work does not rely on physical touch or location. What matters is focused presence, not proximity.<br />Clients across different cities and countries experience the same depth of shift online.</p>
                <p className="mt-4">You simply need a quiet space, privacy, and a stable internet connection.</p>
            </>
        )
    }
];

export default function FAQ() {
    const sectionRef = useRef<HTMLElement>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    useEffect(() => {
        const s = sectionRef.current;
        if (!s) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(
                s.querySelectorAll(".faq-reveal"),
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out",
                    scrollTrigger: { trigger: s, start: "20% bottom", toggleActions: "play none none reset" },
                }
            );
        }, s);
        return () => ctx.revert();
    }, []);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Calculate halfway point accurately
    const midpoint = Math.ceil(faqData.length / 2);
    const leftColumnFAQs = faqData.slice(0, midpoint);
    const rightColumnFAQs = faqData.slice(midpoint);

    // Helper for rendering a FAQ card
    const renderCard = (faq: typeof faqData[0], indexShift: number, groupIndex: number) => {
        const actualIndex = indexShift + groupIndex;
        const isOpen = openIndex === actualIndex;

        return (
            <div
                key={actualIndex}
                className={`group border rounded-[20px] md:rounded-[24px] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden ${isOpen
                    ? 'bg-white border-[#c42d2d] shadow-[0_15px_40px_-5px_rgba(196,45,45,0.15)] ring-1 ring-[#c42d2d]/20'
                    : 'bg-white border-gray-300 hover:border-gray-400 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_-5px_rgba(0,0,0,0.08)]'
                    }`}
            >
                <button
                    onClick={() => toggleFAQ(actualIndex)}
                    className="w-full text-left px-5 py-4 md:px-6 md:py-5 flex items-start gap-4 focus:outline-none"
                >
                    <span className={`flex-1 text-[15px] md:text-[16px] font-medium font-[var(--font-playfair)] tracking-wide transition-colors duration-300 ${isOpen ? 'text-[#c42d2d] font-bold' : 'text-[#222] group-hover:text-black'}`}>
                        {faq.question}
                    </span>
                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${isOpen
                        ? 'bg-[#c42d2d] border-[#c42d2d] rotate-[135deg] shadow-[0_5px_15px_rgba(196,45,45,0.4)]'
                        : 'bg-gray-50 border-gray-300 group-hover:border-gray-500 group-hover:bg-white'
                        }`}
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <line x1="12" y1="5" x2="12" y2="19" stroke={isOpen ? "white" : "#c42d2d"} strokeWidth="2.5" strokeLinecap="round" className="transition-colors duration-300 group-hover:stroke-black" />
                            <line x1="5" y1="12" x2="19" y2="12" stroke={isOpen ? "white" : "#c42d2d"} strokeWidth="2.5" strokeLinecap="round" className="transition-colors duration-300 group-hover:stroke-black" />
                        </svg>
                    </div>
                </button>

                <div
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                >
                    <div className="overflow-hidden">
                        <div className="px-5 md:px-6 pb-5 md:pb-4 text-[#1e1e1e] text-[15px] md:text-[14px] leading-relaxed font-semibold font-[var(--font-dm-sans)]">
                            <div className="w-8 h-[2px] bg-[#c42d2d]/30 mb-2 rounded-full" />
                            {faq.answer}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section ref={sectionRef} className="relative h-[100dvh] min-h-[90dvh] max-h-[100dvh] py-8 md:py-10 px-4 md:px10 bg-[#fbfbfb] flex flex-col items-center justify-center overflow-hidden">
            {/* Soft background accents */}
            {/* <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#f5f0ea] rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] bg-[#fff0f0] rounded-full blur-[120px] pointer-events-none" /> */}

            <div className="relative z-10 w-full max-w-[1400px] h-full flex flex-col min-h-0">

                {/* Centered Headers - Avoiding the split-screen look */}
                <div className="faq-reveal w-full text-center flex flex-col items-center flex-shrink-0 mb-8 md:mb-5">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-px bg-gradient-to-r from-transparent to-[#c42d2d]" />
                        <span className="text-[#c42d2d] text-[12px] uppercase tracking-[.3em] font-semibold font-[var(--font-dm-sans)]">
                            Clarity
                        </span>
                        <div className="w-10 h-px bg-gradient-to-l from-transparent to-[#c42d2d]" />
                    </div>

                    <h2 className="text-[28px] md:text-[42px] font-[var(--font-playfair)] text-[#111] font-bold leading-[1.05] tracking-tight mb-2 drop-shadow-sm">
                        Frequently Asked <span className="italic font-light text-[#c42d2d]">Questions.</span>
                    </h2>

                    <p className="text-[#666] text-[16px] md:text-[18px] font-[var(--font-dm-sans)] leading-relaxed max-w-2xl mx-auto">
                        Everything you need to know about Energy Transformation, the process, and how it sparks real movement in your life.
                    </p>
                </div>

                {/* 2-Column Accordion Grid Layout for vertical efficiency and modern feel */}
                <div className="w-full flex-1 relative px-2">
                    <div className="absolute inset-0 overflow-visible pb-10">
                        <div className="w-full flex justify-center">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 items-start w-full mt-2">

                                {/* Left Column */}
                                <div className="faq-reveal flex flex-col gap-4 md:gap-3 w-full">
                                    {leftColumnFAQs.map((faq, index) => renderCard(faq, 0, index))}
                                </div>

                                {/* Right Column */}
                                <div className="faq-reveal flex flex-col gap-4 md:gap-5 w-full mt-0 lg:mt-6">
                                    {rightColumnFAQs.map((faq, index) => renderCard(faq, midpoint, index))}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
