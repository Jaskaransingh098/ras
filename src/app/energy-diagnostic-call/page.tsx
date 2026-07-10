"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const WA_NUMBER = "917700801831"; // ← replace with actual WhatsApp number (country code + number)

// ── Country codes list ──
const COUNTRIES = [
  { code: 'IN', flag: '🇮🇳', name: 'India', dial: '+91' },
  { code: 'US', flag: '🇺🇸', name: 'United States', dial: '+1' },
  { code: 'GB', flag: '🇬🇧', name: 'United Kingdom', dial: '+44' },
  { code: 'AE', flag: '🇦🇪', name: 'UAE', dial: '+971' },
  { code: 'AU', flag: '🇦🇺', name: 'Australia', dial: '+61' },
  { code: 'CA', flag: '🇨🇦', name: 'Canada', dial: '+1' },
  { code: 'SG', flag: '🇸🇬', name: 'Singapore', dial: '+65' },
  { code: 'NZ', flag: '🇳🇿', name: 'New Zealand', dial: '+64' },
  { code: 'DE', flag: '🇩🇪', name: 'Germany', dial: '+49' },
  { code: 'FR', flag: '🇫🇷', name: 'France', dial: '+33' },
  { code: 'NL', flag: '🇳🇱', name: 'Netherlands', dial: '+31' },
  { code: 'SE', flag: '🇸🇪', name: 'Sweden', dial: '+46' },
  { code: 'NO', flag: '🇳🇴', name: 'Norway', dial: '+47' },
  { code: 'CH', flag: '🇨🇭', name: 'Switzerland', dial: '+41' },
  { code: 'IT', flag: '🇮🇹', name: 'Italy', dial: '+39' },
  { code: 'ES', flag: '🇪🇸', name: 'Spain', dial: '+34' },
  { code: 'ZA', flag: '🇿🇦', name: 'South Africa', dial: '+27' },
  { code: 'NG', flag: '🇳🇬', name: 'Nigeria', dial: '+234' },
  { code: 'KE', flag: '🇰🇪', name: 'Kenya', dial: '+254' },
  { code: 'PK', flag: '🇵🇰', name: 'Pakistan', dial: '+92' },
  { code: 'BD', flag: '🇧🇩', name: 'Bangladesh', dial: '+880' },
  { code: 'LK', flag: '🇱🇰', name: 'Sri Lanka', dial: '+94' },
  { code: 'NP', flag: '🇳🇵', name: 'Nepal', dial: '+977' },
  { code: 'MY', flag: '🇲🇾', name: 'Malaysia', dial: '+60' },
  { code: 'PH', flag: '🇵🇭', name: 'Philippines', dial: '+63' },
  { code: 'JP', flag: '🇯🇵', name: 'Japan', dial: '+81' },
  { code: 'KR', flag: '🇰🇷', name: 'South Korea', dial: '+82' },
  { code: 'CN', flag: '🇨🇳', name: 'China', dial: '+86' },
  { code: 'BR', flag: '🇧🇷', name: 'Brazil', dial: '+55' },
  { code: 'MX', flag: '🇲🇽', name: 'Mexico', dial: '+52' },
  { code: 'AR', flag: '🇦🇷', name: 'Argentina', dial: '+54' },
  { code: 'QA', flag: '🇶🇦', name: 'Qatar', dial: '+974' },
  { code: 'KW', flag: '🇰🇼', name: 'Kuwait', dial: '+965' },
  { code: 'SA', flag: '🇸🇦', name: 'Saudi Arabia', dial: '+966' },
  { code: 'BH', flag: '🇧🇭', name: 'Bahrain', dial: '+973' },
  { code: 'OM', flag: '🇴🇲', name: 'Oman', dial: '+968' },
  { code: 'TH', flag: '🇹🇭', name: 'Thailand', dial: '+66' },
  { code: 'ID', flag: '🇮🇩', name: 'Indonesia', dial: '+62' },
  { code: 'VN', flag: '🇻🇳', name: 'Vietnam', dial: '+84' },
  { code: 'TR', flag: '🇹🇷', name: 'Turkey', dial: '+90' },
  { code: 'EG', flag: '🇪🇬', name: 'Egypt', dial: '+20' },
  { code: 'PT', flag: '🇵🇹', name: 'Portugal', dial: '+351' },
  { code: 'PL', flag: '🇵🇱', name: 'Poland', dial: '+48' },
  { code: 'IE', flag: '🇮🇪', name: 'Ireland', dial: '+353' },
  { code: 'GH', flag: '🇬🇭', name: 'Ghana', dial: '+233' },
  { code: 'IL', flag: '🇮🇱', name: 'Israel', dial: '+972' },
  { code: 'RU', flag: '🇷🇺', name: 'Russia', dial: '+7' },
  { code: 'UA', flag: '🇺🇦', name: 'Ukraine', dial: '+380' },
];

export default function EnergyDiagnosticCallPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [isIndia, setIsIndia] = useState<boolean | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', dob: '', gender: '', country: '', phone: '', purpose: '' });
  const [submitting, setSubmitting] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]); // default India
  const [showCountryDrop, setShowCountryDrop] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');

  // ── Geo detection ──
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => {
        const cc = data.country_code as string;
        setIsIndia(cc === 'IN');
        const matched = COUNTRIES.find(c => c.code === cc);
        // Auto-select India for IN, US for everything else (unless matched)
        if (cc === 'IN') {
          setSelectedCountry(COUNTRIES[0]); // India is index 0
        } else if (matched) {
          setSelectedCountry(matched);
        } else {
          setSelectedCountry(COUNTRIES[1]); // US fallback
        }
      })
      .catch(() => setIsIndia(true)); // default to India on error
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const price = isIndia ? '₹15,000' : '$275';
    const fullPhone = `${selectedCountry.dial} ${formData.phone}`;
    const msg = encodeURIComponent(
      `*Energy Diagnostic Call Application*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Date of birth:* ${formData.dob}\n` +
      `*Gender:* ${formData.gender}\n` +
      `*Country:* ${formData.country}\n` +
      `*Phone number:* ${fullPhone}\n` +
      `*Session Price:* ${price}\n\n` +
      `*Purpose:* ${formData.purpose}`
    );
    setTimeout(() => {
      window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
      setShowForm(false);
      setSubmitting(false);
      setFormData({ name: '', dob: '', gender: '', country: '', phone: '', purpose: '' });
      setCountrySearch('');
    }, 300);
  };

  useEffect(() => {
    // ── Scroll reveal ──
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

    // ── Nav shrink on scroll ──
    const nav = document.getElementById("diagNav");
    const onScroll = () => {
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── FAQ accordion ──
    document.querySelectorAll<HTMLElement>(".faq-item").forEach((item) => {
      const toggle = item.querySelector<HTMLElement>(".faq-toggle");
      if (toggle) {
        toggle.addEventListener("click", () => {
          const isOpen = item.classList.contains("open");
          document.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("open"));
          if (!isOpen) item.classList.add("open");
        });
      }
    });

    // ── Counter animation ──
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const target = parseInt(el.dataset.target || "0", 10);
          let current = 0;
          const step = target / 40;
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = String(Math.floor(current));
            if (current >= target) clearInterval(timer);
          }, 40);
          counterObserver.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll(".counter").forEach((c) => counterObserver.observe(c));

    // ── 3D card tilt ──
    const card3d = document.querySelector<HTMLElement>(".recognition-card-3d");
    const cardWrap = document.querySelector<HTMLElement>(".recognition-visual");
    if (cardWrap && card3d) {
      const onMove = (e: Event) => {
        const me = e as MouseEvent;
        const rect = cardWrap.getBoundingClientRect();
        const x = (me.clientX - rect.left) / rect.width - 0.5;
        const y = (me.clientY - rect.top) / rect.height - 0.5;
        card3d.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 10}deg)`;
      };
      const onLeave = () => { card3d.style.transform = "rotateY(-8deg) rotateX(4deg)"; };
      cardWrap.addEventListener("mousemove", onMove);
      cardWrap.addEventListener("mouseleave", onLeave);
    }

    return () => {
      revealObserver.disconnect();
      counterObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // ── Close country dropdown on outside click ──
  useEffect(() => {
    if (!showCountryDrop) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.phone-row')) setShowCountryDrop(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showCountryDrop]);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
      <Navbar />
      <div ref={pageRef} className="diag-page-root">
        <style>{`
          /* ── ROOT VARS ── */
          .diag-page-root {
            --bg: #FDFCFB; --bg-warm: #F7F2EC; --bg-dark: #8F0C1C;
            --red: #9B0F1F; --red-deep: #720A15; --red-soft: #C0344A;
            --gold: #B8793A; --gold-lt: #D4954E;
            --ink: #1C0E0A; --ink-mid: #4A3530; --ink-soft: #7A6560;
            --line: rgba(155,15,31,0.1); --line-lt: rgba(28,14,10,0.08);
            --serif: 'Cormorant Garamond', var(--font-cormorant), Georgia, serif;
            --sans: 'Inter', var(--font-inter), system-ui, sans-serif;
            --shadow-sm: 0 2px 16px rgba(155,15,31,0.07), 0 1px 3px rgba(0,0,0,0.04);
            --shadow-md: 0 8px 48px rgba(155,15,31,0.10), 0 2px 8px rgba(0,0,0,0.05);
            --shadow-lg: 0 20px 80px rgba(155,15,31,0.13), 0 4px 16px rgba(0,0,0,0.06);
            --grad: linear-gradient(135deg, #9B0F1F 0%, #C4894A 60%, #E8B87A 100%);

            background: var(--bg);
            color: var(--ink);
            font-weight: 300;
            font-size: 17px;
            line-height: 1.8;
          }

          .diag-page-root,
          .diag-page-root input,
          .diag-page-root button,
          .diag-page-root textarea,
          .diag-page-root select {
            font-family: var(--sans);
          }

          /* ── BG ORBS ── */
          .bg-orb { position: fixed; border-radius: 50%; filter: blur(100px); pointer-events: none; z-index: 0; animation: orbFloat 20s ease-in-out infinite; }
          .bg-orb-1 { width: 600px; height: 600px; background: radial-gradient(circle, rgba(155,15,31,0.07), transparent 70%); top: -180px; left: -150px; }
          .bg-orb-2 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(196,137,74,0.06), transparent 70%); top: 50%; right: -100px; animation-delay: -7s; }
          .bg-orb-3 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(155,15,31,0.05), transparent 70%); bottom: 10%; left: 25%; animation-delay: -14s; }
          @keyframes orbFloat { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px,-25px) scale(1.04); } 66% { transform: translate(-18px,18px) scale(0.97); } }

          /* ── LAYOUT ── */
          .diag-section { position: relative; z-index: 2; }
          .diag-container    { max-width: 1200px; margin: 0 auto; padding: 0 60px; }
          .diag-container-sm { max-width: 800px;  margin: 0 auto; padding: 0 60px; }
          .diag-sec    { padding: 100px 0; }
          .diag-sec-sm { padding: 100px 0; }

          /* ── BUTTONS ── */
          .btn-glow {
            display: inline-block;
            background: var(--grad); color: #fff;
            padding: 18px 44px; font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase;
            font-weight: 500; text-decoration: none; border-radius: 100px;
            box-shadow: 0 6px 40px rgba(155,15,31,0.35), 0 2px 8px rgba(0,0,0,0.1);
            transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
            position: relative; overflow: hidden;
            text-shadow: 0 1px 3px rgba(0,0,0,0.3);
          }
          .btn-glow::before { content: ''; position: absolute; inset: 0; border-radius: 100px; background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent); opacity: 0; transition: opacity 0.3s; }
          .btn-glow:hover { transform: translateY(-3px); box-shadow: 0 12px 60px rgba(155,15,31,0.45), 0 4px 12px rgba(0,0,0,0.12); }
          .btn-glow:hover::before { opacity: 1; }

          .btn-outline {
            display: inline-flex; align-items: center; gap: 10px;
            background: transparent; border: 1.5px solid var(--red);
            color: var(--red); padding: 16px 36px;
            font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase;
            font-weight: 500; text-decoration: none; border-radius: 100px; transition: all 0.35s;
          }
          .btn-outline:hover { background: var(--red); color: #fff; transform: translateY(-2px); box-shadow: 0 6px 28px rgba(155,15,31,0.3); }
          .btn-outline svg { width: 16px; height: 16px; fill: currentColor; }

          .btn-glass {
            display: inline-flex; align-items: center; gap: 10px;
            background: rgba(255,255,255,0.1); border: 1.5px solid rgba(255,255,255,0.3);
            color: #fff; padding: 16px 36px; font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase;
            font-weight: 500; text-decoration: none; border-radius: 100px; transition: all 0.35s; backdrop-filter: blur(8px);
          }
          .btn-glass:hover { background: rgba(255,255,255,0.18); transform: translateY(-2px); }
          .btn-glass svg { width: 16px; height: 16px; fill: currentColor; }

          /* ── REVEAL ANIMATIONS ── */
          @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
          .reveal { opacity: 0; transform: translateY(36px); transition: all 0.85s cubic-bezier(0.4,0,0.2,1); }
          .reveal.visible { opacity: 1; transform: translateY(0); }
          .reveal-delay-1 { transition-delay: 0.1s; }
          .reveal-delay-2 { transition-delay: 0.2s; }
          .reveal-delay-3 { transition-delay: 0.3s; }
          .reveal-delay-4 { transition-delay: 0.4s; }

          /* ── TYPE ── */
          .eyebrow { font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--red); display: block; margin-bottom: 0px; font-weight: 400; font-family: var(--sans); }
          .eyebrow-light { color: rgba(255,255,255,0.55); }
          .section-headline { font-family: var(--serif); font-size: clamp(36px, 4.5vw, 64px); font-weight: 400; line-height: 1.12; color: var(--ink); }
          .section-headline em { font-style: italic; color: var(--red); }
          .section-headline.on-dark { color: #FDFCFB; }
          .section-headline.on-dark em { color: rgba(232,184,122,0.9); }
          .section-subtext { font-size: 17px; color: var(--ink-mid); line-height: 1.88; font-weight: 300; font-family: var(--sans); }
          .gold-line { width: 44px; height: 2px; background: var(--grad); margin: 26px 0; border-radius: 2px; }

          /* ── CARD BASELINE ── */
          .diag-card { background: #fff; border: 1px solid var(--line); border-radius: 24px; box-shadow: var(--shadow-sm); transition: all 0.45s cubic-bezier(0.4,0,0.2,1); }
          .diag-card:hover { box-shadow: var(--shadow-md); transform: translateY(-3px); border-color: rgba(155,15,31,0.18); }

          /* ── HERO ── */
          .diag-hero {
            min-height: 100vh; background: var(--bg);
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            text-align: center; padding: 160px 24px 90px; position: relative; z-index: 2;
          }
          .hero-badge { display: inline-flex; align-items: center; gap: 10px; background: rgba(155,15,31,0.06); border: 1px solid rgba(155,15,31,0.18); border-radius: 100px; padding: 8px 22px; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--red); margin-bottom: 52px; animation: fadeUp 1s ease both; font-family: var(--sans); }
          .hero-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--red); animation: heroPulse 2s ease-in-out infinite; }
          @keyframes heroPulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.4; transform:scale(0.75); } }
          .hero-headline { font-family: var(--serif); font-size: clamp(50px, 8vw, 110px); font-weight: 400; line-height: 1.05; color: var(--ink); max-width: 980px; animation: fadeUp 1s ease 0.15s both; }
          .grad-text { background: var(--grad); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-style: italic; }
          .hero-divider { width: 1px; height: 52px; background: linear-gradient(to bottom, rgba(155,15,31,0.5), transparent); margin: 36px auto; animation: fadeUp 1s ease 0.3s both; }
          .hero-sub { font-size: clamp(17px, 2vw, 21px); color: var(--ink-mid); max-width: 600px; line-height: 1.82; font-weight: 300; animation: fadeUp 1s ease 0.35s both; font-family: var(--sans); }
          .hero-relatability { font-family: var(--serif); font-style: italic; font-size: clamp(17px, 1.8vw, 23px); color: var(--ink-soft); max-width: 540px; line-height: 1.65; animation: fadeUp 1s ease 0.42s both; }
          .hero-cta-group { display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; margin-top: 44px; animation: fadeUp 1s ease 0.52s both; }
          .hero-trust { display: flex; align-items: center; gap: 10px; margin-top: 32px; justify-content: center; color: var(--ink-soft); font-weight: 500; animation: fadeUp 1s ease 0.62s both; font-family: var(--sans); }
          .hero-trust-sep { width: 4px; height: 4px; border-radius: 50%; background: var(--line); }
          .hero-trust span { font-size: 12px; color: var(--ink-soft); letter-spacing: 0.07em; }          /* ── RECOGNITION ── */
          .section-recognition { background: var(--bg-warm); }
          .recognition-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center flex:start; }
          .recognition-bullets-col { margin-top: px; }
          .recognition-visual { position: relative; perspective: 1000px; }
          .recognition-card-3d { background: linear-gradient(135deg, var(--red) 0%, var(--red-deep) 100%); border-radius: 28px; padding: 56px 48px; transform: rotateY(-8deg) rotateX(4deg); transform-style: preserve-3d; transition: transform 0.6s cubic-bezier(0.4,0,0.2,1); box-shadow: 32px 32px 80px rgba(155,15,31,0.25), -4px -4px 20px rgba(155,15,31,0.1); position: relative; overflow: hidden; }
          .recognition-card-3d::before { content: ''; position: absolute; inset: 0; border-radius: 28px; background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 55%); pointer-events: none; }
          .recognition-visual:hover .recognition-card-3d { transform: rotateY(-2deg) rotateX(1deg); }
          .big-number { font-family: var(--serif); font-size: 160px; font-weight: 300; line-height: 0.8; color: rgba(255,255,255,0.12); position: absolute; top: -20px; right: 16px; pointer-events: none; user-select: none; }
          .recognition-float-stat { position: absolute; bottom: -20px; right: -20px; background: #fff; border: 1px solid var(--line); box-shadow: var(--shadow-md); border-radius: 14px; padding: 12px 20px; }
          .stat-n { font-family: var(--serif); font-size: 38px; font-weight: 400; background: var(--grad); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
          .stat-l { font-size: 12px; color: var(--ink-soft); letter-spacing: 0.08em; margin-top: 2px; font-family: var(--sans); }
          .bullet-grid { margin-top: 8px; }
          .bullet-item { padding: 16px 0; border-bottom: 1px solid var(--line-lt); display: flex; align-items: baseline; gap: 16px; font-size: 16px; color: var(--ink-mid); line-height: 1.2; transition: color 0.3s; font-family: var(--sans); }
          .bullet-item:hover { color: var(--ink); }
          .bullet-mark { width: 6px; height: 6px; border-radius: 50%; background: var(--grad); flex-shrink: 0; margin-top: 8px; box-shadow: 0 0 6px rgba(155,15,31,0.35); }
          .pull-quote-block { margin-top: 44px; padding: 40px 48px; background: rgba(155,15,31,0.04); border-left: 3px solid var(--red); border-radius: 0 20px 20px 0; width: 100%; }
          .pull-quote-block p { font-family: var(--serif); font-style: italic; font-size: 20px; color: var(--ink-mid); line-height: 1.72; }

          /* ── SESSION ── */
          .section-session { background: var(--bg); }
          .session-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: flex-start; }
          .session-image-box { position: relative; perspective: 800px; }
          .session-img-wrap { background: linear-gradient(145deg, #F0EAE2, #E8DED3); border: 1px solid var(--line); border-radius: 28px; height: 500px; display: flex; align-items: center; justify-content: center; transform: rotateY(5deg); box-shadow: var(--shadow-lg); transition: transform 0.6s; position: relative; overflow: hidden; }
          .session-img-wrap.red-box { background: linear-gradient(135deg, var(--red) 0%, var(--red-deep) 100%); border: 1px solid rgba(255, 255, 255, 0.08); padding: 0px; }
          .session-red-title { font-family: var(--serif); font-size: clamp(32px, 3.5vw, 46px); font-weight: 400; color: #FDFCFB; line-height: 1.25; text-align: center; }
          .session-red-title em { font-style: italic; color: rgba(232, 184, 122, 0.9); }
          .session-image-box:hover .session-img-wrap { transform: rotateY(1deg); }
          .session-img-wrap::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(155,15,31,0.06), transparent 60%); }
          .session-img-label { font-family: var(--serif); font-style: italic; font-size: 15px; color: var(--ink-soft); z-index: 1; }
          .session-float-tag { position: absolute; top: 28px; left: -18px; background: #e79c2aff; color: #fff; border-radius: 100px; padding: 10px 22px; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 500; box-shadow: 0 6px 24px rgba(155,15,31,0.35); font-family: var(--sans); }
          .session-bullets { margin-top: 8px; }
          .session-bullet { display: flex; align-items: flex-start; gap: 14px; padding: 14px 0; border-bottom: 1px solid var(--line-lt); }
          .session-bullet-icon { width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0; background: rgba(155,15,31,0.08); border: 1px solid rgba(155,15,31,0.15); display: flex; align-items: center; justify-content: center; font-size: 12px; color: var(--red); margin-top: 2px; }
          .session-bullet p { font-size: 16px; color: var(--ink-mid); line-height: 1.2; font-family: var(--sans); }

          /* ── ABOUT ── */
          .section-about { background: var(--bg-warm); }
          .about-layout { display: grid; grid-template-columns: 5fr 7fr; gap: 100px; align-items: end; }
          .about-img-col { position: relative; }
          .about-img-frame { background: linear-gradient(145deg, #EDE6DC, #E0D5C8); border: 1px solid var(--line); border-radius: 32px; height: 510px; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; box-shadow: var(--shadow-md); }
          .about-img-frame::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(155,15,31,0.07), transparent 60%); }
          .about-img-label { font-family: var(--serif); font-style: italic; font-size: 15px; color: var(--ink-soft); z-index: 1; }
          .about-accent { position: absolute; bottom: -20px; right: -20px; width: 120px; height: 120px; border-radius: 24px; background: var(--grad); display: flex; align-items: center; justify-content: center; flex-direction: column; box-shadow: 0 8px 40px rgba(155,15,31,0.4); text-align: center; padding: 16px; }
          .about-accent span { font-family: var(--serif); font-size: 11px; font-style: italic; color: rgba(255,255,255,0.92); line-height: 1.45; }
          .about-stats-bar { display: grid; grid-template-columns: repeat(3,1fr); border: 1px solid var(--line); border-radius: 20px; overflow: hidden; background: #fff; box-shadow: var(--shadow-sm); margin: 0px 0 40px 0; }
          .about-stat { padding: 6px 20px; text-align: center; border-right: 1px solid var(--line); }
          .about-stat:last-child { border-right: none; }
          .about-stat-num { font-family: var(--serif); font-size: 46px; font-weight: 400; background: var(--grad); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1; display: block; }
          .about-stat-lbl { font-size: 11px; color: var(--ink-soft); letter-spacing: 0.1em; text-transform: uppercase; margin-top: 7px; font-family: var(--sans); }
          .closing-italic { font-family: var(--serif); font-style: italic; font-size: 18px; color: var(--ink-mid); line-height: 1.7; padding-top: 28px; border-top: 1px solid var(--line-lt); margin-top: 28px; }
          .about-closing-block { margin-top: 60px; padding-top: 36px; border-top: 1px solid var(--line-lt); text-align: center; width: 100%; }
          .about-closing-quote { font-family: var(--serif); font-style: italic; font-size: 22px; color: var(--ink-mid); line-height: 1.7; max-width: 800px; margin: 0 auto; }
          /* ── TESTIMONIALS ── */
          .section-testimonials { background: var(--red-deep, #720A15); }
          .testimonial-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-top: 60px; }
          .testimonial-card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 44px 36px; position: relative; overflow: hidden; transition: all 0.45s; }
          .testimonial-card:hover { background: rgba(255,255,255,0.1); transform: translateY(-4px); }
          .t-card-1 { margin-top: 0; } .t-card-2 { margin-top: 32px; } .t-card-3 { margin-top: -16px; }
          .t-qmark { font-family: var(--serif); font-size: 80px; font-weight: 300; line-height: 0.7; color: rgba(232,184,122,0.35); display: block; margin-bottom: 18px; }
          .t-text { font-family: var(--serif); font-style: italic; font-size: 19px; color: rgba(253,252,251,0.92); line-height: 1.72; }
          .t-author { margin-top: 26px; display: flex; align-items: center; gap: 14px; }
          .t-avatar { width: 44px; height: 44px; border-radius: 50%; border: 1.5px solid rgba(255,255,255,0.25); object-fit: cover; flex-shrink: 0; }
          .t-meta { display: flex; flex-direction: column; gap: 2px; text-align: left; }
          .t-name { font-size: 13px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; color: rgba(253,252,251,0.95); font-family: var(--sans); }
          .t-title { font-size: 11px; color: rgba(253,252,251,0.5); font-family: var(--sans); line-height: 1.3; }
          .wa-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-top: 64px; }
          .wa-mockup { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09); border-radius: 22px; overflow: hidden; }
          .wa-img { width: 100%; height: auto; display: block; }
          .wa-top { background: rgba(255,255,255,0.05); padding: 16px 20px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid rgba(255,255,255,0.07); }
          .wa-av { width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg, rgba(155,15,31,0.7), rgba(196,137,74,0.4)); border: 1px solid rgba(255,255,255,0.18); display: flex; align-items: center; justify-content: center; font-family: var(--serif); font-size: 15px; color: rgba(255,255,255,0.9); }
          .wa-info .wa-name { font-size: 13px; font-weight: 400; color: rgba(253,252,251,0.88); letter-spacing: 0; text-transform: none; font-family: var(--sans); }
          .wa-info .wa-sub  { font-size: 11px; color: rgba(255,255,255,0.38); margin-top: 2px; font-family: var(--sans); }
          .wa-msgs { padding: 18px 16px; display: flex; flex-direction: column; gap: 10px; }
          .wa-bubble { max-width: 86%; padding: 10px 14px; border-radius: 16px; font-size: 14px; line-height: 1.6; font-family: var(--sans); }
          .wa-recv { background: rgba(255,255,255,0.09); color: rgba(253,252,251,0.8); align-self: flex-start; border-radius: 4px 16px 16px 16px; }
          .wa-sent { background: rgba(155,15,31,0.65); color: rgba(253,252,251,0.94); align-self: flex-end; border-radius: 16px 4px 16px 16px; }
          .wa-t { font-size: 10px; color: rgba(255,255,255,0.28); margin-top: 3px; font-family: var(--sans); }
          .wa-t.r { text-align: right; }
          .testimonials-close { text-align: center; margin-top: 64px; font-family: var(--serif); font-style: italic; font-size: 22px; color: rgba(253,252,251,0.92); line-height: 1.72; }

          /* ── PROCESS ── */
          .section-process { background: var(--bg); }
          .process-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; margin-top: 68px; }
          .process-card { padding: 40px 32px 36px; border-radius: 24px; position: relative; overflow: hidden; }
          .process-num { font-family: var(--serif); font-size: 68px; font-weight: 300; line-height: 1; background: var(--grad); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; opacity: 0.6; margin-bottom: 20px; display: block; transition: opacity 0.4s; }
          // .process-card:hover .process-num { opacity: 0.6; }
          .step-badge { font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--red); margin-bottom: 10px; display: block; font-weight: 400; font-family: var(--sans); }
          .step-title { font-family: var(--serif); font-size: 22px; font-weight: 400; color: var(--ink); margin-bottom: 12px; line-height: 1.3; }
          .step-desc { font-size: 15px; color: var(--ink-mid); line-height: 1.78; font-family: var(--sans); }

          /* ── PRICING ── */
          .section-pricing { background: var(--bg-warm); }
          .pricing-wrapper { max-width: 620px; margin: 60px auto 0; position: relative; }
          .pricing-glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 380px; height: 380px; border-radius: 50%; background: radial-gradient(circle, rgba(155,15,31,0.08), transparent 70%); pointer-events: none; }
          .pricing-card { background: #fff; border: 1px solid var(--line); border-radius: 32px; padding: 40px 44px; text-align: center; position: relative; overflow: hidden; box-shadow: var(--shadow-lg); }
          .pricing-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--grad); }
          .price-eyebrow { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--red); font-family: var(--sans); }
          .price-title { font-family: var(--serif); font-size: 28px; color: var(--ink); font-weight: 400; margin-top: 8px; line-height: 1.2; }
          .price-amount { font-family: var(--serif); font-size: 76px; font-weight: 300; background: var(--grad); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1; margin: 18px 0 4px; }
          .price-sup { font-size: 34px; vertical-align: super; }
          .price-includes { list-style: none; margin: 20px 0; padding: 20px 0; border-top: 1px solid var(--line-lt); border-bottom: 1px solid var(--line-lt); display: flex; flex-direction: column; gap: 10px; }
          .price-includes li { font-size: 15px; color: var(--ink-mid); display: flex; align-items: center; justify-content: center; gap: 12px; font-family: var(--sans); }
          .price-includes li::before { content: '✦'; font-size: 8px; color: var(--red); }
          .pricing-note { font-family: var(--serif); font-style: italic; font-size: 15px; color: var(--ink-soft); margin-bottom: 24px; }
          .price-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(155,15,31,0.06); border: 1px solid rgba(155,15,31,0.15); border-radius: 100px; padding: 5px 16px; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--red); font-family: var(--sans); margin-bottom: 12px; }

          /* ── APPLY MODAL ── */
          .modal-overlay { position: fixed; inset: 0; background: rgba(28,14,10,0.6); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 24px; backdrop-filter: blur(6px); animation: fadeIn 0.2s ease; }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          .modal-box { background: #FDFCFB; border-radius: 28px; padding: 48px 44px; width: 100%; max-width: 520px; position: relative; box-shadow: 0 32px 80px rgba(28,14,10,0.18); animation: slideUp 0.3s cubic-bezier(0.4,0,0.2,1); }
          @keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
          .modal-box::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--grad); border-radius: 28px 28px 0 0; }
          .modal-close { position: absolute; top: 18px; right: 18px; width: 32px; height: 32px; border-radius: 50%; background: rgba(155,15,31,0.08); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 18px; color: var(--ink-soft); transition: all 0.2s; }
          .modal-close:hover { background: rgba(155,15,31,0.15); color: var(--red); }
          .modal-title { font-family: var(--serif); font-size: 28px; font-weight: 400; color: var(--ink); line-height: 1.2; margin-bottom: 6px; }
          .modal-sub { font-size: 14px; color: var(--ink-soft); font-family: var(--sans); margin-bottom: 28px; line-height: 1.6; }
          .form-group { margin-bottom: 16px; text-align: left; }
          .form-label { display: block; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-mid); margin-bottom: 6px; font-family: var(--sans); font-weight: 500; }
          .form-input { width: 100%; padding: 12px 16px; border: 1.5px solid rgba(155,15,31,0.15); border-radius: 12px; font-size: 15px; color: var(--ink); background: #fff; font-family: var(--sans); outline: none; transition: border-color 0.2s; box-sizing: border-box; }
          .form-input:focus { border-color: var(--red); }
          .form-textarea { resize: vertical; min-height: 90px; }
          /* Phone row */
          .phone-row { display: flex; gap: 0; border: 1.5px solid rgba(155,15,31,0.15); border-radius: 12px; overflow: visible; transition: border-color 0.2s; background: #fff; position: relative; }
          .phone-row:focus-within { border-color: var(--red); }
          .cc-btn { display: flex; align-items: center; gap: 6px; padding: 0 12px; cursor: pointer; background: transparent; border: none; border-right: 1.5px solid rgba(155,15,31,0.12); border-radius: 0; font-family: var(--sans); font-size: 14px; color: var(--ink); white-space: nowrap; flex-shrink: 0; transition: background 0.2s; user-select: none; min-width: 86px; }
          .cc-btn:hover { background: rgba(155,15,31,0.04); }
          .cc-flag { font-size: 20px; line-height: 1; }
          .cc-dial { font-size: 13px; font-weight: 500; color: var(--ink-mid); }
          .cc-chevron { font-size: 9px; color: var(--ink-soft); margin-left: 2px; transition: transform 0.2s; }
          .cc-chevron.open { transform: rotate(180deg); }
          .phone-number-input { flex: 1; padding: 12px 14px; border: none; outline: none; font-size: 15px; color: var(--ink); background: transparent; font-family: var(--sans); min-width: 0; }
          /* Country dropdown */
          .cc-dropdown { position: absolute; top: calc(100% + 8px); left: 0; width: 280px; background: #fff; border: 1px solid rgba(155,15,31,0.12); border-radius: 16px; box-shadow: 0 16px 48px rgba(28,14,10,0.14); z-index: 10000; overflow: hidden; animation: ccDrop 0.18s cubic-bezier(0.4,0,0.2,1); }
          @keyframes ccDrop { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
          .cc-search { width: 100%; padding: 12px 16px; border: none; border-bottom: 1px solid rgba(155,15,31,0.08); outline: none; font-size: 13px; font-family: var(--sans); color: var(--ink); background: rgba(155,15,31,0.02); box-sizing: border-box; }
          .cc-search::placeholder { color: var(--ink-soft); }
          .cc-list { max-height: 220px; overflow-y: auto; }
          .cc-list::-webkit-scrollbar { width: 4px; }
          .cc-list::-webkit-scrollbar-thumb { background: rgba(155,15,31,0.18); border-radius: 4px; }
          .cc-option { display: flex; align-items: center; gap: 10px; padding: 10px 16px; cursor: pointer; transition: background 0.15s; font-family: var(--sans); font-size: 14px; }
          .cc-option:hover { background: rgba(155,15,31,0.05); }
          .cc-option.active { background: rgba(155,15,31,0.08); }
          .cc-opt-flag { font-size: 18px; flex-shrink: 0; }
          .cc-opt-name { flex: 1; color: var(--ink); font-size: 13px; }
          .cc-opt-dial { color: var(--ink-soft); font-size: 12px; font-weight: 500; }
          /* /Phone row */
          .form-submit { width: 100%; padding: 16px; background: rgba(155,15,31,0.9); color: #fff; border: none; border-radius: 100px; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 500; cursor: pointer; font-family: var(--sans); transition: all 0.3s; margin-top: 8px; }
          .form-submit:hover { background: var(--red-deep); transform: translateY(-1px); box-shadow: 0 8px 32px rgba(155,15,31,0.35); }
          .form-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
          .form-note { font-size: 12px; color: var(--ink-soft); text-align: center; margin-top: 14px; font-family: var(--sans); line-height: 1.5; }

          /* ── FAQ ── */
          .section-faq { background: var(--bg); }
          .faq-list { margin-top: 60px; }
          .faq-item { border-bottom: 1px solid var(--line-lt); overflow: hidden; }
          .faq-toggle { display: flex; justify-content: space-between; align-items: center; padding: 26px 0; cursor: pointer; gap: 24px; transition: color 0.3s; }
          .faq-toggle:hover .faq-q { color: var(--red); }
          .faq-q { font-family: var(--serif); font-size: 20px; font-weight: 400; color: var(--ink); line-height: 1.4; }
          .faq-icon { width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0; border: 1px solid var(--line); display: flex; align-items: center; justify-content: center; font-size: 18px; color: var(--red); transition: all 0.4s; }
          .faq-item.open .faq-icon { transform: rotate(45deg); border-color: var(--red); background: var(--red); color: #fff; }
          .faq-body { max-height: 0; overflow: hidden; transition: max-height 0.5s cubic-bezier(0.4,0,0.2,1); }
          .faq-item.open .faq-body { max-height: 300px; }
          .faq-a { font-size: 16px; color: var(--ink-mid); line-height: 1.88; padding-bottom: 26px; font-family: var(--sans); }

          /* ── FINAL CTA ── */
          .section-final { background: var(--red); padding: 200px 0 160px; text-align: center; position: relative; overflow: hidden; }
          .final-bg-text { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); font-family: var(--serif); font-size: clamp(80px, 15vw, 220px); font-weight: 300; color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.08); white-space: nowrap; pointer-events: none; user-select: none; letter-spacing: -0.02em; }
          .final-orb { position: absolute; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(0,0,0,0.2), transparent 70%); top: 50%; left: 50%; transform: translate(-50%,-50%); pointer-events: none; animation: orbFloat 12s ease-in-out infinite; }
          .final-inner { position: relative; z-index: 2; }
          .final-headline { font-family: var(--serif); font-size: clamp(30px, 4.5vw, 58px); font-weight: 400; line-height: 1.22; color: #FDFCFB; max-width: 720px; margin: 0 auto; }
          .final-headline em { font-style: italic; color: rgba(232,184,122,0.9); }
          .final-body { max-width: 520px; margin: 28px auto 0; font-size: 16px; color: rgba(253,252,251,0.68); line-height: 1.88; font-family: var(--sans); }
          .final-sign { font-family: var(--serif); font-style: italic; font-size: 16px; color: rgba(253,252,251,0.42); margin-top: 44px; }

          /* ── RESPONSIVE ── */
          @media (max-width: 960px) {
            .diag-container, .diag-container-sm { padding: 0 28px; }
            .diag-hero { padding: 130px 28px 80px; }
            .recognition-grid, .session-layout, .about-layout { grid-template-columns: 1fr; gap: 48px; }
            .recognition-card-3d { transform: none; }
            .session-img-wrap { transform: none; height: 320px; }
            .about-img-frame { height: 360px; }
            .about-accent { display: none; }
            .testimonial-grid, .wa-grid { grid-template-columns: 1fr; gap: 16px; }
            .t-card-1, .t-card-2, .t-card-3 { margin-top: 0; }
            .process-grid { grid-template-columns: 1fr 1fr; }
            .pricing-card { padding: 28px 20px; }
            .modal-box { padding: 36px 24px; }
            .hero-cta-group { flex-direction: column; align-items: center; }
            .diag-sec { padding: 100px 0; }
            .recognition-float-stat { bottom: -12px; right: -12px; }
            .recognition-bullets-col { margin-top: 0; }
          }
          @media (max-width: 600px) {
            .process-grid { grid-template-columns: 1fr; }
            .about-stats-bar { grid-template-columns: 1fr; }
            .about-stat { border-right: none; border-bottom: 1px solid var(--line); }
            .about-stat:last-child { border-bottom: none; }
            .btn-glow, .btn-outline { padding: 15px 28px; font-size: 12px; }
          }
        `}</style>

        {/* Background orbs */}
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />

        {/* ── HERO ── */}
        <section className="diag-hero" id="hero">
          <div className="hero-badge"><span className="hero-badge-dot" />Private · Online · Limited Sessions</div>
          <h1 className="hero-headline">
            You&apos;ve tried<br />fixing the problem...<br />
            <span className="grad-text">but what if the real<br />cause runs deeper?</span>
          </h1>
          <div className="hero-divider" />
          <p className="hero-sub">A 1-hour private online Energy Diagnostic Call with Raseshvari Hindustani — designed to help you understand the hidden energetic patterns that may be affecting the way life has been feeling for you.</p>
          <p className="hero-relatability" style={{ marginTop: '20px' }}>For people who feel like something in life hasn&apos;t been fully making sense for a long time... despite all their efforts to move forward.</p>
          <div className="hero-cta-group" id="apply">
            <button className="btn-glow" onClick={() => setShowForm(true)} style={{ cursor: 'pointer', border: 'none' }}>Apply for Your Energy Diagnostic Call</button>
          </div>
          <div className="hero-trust">
            <span>1-Hour Private Zoom Session</span><span className="hero-trust-sep" />
            <span>Online Only</span><span className="hero-trust-sep" />
            <span>Limited Sessions</span>
          </div>
        </section>
        {/* ── RECOGNITION ── */}
        <section className="diag-section section-recognition diag-sec" id="recognition">
          <div className="diag-container">
            <div className="recognition-grid">
              <div>
                <h2 className="section-headline reveal" style={{ fontFamily: 'var(--serif)', marginBottom: '32px', fontSize: '38px', lineHeight: 1.2 }}>
                  This May Resonate<br />With You, If... <span style={{ color: 'var(--red)', marginLeft: '6px' }}>&rarr;</span>
                </h2>
                <div className="recognition-visual reveal">
                  <div className="recognition-card-3d">
                    <div className="big-number">02</div>
                    <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.55)' }}>Recognition</span>
                    <p style={{ fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: 400, color: '#FDFCFB', lineHeight: 1.35, marginTop: '8px' }}>Sometimes the visible problem is only the surface.</p>
                    <div className="gold-line" style={{ margin: '24px 0' }} />
                    <p style={{ fontSize: '15px', color: 'rgba(253,252,251,0.65)', lineHeight: 1.8, fontFamily: 'var(--serif)', fontStyle: 'italic' }}>&quot;The deeper reason may be something you haven&apos;t fully seen yet.&quot;</p>
                  </div>
                  {/* <div className="recognition-float-stat">
                    <div className="stat-n">5+</div>
                    <div className="stat-l">Countries Reached</div>
                  </div> */}
                </div>
              </div>
              <div className="recognition-bullets-col">
                <div className="bullet-grid reveal reveal-delay-1">
                  {[
                    "No matter how much effort you put into life, things still feel stuck, heavy or unresolved",
                    "The same struggles, disappointments or patterns seem to repeat in different forms",
                    "Relationships, work, business or finances often feel more exhausting than they should",
                    "You have achieved things externally... yet internally something still feels restless, disconnected or incomplete",
                    "You feel tired of constantly pushing, forcing or trying to \"fix\" yourself",
                    "Deep down, you sense there may be a deeper reason behind what you've been experiencing",
                  ].map((txt) => (
                    <div key={txt} className="bullet-item"><span className="bullet-mark" /><span>{txt}</span></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pull Quote Block (Full Width / full rectangular space) */}
            <div className="pull-quote-block reveal reveal-delay-2" style={{ marginTop: '60px' }}>
              <p>&quot;Many people describe this experience not as being given answers, but as finally being able to understand their life experiences differently — sometimes for the first time in years.&quot;</p>
            </div>
          </div>
        </section>

        {/* ── SESSION ── */}
        <section className="diag-section section-session diag-sec" id="session">
          <div className="diag-container">
            <div className="session-layout">
              <div className="session-image-box reveal">
                <div className="session-img-wrap red-box">
                  <img src="/images/diagnostic-what.png" alt="" />
                </div>
                <div className="session-float-tag">1-Hour Private Session</div>
              </div>
              <div>
                <span className="eyebrow reveal">The Session</span>
                <div className="gold-line reveal reveal-delay-2" style={{ marginTop: '12px' }} />
                <p className="section-subtext reveal reveal-delay-2" style={{ marginBottom: '18px' }}>Through a deeply personal and unhurried conversation, Raseshvari listens not only to what you share — but also to the recurring patterns and deeper themes that may be connected beneath the surface.</p>
                <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '19px', color: 'var(--ink-mid)', lineHeight: 1.72 }} className="reveal reveal-delay-2">This is not about judging you or telling you what is &quot;wrong&quot; with you.</p>
                <div className="session-bullets reveal reveal-delay-3">
                  {[
                    "Why certain struggles or patterns may keep repeating despite your efforts",
                    "What you may have been carrying within yourself for a long time",
                    "How different life experiences may be more deeply connected than they appear",
                    "What may now be asking for your attention, awareness or change",
                  ].map((txt) => (
                    <div key={txt} className="session-bullet"><div className="session-bullet-icon">→</div><p>{txt}</p></div>
                  ))}
                </div>
                {/* <div style={{ marginTop: '32px', paddingTop: '22px', borderTop: '1px solid var(--line-lt)', fontSize: '12px', color: 'var(--ink-soft)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--sans)' }} className="reveal reveal-delay-3">Online on Zoom &nbsp;·&nbsp; Confidential &nbsp;·&nbsp; Personal</div> */}
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section className="diag-section section-about diag-sec" id="about">
          <div className="diag-container">
            <div className="about-layout">
              <div className="about-img-col reveal">
                <div className="about-img-frame"><img src="/images/diagnostic-who.png" alt="" /></div>
                {/* <div className="about-accent"><span>27 years of deep experience</span></div> */}
              </div>
              <div>
                <span className="eyebrow reveal">About</span>
                <h2 className="section-headline reveal reveal-delay-1">Meet Raseshvari<br /><em>Hindustani</em></h2>
                <div className="about-stats-bar reveal reveal-delay-2">
                  <div className="about-stat"><span className="about-stat-num counter" data-target="15">0</span><span className="about-stat-num" style={{ fontSize: '26px' }}>+</span><div className="about-stat-lbl">Years With People</div></div>
                  <div className="about-stat"><span className="about-stat-num counter" data-target="5">0</span><span className="about-stat-num" style={{ fontSize: '26px' }}>+</span><div className="about-stat-lbl">Countries</div></div>
                  <div className="about-stat"><span className="about-stat-num counter" data-target="27">0</span><div className="about-stat-lbl">Years Experience</div></div>
                </div>
                <p className="section-subtext reveal reveal-delay-2" style={{ marginBottom: '16px' }}>For over 15 years, Raseshvari has been working closely with people navigating repeated life patterns, heaviness, relationship struggles, inner confusion and deeper personal challenges that often cannot be understood only on the surface.</p>
                <p className="section-subtext reveal reveal-delay-2" style={{ marginBottom: '16px' }}>People from different walks of life across 5+ countries — professionals, business owners, leaders, mothers — have reached out seeking deeper understanding and personal transformation.</p>
                <p className="section-subtext reveal reveal-delay-3">Before stepping fully into this work, Raseshvari also worked as a UGC NET qualified lecturer, bringing both depth and grounded understanding into the way she guides people today.</p>
              </div>
            </div>

            {/* Closing Quote (Full Width) */}
            <div className="about-closing-block reveal reveal-delay-3">
              <p className="about-closing-quote">&quot;Sometimes being truly understood — and truly understanding the deeper root cause beneath your experiences — can itself become the beginning of change.&quot;</p>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="diag-section section-testimonials diag-sec" id="testimonials">
          <div className="diag-container">
            <div className="reveal">
              <span className="eyebrow eyebrow-light">Experiences</span>
              <h2 className="section-headline on-dark">What People Often Experience<br /><em>After The Session</em></h2>
            </div>
            <div className="testimonial-grid">
              <div className="testimonial-card t-card-1 reveal reveal-delay-1">
                <span className="t-qmark">&quot;</span>
                <p className="t-text">I originally came because the same patterns kept repeating in my relationships no matter how much I tried to change things. During the call, I understood something I had never connected before — and honestly, it changed the way I saw my entire situation.</p>
                <div className="t-author">
                  <img src="/energy-testimonial/kirthi.jpeg" alt="Dr Kirthi kakade" className="t-avatar" />
                  <div className="t-meta">
                    <span className="t-name">Dr Kirthi kakade</span>
                    <span className="t-title">Homeopathy and Psychotherapist, Bangalore</span>
                  </div>
                </div>
              </div>
              <div className="testimonial-card t-card-2 reveal reveal-delay-2">
                <span className="t-qmark">&quot;</span>
                <p className="t-text">I didn&apos;t even know how to properly explain what I was feeling before the call. But somehow, things that had felt confusing for years started making sense in a very different way.</p>
                <div className="t-author">
                  <img src="/energy-testimonial/kamal.jpeg" alt="Kamal Girdhar" className="t-avatar" />
                  <div className="t-meta">
                    <span className="t-name">Kamal Girdhar</span>
                    <span className="t-title">AVP Banking Sector, New Delhi</span>
                  </div>
                </div>
              </div>
              <div className="testimonial-card t-card-3 reveal reveal-delay-3">
                <span className="t-qmark">&quot;</span>
                <p className="t-text">I had been carrying constant heaviness for a very long time while still functioning normally in life. I left the call feeling lighter and much more settled within myself.</p>
                <div className="t-author">
                  <img src="/energy-testimonial/rohit.jpeg" alt="Rohit Sandani" className="t-avatar" />
                  <div className="t-meta">
                    <span className="t-name">Rohit Sandani</span>
                    <span className="t-title">Ish Cyberolutions, Delhi</span>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp mockups */}
            <div className="wa-grid reveal" style={{ marginTop: '64px' }}>
              <div className="wa-mockup">
                <img src="/energy-testimonial/1.png" alt="WhatsApp testimonial 1" className="wa-img" />
              </div>
              <div className="wa-mockup">
                <img src="/energy-testimonial/2.png" alt="WhatsApp testimonial 2" className="wa-img" />
              </div>
              <div className="wa-mockup">
                <img src="/energy-testimonial/3.png" alt="WhatsApp testimonial 3" className="wa-img" />
              </div>
            </div>
            <p className="testimonials-close reveal">Every person&apos;s experience is different. But many people leave feeling lighter,<br />more settled within themselves and more aware of what they may have been carrying.</p>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="diag-section section-process diag-sec" id="process">
          <div className="diag-container">
            <div className="reveal" style={{ textAlign: 'center' }}>
              <span className="eyebrow">What Happens Next</span>
              <h2 className="section-headline">A simple and<br /><em>guided process.</em></h2>
            </div>
            <div className="process-grid">
              {[
                { num: "01", step: "Step One", title: "Share Your Details", desc: "Fill out a short form to help us understand what you've been experiencing and whether this session may be the right fit for you.", delay: "reveal-delay-1" },
                { num: "02", step: "Step Two", title: "Personal Connection", desc: "Our team will connect with you on WhatsApp to guide you through the next steps and answer any initial questions you may have.", delay: "reveal-delay-2" },
                { num: "03", step: "Step Three", title: "Session Booking", desc: "After confirmation, you'll receive payment details and your private online session will be scheduled at a mutually comfortable time.", delay: "reveal-delay-3" },
                { num: "04", step: "Step Four", title: "Your Diagnostic Call", desc: "A safe and deeply personal space to explore the energetic patterns that may have been silently affecting your life for a long time.", delay: "reveal-delay-4" },
              ].map((s) => (
                <div key={s.num} className={`process-card diag-card reveal ${s.delay}`}>
                  <span className="process-num">{s.num}</span>
                  <span className="step-badge">{s.step}</span>
                  <div className="step-title">{s.title}</div>
                  <p className="step-desc">{s.desc}</p>
                </div>
              ))}
            </div>
            <p style={{ textAlign: 'center', marginTop: '44px', fontSize: '12px', color: 'var(--ink-soft)', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--sans)' }} className="reveal">A personal, private and confidential online experience.</p>
          </div>
        </section>

        {/* ── APPLY MODAL ── */}
        {showForm && (
          <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}>
            <div className="modal-box">
              <button className="modal-close" onClick={() => setShowForm(false)} aria-label="Close">✕</button>
              <p className="modal-title">Apply for Your<br /><em style={{ fontStyle: 'italic', color: 'var(--red)' }}>Energy Diagnostic Call</em></p>
              <p className="modal-sub">Share a few details and we will connect with you personally on WhatsApp to guide your next steps.</p>
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="apply-name">Name *</label>
                  <input id="apply-name" className="form-input" type="text" required placeholder="Full name" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="apply-dob">Date of birth *</label>
                  <input id="apply-dob" className="form-input" type="date" required value={formData.dob} onChange={e => setFormData(p => ({ ...p, dob: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="apply-gender">Gender *</label>
                  <select id="apply-gender" className="form-input" required value={formData.gender} onChange={e => setFormData(p => ({ ...p, gender: e.target.value }))}>
                    <option value="" disabled>Select Gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other / Prefer not to say</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="apply-country">Country *</label>
                  <input id="apply-country" className="form-input" type="text" required placeholder="e.g. India, United States" value={formData.country} onChange={e => setFormData(p => ({ ...p, country: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="apply-phone">Phone number *</label>
                  <div className="phone-row">
                    {/* Country code trigger */}
                    <button
                      type="button"
                      className="cc-btn"
                      onClick={() => { setShowCountryDrop(v => !v); setCountrySearch(''); }}
                      aria-label="Select country code"
                    >
                      <span className="cc-flag">{selectedCountry.flag}</span>
                      <span className="cc-dial">{selectedCountry.dial}</span>
                      <span className={`cc-chevron${showCountryDrop ? ' open' : ''}`}>▼</span>
                    </button>
                    {/* Dropdown */}
                    {showCountryDrop && (
                      <div className="cc-dropdown">
                        <input
                          className="cc-search"
                          type="text"
                          placeholder="Search country..."
                          autoFocus
                          value={countrySearch}
                          onChange={e => setCountrySearch(e.target.value)}
                        />
                        <div className="cc-list">
                          {COUNTRIES.filter(c =>
                            c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
                            c.dial.includes(countrySearch)
                          ).map(c => (
                            <div
                              key={c.code}
                              className={`cc-option${c.code === selectedCountry.code ? ' active' : ''}`}
                              onClick={() => { setSelectedCountry(c); setShowCountryDrop(false); setCountrySearch(''); setFormData(p => ({ ...p, country: p.country || c.name })); }}
                            >
                              <span className="cc-opt-flag">{c.flag}</span>
                              <span className="cc-opt-name">{c.name}</span>
                              <span className="cc-opt-dial">{c.dial}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Number input */}
                    <input
                      id="apply-phone"
                      className="phone-number-input"
                      type="tel"
                      required
                      placeholder="98765 43210"
                      value={formData.phone}
                      onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="apply-purpose">Purpose *</label>
                  <textarea id="apply-purpose" className="form-input form-textarea" required placeholder="Share briefly your purpose for this call..." value={formData.purpose} onChange={e => setFormData(p => ({ ...p, purpose: e.target.value }))} />
                </div>
                <button type="submit" className="form-submit" disabled={submitting}>
                  {submitting ? 'Opening WhatsApp...' : 'Submit & Connect on WhatsApp'}
                </button>
                <p className="form-note">🔒 Your details are completely private and confidential. We will only use them to connect with you personally.</p>
              </form>
            </div>
          </div>
        )}

        {/* ── PRICING ── */}
        <section className="diag-section section-pricing diag-sec" id="pricing">
          <div className="diag-container" style={{ textAlign: 'center' }}>
            <span className="eyebrow reveal">The Investment</span>
            <h2 className="section-headline reveal reveal-delay-1">Private 1-Hour<br /><em>Energy Diagnostic Call</em></h2>
          </div>
          <div className="diag-container">
            <div className="pricing-wrapper reveal reveal-delay-2">
              <div className="pricing-glow" />
              <div className="pricing-card">
                <p className="price-eyebrow">Session Fee</p>
                <p className="price-title">Energy Diagnostic Call</p>
                {isIndia === null ? (
                  <div className="price-amount" style={{ fontSize: '32px', WebkitTextFillColor: 'var(--ink-soft)', background: 'none' }}>Loading...</div>
                ) : isIndia ? (
                  <>
                    <div className="price-badge">🇮🇳 India Pricing</div>
                    <div className="price-amount"><span className="price-sup">₹</span>15,000</div>
                  </>
                ) : (
                  <>
                    <div className="price-badge">🌍 International Pricing</div>
                    <div className="price-amount"><span className="price-sup">$</span>275</div>
                  </>
                )}
                <ul className="price-includes">
                  <li>1-Hour Private Zoom Session</li>
                  <li>Personal &amp; Confidential Experience</li>
                  <li>Guided Energy Diagnostic Process</li>
                </ul>
                <p className="pricing-note">Every session is approached with depth, sincerity, care and complete personal attention.</p>
                <button className="btn-glow" onClick={() => setShowForm(true)} style={{ cursor: 'pointer', border: 'none', width: '100%' }}>
                  Apply for Your Energy Diagnostic Call
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="diag-section section-faq diag-sec" id="faq">
          <div className="diag-container-sm">
            <div className="reveal">
              <span className="eyebrow">Questions</span>
              <h2 className="section-headline">Things people often<br /><em>ask before the call</em></h2>
            </div>
            <div className="faq-list reveal reveal-delay-1">
              {[
                { q: "What exactly happens during the session?", a: "Through a deeply personal conversation, Raseshvari listens to what you share and identifies recurring patterns, themes and deeper root causes that may be influencing how your life has been unfolding. This is not a therapy session — it's an energetic diagnostic process designed to bring clarity." },
                { q: "Is this suitable for me if I'm going through something right now?", a: "Yes. Many people reach out precisely when something in life feels unresolved, stuck or persistently unclear. If you sense that there may be a deeper reason behind what you've been experiencing, this session is designed for exactly that." },
                { q: "What should I prepare before the session?", a: "Nothing special is required. Come as you are, with an open mind and the willingness to share what has been on your heart. Raseshvari will guide the conversation gently and personally from there." },
                { q: "Is everything shared in the session kept private?", a: "Absolutely. Every session is treated with complete confidentiality and personal care. What you share remains between you and Raseshvari." },
                { q: "How do I book a session?", a: "Click the 'Apply' button on this page and our team will connect with you on WhatsApp to guide you through the next steps personally." },
              ].map((f) => (
                <div key={f.q} className="faq-item">
                  <div className="faq-toggle">
                    <span className="faq-q">{f.q}</span>
                    <div className="faq-icon">+</div>
                  </div>
                  <div className="faq-body"><p className="faq-a">{f.a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="diag-section section-final">
          <div className="final-orb" />
          <div className="final-bg-text">Raseshvari</div>
          <div className="final-inner diag-container">
            <div className="reveal">
              <span className="eyebrow eyebrow-light">An Invitation</span>
              <h2 className="final-headline">Sometimes life keeps showing us the same things... until we are finally ready to <em>understand them differently.</em></h2>
              <p className="final-body">If you feel ready to explore the energetic patterns that may have been affecting your life for a long time, you are welcome to take the next step. This session is simply a safe and personal space to explore what you may have been carrying — and what may now be ready to shift.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', marginTop: '48px' }}>
                <button className="btn-glow" onClick={() => setShowForm(true)} style={{ cursor: 'pointer', border: 'none' }}>Apply for Your Energy Diagnostic Call</button>
              </div>
              <p className="final-sign">With sincerity, care and complete personal attention.</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
