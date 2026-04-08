"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Journey photos — each has an explicit aspect ratio (w/h)
const photos: { src: string; alt: string; caption: string; aspect: string }[] = [
    // Portrait / headshot style
    { src: "/journey/Daya prakash sinha.png", alt: "Padma Shri Daya Prakash Sinha ji", caption: "Padma Shri Daya Prakash Sinha ji", aspect: "3/4" },
    { src: "/journey/Pushpeshpant.png", alt: "Padma Shri Pushpesh Pant ji", caption: "Padma Shri Pushpesh Pant ji", aspect: "3/4" },
    { src: "/journey/Anchor sadhna Shrivastav.png", alt: "Anchor Sadhna Shrivastava", caption: "Anchor Sadhna Shrivastava", aspect: "3/4" },
    { src: "/journey/Salma sultan.png", alt: "Actor Salma Sultan ji", caption: "Actor Salma Sultan ji", aspect: "3/4" },
    { src: "/journey/Sonal Mansingh.png", alt: "Classical Dancer Sonal Mansingh ji", caption: "Classical Dancer Sonal Mansingh ji", aspect: "3/4" },
    { src: "/journey/Rita Gangwani png.png", alt: "National Awardee Rita Gangwani", caption: "National Awardee Rita Gangwani", aspect: "3/4" },
    { src: "/journey/Avi Arya.png", alt: "Avi Arya", caption: "Avi Arya", aspect: "3/4" },
    { src: "/journey/Kiran bedi.png", alt: "Dr. Kiran Bedi", caption: "Dr. Kiran Bedi", aspect: "2/3" },
    { src: "/journey/Chef Davinder.png", alt: "Chef Davinder Kumar", caption: "Chef Davinder Kumar", aspect: "3/4" },
    { src: "/journey/Naseer abdullah.png", alt: "Naseer Abdullah", caption: "Naseer Abdullah", aspect: "3/4" },
    { src: "/journey/Pratibha prahalad.png", alt: "Pratibha Prahlad", caption: "Pratibha Prahlad", aspect: "3/4" },
    { src: "/journey/Rama Pandey.png", alt: "Journalist Rama Pandey", caption: "Journalist Rama Pandey", aspect: "3/4" },
    { src: "/journey/Artist monika gour png.png", alt: "Artist Monica Gaur", caption: "Artist Monica Gaur", aspect: "3/4" },
    // Landscape / group shots
    { src: "/journey/Maya parijat and Shovana Narayan.png", alt: "Padma Shri Shovana Narayan & Maya Parijat", caption: "Padma Shri Shovana Narayan ji (middle), Maya Parijat (left)", aspect: "4/3" },
    { src: "/journey/Padma shri shyam sharma ji.png", alt: "Padma Shri Shyam Sharma ji", caption: "Padma Shri Shyam Sharma ji", aspect: "4/3" },
    { src: "/journey/Manisha gawade and wasif Uddin dagar ji.png", alt: "Ustad Wasifuddin Dagar & Manisha Gawde", caption: "Padma Shri Ustad Wasifuddin Dagar ji (right) & Manisha Gawde (middle)", aspect: "4/3" },
    { src: "/journey/barnalee_chattopadhyay.png", alt: "Singer Barnalee Chattopadhyay", caption: "Singer Barnalee Chattopadhyay", aspect: "4/3" },
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
                    <p className="text-white text-[12px] md:text-[15px] leading-snug font-semibold font-[var(--font-dm-sans)] drop-shadow-md">
                        {photo.caption}
                    </p>
                </div>
            )}
        </div>
    );
}

// An infinitely scrolling row (doubles the items for seamless loop)
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
    const doubled = [...items, ...items];
    const animName = reverse ? "journey-scroll-rev" : "journey-scroll-fwd";
    return (
        <div className="overflow-hidden" style={{ height: rowH }}>
            <div
                className="journey-track"
                style={{ animationName: animName, animationDuration: duration, height: rowH }}
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
        <section ref={sectionRef} className="bg-white flex flex-col relative overflow-hidden pt-10 p-5">
            <style>{`
                @keyframes journey-scroll-fwd {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes journey-scroll-rev {
                    0%   { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                .journey-track {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    width: max-content;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
                .journey-track:hover {
                    animation-play-state: paused;
                }
            `}</style>

            {/* Header */}
            <div className="jrn-reveal flex items-end justify-between px-8 md:px-12 pt-8 pb-6 flex-shrink-0">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-[2px] rounded-full bg-[#c42d2d]" />
                        <p className="text-[10px] md:text-xs uppercase tracking-[.25em] text-[#c42d2d] font-semibold font-[var(--font-dm-sans)]">
                            Gallery
                        </p>
                    </div>
                    <h2 className="text-[28px] md:text-[44px] font-semibold text-[#111] leading-[1.1]">
                        A Window into{' '}
                        <span className="italic text-[#c42d2d] font-bold">her Journey</span>
                    </h2>
                </div>
                <button className="flex items-center gap-2.5 bg-[#c42d2d] text-white px-5 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-bold font-[var(--font-outfit)] shadow-lg shadow-[#c42d2d]/20 hover:bg-[#a82525] hover:scale-105 transition-all duration-300 flex-shrink-0">
                    Step into her journey
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Two masonry scroll rows */}
            <div className="jrn-reveal flex flex-col gap-4 px-8 md:px-12 pb-10 flex-shrink-0">
                {/* Row 1 — taller, scrolls left */}
                <ScrollRow items={row1} rowH={300} duration="85s" />
                {/* Row 2 — shorter, scrolls right */}
                <ScrollRow items={row2} rowH={260} duration="80s" reverse />
            </div>
        </section>
    );
}