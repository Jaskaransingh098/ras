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
  poster?: string;
  transcript: string;
}
 
const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
const cardThumb = (c: CardData) => (c.poster ? `/reels/${c.poster}` : ytThumb(c.youtubeId));
 
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
    el.scrollBy({ left: direction === "right" ? 200 : -200, behavior: "smooth" });
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
      youtubeId: "woZJtGv6P-w",
      poster: "kamal.png",
      transcript: `I've been a part of the banking sector for the last 15 years, and I was under intense pressure managing work turmoil and internal politics, which caught on me physically, mentally, and emotionally.
I was under constant pressure to deliver. I could see my confidence eroding, my performance dipping, and this having an adverse impact on my health and wealth. I was gradually slipping into the shell of depression. And you know in corporate life, it's not easy to talk about things like this.
 
I had always heard about mindset coaching, therapy, but I never heard about someone shifting energies. I decided to give it a shot and booked a session with Raseshvari.
With just one session, things shifted. The heaviness completely lifted off, my stress evaporated, and I felt at ease.
 
Post this session, things started to change. I moved into a new role. The stress because of work completely evaporated, and happiness surrounded me finally again.
If you're going through something like this, please connect with Raseshvari. She will transform your life only for the better. I genuinely thank the universe, the almighty, and Raseshvari for pulling this magic off and giving me a life full of bliss, abundance, and peace. Thank you.`,
    },
    {
      title: "Pain to Power",
      highlight: "",
      sub: "in just one",
      badge: "Energy Shift Session",
      name: "Dr. Roohana Rajpreet",
      role: "Dentist",
      location: "",
      youtubeId: "vdOWHa-rzGg",
      poster: "she_heals_2.png",
      transcript: `Raseshvari Hindustani:
"Most high-achieving women carry an invisible emotional load, one that quietly blocks their growth and impacts their revenue too. One of my clients, a beautiful and brilliant doctor, had tried everything, but an old emotional pain wouldn't just let go."
 
Dr. Roohana Rajpreet:
"I was going through something and I was not able to sort out some things because of which I actually needed some help. Aur mere ko lag raha tha main handle kar loongi, ho jayega saara kuch. (And I thought I'll handle it, everything will be fine.) But sometimes it is always better to ask for some help. I just want to share my experience with everybody. I had a session with her today and believe you me, I changed like this [snaps fingers], and I had that glow back on my face. So, I mean, it is visible.
There are many people—many men, many women, many ladies like me—who are going through something but they are not talking it out. I would recommend each and every one: if you connect with her, you'll feel much better. So with Raseshvari mam, with her experience and with her insight and with all the spirituality and all her learnings, she's on a very different plane. Thank you so much, Raseshvari mam. More strength to you, and thanks a ton for this session which you took for me. Thank you."
 
Raseshvari Hindustani:
"When deep emotional weight releases, your confidence, your decisions, your work—everything opens up, and life feels so beautiful. But today, even after four years, she is living lighter, happier, and thriving. If you're feeling stuck in your growth, in your revenue, or your happiness, let's shift it. All you need is just one deep energy shift, and you don't have to carry it alone. Let's connect."`,
    },
    {
      title: "Inner Alignment",
      highlight: "& Emotional Balance",
      sub: "Restored in one",
      badge: "Revenue-Focused Session",
      name: "Sumedha Adavade",
      role: "Asst. Vice President, Bank",
      location: "Mumbai",
      youtubeId: "Zwuiubinbi8",
      transcript: `Every time a deal seemed close to closure… something would shift at the last moment.
Not once.
It started feeling like a pattern.
I'm Sumedha Adavade, Assistant Vice President in a multinational bank in Mumbai, and last year I also began building my own cybersecurity initiative.
On paper, everything looked aligned.
Clients were interested, conversations were positive, and the direction felt right.
And yet… movement was slower than expected.
After a point, it makes you pause and reflect —
not just on effort, but on the deeper journey within.
 
Years ago, I had experienced a meaningful sense of clarity through a session with Raseshvari.
So during a phase of uncertainty, I chose to reconnect and explore her revenue-focused healing session.
What I experienced in that space was not dramatic…
but quietly insightful.
It helped me step back, look within, and reconnect with a sense of clarity and steadiness that I needed at that time.
I left the session feeling lighter, more centered, and emotionally clearer about my path ahead.
And soon after, I did see encouraging movement in my work as well.
 
More than anything, the session reminded me that along with action in the outer world,
inner alignment and emotional balance also play an important role in our journey.
Her work is thoughtful and deeply personal,
and I appreciate the space she creates for reflection and healing.
I'm grateful to Raseshvari for being part of my journey.`,
    },
    {
      title: "From Body",
      highlight: "Hating to Loving",
      sub: "in just one",
      badge: "Body Image Session",
      name: "Abhedika Sahej",
      role: "Student",
      location: "New Delhi",
      youtubeId: "1k8kHVQypr4",
      transcript: `Abhedika Sahej: Hi everybody! My name is Abhedika Sahej. I'm pursuing my 12th class, and I'm going to tell you how a small talk with Raseshvari Di assisted me in my everyday life.
Raseshvari: This beautiful girl came to me at the age of 17, quite hating her body. And today, she owns the stage.
Abhedika: I was actually concerned about my height and reached [out] to my dad for this. And through him, I got the contact of Ras Di and told her whatever I felt about my height. And eventually, she gave me the clearing statements which helped me to clean the blockages and whatever image was there in my head about height, of course.
And after receiving those clearings, I felt so light. Matlab, aisa laga ki [It felt like] I was carrying a lot of load on myself and now it's just gone. I feel so light after receiving those clearings.
Raseshvari: She sings, she glows. She walks in her skin like a song, not a burden. You don't have to fix your body—you just have to talk to it and finally listen.
Abhedika: She taught me to accept myself the way I am. And I'm sure that bahut se aise teenagers honge jo apne looks ko lekar, apni body ko lekar bahut conscious honge [there will be many teenagers who are very conscious about their looks and their body]. So I would highly recommend to consult Ras Di. Talk to her. And I am sure ki aapka bhi cheezon ko dekhne ka nazariya badal jayega [that your perspective of looking at things will also change].
Raseshvari: If she could shift all that energy in just one session, so can you. Let's connect.`,
    },
    {
      title: "Business Saved",
      highlight: "From Shutting Down",
      sub: "transformed in",
      badge: "Energy Session",
      name: "Shashank",
      role: "Business Owner",
      location: "",
      youtubeId: "FPadk3vUnjA",
      transcript: `There was a point in my life where I truly felt my business would shut down. I started it during college, and everything was going great in the beginning—sales were high, growth was solid, and overall, everything felt smooth.
Then, suddenly, sales started dropping. I tried everything: changed products, switched categories, but the sales kept going down. At one point, I genuinely felt like I'd have to close my business and shift back to a corporate job. My mind told me to quit, but my heart felt that the problem lay somewhere else.
 
That's when I did just one energy session with Raseshvari Ma'am. Honestly, I don't know what she did or how she did it, but I felt something shift within me instantly.
 
My stress lifted, I gained confidence, and I found clarity in my mind. Things that had been stuck for months started solving themselves automatically.
It's been four to five months since that session. My business is stable, the growth is back on track, and mentally, I feel very light. For me, this single session was a major turning point in my life.`,
    },
    {
      title: "Heartbreak & Depression",
      highlight: "to Magical Transformation",
      sub: "Shifted in one",
      badge: "Emotional Freedom Session",
      name: "Swapnil Chavan",
      role: "Interior Designer",
      location: "Mumbai",
      youtubeId: "hWNj_VwGsEs",
      transcript: `Raseshvari Hindustani: Heartbreak isn't just pain, it's stuck energy. And when we shift that energy, we shift everything. Not everyone feels like smiling when healing, but even in this quiet moment, you will hear the shift. Grateful to this client for sharing his transformation—and it's his first time on the camera.
 
Swapnil Chavan: Hello friends, myself Swapnil. I'm an interior designer from Mumbai. I would like to share about the magical transformation happening in my life in just one session. I was stuck in my relationship issue for more than one and a half years. I got into depression, I tried hard, but nothing was helping. But by God's grace, Raseshvari ma'am helped me with her emotional freedom session. She is magical, guys. She can make anything possible. She can definitely help you out.
 
Closing Text: You don't have to carry the weight of heartbreak forever! Sometimes, one session…`,
    },
    {
      title: "Stress-Free",
      highlight: "& Relaxed",
      sub: "achieved in one",
      badge: "Healing Session",
      name: "Dhawal Gala",
      role: "",
      location: "",
      youtubeId: "Mj4tbs4Yl9w",
      transcript: `Thanks, Ras. I am feeling really happy that I took your session, and in just one session of 40 minutes, I am feeling so relaxed and so stress-free. I am thinking, why I have not taken your session before? I mean, this kind of stress-freeness which I am recognizing now, I could have taken your session before and I would have released myself before only.
 
And I'm really thankful to you again and I wish God gives you so [much] power and energy that you can help other people also the way you have helped me. And I am really feeling so glad that I took your session after long such time and really feel so light and I... I mean, I can't imagine what I'm feeling. I mean, I don't have any words to tell you what I am feeling. But it is really a very nice feeling.
 
The stress is gone totally from my head, all the negative thoughts which were coming—they are all gone. I am really feeling light, relaxed, and very happy. Thanks to you again. Thanks. Thank you, Ras.`,
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
      gsap.fromTo(s.querySelectorAll(".rr"), { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: s, start: "top 92%", toggleActions: "play none none none" },
      });
    }, s);
    return () => ctx.revert();
  }, []);
 
  return (
    <section
      ref={sectionRef}
      className="py-8 sm:py-10 md:py-16 overflow-hidden min-h-fit flex flex-col justify-center bg-[#f8f7f4]"
    >
      <style jsx>{`
        .flip-inner {
          transition: transform .55s cubic-bezier(.4,0,.2,1);
          transform-style: preserve-3d;
        }
        .flip-inner.flipped { transform: rotateY(180deg); }
        .face {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          position: relative;
        }
        .face-back {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: rotateY(180deg);
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
        }
        .phone-frame {
          border-radius: 20px;
          aspect-ratio: 9/16;
          overflow: hidden;
          position: relative;
          width: 100%;
        }
        /* Featured phone wrapper needs explicit height for flip to work */
        .featured-flip-wrapper {
          width: 100%;
          /* height derived from aspect-ratio on .phone-frame */
        }
        .ts::-webkit-scrollbar { width: 4px; }
        .ts::-webkit-scrollbar-track { background: rgba(255,255,255,.08); border-radius: 10px; }
        .ts::-webkit-scrollbar-thumb { background: rgba(255,255,255,.3); border-radius: 10px; }
        .ts-light::-webkit-scrollbar { width: 3px; }
        .ts-light::-webkit-scrollbar-track { background: #f5f5f5; border-radius: 10px; }
        .ts-light::-webkit-scrollbar-thumb { background: #c42d2d40; border-radius: 10px; }
        .strip-scroll::-webkit-scrollbar { display: none; }
      `}</style>
 
      {/* ── HEADER ── */}
      <div className="text-center mb-6 sm:mb-8 md:mb-14 rr px-4 sm:px-6">
        <p className="text-[22px] sm:text-[28px] md:text-[36px] lg:text-5xl uppercase tracking-[.01em] text-[#c42d2d] mb-2 sm:mb-3 md:mb-4 font-bold font-[var(--font-dm-sans)]">
          Our Clients Brag About Us
        </p>
        <p className="text-[15px] sm:text-[18px] md:text-[22px] lg:text-[28px] tracking-[.02em] font-[var(--font-playfair)] font-semibold text-[#111] leading-[1.2] max-w-3xl mx-auto">
          Don&rsquo;t believe us? Hear it straight from them.
        </p>
        <p className="mt-2 sm:mt-3 text-gray-700 text-[13px] sm:text-[15px] md:text-[17px] max-w-2xl mx-auto font-[var(--font-dm-sans)]">
          Real stories from real people. Watch the shorts or read the full transcript.
        </p>
      </div>
 
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 md:px-10 w-full">
 
        {/* ═══ MOBILE LAYOUT (< lg): stack vertically ═══ */}
        <div className="lg:hidden rr">
          {/* Top row: phone + info side by side on mobile */}
          <div ref={featuredRef} className="flex gap-3 sm:gap-6 items-start mb-5 sm:mb-6">
 
            {/* Phone frame – takes up ~45% on mobile */}
            <div
              className="flex-shrink-0 w-[42vw] max-w-[180px] sm:max-w-[210px]"
              style={{ perspective: "800px" }}
            >
              <div className={`flip-inner ${isFeaturedFlipped ? "flipped" : ""}`} style={{ position: "relative" }}>
                {/* FRONT */}
                <div className="face">
                  <div className="phone-frame bg-black shadow-xl border-[2px] border-[#c42d2d]/30">
                    {playingVideo === featured ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${fc.youtubeId}?autoplay=1&rel=0&loop=1`}
                        title={fc.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full z-20"
                      />
                    ) : (
                      <div className="z-10 w-full h-full absolute inset-0">
                        <img src={cardThumb(fc)} alt={fc.name} className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <button
                          onClick={(e) => play(featured, e)}
                          className="absolute inset-0 flex items-center justify-center z-10 group/play"
                        >
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#c42d2d] flex items-center justify-center shadow-xl group-hover/play:scale-110 transition-transform duration-300 ring-4 ring-white/20">
                            <svg width="14" height="16" viewBox="0 0 18 20" fill="none"><path d="M0 0L18 10L0 20V0Z" fill="white" /></svg>
                          </div>
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 p-2.5 z-10 text-white">
                          <div className="flex items-center gap-1.5 mb-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#ff4444] animate-pulse" />
                            <span className="text-[9px] uppercase tracking-wider opacity-80 font-medium font-[var(--font-dm-sans)]">YouTube Short</span>
                          </div>
                          <p className="font-bold text-[11px] leading-tight font-[var(--font-outfit)]">{fc.name}</p>
                          <p className="text-[9px] opacity-70 mt-0.5">{fc.role}{fc.location ? ` · ${fc.location}` : ""}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
 
                {/* BACK — Transcript */}
                <div className="face-back">
                  <div className="phone-frame bg-gradient-to-b from-[#c42d2d] to-[#7a1414] shadow-xl border-[2px] border-[#c42d2d]/60">
                    <div className="absolute inset-0 flex flex-col p-3 sm:p-4">
                      <div className="flex items-center gap-1.5 mb-2 flex-shrink-0">
                        <div className="w-6 h-6 rounded-full overflow-hidden border border-white/30">
                          <img src={cardThumb(fc)} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-white text-[10px] font-bold leading-tight font-[var(--font-dm-sans)]">{fc.name}</p>
                          <p className="text-white/50 text-[8px]">{fc.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 mb-2 flex-shrink-0">
                        <div className="h-px flex-1 bg-white/20" />
                        <span className="text-white text-[9px] uppercase tracking-widest font-semibold font-[var(--font-dm-sans)]">Transcript</span>
                        <div className="h-px flex-1 bg-white/20" />
                      </div>
                      <div className="flex-1 overflow-y-auto min-h-0 ts pr-1">
                        <p className="text-white text-[11px] leading-[1.8] whitespace-pre-wrap font-[var(--font-dm-sans)]">
                          <span className="text-white/50 text-base font-[var(--font-playfair)]">&ldquo;</span>
                          {fc.transcript}
                          <span className="text-white/50 text-base font-[var(--font-playfair)]">&rdquo;</span>
                        </p>
                      </div>
                      <div className="mt-2 flex-shrink-0">
                        <button onClick={(e) => flip(featured, e)} className="w-full flex items-center justify-center gap-1 bg-white/15 text-white py-1.5 rounded-full text-[10px] font-medium font-[var(--font-dm-sans)] border border-white/20 hover:bg-white/30 transition-colors">
                          ← Back
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
 
            {/* Info panel – right of phone on mobile */}
            <div className="flex-1 flex flex-col justify-start pt-1 min-w-0">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-0.5 rounded-full bg-[#c42d2d]" />
                <span className="text-[#c42d2d] text-[10px] font-bold uppercase tracking-widest font-[var(--font-dm-sans)]">{featured + 1} / {cards.length}</span>
              </div>
 
              <h3 className="text-[16px] sm:text-[20px] font-[var(--font-playfair)] text-[#111] leading-[1.15] font-bold">
                {fc.title}
                {fc.highlight && <><br /><span className="text-[#c42d2d]">{fc.highlight}</span></>}
              </h3>
 
              <p className="mt-2 text-black text-[12px] sm:text-[13px] font-[var(--font-dm-sans)]">One Energy Shift Session</p>
 
              <div className="my-3 h-px bg-gray-200 w-full" />
 
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden shadow border-2 border-[#c42d2d]/20 flex-shrink-0">
                  <img src={cardThumb(fc)} alt={fc.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-[#111] text-[12px] sm:text-[13px] font-[var(--font-dm-sans)] truncate">{fc.name}</p>
                  <p className="text-black text-[11px] sm:text-[12px] truncate">{fc.role}{fc.location ? ` · ${fc.location}` : ""}</p>
                </div>
              </div>
 
              <div className="mt-3">
                <button
                  onClick={(e) => flip(featured, e)}
                  className="flex items-center gap-1.5 bg-white text-[#c42d2d] px-3 py-2 rounded-full text-[11px] font-bold font-[var(--font-outfit)] shadow border border-[#c42d2d]/20 hover:border-[#c42d2d]/40 transition-all"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#c42d2d" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  Transcript
                </button>
              </div>
            </div>
          </div>
 
          {/* Side cards strip — full width horizontal scroll on mobile */}
          <div className="rr">
            <div className="flex items-center gap-2 mb-3 flex-shrink-0">
              <span className="text-[#111] font-bold text-[13px] font-[var(--font-playfair)]">More Stories</span>
              <div className="h-px flex-1 bg-[#c42d2d]" />
              <div className="flex items-center gap-1.5">
                <button onClick={() => scrollStrip("left")} className="w-7 h-7 rounded-full border flex items-center justify-center text-[#c42d2d] border-[#c42d2d]/60 bg-white shadow-sm" aria-label="Scroll left">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
                <button onClick={() => scrollStrip("right")} className="w-7 h-7 rounded-full border flex items-center justify-center text-[#c42d2d] border-[#c42d2d]/60 bg-white shadow-sm" aria-label="Scroll right">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              </div>
            </div>
 
            {/* Strip with explicit height so flip cards render */}
            <div
              ref={stripRef}
              className="overflow-x-auto strip-scroll"
              style={{ height: "calc(36vw * 16 / 9 + 8px)", maxHeight: "300px", minHeight: "180px" }}
            >
              <div className="flex gap-2.5 sm:gap-3 h-full pb-1">
                {sideCards.map((card) => {
                  const isFlipped = !!flippedCards[card.idx];
                  const cardW = "calc(26vw)";
                  const cardMaxW = "140px";
                  const cardMinW = "100px";
                  return (
                    <div
                      key={card.idx}
                      className="flex-shrink-0 h-full"
                      style={{ width: cardW, maxWidth: cardMaxW, minWidth: cardMinW, perspective: "800px" }}
                    >
                      <div className={`flip-inner w-full h-full ${isFlipped ? "flipped" : ""}`} style={{ position: "relative" }}>
                        {/* FRONT */}
                        <div className="face w-full h-full">
                          <div
                            className={`w-full h-full rounded-[16px] overflow-hidden relative cursor-pointer group shadow-md border-2 ${card.idx === featured ? "border-[#c42d2d] ring-2 ring-[#c42d2d]/20" : "border-gray-200/60 hover:border-[#c42d2d]/40"}`}
                            onClick={() => handleSwap(card.idx)}
                          >
                            <img src={cardThumb(card)} alt={card.name} className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity duration-300">
                              <div className="w-9 h-9 rounded-full bg-[#c42d2d]/90 flex items-center justify-center shadow-lg">
                                <svg width="10" height="12" viewBox="0 0 12 14" fill="none"><path d="M0 0L12 7L0 14V0Z" fill="white" /></svg>
                              </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-2 text-white z-10">
                              <p className="font-bold text-[9px] sm:text-[10px] leading-tight line-clamp-2">{card.title} {card.highlight}</p>
                              <p className="text-[8px] sm:text-[9px] opacity-70 mt-0.5 truncate">{card.name}</p>
                            </div>
                            <button
                              onClick={(e) => flip(card.idx, e)}
                              className="absolute top-1.5 right-1.5 z-20 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center"
                              title="Read transcript"
                            >
                              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" />
                              </svg>
                            </button>
                          </div>
                        </div>
 
                        {/* BACK */}
                        <div className="face-back">
                          <div className="w-full h-full rounded-[16px] overflow-hidden relative bg-white shadow-lg border-2 border-[#c42d2d]/30">
                            <div className="absolute inset-0 flex flex-col p-2 sm:p-2.5">
                              <span className="text-[9px] sm:text-[10px] font-bold text-[#c42d2d] uppercase tracking-wider mb-1 flex-shrink-0">Transcript</span>
                              <p className="text-[9px] sm:text-[10px] font-bold text-[#111] mb-1 truncate flex-shrink-0">{card.name}</p>
                              <div className="flex-1 overflow-y-auto min-h-0 ts-light pr-0.5">
                                <p className="text-[10px] sm:text-[11px] leading-[1.7] text-gray-600 whitespace-pre-wrap font-[var(--font-dm-sans)]">
                                  <span className="text-[#c42d2d] text-xs font-serif">&ldquo;</span>
                                  {card.transcript}
                                  <span className="text-[#c42d2d] text-xs font-serif">&rdquo;</span>
                                </p>
                              </div>
                              <button onClick={(e) => flip(card.idx, e)} className="mt-1.5 flex-shrink-0 w-full bg-gray-100 text-gray-700 py-1 rounded-full text-[9px] sm:text-[10px] font-semibold hover:bg-gray-200 transition-colors">← Back</button>
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
 
        {/* ═══ DESKTOP LAYOUT (lg+): original side-by-side ═══ */}
        <div className="hidden lg:flex gap-6 items-stretch">
 
          {/* LEFT: Featured Short + Info */}
          <div ref={featuredRef} className="flex flex-row items-center sm:items-stretch gap-8 md:gap-16 rr">
            {/* Featured Phone Frame */}
            <div
              className="flex-shrink-0 w-[250px] md:w-[270px]"
              style={{ perspective: "800px" }}
            >
              <div className={`flip-inner ${isFeaturedFlipped ? "flipped" : ""}`} style={{ position: "relative" }}>
                {/* FRONT */}
                <div className="face">
                  <div className="phone-frame bg-black shadow-2xl border-[3px] border-[#c42d2d]/30">
                    {playingVideo === featured ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${fc.youtubeId}?autoplay=1&rel=0&loop=1`}
                        title={fc.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full z-20"
                      />
                    ) : (
                      <div className="z-10 w-full h-full absolute inset-0">
                        <img src={cardThumb(fc)} alt={fc.name} className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <button onClick={(e) => play(featured, e)} className="absolute inset-0 flex items-center justify-center z-10 group/play">
                          <div className="w-14 h-14 rounded-full bg-[#c42d2d] flex items-center justify-center shadow-xl group-hover/play:scale-110 transition-transform duration-300 ring-4 ring-white/20">
                            <svg width="20" height="22" viewBox="0 0 18 20" fill="none"><path d="M0 0L18 10L0 20V0Z" fill="white" /></svg>
                          </div>
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 p-4 z-10 text-white">
                          <div className="flex items-center gap-2 mb-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#ff4444] animate-pulse" />
                            <span className="text-[10px] uppercase tracking-wider opacity-80 font-medium font-[var(--font-dm-sans)]">YouTube Short</span>
                          </div>
                          <p className="font-bold text-sm leading-tight font-[var(--font-outfit)]">{fc.name}</p>
                          <p className="text-[11px] opacity-70 mt-0.5">{fc.role}{fc.location ? ` · ${fc.location}` : ""}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
 
                {/* BACK — Transcript */}
                <div className="face-back">
                  <div className="phone-frame bg-gradient-to-b from-[#c42d2d] to-[#7a1414] shadow-2xl border-[3px] border-[#c42d2d]/60">
                    <div className="absolute inset-0 flex flex-col p-5">
                      <div className="flex items-center gap-2 mb-3 flex-shrink-0">
                        <div className="w-7 h-7 rounded-full overflow-hidden border border-white/30">
                          <img src={cardThumb(fc)} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-white text-[11px] font-bold leading-tight font-[var(--font-dm-sans)]">{fc.name}</p>
                          <p className="text-white/50 text-[9px]">{fc.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-3 flex-shrink-0">
                        <div className="h-px flex-1 bg-white/20" />
                        <span className="text-white text-[11px] uppercase tracking-widest font-semibold font-[var(--font-dm-sans)]">Transcript</span>
                        <div className="h-px flex-1 bg-white/20" />
                      </div>
                      <div className="flex-1 overflow-y-auto min-h-0 ts pr-2">
                        <p className="text-white text-[15px] leading-[2.0] whitespace-pre-wrap font-[var(--font-dm-sans)]">
                          <span className="text-white/50 text-xl font-[var(--font-playfair)]">&ldquo;</span>
                          {fc.transcript}
                          <span className="text-white/50 text-xl font-[var(--font-playfair)]">&rdquo;</span>
                        </p>
                      </div>
                      <div className="mt-3 flex-shrink-0">
                        <button onClick={(e) => flip(featured, e)} className="w-full flex items-center justify-center gap-1.5 bg-white/15 text-white py-2 rounded-full text-[11px] font-medium font-[var(--font-dm-sans)] border border-white/20 hover:bg-white/30 transition-colors">
                          ← Back
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
 
            {/* Desktop text info panel */}
            <div className="flex-1 flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-1 rounded-full bg-[#c42d2d]" />
                <span className="text-[#c42d2d] text-[11px] font-bold uppercase tracking-widest font-[var(--font-dm-sans)]">{featured + 1} / {cards.length}</span>
              </div>
              <h3 className="section-subheading text-[26px] md:text-[32px] font-[var(--font-playfair)] text-[#111] leading-[1.15] font-bold">
                {fc.title}
                {fc.highlight && <><br /><span className="text-[#c42d2d]">{fc.highlight}</span></>}
              </h3>
              <p className="mt-3 text-black text-base">One Energy</p>
              <div className="mt-0">
                <span className="text-black text-[15px] px-0 py-0 rounded-full text-xs font-bold inline-block">Shift Session</span>
              </div>
              <div className="mt-6 mb-4 h-px bg-gray-200" />
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden shadow-md border-2 border-[#c42d2d]/20 flex-shrink-0">
                  <img src={cardThumb(fc)} alt={fc.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-[#111] text-[15px] font-[var(--font-dm-sans)]">{fc.name}</p>
                  <p className="text-black text-[14px]">{fc.role}{fc.location ? ` · ${fc.location}` : ""}</p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <button onClick={(e) => flip(featured, e)} className="flex items-center gap-2 bg-white text-[#c42d2d] px-5 py-2.5 rounded-full text-xs font-bold font-[var(--font-outfit)] shadow-md border border-[#c42d2d]/15 hover:border-[#c42d2d]/40 transition-all">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c42d2d" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  Transcript
                </button>
              </div>
            </div>
          </div>
 
          {/* RIGHT: Scrollable Thumbnails */}
          <div className="flex-1 min-w-0 flex flex-col rr">
            <div className="flex items-center gap-3 mb-4 flex-shrink-0 mt-20">
              <span className="text-[#111] font-bold text-sm font-[var(--font-playfair)]">More Stories</span>
              <div className="h-px flex-1 bg-[#c42d2d]" />
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => scrollStrip("left")} className="w-8 h-8 rounded-full border flex items-center justify-center text-[#c42d2d] border-[#c42d2d]/60 bg-white shadow-sm" aria-label="Scroll left">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
                <button onClick={() => scrollStrip("right")} className="w-8 h-8 rounded-full border flex items-center justify-center text-[#c42d2d] border-[#c42d2d]/60 bg-white shadow-sm" aria-label="Scroll right">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              </div>
            </div>
 
            <div
              ref={stripRef}
              className="flex-1 overflow-x-auto strip-scroll"
            >
              <div className="flex gap-4 h-full pb-2">
                {sideCards.map((card) => {
                  const isFlipped = !!flippedCards[card.idx];
                  return (
                    <div
                      key={card.idx}
                      className="flex-shrink-0 w-[150px] md:w-[175px] h-full"
                      style={{ perspective: "800px" }}
                    >
                      <div className={`flip-inner w-full h-full ${isFlipped ? "flipped" : ""}`} style={{ position: "relative" }}>
                        {/* FRONT */}
                        <div className="face w-full h-full">
                          <div
                            className={`phone-frame w-full cursor-pointer group shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 ${card.idx === featured ? "border-[#c42d2d] ring-2 ring-[#c42d2d]/20" : "border-gray-200/60 hover:border-[#c42d2d]/40"}`}
                            onClick={() => handleSwap(card.idx)}
                          >
                            <img src={cardThumb(card)} alt={card.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="w-10 h-10 rounded-full bg-[#c42d2d]/90 flex items-center justify-center shadow-lg">
                                <svg width="12" height="14" viewBox="0 0 12 14" fill="none"><path d="M0 0L12 7L0 14V0Z" fill="white" /></svg>
                              </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-3 text-white z-10">
                              <p className="font-bold text-[10px] leading-tight line-clamp-2">{card.title} {card.highlight}</p>
                              <p className="text-[9px] opacity-70 mt-0.5 truncate">{card.name}</p>
                            </div>
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
 
                        {/* BACK */}
                        <div className="face-back">
                          <div className="phone-frame w-full bg-white shadow-lg border-2 border-[#c42d2d]/30">
                            <div className="absolute inset-0 flex flex-col p-3">
                              <span className="text-[11px] font-bold text-[#c42d2d] uppercase tracking-wider mb-1 flex-shrink-0">Transcript</span>
                              <p className="text-[11px] font-bold text-[#111] mb-1 truncate flex-shrink-0">{card.name}</p>
                              <div className="flex-1 overflow-y-auto min-h-0 ts-light pr-1">
                                <p className="text-[12px] leading-[1.75] text-gray-600 font-medium whitespace-pre-wrap font-[var(--font-dm-sans)]">
                                  <span className="text-[#c42d2d] text-xs font-serif">&ldquo;</span>
                                  {card.transcript}
                                  <span className="text-[#c42d2d] text-xs font-serif">&rdquo;</span>
                                </p>
                              </div>
                              <button onClick={(e) => flip(card.idx, e)} className="mt-2 flex-shrink-0 w-full bg-gray-100 text-gray-700 py-1.5 rounded-full text-[11px] font-semibold hover:bg-gray-200 transition-colors">← Back</button>
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
        <div className="flex items-center justify-center gap-2 mt-4 sm:mt-5 rr">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => handleSwap(i)}
              className={`rounded-full transition-all duration-300 ${i === featured
                ? "w-8 sm:w-10 h-2.5 sm:h-3 bg-[#c42d2d] shadow-sm shadow-[#c42d2d]/30"
                : "w-2.5 sm:w-3 h-2.5 sm:h-3 bg-[#c42d2d]/20 hover:bg-[#c42d2d]/40"
                }`}
              aria-label={`View testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}