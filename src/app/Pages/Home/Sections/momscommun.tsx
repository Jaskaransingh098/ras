"use client";

import Image from "next/image";

// Placeholder data for the gallery
const galleryItems = Array.from({ length: 7 }).map((_, i) => ({
    id: i + 1,
    src: `/moms/mom-${(i % 5) + 1}.jpg`, // Placeholder images path
    alt: `Moms Community Event ${i + 1}`,
}));

export default function MomsCommunity() {
    return (
        <section className="relative h-[90dvh] flex justify-center items-center py-6 md:py-10 bg-white overflow-hidden">
            <div className="relative z-10 w-full h-full max-w-[1400px] mx-auto px-4 md:px-8">

                {/* 5-Column Grid Layout spanning full height */}
                <div className="w-full h-full flex gap-3 md:gap-5 px-2">

                    {/* Col 1 */}
                    <div className="flex-1 flex flex-col gap-3 md:gap-5 h-full pt-[3%]">
                        <div className="relative h-[50%] rounded-[24px] md:rounded-[36px] overflow-hidden group shadow-md">
                            <Image src={galleryItems[0].src} alt={galleryItems[0].alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="relative h-[50%] rounded-[20px] md:rounded-[24px] overflow-hidden group shadow-md">
                            <Image src={galleryItems[1].src} alt={galleryItems[1].alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                    </div>

                    {/* Col 2 */}
                    <div className="flex-[1.1] flex flex-col h-full pt-[10%]">
                        <div className="relative h-[80%] rounded-[24px] md:rounded-[36px] overflow-hidden group shadow-md">
                            <Image src={galleryItems[2].src} alt={galleryItems[2].alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                    </div>

                    {/* Col 3: CENTER COLUMN - Contains Text and 1 Image at the bottom */}
                    <div className="flex-[1.8] flex flex-col h-full justify-between items-center text-center pt-[5%] pb-[1%] px-2">

                        {/* Text Content */}
                        <div className="flex flex-col items-center">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-6 h-px bg-gradient-to-r from-transparent to-[#c42d2d]" />
                                <span className="text-[#c42d2d] text-[10px] md:text-[11px] uppercase tracking-[.3em] font-semibold font-[var(--font-dm-sans)]">
                                    Initiative
                                </span>
                                <div className="w-6 h-px bg-gradient-to-l from-transparent to-[#c42d2d]" />
                            </div>

                            <h2 className="text-[34px] md:text-[46px] lg:text-[54px] font-[var(--font-playfair)] text-[#111] font-bold leading-[1.05] tracking-tight mb-4">
                                MOMS <br /> <span className="font-light italic text-[#c42d2d]">COMMUNITY</span>
                            </h2>

                            <p className="text-[#555] text-[14px] md:text-[15px] lg:text-[16px] font-[var(--font-dm-sans)] max-w-md leading-relaxed mb-6">
                                I&apos;m invited to speak with institutions, organizations, leaders, and young minds on how energy shapes choices and decisions—bringing clarity and ease, especially in high-pressure environments.
                            </p>

                            <button className="bg-[#1a1a1a] text-white hover:bg-[#c42d2d] transition-colors px-8 py-3 rounded-[12px] font-medium text-[14px] font-[var(--font-dm-sans)] shadow-md">
                                Join Community
                            </button>
                        </div>

                        {/* Bottom Image in Center Col */}
                        <div className="relative w-full flex-1 rounded-[24px] md:rounded-[36px] overflow-hidden group shadow-md mt-8">
                            <Image src={galleryItems[3].src} alt={galleryItems[3].alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                    </div>

                    {/* Col 4 */}
                    <div className="flex-[1.1] flex flex-col h-full pt-[10%]">
                        <div className="relative h-[80%] rounded-[24px] md:rounded-[36px] overflow-hidden group shadow-md">
                            <Image src={galleryItems[4].src} alt={galleryItems[4].alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                    </div>

                    {/* Col 5 */}
                    <div className="flex-1 flex flex-col gap-3 md:gap-5 h-full pt-[2%]">
                        <div className="relative h-[50%] rounded-[24px] md:rounded-[40px] overflow-hidden group shadow-md">
                            <Image src={galleryItems[5].src} alt={galleryItems[5].alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="relative h-[50%] rounded-[20px] md:rounded-[24px] overflow-hidden group shadow-md">
                            <Image src={galleryItems[6].src} alt={galleryItems[6].alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
