"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Journey photos — each has an explicit aspect ratio (w/h)
const photos: { src: string; alt: string; caption: string; aspect: string }[] = [
    // Portrait / headshot style
    { src: "/journey/Daya prakash sinha.png", alt: "Padma Shri Daya Prakash Sinha ji", caption: "Padma Shri Daya Prakash Sinha ji", aspect: "3/4" },
    { src: "/journey/Pushpeshpant.png", alt: "Padma Shri Pushpesh Pant ji", caption: "Padma Shri Pushpesh Pant ji", aspect: "3/4" },
    { src: "/journey/Anchor sadhna Shrivastav.png", alt: "Anchor Sadhna Shrivastava", caption: "Sadhna Srivastava DD news reader", aspect: "3/4" },
    { src: "/journey/Salma sultan.png", alt: "Actor Salma Sultan ji", caption: "Salma Sultan Legendary Doordarshan Anchor", aspect: "3/4" },
    { src: "/journey/Sonal Mansingh.png", alt: "Classical Dancer Sonal Mansingh ji", caption: "Padma Vibhishan Sonal Mansingh ji", aspect: "3/4" },
    { src: "/journey/Rita Gangwani png.png", alt: "National Awardee Rita Gangwani", caption: "Celebrity Beauty Pageant Coach Rita Gangwani ji", aspect: "3/4" },
    { src: "/journey/Avi Arya.png", alt: "Avi Arya", caption: "India's highest paid digital coach Avi Arya", aspect: "3/4" },
    { src: "/journey/Kiran bedi.png", alt: "Dr. Kiran Bedi", caption: "Dr. Kiran Bedi", aspect: "2/3" },
    { src: "/journey/Chef Davinder.png", alt: "Chef Davinder Kumar", caption: "Chef Davinder Kumar", aspect: "3/4" },
    { src: "/journey/Naseer abdullah.png", alt: "Naseer Abdullah", caption: "Actor Naseer Abdullah ji", aspect: "3/4" },
    { src: "/journey/Pratibha prahalad.png", alt: "Pratibha Prahlad", caption: "Padma Shri Bharatnatyam dancer Pratibha Pralhad ji", aspect: "3/4" },
    { src: "/journey/Rama Pandey.png", alt: "Journalist Rama Pandey", caption: "Renowned Journalist Rama Pandey ji", aspect: "3/4" },
    { src: "/journey/Artist monika gour png.png", alt: "Artist Monica Gaur", caption: "Poet Monika Gaur", aspect: "3/4" },
    // Landscape / group shots
    { src: "/journey/Maya parijat and Shovana Narayan.png", alt: "Padma Shri Shovana Narayan & Maya Parijat", caption: "Padma Shri Shovana Narayan ji (middle), Maya Parijat (left)", aspect: "4/3" },
    { src: "/journey/Padma shri shyam sharma ji.png", alt: "Padma Shri Shyam Sharma ji", caption: "Padma Shri Shyam Sharma ji", aspect: "4/3" },
    { src: "/journey/Manisha gawade and wasif Uddin dagar ji.png", alt: "Ustad Wasifuddin Dagar & Manisha Gawde", caption: "Padma Shri Ustad Wasifuddin Dagar ji (right) & Manisha Gawde (middle)", aspect: "4/3" },
    { src: "/journey/barnalee_chattopadhyay.png", alt: "Singer Barnalee Chattopadhyay", caption: "Classical Playback Singer Barnalee Chattopadhyay", aspect: "4/3" },
    { src: "/journey/Atul sexsena and  chef vaibhav.png", alt: "Chef Vaibhav & Atul Saxena", caption: "Chef Vaibhav Bhargava (right) & Atul Saxena (left)", aspect: "4/3" },
    { src: "/journey/Jyoti Kalash.png", alt: "Jyoti Kalash", caption: "Jyoti Kalash — Chief Secretary (ACS) & CRC, Nagaland House", aspect: "4/3" },
    { src: "/journey/From left Prof( Dr.) MN Hoda, Mrs. Raseshvari Hindustani, Prof Sanjeev Bhanawat, Prof (Dr) Durgesh Tripathi , Dr. Sachin Bharti and Dr. Ajay Gupta( right).png", alt: "Prof. MN Hoda & others", caption: "Prof. MN Hoda, Raseshvari Hindustani, Prof. Sanjeev Bhanawat & others", aspect: "16/9" },
    // Newspaper / square clippings
    { src: "/journey/BSE.png", alt: "BSE Feature", caption: "BSE Feature", aspect: "2/1" },
    { src: "/journey/Dainik jagaran.png", alt: "Dainik Jagran Coverage", caption: "Dainik Jagran Coverage", aspect: "3/3" },
    { src: "/journey/Dainik Jagran png.png", alt: "Dainik Jagran", caption: "Dainik Jagran", aspect: "3/3" },
    { src: "/journey/Dainik tribune.png", alt: "Dainik Tribune Coverage", caption: "Dainik Tribune Coverage", aspect: "3/2" },
    { src: "/journey/25_20260323_230922_0001.png", alt: "Journey moment", caption: "", aspect: "4/3" },
];

// Parse "w/h" string into a numeric ratio
function toRatio(aspect: string): number {
    const [w, h] = aspect.split("/").map(Number);
    return w / h;
}

// Split photos into two rows
const row1 = photos.filter((_, i) => i % 2 === 0);
const row2 = photos.filter((_, i) => i % 2 === 1);

