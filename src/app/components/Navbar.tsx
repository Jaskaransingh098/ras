"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Gallery", href: "/sessions" },
  { label: "Our Blogs", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const pathname = usePathname() || "/";

  useEffect(() => {
    const onScroll = () => {
      setSticky(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        .nav-pill-enter {
          animation: slideDown 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>

      {/* ── DEFAULT: Centered glass pill navbar ~90% wide (hero / video section) ── */}
      <div
        className={`absolute top-3 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${sticky ? "opacity-0 pointer-events-none -translate-y-3" : "opacity-100 translate-y-0"}`}
        style={{ width: "min(92vw, 1200px)" }}
      >
        {/* Desktop glass pill */}
        <div
          className="hidden md:flex items-center gap-3 px-5 py-3 w-full"
          style={{
            background: "rgba(0,0,0,0.15)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 mr-3 group transition-opacity duration-200 hover:opacity-80">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #c42d2d, #9b1c1c)",
                boxShadow: "0 2px 14px rgba(196,45,45,0.6)",
              }}
            >
              <span className="font-bold text-[13px] font-[var(--font-playfair)]" style={{ color: "#f5eeee" }}>R</span>
            </div>
            <span className="font-bold text-[15px] tracking-widest font-[var(--font-dm-sans)] uppercase" style={{ color: "#f5eeee" }}>RAS</span>
          </Link>

          {/* Nav links fill space */}
          <div className="flex-1">
            <HeroNav links={navLinks} pathname={pathname} />
          </div>

          {/* CTA — solid red, always visible */}
          <Link
            href="/contact"
            className="flex items-center gap-1.5 px-5 py-2.5 text-[13px] font-bold font-[var(--font-outfit)] flex-shrink-0 transition-all duration-200 group"
            style={{
              background: "#c42d2d",
              color: "#f5eeee",
              borderRadius: "999px",
              boxShadow: "0 2px 14px rgba(196,45,45,0.45)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#a82525";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(196,45,45,0.6)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#c42d2d";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 14px rgba(196,45,45,0.45)";
            }}
          >
            Book a Session
            <svg className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between px-5 py-3 rounded-full"
          style={{
            background: "rgba(0,0,0,0.15)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#c42d2d,#9b1c1c)", boxShadow: "0 2px 12px rgba(196,45,45,0.55)" }}
            >
              <span className="font-bold text-[13px] font-[var(--font-playfair)]" style={{ color: "#f5eeee" }}>R</span>
            </div>
            <span className="font-bold text-[15px] tracking-widest uppercase font-[var(--font-dm-sans)]" style={{ color: "#f5eeee" }}>RAS</span>
          </Link>
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(196,45,45,0.18)", border: "1px solid rgba(196,45,45,0.3)" }}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span className={`hamburger-line block h-[2px] rounded-full ${open ? "transform rotate-45 translate-y-[7px] w-5" : "w-5"}`} style={{ background: "#f5eeee" }} />
              <span className={`hamburger-line block h-[2px] rounded-full ${open ? "opacity-0 w-0" : "opacity-100 w-3.5"}`} style={{ background: "#f5eeee" }} />
              <span className={`hamburger-line block h-[2px] rounded-full ${open ? "transform -rotate-45 -translate-y-[7px] w-5" : "w-5"}`} style={{ background: "#f5eeee" }} />
            </div>
          </button>
        </div>
      </div>

      {/* ── STICKY: Pill-shaped dark floating navbar ── */}
      <div
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${sticky
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-5 pointer-events-none"
          }`}
      >
        <div
          className="nav-pill-enter flex items-center gap-2 px-3 py-2"
          style={{
            background: "rgba(0,0,0,0.2)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
            minWidth: "min(780px, 92vw)",
          }}
        >
          {/* Logo — icon + wordmark on the left */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 mr-2 group transition-opacity duration-200 hover:opacity-80">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #c42d2d, #9b1c1c)",
                boxShadow: "0 2px 10px rgba(196,45,45,0.40)",
              }}
            >
              <span className="text-white font-bold text-[12px] font-[var(--font-playfair)]">R</span>
            </div>
            <span className="text-white font-semibold text-[14px] tracking-wide font-[var(--font-dm-sans)] hidden sm:block">RAS</span>
          </Link>

          {/* Nav links — grows to fill available space */}
          <div className="flex-1">
            <StickyNav links={navLinks} pathname={pathname} />
          </div>

          {/* CTA pill */}
          <Link
            href="/contact"
            className="hidden md:flex items-center gap-1.5 px-4 py-2 ml-0.5 text-[12px] font-bold font-[var(--font-outfit)] transition-all duration-200 flex-shrink-0 group"
            style={{
              background: "rgba(255,255,255,0.97)",
              color: "#1a0505",
              borderRadius: "999px",
              boxShadow: "0 2px 8px rgba(255,255,255,0.1)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#c42d2d";
              (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.97)";
              (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
            }}
          >
            Book a Session
            <svg className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
            </svg>
          </Link>

          {/* Mobile hamburger (sticky state) */}
          <button
            className="md:hidden w-8 h-8 rounded-full flex items-center justify-center ml-0.5 transition-colors"
            style={{ background: "rgba(255,255,255,0.06)" }}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className="w-4 h-3 relative flex flex-col justify-between">
              <span className={`hamburger-line block h-[1.5px] bg-white rounded-full ${open ? "transform rotate-45 translate-y-[5px] w-4" : "w-4"}`} />
              <span className={`hamburger-line block h-[1.5px] bg-white rounded-full ${open ? "opacity-0 w-0" : "opacity-100 w-3"}`} />
              <span className={`hamburger-line block h-[1.5px] bg-white rounded-full ${open ? "transform -rotate-45 -translate-y-[5px] w-4" : "w-4"}`} />
            </div>
          </button>
        </div>
      </div>

      {/* ── Mobile Full-Screen Menu ── */}
      {open && (
        <div className="mobile-overlay fixed inset-0 z-[55] md:hidden">
          <div className="absolute inset-0 bg-[#0d0505]/96 backdrop-blur-2xl" />

          <div className="relative z-10 flex flex-col h-full pt-24 px-8 pb-10">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
              aria-label="Close menu"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="flex-1 flex flex-col justify-center -mt-16">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="mobile-link group flex items-center justify-between py-5 border-b last:border-0"
                  style={{ animationDelay: `${i * 0.07}s`, borderColor: "rgba(255,255,255,0.07)" }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[11px] font-mono font-medium" style={{ color: "rgba(196,45,45,0.5)" }}>
                      0{i + 1}
                    </span>
                    <span className="text-[28px] font-[var(--font-playfair)] font-medium transition-colors duration-300" style={{ color: pathname === link.href ? "#c42d2d" : "#f5eeee" }}>
                      {link.label}
                    </span>
                  </div>
                  <svg className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1" style={{ color: "rgba(255,255,255,0.2)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>

            <div className="mobile-link flex flex-col gap-5" style={{ animationDelay: '0.35s' }}>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 bg-[#c42d2d] text-white py-4 rounded-2xl text-[16px] font-bold font-[var(--font-outfit)] shadow-xl shadow-[#c42d2d]/20 hover:bg-[#a82525] transition-all duration-300"
              >
                Book Your Session
              </Link>
              <div className="flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-[.2em] font-medium font-[var(--font-dm-sans)]" style={{ color: "rgba(255,255,255,0.2)" }}>© 2026 Raseshvari</p>
                <div className="flex items-center gap-3">
                  {["Instagram", "YouTube"].map((s) => (
                    <a key={s} href="#" className="text-[11px] font-medium uppercase tracking-wider transition-colors duration-300 hover:text-[#c42d2d]" style={{ color: "rgba(255,255,255,0.3)" }}>{s}</a>
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

// ── Animated nav for the top (non-sticky) state ──
function AnimatedNav({
  links,
  pathname,
  isSticky
}: {
  links: { label: string; href: string }[];
  pathname: string;
  isSticky: boolean
}) {
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const targetPath = hoveredPath || pathname;
    const index = links.findIndex((l) => l.href === targetPath);
    const fallbackIndex = links.findIndex((l) => l.href === "/");
    const activeIndex = index >= 0 ? index : fallbackIndex;
    const el = activeIndex >= 0 ? refs.current[activeIndex] : null;
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
    } else {
      setIndicator((prev) => ({ ...prev, opacity: 0 }));
    }
    const handleResize = () => {
      const el = activeIndex >= 0 ? refs.current[activeIndex] : null;
      if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [hoveredPath, pathname, links]);

  return (
    <div
      className="hidden md:flex items-center relative gap-1 font-medium font-[var(--font-dm-sans)]"
      onMouseLeave={() => setHoveredPath(null)}
    >
      {/* Sliding pill indicator */}
      <div
        className="absolute h-full bg-[#c42d2d] rounded-full shadow-md shadow-[#c42d2d]/20 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none z-0"
        style={{ left: indicator.left, width: indicator.width, opacity: indicator.opacity, top: 0 }}
      />
      {links.map((link, i) => {
        const isCurrentVisual = (hoveredPath || pathname) === link.href || ((hoveredPath || pathname) === '' && link.href === '/');
        return (
          <Link
            key={link.href}
            href={link.href}
            ref={(el) => { refs.current[i] = el; }}
            onMouseEnter={() => setHoveredPath(link.href)}
            className={`relative px-4 py-1.5 md:px-5 md:py-2 z-10 transition-colors duration-500 flex items-center justify-center text-[14px] rounded-full ${isCurrentVisual ? 'text-white' : 'text-[#666] hover:text-[#1f201d]'}`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}

// ── Sleek nav links for the dark pill sticky navbar ──
function StickyNav({
  links,
  pathname,
}: {
  links: { label: string; href: string }[];
  pathname: string;
}) {
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const targetPath = hoveredPath || pathname;
    const index = links.findIndex((l) => l.href === targetPath);
    const fallbackIndex = links.findIndex((l) => l.href === "/");
    const activeIndex = index >= 0 ? index : fallbackIndex;
    const el = activeIndex >= 0 ? refs.current[activeIndex] : null;
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
    } else {
      setIndicator((prev) => ({ ...prev, opacity: 0 }));
    }
    const handleResize = () => {
      const el = activeIndex >= 0 ? refs.current[activeIndex] : null;
      if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [hoveredPath, pathname, links]);

  return (
    <div
      className="hidden md:flex items-center relative gap-0"
      onMouseLeave={() => setHoveredPath(null)}
      style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
    >
      {/* Sliding pill — white/subtle on dark bg */}
      <div
        className="absolute h-full transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none z-0 rounded-full"
        style={{
          left: indicator.left,
          width: indicator.width,
          opacity: indicator.opacity,
          top: 0,
          background: "rgba(255,255,255,0.10)",
        }}
      />
      {links.map((link, i) => {
        const isCurrentVisual = (hoveredPath || pathname) === link.href || ((hoveredPath || pathname) === '' && link.href === '/');
        return (
          <Link
            key={link.href}
            href={link.href}
            ref={(el) => { refs.current[i] = el; }}
            onMouseEnter={() => setHoveredPath(link.href)}
            className="relative px-6 py-3 z-10 transition-colors duration-300 flex items-center justify-center text-[14px] rounded-full"
            style={{ color: isCurrentVisual ? "rgba(255,255,255,1)" : "rgba(255,255,255,1)" }}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}

// ── HeroNav: full-width version, white text on dark glass bg ──
function HeroNav({
  links,
  pathname,
}: {
  links: { label: string; href: string }[];
  pathname: string;
}) {
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const targetPath = hoveredPath || pathname;
    const index = links.findIndex((l) => l.href === targetPath);
    const fallbackIndex = links.findIndex((l) => l.href === "/");
    const activeIndex = index >= 0 ? index : fallbackIndex;
    const el = activeIndex >= 0 ? refs.current[activeIndex] : null;
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
    } else {
      setIndicator((prev) => ({ ...prev, opacity: 0 }));
    }
    const handleResize = () => {
      const el = activeIndex >= 0 ? refs.current[activeIndex] : null;
      if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [hoveredPath, pathname, links]);

  return (
    <div
      className="hidden md:flex items-center relative gap-0"
      onMouseLeave={() => setHoveredPath(null)}
      style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
    >
      {/* Sliding pill — red accent on dark bg */}
      <div
        className="absolute h-full transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none z-0 rounded-full"
        style={{
          left: indicator.left,
          width: indicator.width,
          opacity: indicator.opacity,
          top: 0,
          background: "rgba(196,45,45,0.35)",
          boxShadow: "0 0 12px rgba(196,45,45,0.25)",
        }}
      />
      {links.map((link, i) => {
        const isCurrentVisual = (hoveredPath || pathname) === link.href || ((hoveredPath || pathname) === '' && link.href === '/');
        return (
          <Link
            key={link.href}
            href={link.href}
            ref={(el) => { refs.current[i] = el; }}
            onMouseEnter={() => setHoveredPath(link.href)}
            className="relative px-5 py-2.5 z-10 transition-colors duration-300 flex items-center justify-center text-[14px] rounded-full font-medium"
            style={{ color: isCurrentVisual ? "#f5eeee" : "rgba(245,238,238,1)" }}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
