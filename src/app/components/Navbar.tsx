"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Gallery", href: "/sessions" },
  { label: "Our Blogs", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Trigger sticky after scrolling past roughly the hero height
      setSticky(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <style jsx>{`
        .hamburger-line {
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s, width 0.3s;
        }
        .mobile-overlay {
          animation: fadeIn 0.3s ease-out;
        }
        .mobile-link {
          animation: slideUp 0.4s ease-out both;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── DEFAULT: Left-aligned, absolute navbar (visible at top) ── */}
      <div
        className={`absolute top-0 left-0 z-50 w-full md:w-auto px-5 md:px-10 pt-5 pointer-events-none transition-opacity duration-300 ${sticky ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
      >
        <div className="flex items-center gap-6 md:gap-10 justify-between md:justify-start pointer-events-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-[#c42d2d] flex items-center justify-center shadow-md shadow-[#c42d2d]/20 group-hover:shadow-lg group-hover:shadow-[#c42d2d]/30 transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-[14px] tracking-tight font-[var(--font-playfair)]">R</span>
            </div>
            <h2 className="text-xl font-semibold tracking-tight text-[#2d2d2d] font-[var(--font-inter)]">
              RAS
            </h2>
          </Link>

          {/* Desktop Menu - Left pills */}
          <div className="hidden md:flex items-center gap-1 text-[14px] font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-5 py-2 rounded-full transition-all duration-300 group ${link.href === "/"
                    ? "bg-[#c42d2d] text-white shadow-md shadow-[#c42d2d]/20"
                    : "text-[#555] hover:text-[#1f201d] hover:bg-gray-100/60"
                  }`}
              >
                {link.label}
                {link.href !== "/" && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#c42d2d] rounded-full transition-all duration-300 group-hover:w-4" />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger (top-left state) */}
          <button
            className="md:hidden w-10 h-10 rounded-xl bg-white/80 backdrop-blur-md border border-gray-200/80 flex items-center justify-center shadow-sm"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span className={`hamburger-line block h-[2px] bg-[#1f201d] rounded-full ${open ? "transform rotate-45 translate-y-[7px] w-5" : "w-5"}`} />
              <span className={`hamburger-line block h-[2px] bg-[#1f201d] rounded-full ${open ? "opacity-0 w-0" : "opacity-100 w-3.5"}`} />
              <span className={`hamburger-line block h-[2px] bg-[#1f201d] rounded-full ${open ? "transform -rotate-45 -translate-y-[7px] w-5" : "w-5"}`} />
            </div>
          </button>
        </div>
      </div>

      {/* ── STICKY: Centered fixed navbar (appears after scrolling past hero) ── */}
      <div
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${sticky
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        style={{ animation: sticky ? "slideDown 0.4s ease-out" : "none" }}
      >
        <div className="bg-white/85 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.08)] border border-gray-200/60 rounded-2xl px-2 py-1.5 flex items-center gap-1">
          {/* Mini logo */}
          <Link href="/" className="w-8 h-8 rounded-xl bg-[#c42d2d] flex items-center justify-center shadow-sm shadow-[#c42d2d]/15 mr-1 flex-shrink-0 hover:scale-105 transition-transform duration-200">
            <span className="text-white font-bold text-[12px] font-[var(--font-playfair)]">R</span>
          </Link>

          {/* Nav pills */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 rounded-xl text-[13px] font-medium transition-all duration-300 ${link.href === "/"
                    ? "bg-[#c42d2d] text-white shadow-sm shadow-[#c42d2d]/15"
                    : "text-[#666] hover:text-[#1f201d] hover:bg-gray-100/80"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/contact"
            className="hidden md:flex items-center gap-1.5 bg-[#1f201d] text-white px-4 py-1.5 rounded-xl text-[12px] font-semibold ml-1 hover:bg-[#333] transition-all duration-200 flex-shrink-0 group"
          >
            Book
            <svg className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
            </svg>
          </Link>

          {/* Mobile hamburger (sticky state) */}
          <button
            className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className="w-4 h-3 relative flex flex-col justify-between">
              <span className={`hamburger-line block h-[1.5px] bg-[#1f201d] rounded-full ${open ? "transform rotate-45 translate-y-[5px] w-4" : "w-4"}`} />
              <span className={`hamburger-line block h-[1.5px] bg-[#1f201d] rounded-full ${open ? "opacity-0 w-0" : "opacity-100 w-3"}`} />
              <span className={`hamburger-line block h-[1.5px] bg-[#1f201d] rounded-full ${open ? "transform -rotate-45 -translate-y-[5px] w-4" : "w-4"}`} />
            </div>
          </button>
        </div>
      </div>

      {/* ── Mobile Full-Screen Menu ── */}
      {open && (
        <div className="mobile-overlay fixed inset-0 z-[55] md:hidden">
          <div className="absolute inset-0 bg-white/95 backdrop-blur-2xl" />

          <div className="relative z-10 flex flex-col h-full pt-24 px-8 pb-10">
            <div className="flex-1 flex flex-col justify-center -mt-16">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="mobile-link group flex items-center justify-between py-5 border-b border-gray-100 last:border-0"
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[11px] text-[#c42d2d]/40 font-mono font-medium">
                      0{i + 1}
                    </span>
                    <span className="text-[28px] font-[var(--font-playfair)] text-[#1f201d] font-medium group-hover:text-[#c42d2d] transition-colors duration-300">
                      {link.label}
                    </span>
                  </div>
                  <svg className="w-5 h-5 text-gray-300 group-hover:text-[#c42d2d] transition-all duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>

            <div className="mobile-link flex flex-col gap-5" style={{ animationDelay: '0.35s' }}>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 bg-[#c42d2d] text-white py-4 rounded-2xl text-[16px] font-bold shadow-xl shadow-[#c42d2d]/20 hover:bg-[#a82525] transition-all duration-300"
              >
                Book Your Session
              </Link>
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-[#bbb] uppercase tracking-[.2em] font-medium">© 2026 Raseshvari</p>
                <div className="flex items-center gap-3">
                  {["Instagram", "YouTube"].map((s) => (
                    <a key={s} href="#" className="text-[11px] text-[#999] hover:text-[#c42d2d] font-medium uppercase tracking-wider transition-colors duration-300">{s}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
