"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Hero from "./Sections/hero";
import Welcome from "./Sections/welcome";
import Experience from "./Sections/experience";
import Reel from "./Sections/reels";
import How from "./Sections/how";
import ScrollPoints from "./Sections/scrollPoints";
import Journey from "./Sections/journey";
import Services2 from "./Sections/services2";
import Speaker from "./Sections/speaker";
import LinkedIn from "./Sections/linkedin";
import Dare from "./Sections/dare";
import MomsCommunity from "./Sections/momscommun";
import Blog from "./Sections/blog";
import Quotes from "./Sections/quotes";
import InstagramPosts from "./Sections/instagramPosts";
import Contact from "./Sections/contact";

/* ─── Collapsible Section Wrapper with Preview ─── */
function CollapsibleSection({
  title,
  subtitle,
  icon,
  isOpen,
  onToggle,
  preview,
  children,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  preview: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <button
        onClick={onToggle}
        className={`w-full group flex items-center gap-4 md:gap-6 px-5 md:px-8 py-4 md:py-5 rounded-2xl md:rounded-3xl transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer ${
          isOpen
            ? "bg-gradient-to-r from-[#c42d2d]/10 to-[#c42d2d]/5 border border-[#c42d2d]/20 shadow-[0_8px_30px_-8px_rgba(196,45,45,0.15)]"
            : "bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.06)] hover:border-[#c42d2d]/15 hover:shadow-[0_8px_25px_-5px_rgba(196,45,45,0.1)] hover:bg-white"
        }`}
      >
        {/* Icon */}
        <div
          className={`flex-shrink-0 w-11 h-11 md:w-13 md:h-13 rounded-2xl flex items-center justify-center transition-all duration-500 ${
            isOpen
              ? "bg-[#c42d2d] shadow-lg shadow-[#c42d2d]/25"
              : "bg-gradient-to-br from-[#c42d2d]/10 to-[#c42d2d]/5 group-hover:from-[#c42d2d]/15 group-hover:to-[#c42d2d]/8"
          }`}
        >
          <span className={`transition-colors duration-300 ${isOpen ? "text-white" : "text-[#c42d2d]"}`}>
            {icon}
          </span>
        </div>

        {/* Text + Preview */}
        <div className="flex-1 text-left min-w-0">
          <h3
            className={`text-[16px] md:text-[19px] font-[var(--font-playfair)] font-bold leading-tight transition-colors duration-300 ${
              isOpen ? "text-[#c42d2d]" : "text-[#111] group-hover:text-[#8a0a0a]"
            }`}
          >
            {title}
          </h3>
          <p className="text-[11px] md:text-[13px] text-gray-500 font-[var(--font-dm-sans)] mt-0.5 truncate">
            {subtitle}
          </p>

          {/* Preview strip — visible only when collapsed */}
          {!isOpen && (
            <div className="mt-2.5 transition-all duration-500">
              {preview}
            </div>
          )}
        </div>

        {/* Arrow / toggle */}
        <div
          className={`flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
            isOpen
              ? "bg-[#c42d2d] border-[#c42d2d] shadow-md shadow-[#c42d2d]/30"
              : "bg-gray-50 border-gray-300 group-hover:border-[#c42d2d]/30 group-hover:bg-white"
          }`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isOpen ? "white" : "#c42d2d"}
            strokeWidth="2.5"
            strokeLinecap="round"
            className={`transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </button>

      {/* Collapsible content */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Preview Components ─── */

function MomsPreview() {
  return (
    <div className="flex items-center gap-2">
      {/* Mini thumbnails */}
      <div className="flex -space-x-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-7 h-7 rounded-full border-2 border-white overflow-hidden shadow-sm relative flex-shrink-0">
            <Image src={`/moms/${i}.png`} alt={`Mom ${i}`} fill className="object-cover" sizes="28px" />
          </div>
        ))}
      </div>
      <span className="text-[10px] text-gray-400 font-[var(--font-dm-sans)] ml-1">
        Pan-India nurturing space for mothers
      </span>
    </div>
  );
}

function DarePreview() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2">
        {[0, 2, 4, 6].map((i) => {
          const num = String(i).padStart(4, "0");
          return (
            <div key={i} className="w-7 h-7 rounded-full border-2 border-white overflow-hidden shadow-sm relative flex-shrink-0">
              <Image src={`/dare/dare to dream_20260412_140731_${num}.png`} alt={`Guest ${i}`} fill className="object-cover" sizes="28px" />
            </div>
          );
        })}
      </div>
      <span className="text-[10px] text-gray-400 font-[var(--font-dm-sans)] ml-1">
        52 renowned voices · Padma Shri awardees
      </span>
    </div>
  );
}

function QuotesPreview() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex -space-x-1.5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-8 h-8 rounded-lg border-2 border-white overflow-hidden shadow-sm relative flex-shrink-0">
            <Image src={`/quotes/${i}.png`} alt={`Quote ${i}`} fill className="object-cover" sizes="32px" />
          </div>
        ))}
      </div>
      <span className="text-[10px] text-gray-400 font-[var(--font-dm-sans)] italic ml-0.5">
        &ldquo;Energy is the foundation of everything...&rdquo;
      </span>
    </div>
  );
}

function BlogPreview() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5">
        <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-[#c42d2d] bg-[#c42d2d]/6 border border-[#c42d2d]/15 rounded-full px-2 py-0.5 font-[var(--font-dm-sans)]">
          <span className="w-1 h-1 rounded-full bg-[#c42d2d]" />
          New
        </span>
      </div>
      <span className="text-[10px] text-gray-400 font-[var(--font-dm-sans)] truncate">
        &ldquo;But You Create Miracles For Others...&rdquo; + 1 more article
      </span>
    </div>
  );
}

export default function Home() {
  const scrollRef = useRef<HTMLElement | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (key: string) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  return (
    <main ref={scrollRef} className="min-h-screen">
      <section className=" px-0">
        <Hero />
      </section>

      <section className="h-[]">
        <Welcome scrollRef={scrollRef} />
      </section>

      <section className="min-h-fit mt-2 px-0">
        <Experience scrollRef={scrollRef} />
      </section>

      <section className="">
        <Reel scrollRef={scrollRef} />
      </section>

      <section className="">
        <How scrollRef={scrollRef} />
      </section>

      <section className="">
        <ScrollPoints />
      </section>

      <section className="">
        <Journey />
      </section>

      {/* <section className="">
        <Services />
      </section> */}

      <section className="">
        <Services2 />
      </section>

      <section className="mt-1">
        <Speaker />
      </section>

      <section className="">
        <LinkedIn />
      </section>

      {/* ══ Collapsible Sections ══ */}
      <section className="py-10 md:py-14 px-4 md:px-10 bg-gradient-to-b from-[#faf8f6] to-[#f5f0ec]">
        <div className="max-w-9xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-8 md:mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 h-[2px] bg-gradient-to-r from-transparent to-[#c42d2d]" />
              <span className="text-[#c42d2d] text-[10px] md:text-xs uppercase tracking-[.3em] font-semibold font-[var(--font-dm-sans)]">
                Explore More
              </span>
              <div className="w-8 h-[2px] bg-gradient-to-l from-transparent to-[#c42d2d]" />
            </div>
            <h2 className="text-[26px] md:text-[38px] font-[var(--font-playfair)] text-[#111] font-bold leading-[1.1]">
              Discover{" "}
              <span className="italic text-[#c42d2d]">Her World</span>
            </h2>
          </div>

          <div className="flex flex-col gap-3 md:gap-4">
            {/* 1. Moms Community */}
            <CollapsibleSection
              title="MOMS Community"
              subtitle="Multitasking Outstanding Mothers Space — a nurturing pan-India community"
              preview={<MomsPreview />}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              }
              isOpen={openSection === "moms"}
              onToggle={() => toggleSection("moms")}
            >
              <MomsCommunity />
            </CollapsibleSection>

            {/* 2. Dare to Dream */}
            <CollapsibleSection
              title="Dare to Dream"
              subtitle="Instagram Live series with 52 renowned voices including Padma Shri awardees"
              preview={<DarePreview />}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              }
              isOpen={openSection === "dare"}
              onToggle={() => toggleSection("dare")}
            >
              <Dare />
            </CollapsibleSection>

            {/* 3. Daily Wisdom / Quotes */}
            <CollapsibleSection
              title="Daily Wisdom"
              subtitle="Graphic quotes & reflections — shifting energy one thought at a time"
              preview={<QuotesPreview />}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3z" />
                </svg>
              }
              isOpen={openSection === "quotes"}
              onToggle={() => toggleSection("quotes")}
            >
              <Quotes />
            </CollapsibleSection>

            {/* 4. Blog / Articles */}
            <CollapsibleSection
              title="Words That Shift Things"
              subtitle="Articles & journal entries — insights & inspiration"
              preview={<BlogPreview />}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              }
              isOpen={openSection === "blog"}
              onToggle={() => toggleSection("blog")}
            >
              <Blog />
            </CollapsibleSection>
          </div>
        </div>
      </section>

      {/* ══ Instagram Posts — Separate section below collapsibles ══ */}
      <section className="">
        <InstagramPosts />
      </section>

      <section className="" id="contact">
        <Contact />
      </section>
    </main>
  );
}
