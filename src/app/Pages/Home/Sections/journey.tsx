"use client";

const photos = [
    { src: "/journey/1.jpeg", alt: "Journey moment 1" },
    { src: "/journey/2.jpeg", alt: "Journey moment 2" },
    { src: "/journey/3.jpeg", alt: "Journey moment 3" },
    { src: "/journey/4.jpeg", alt: "Journey moment 4" },
    { src: "/journey/5.jpeg", alt: "Journey moment 5" },
    { src: "/journey/6.jpeg", alt: "Journey moment 6" },
    { src: "/journey/7.jpeg", alt: "Journey moment 7" },
    { src: "/journey/8.jpeg", alt: "Journey moment 8" },
    { src: "/journey/9.jpeg", alt: "Journey moment 9" },
    { src: "/journey/10.jpeg", alt: "Journey moment 10" },
];

export default function Journey() {
    return (
        <section className="h-[93vh] bg-white flex flex-col relative overflow-hidden pt-10 p-5">
            <style jsx>{`
                .bento-grid {
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    grid-template-rows: repeat(3, 1fr);
                    gap: 6px;
                    height: 100%;
                }
                .bento-grid .item-0 { grid-column: 1 / 3; grid-row: 1 / 3; }
                .bento-grid .item-1 { grid-column: 3; grid-row: 1; }
                .bento-grid .item-2 { grid-column: 4; grid-row: 1; }
                .bento-grid .item-3 { grid-column: 5; grid-row: 1 / 3; }
                .bento-grid .item-4 { grid-column: 3; grid-row: 2; }
                .bento-grid .item-5 { grid-column: 4; grid-row: 2; }
                .bento-grid .item-6 { grid-column: 1; grid-row: 3; }
                .bento-grid .item-7 { grid-column: 2; grid-row: 3; }
                .bento-grid .item-8 { grid-column: 3 / 5; grid-row: 3; }
                .bento-grid .item-9 { grid-column: 5; grid-row: 3; }
                @media (max-width: 768px) {
                    .bento-grid {
                        grid-template-columns: repeat(3, 1fr);
                        grid-template-rows: repeat(4, 1fr);
                    }
                    .bento-grid .item-0 { grid-column: 1 / 3; grid-row: 1 / 3; }
                    .bento-grid .item-1 { grid-column: 3; grid-row: 1; }
                    .bento-grid .item-2 { grid-column: 3; grid-row: 2; }
                    .bento-grid .item-3 { grid-column: 1; grid-row: 3; }
                    .bento-grid .item-4 { grid-column: 2; grid-row: 3; }
                    .bento-grid .item-5 { grid-column: 3; grid-row: 3; }
                    .bento-grid .item-6 { grid-column: 1; grid-row: 4; }
                    .bento-grid .item-7 { grid-column: 2; grid-row: 4; }
                    .bento-grid .item-8 { grid-column: 3; grid-row: 4; display: none; }
                    .bento-grid .item-9 { display: none; }
                }
            `}</style>

            {/* Header row */}
            <div className="flex items-end justify-between px-8 md:px-12 pt-8 pb-5 flex-shrink-0">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-[2px] rounded-full bg-[#c42d2d]" />
                        <p className="text-[10px] md:text-xs uppercase tracking-[.25em] text-[#c42d2d] font-semibold">
                            Gallery
                        </p>
                    </div>
                    <h2 className="text-[28px] md:text-[44px] font-[var(--font-playfair)] text-[#111] leading-[1.1]">
                        A Window into{' '}
                        <span className="italic font-bold">her Journey</span>
                    </h2>
                </div>
                <button className="flex items-center gap-2.5 bg-[#c42d2d] text-white px-5 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-bold shadow-lg shadow-[#c42d2d]/20 hover:bg-[#a82525] hover:scale-105 transition-all duration-300 flex-shrink-0">
                    Step into her journey
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Bento mosaic grid */}
            <div className="flex-1 min-h-0 px-8 md:px-12 pb-8">
                <div className="bento-grid h-full">
                    {photos.map((photo, i) => (
                        <div key={i} className={`item-${i} relative overflow-hidden rounded-xl group cursor-pointer`}>
                            <img
                                src={photo.src}
                                alt={photo.alt}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                            {/* Number badge */}
                            <div className="absolute top-2 left-2 w-6 h-6 md:w-7 md:h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm">
                                <span className="text-[#c42d2d] text-[9px] md:text-[10px] font-bold">{String(i + 1).padStart(2, "0")}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}