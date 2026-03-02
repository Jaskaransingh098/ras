"use client";

import { useState, useEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface Props {
  scrollRef: RefObject<HTMLElement | null>;
}

interface CardData {
  title: string;
  highlight: string;
  sub: string;
  badge: string;
  name: string;
  role: string;
  location: string;
  youtubeId: string;
  transcript: string;
}

const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

export default function Reel({ scrollRef }: Props) {
  const [featured, setFeatured] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  const scrollStrip = (direction: "left" | "right") => {
    const el = stripRef.current;
    if (!el) return;
    const scrollAmount = 200;
    el.scrollBy({ left: direction === "right" ? scrollAmount : -scrollAmount, behavior: "smooth" });
  };

  const cards: CardData[] = [
    {
      title: "15 Years of",
      highlight: "Corporate Turmoil",
      sub: "Shifted in",
      badge: "One Session",
      name: "Kamal Girdhar",
      role: "Banking Professional",
      location: "New Delhi",
      youtubeId: "Z6tDt6gOqE4",
      transcript:
        "I had been struggling with corporate stress for 15 years. The pressure was immense — deadlines, office politics, and constant anxiety. I tried everything from therapy to meditation apps, but nothing worked long-term. Then I found Raseshvari's Energy Shift Session. In just one session, something shifted deep within me. The heaviness I carried for years just dissolved. I felt lighter, clearer, and more focused than I had in over a decade. My colleagues noticed the change immediately. I'm now leading my team with a calm confidence I never thought possible. This was truly life-changing.",
    },
    {
      title: "Pain to Power",
      highlight: "",
      sub: "in just one",
      badge: "Energy Shift Session",
      name: "Dr. Rajpreet",
      role: "Dentist",
      location: "",
      youtubeId: "BDibr1yKLMA",
      transcript:
        "As a dentist, I was always focused on healing others, but I neglected my own well-being. Chronic pain had become my constant companion. I was skeptical at first — how could one session change anything? But Raseshvari's approach was unlike anything I'd experienced. She identified energy blockages I didn't even know existed. After the session, the pain that had plagued me for years began to fade. I went from barely getting through my workdays to thriving with renewed energy and passion for my practice.",
    },
    {
      title: "From Stuck to",
      highlight: "Business Growth",
      sub: "in just one",
      badge: "Revenue Energetic Session",
      name: "Shashank Singh",
      role: "Founder Blackwik",
      location: "New Delhi",
      youtubeId: "IfAoiYonAAw",
      transcript:
        "My startup had hit a wall. Revenue was stagnant, team morale was low, and I was burning out fast. A friend recommended Raseshvari's Revenue Energetic Session. I thought it was unconventional, but I was desperate enough to try. The session unlocked something — creativity started flowing, I made bold decisions with clarity, and within weeks my business started growing again. We've since tripled our revenue and the team energy is completely transformed. I now do quarterly sessions to keep the momentum going.",
    },
    {
      title: "Anxiety to",
      highlight: "Inner Peace",
      sub: "Achieved through",
      badge: "Healing Session",
      name: "Priya Sharma",
      role: "Software Engineer",
      location: "Bangalore",
      youtubeId: "Zwuiubinbi8",
      transcript:
        "Working in tech, anxiety was my default state. Constant deadlines, imposter syndrome, and the fear of falling behind consumed me. I had tried counseling and medication, but the anxiety always returned. Raseshvari's healing session was a revelation. She worked on deep-rooted fears I had been carrying since childhood. After the session, I felt a profound sense of peace I hadn't experienced in years. My productivity actually improved because I was no longer paralyzed by anxiety. I sleep better, think clearer, and genuinely enjoy life again.",
    },
    {
      title: "Broken Family to",
      highlight: "Deep Reconnection",
      sub: "Restored in one",
      badge: "Family Healing Session",
      name: "Sunita Devi",
      role: "Homemaker & Mother",
      location: "Lucknow",
      youtubeId: "hWNj_VwGsEs",
      transcript:
        "My family was falling apart — constant arguments, emotional distance between me and my children, and years of unspoken pain. I had tried family counseling, but nothing seemed to bridge the gap. Raseshvari's Family Healing Session changed everything. She identified deep-rooted energy blocks that had been passed down through generations. After the session, conversations that were impossible before started happening naturally. My eldest son called me for the first time in months. Today, we sit together for dinner every night. She gave me my family back.",
    },
    {
      title: "Financial Blocks",
      highlight: "Shattered",
      sub: "Breakthrough after one",
      badge: "Abundance Session",
      name: "Rahul Verma",
      role: "Real Estate Developer",
      location: "Noida",
      youtubeId: "6ce6FWIHzf0",
      transcript:
        "No matter how hard I worked, money seemed to slip through my fingers. Deals would fall through at the last minute, investments would tank, and I was drowning in debt. A business partner told me about Raseshvari's Abundance Session. I was skeptical — how could energy work fix finances? But within two weeks of the session, a deal I had given up on suddenly closed. Then another. Then a whole chain of opportunities opened up. In three months, I cleared all my debts and my business is thriving like never before. It was like a dam broke.",
    },
    {
      title: "Stage Fear to",
      highlight: "Fearless Speaker",
      sub: "Transformed in one",
      badge: "Confidence Activation",
      name: "Meghna Rao",
      role: "TEDx Speaker & Author",
      location: "Hyderabad",
      youtubeId: "woZJtGv6P-w",
      transcript:
        "I had crippling stage fear. Even presenting in a small meeting would make my hands shake and my voice tremble. As someone who dreamed of being a speaker, this was devastating. Raseshvari's Confidence Activation Session unlocked something primal in me. She traced the fear back to a childhood incident I had completely forgotten. After the session, I felt a calm confidence I had never experienced. Two months later, I delivered my first TEDx talk to a standing ovation. I went from hiding in corners to commanding stages.",
    },
  ];

  const sideCards = cards
    .map((c, i) => ({ ...c, idx: i }))
    .filter((_, i) => i !== featured);

  const fc = cards[featured];
  const isFeaturedFlipped = !!flippedCards[featured];

  const handleSwap = (i: number) => {
    if (featuredRef.current) {
      gsap.fromTo(featuredRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" });
    }
    setPlayingVideo(null);
    setFlippedCards({});
    setFeatured(i);
  };

  const flip = (i: number, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setFlippedCards((p) => ({ ...p, [i]: !p[i] }));
  };

  const play = (i: number, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setPlayingVideo(i);
  };

  useEffect(() => {
    const s = sectionRef.current;
    if (!s) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(s.querySelectorAll(".rr"), { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, stagger: 0.14, ease: "power3.out",
        scrollTrigger: { trigger: s, start: "top 80%", toggleActions: "play none none none" },
      });
    }, s);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-15 overflow-hidden min-h-[100dvh] flex flex-col justify-center bg-[#f8f7f4]"
    >
      <style jsx>{`
        .flip-inner{transition:transform .55s cubic-bezier(.4,0,.2,1);transform-style:preserve-3d}
        .flip-inner.flipped{transform:rotateY(180deg)}
        .face{backface-visibility:hidden;-webkit-backface-visibility:hidden}
        .face-back{backface-visibility:hidden;-webkit-backface-visibility:hidden;transform:rotateY(180deg)}
        .ts::-webkit-scrollbar{width:4px}
        .ts::-webkit-scrollbar-track{background:rgba(255,255,255,.08);border-radius:10px}
        .ts::-webkit-scrollbar-thumb{background:rgba(255,255,255,.3);border-radius:10px}
        .ts-light::-webkit-scrollbar{width:3px}
        .ts-light::-webkit-scrollbar-track{background:#f5f5f5;border-radius:10px}
        .ts-light::-webkit-scrollbar-thumb{background:#c42d2d40;border-radius:10px}
        .phone-frame{border-radius:24px;aspect-ratio:9/16;overflow:hidden;position:relative}
        .strip-scroll::-webkit-scrollbar{display:none}
      `}</style>

      {/* ── HEADER ── */}
      <div className="text-center mb-14 rr px-6">
        <p className="text-sm uppercase tracking-[.2em] text-[#c42d2d] mb-4 font-semibold">
          Our Clients Brag About Us
        </p>
        <h2 className="text-[36px] md:text-[52px] lg:text-[60px] font-[var(--font-playfair)] text-[#111] leading-[1.15] max-w-3xl mx-auto">
          Don&rsquo;t believe us? Hear it straight from them.
        </h2>
        <p className="mt-4 text-gray-500 text-base max-w-xl mx-auto">
          Real stories from real people. Watch the shorts or read the full transcript.
        </p>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 rr">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-6 items-stretch">

          {/* ═══ LEFT: Featured Short + Info ═══ */}
          <div ref={featuredRef} className="flex flex-col sm:flex-row gap-6 lg:gap-8 flex-shrink-0 lg:w-[520px] xl:w-[580px]">

            {/* Phone frame player */}
            <div className="flex-shrink-0 w-[220px] md:w-[290px] mx-auto sm:mx-0" style={{ perspective: "1400px" }}>
              <div className={`flip-inner w-full h-full ${isFeaturedFlipped ? "flipped" : ""}`}>
                {/* FRONT */}
                <div className="face w-full">
                  <div className="phone-frame bg-black shadow-2xl border-[3px] border-gray-800 w-full">
                    {playingVideo === featured ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${fc.youtubeId}?autoplay=1&rel=0&loop=1`}
                        title={fc.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      />
                    ) : (
                      <>
                        <img src={ytThumb(fc.youtubeId)} alt={fc.name} className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <button
                          onClick={(e) => play(featured, e)}
                          className="absolute inset-0 flex items-center justify-center z-10 group/play"
                        >
                          <div className="w-14 h-14 rounded-full bg-[#c42d2d] flex items-center justify-center shadow-xl group-hover/play:scale-110 transition-transform duration-300 ring-4 ring-white/20">
                            <svg width="20" height="22" viewBox="0 0 18 20" fill="none"><path d="M0 0L18 10L0 20V0Z" fill="white" /></svg>
                          </div>
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 p-4 z-10 text-white">
                          <div className="flex items-center gap-2 mb-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#ff4444] animate-pulse" />
                            <span className="text-[10px] uppercase tracking-wider opacity-80 font-medium">YouTube Short</span>
                          </div>
                          <p className="font-bold text-sm leading-tight">{fc.name}</p>
                          <p className="text-[11px] opacity-70 mt-0.5">{fc.role}{fc.location ? ` · ${fc.location}` : ""}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* BACK — Transcript */}
                <div className="face-back absolute inset-0 w-full">
                  <div className="phone-frame bg-gradient-to-b from-[#c42d2d] to-[#7a1414] shadow-2xl border-[3px] border-[#c42d2d]/60 w-full">
                    <div className="absolute inset-0 flex flex-col p-5">
                      <div className="flex items-center gap-2 mb-3 flex-shrink-0">
                        <div className="w-7 h-7 rounded-full overflow-hidden border border-white/30">
                          <img src={ytThumb(fc.youtubeId)} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-white text-[11px] font-bold leading-tight">{fc.name}</p>
                          <p className="text-white/50 text-[9px]">{fc.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-3 flex-shrink-0">
                        <div className="h-px flex-1 bg-white/20" />
                        <span className="text-white/40 text-[9px] uppercase tracking-widest font-semibold">Transcript</span>
                        <div className="h-px flex-1 bg-white/20" />
                      </div>
                      <div className="flex-1 overflow-y-auto min-h-0 ts pr-2">
                        <p className="text-white/85 text-[12px] leading-[1.8]">
                          <span className="text-white/30 text-xl font-serif">&ldquo;</span>
                          {fc.transcript}
                          <span className="text-white/30 text-xl font-serif">&rdquo;</span>
                        </p>
                      </div>
                      <div className="mt-3 flex-shrink-0">
                        <button onClick={(e) => flip(featured, e)} className="w-full flex items-center justify-center gap-1.5 bg-white/15 text-white py-2 rounded-full text-[11px] font-medium border border-white/20 hover:bg-white/30 transition-colors">
                          ← Back
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text info panel */}
            <div className="flex-1 flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-1 rounded-full bg-[#c42d2d]" />
                <span className="text-[#c42d2d] text-[11px] font-bold uppercase tracking-widest">{featured + 1} / {cards.length}</span>
              </div>

              <h3 className="text-[26px] md:text-[32px] font-[var(--font-playfair)] text-[#111] leading-[1.15] font-bold">
                {fc.title}
                {fc.highlight && <><br /><span className="text-[#c42d2d]">{fc.highlight}</span></>}
              </h3>

              <p className="mt-3 text-gray-500 text-base">{fc.sub}</p>

              <div className="mt-4">
                <span className="bg-[#c42d2d] text-white px-5 py-2 rounded-full text-xs font-bold shadow-lg shadow-[#c42d2d]/20 inline-block">
                  {fc.badge}
                </span>
              </div>

              <div className="mt-6 mb-4 h-px bg-gray-200" />

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden shadow-md border-2 border-[#c42d2d]/20 flex-shrink-0">
                  <img src={ytThumb(fc.youtubeId)} alt={fc.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-[#111] text-[15px]">{fc.name}</p>
                  <p className="text-gray-400 text-xs">{fc.role}{fc.location ? ` · ${fc.location}` : ""}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2.5">
                <button onClick={(e) => play(featured, e)} className="flex items-center gap-2 bg-[#c42d2d] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-lg shadow-[#c42d2d]/25 hover:bg-[#b02525] transition-all">
                  <svg width="12" height="14" viewBox="0 0 14 16" fill="none"><path d="M0 0L14 8L0 16V0Z" fill="white" /></svg>
                  Watch Short
                </button>
                <button onClick={(e) => flip(featured, e)} className="flex items-center gap-2 bg-white text-[#c42d2d] px-5 py-2.5 rounded-full text-xs font-bold shadow-md border border-[#c42d2d]/15 hover:border-[#c42d2d]/40 transition-all">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c42d2d" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  Transcript
                </button>
              </div>
            </div>
          </div>

          {/* ═══ RIGHT: Scrollable Thumbnails ═══ */}
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="flex items-center gap-3 mb-4 flex-shrink-0 mt-20">
              <span className="text-[#111] font-bold text-sm font-[var(--font-playfair)]">More Stories</span>
              <div className="h-px flex-1 bg-gray-200" />
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => scrollStrip("left")}
                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#c42d2d] hover:border-[#c42d2d]/40 transition-all duration-200 bg-white shadow-sm"
                  aria-label="Scroll left"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
                <button
                  onClick={() => scrollStrip("right")}
                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#c42d2d] hover:border-[#c42d2d]/40 transition-all duration-200 bg-white shadow-sm"
                  aria-label="Scroll right"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              </div>
            </div>

            <div ref={stripRef} className="flex-1 overflow-x-auto strip-scroll">
              <div className="flex gap-4 h-full pb-2">
                {sideCards.map((card) => {
                  const isFlipped = !!flippedCards[card.idx];
                  return (
                    <div
                      key={card.idx}
                      className="flex-shrink-0 w-[150px] md:w-[175px]"
                      style={{ perspective: "800px" }}
                    >
                      <div className={`flip-inner w-full h-full ${isFlipped ? "flipped" : ""}`}>
                        {/* FRONT */}
                        <div className="face w-full h-full">
                          <div
                            className={`phone-frame w-full cursor-pointer group shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 ${card.idx === featured ? "border-[#c42d2d] ring-2 ring-[#c42d2d]/20" : "border-gray-200/60 hover:border-[#c42d2d]/40"
                              }`}
                            onClick={() => handleSwap(card.idx)}
                          >
                            <img src={ytThumb(card.youtubeId)} alt={card.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />

                            {/* Hover play */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="w-10 h-10 rounded-full bg-[#c42d2d]/90 flex items-center justify-center shadow-lg">
                                <svg width="12" height="14" viewBox="0 0 12 14" fill="none"><path d="M0 0L12 7L0 14V0Z" fill="white" /></svg>
                              </div>
                            </div>

                            {/* Bottom text */}
                            <div className="absolute bottom-0 left-0 right-0 p-3 text-white z-10">
                              <p className="font-bold text-[10px] leading-tight line-clamp-2">{card.title} {card.highlight}</p>
                              <p className="text-[9px] opacity-70 mt-0.5 truncate">{card.name}</p>
                            </div>

                            {/* Transcript button */}
                            <button
                              onClick={(e) => flip(card.idx, e)}
                              className="absolute top-2 right-2 z-20 w-6 h-6 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-colors"
                              title="Read transcript"
                            >
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* BACK — Mini transcript */}
                        <div className="face-back absolute inset-0 w-full h-full">
                          <div className="phone-frame w-full bg-white shadow-lg border-2 border-[#c42d2d]/30">
                            <div className="absolute inset-0 flex flex-col p-3">
                              <div className="flex items-center mb-2 flex-shrink-0">
                                <span className="text-[9px] font-bold text-[#c42d2d] uppercase tracking-wider">Transcript</span>
                              </div>
                              <p className="text-[9px] font-semibold text-[#111] mb-1 truncate flex-shrink-0">{card.name}</p>
                              <div className="flex-1 overflow-y-auto min-h-0 ts-light pr-1">
                                <p className="text-[9px] leading-[1.65] text-gray-500">
                                  <span className="text-[#c42d2d] text-xs font-serif">&ldquo;</span>
                                  {card.transcript}
                                  <span className="text-[#c42d2d] text-xs font-serif">&rdquo;</span>
                                </p>
                              </div>
                              <div className="mt-2 flex-shrink-0">
                                <button onClick={(e) => flip(card.idx, e)} className="w-full bg-gray-100 text-gray-600 py-1.5 rounded-full text-[9px] font-medium hover:bg-gray-200 transition-colors">← Back</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ─── DOT INDICATORS ─── */}
        <div className="flex items-center justify-center gap-2.5 mt-1 rr">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => handleSwap(i)}
              className={`rounded-full transition-all duration-300 ${i === featured
                ? "w-10 h-3 bg-[#c42d2d] shadow-sm shadow-[#c42d2d]/30"
                : "w-3 h-3 bg-[#c42d2d]/20 hover:bg-[#c42d2d]/40"
                }`}
              aria-label={`View testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