// A single masonry card whose width is derived from the fixed row height × aspect ratio
function MasonryCard({ photo, rowH }: { photo: typeof photos[0]; rowH: number }) {
    const w = Math.round(rowH * toRatio(photo.aspect));
    return (
        <div
            className="relative overflow-hidden rounded-xl group cursor-pointer flex-shrink-0"
            style={{ width: w, height: rowH }}
        >
            <img
                src={photo.src}
                alt={photo.alt}
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
            />
            {/* Remove full image overlay, use bottom gradient for text visibility */}
            {photo.caption && (
                <div className="absolute bottom-0 left-0 right-0 pt-16 pb-3 px-3 md:pt-20 md:pb-4 md:px-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    <p className="text-white text-[12px] md:text-[13px] leading-snug font-medium font-[var(--font-dm-sans)] drop-shadow-md">
                        {photo.caption}
                    </p>
                </div>
            )}
        </div>
    );
}

// An infinitely scrolling row with manual scroll arrows
function ScrollRow({
    items,
    rowH,
    duration,
    reverse = false,
}: {
    items: typeof photos;
    rowH: number;
    duration: string;
    reverse?: boolean;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isManualScroll, setIsManualScroll] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const doubled = [...items, ...items, ...items]; // Triple for seamless wrapping on scroll

    // Initialize scroll position once on mount
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        requestAnimationFrame(() => {
            const oneThird = el.scrollWidth / 3;
            el.scrollLeft = oneThird;
        });
        
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    // Handle auto-scroll animation loop
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        let animationFrameId: number;
        const speed = 0.5; // pixels per frame

        const tick = () => {
            const oneThird = el.scrollWidth / 3;
            if (!isHovered && !isManualScroll) {
                if (reverse) {
                    el.scrollLeft -= speed;
                } else {
                    el.scrollLeft += speed;
                }

                // Smooth looping logic inside the middle third
                if (el.scrollLeft >= oneThird * 2) {
                    el.scrollLeft -= oneThird;
                } else if (el.scrollLeft <= oneThird) {
                    el.scrollLeft += oneThird;
                }
            }
            animationFrameId = requestAnimationFrame(tick);
        };

        animationFrameId = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [isHovered, isManualScroll, reverse]);

    const handleScroll = () => {
        const el = containerRef.current;
        if (!el) return;
        const oneThird = el.scrollWidth / 3;
        if (el.scrollLeft >= oneThird * 2) {
            el.scrollLeft -= oneThird;
        } else if (el.scrollLeft <= oneThird) {
            el.scrollLeft += oneThird;
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        const el = containerRef.current;
        if (!el) return;

        setIsManualScroll(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        const scrollAmount = 450;
        const targetScroll = el.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

        el.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });

        timeoutRef.current = setTimeout(() => {
            setIsManualScroll(false);
        }, 3000);
    };

    return (
        <div 
            className="relative group/row overflow-hidden w-full rounded-xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Left arrow */}
            <button 
                onClick={() => scroll('left')}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black text-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/row:opacity-100 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Scroll left"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>

            {/* Right arrow */}
            <button 
                onClick={() => scroll('right')}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black text-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/row:opacity-100 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Scroll right"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>

            {/* Scroll Container */}
            <div
                ref={containerRef}
                className="overflow-x-auto scrollbar-none flex gap-3 md:gap-4 select-none w-full"
                style={{ height: rowH }}
                onScroll={handleScroll}
            >
                {doubled.map((photo, i) => (
                    <MasonryCard key={i} photo={photo} rowH={rowH} />
                ))}
            </div>
        </div>
    );
}

export default function Journey() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const s = sectionRef.current;
        if (!s) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(
                s.querySelectorAll(".jrn-reveal"),
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power3.out",
                    scrollTrigger: { trigger: s, start: "20% bottom", toggleActions: "play none none reset" },
                }
            );
        }, s);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-white flex flex-col relative overflow-hidden pt-6 md:pt-10 p-3 md:p-5">
            <style>{`
                .scrollbar-none::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-none {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            {/* Header */}
            <div className="jrn-reveal flex flex-col sm:flex-row sm:items-end justify-between px-4 sm:px-8 md:px-12 pt-6 md:pt-8 pb-4 md:pb-6 flex-shrink-0 gap-4 sm:gap-0">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-[2px] rounded-full bg-[#c42d2d]" />
                        <p className="text-[10px] md:text-xs uppercase tracking-[.25em] text-[#c42d2d] font-semibold font-[var(--font-dm-sans)]">
                            Gallery
                        </p>
                    </div>
                    <h2 className="section-heading text-[24px] sm:text-[32px] md:text-[44px] font-semibold text-[#111] leading-[1.1] font-[var(--font-playfair)]">
                        A Window into{' '}
                        <span className="italic text-[#c42d2d] font-bold">her Journey</span>
                    </h2>
                </div>
                <button className="flex items-center gap-2.5 bg-[#c42d2d] text-white px-4 sm:px-5 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-bold font-[var(--font-outfit)] shadow-lg shadow-[#c42d2d]/20 hover:bg-[#a82525] hover:scale-105 transition-all duration-300 flex-shrink-0 self-start sm:self-auto">
                    Step into her journey
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Two masonry scroll rows */}
            <div className="jrn-reveal flex flex-col gap-3 md:gap-4 px-3 sm:px-8 md:px-12 pb-6 md:pb-10 flex-shrink-0">
                {/* Row 1 — scrolls left */}
                <ScrollRow items={row1} rowH={180} duration="85s" />
                {/* Row 2 — scrolls right */}
                <ScrollRow items={row2} rowH={180} duration="80s" reverse />
            </div>
        </section>
    );
}