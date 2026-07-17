"use client";

import { useState, useEffect, useRef, RefObject, useCallback } from "react";
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
  localVideo?: string; // path like "/reels/sumedha.mp4" for non-YouTube videos
  poster?: string;
  transcript: string;
}

const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

const cardThumb = (c: CardData) => {
  if (c.poster) return `/reels/${c.poster}`;
  if (!c.youtubeId) return "";
  return ytThumb(c.youtubeId);
};

// ─── Custom YouTube Shorts-style player for local videos ─────────────────────
function ShortsPlayer({ src, poster, name, role }: {
  src: string;
  poster?: string;
  name: string;
  role: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetHideTimer = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setShowControls(true);
    hideTimer.current = setTimeout(() => setShowControls(false), 2500);
  }, []);

  useEffect(() => {
    resetHideTimer();
    return () => { if (hideTimer.current) clearTimeout(hideTimer.current); };
  }, [resetHideTimer]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
    resetHideTimer();
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    resetHideTimer();
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    v.currentTime = ratio * v.duration;
    resetHideTimer();
  };

  return (
    <div
      className="absolute inset-0 bg-black"
      onClick={(e) => { togglePlay(e); }}
      style={{ cursor: "pointer" }}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        loop
        className="absolute inset-0 w-full h-full object-cover"
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {/* Dark gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />

      {/* ── TOP ICONS (volume · CC · settings) ── */}
      <div
        className="absolute top-3 right-3 flex flex-col gap-2.5 z-30 transition-opacity duration-300"
        style={{ opacity: showControls ? 1 : 0 }}
      >
        <button
          onClick={toggleMute}
          className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
          title={muted ? "Unmute" : "Mute"}
        >
          {muted ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
              <path d="M3.63 3.63a.996.996 0 0 0 0 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .72.73 1.18 1.39.91.8-.33 1.55-.77 2.22-1.31l1.34 1.34a.996.996 0 1 0 1.41-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.59-.23-1.22.2-1.22.83v.91c0 .38.25.71.61.85C17.18 6.54 19 9.06 19 12zm-8.71-6.29-.17.17L12 7.76V6.41c0-.89-1.08-1.33-1.71-.7zM16.5 12A4.5 4.5 0 0 0 14 7.97v1.79l2.48 2.48c.01-.08.02-.16.02-.24z" />
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>
        {/* CC icon */}
        <div className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="white" opacity="0.7">
            <path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 7H9.5v-.5h-2v3h2V13H11v1c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1zm7 0h-1.5v-.5h-2v3h2V13H18v1c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1z" />
          </svg>
        </div>
        {/* Settings icon */}
        <div className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="white" opacity="0.7">
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
          </svg>
        </div>
      </div>

      {/* ── CENTER PLAY/PAUSE BUTTON ── */}
      <div
        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none transition-opacity duration-300"
        style={{ opacity: showControls ? 1 : 0 }}
      >
        <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
          {playing ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>
      </div>

      {/* ── BOTTOM INFO + PROGRESS ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-3 pb-3">
        {/* Person info */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white/60 flex-shrink-0">
            {poster && <img src={poster} alt={name} className="w-full h-full object-cover" />}
          </div>
          <div className="min-w-0">
            <p className="text-white text-[11px] font-bold leading-tight uppercase tracking-wide truncate" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>{name}</p>
            <p className="text-white/70 text-[9px] truncate">{role}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div
          className="relative h-1 rounded-full bg-white/30 cursor-pointer mb-2"
          onClick={handleSeek}
        >
          <div
            className="h-full rounded-full bg-[#ff0000] transition-none relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#ff0000] shadow-lg" />
          </div>
        </div>

        {/* Shorts branding */}
        <div className="flex items-center justify-end gap-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M17.77 10.32l-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.23-2.53-5.06-1.56L6 6.94c-1.29.68-2.07 2.04-1.98 3.49.09 1.45.97 2.71 2.29 3.27l1.2.5L6 14.94c-1.84.96-2.53 3.23-1.56 5.06.97 1.83 3.23 2.53 5.06 1.56l8.5-4.5c1.29-.68 2.07-2.04 1.98-3.49-.09-1.45-.97-2.71-2.21-3.25zM10 14.45v-5l5 2.5-5 2.5z" />
          </svg>
          <span className="text-white text-[10px] font-bold tracking-wide">Shorts</span>
        </div>
      </div>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

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
      transcript: `I've been a part of the banking sector for the last 15 years and I was under intense pressure managing work turmoil and internal politics, which caught on me physically, mentally and emotionally.
I was under constant pressure to deliver. I could see my confidence eroding, my performance dipping and this having an adverse impact on my health and wealth. I was gradually slipping into the shell of depression. And you know in corporate life, it's not easy to talk about things like this.
 
I had always heard about mindset coaching, therapybut I never heard about someone shifting energies. I decided to give it a shot and booked a session with Raseshvari.
With just one session, things shifted. The heaviness completely lifted off, my stress evaporated and I felt at ease.
 
Post this session, things started to change. I moved into a new role. The stress because of work completely evaporated and happiness surrounded me finally again.
If you're going through something like this, please connect with Raseshvari. She will transform your life only for the better. I genuinely thank the universe, the almighty and Raseshvari for pulling this magic off and giving me a life full of bliss, abundance and peace. Thank you.`,
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
      poster: "rajpreet.png",
      transcript: `Raseshvari Hindustani:
"Most high-achieving women carry an invisible emotional load, one that quietly blocks their growth and impacts their revenue too. One of my clients, a beautiful and brilliant doctor, had tried everythingbut an old emotional pain wouldn't just let go."
 
Dr. Roohana Rajpreet:
"I was going through something and I was not able to sort out some things because of which I actually needed some help. Aur mere ko lag raha tha main handle kar loongi, ho jayega saara kuch. (And I thought I'll handle it, everything will be fine.) But sometimes it is always better to ask for some help. I just want to share my experience with everybody. I had a session with her today and believe you me, I changed like this [snaps fingers] and I had that glow back on my face. So, I mean, it is visible.
There are many people—many men, many women, many ladies like me—who are going through something but they are not talking it out. I would recommend each and every one: if you connect with her, you'll feel much better. So with Raseshvari mam, with her experience and with her insight and with all the spirituality and all her learnings, she's on a very different plane. Thank you so much, Raseshvari mam. More strength to you and thanks a ton for this session which you took for me. Thank you."
 
Raseshvari Hindustani:
"When deep emotional weight releases, your confidence, your decisions, your work—everything opens up and life feels so beautiful. But today, even after four years, she is living lighter, happier and thriving. If you're feeling stuck in your growth, in your revenue or your happiness, let's shift it. All you need is just one deep energy shift and you don't have to carry it alone. Let's connect."`,
    },
    {
      title: "Deals Stuck at the",
      highlight: "Last Moment — Shifted",
      sub: "clarity found in one",
      badge: "Revenue-Focused Session",
      name: "Sumedha Adavade",
      role: "Asst. Vice President, Multinational Bank",
      location: "Mumbai",
      youtubeId: "VI2pXXGCMrE",
      poster: "sumedha.png",
      transcript: `Every time a deal seemed close to closure… something would shift at the last moment.
Not once.
It started feeling like a pattern.
I'm Sumedha Adavade, Assistant Vice President in a multinational bank in Mumbai and last year I also began building my own cybersecurity initiative.
On paper, everything looked aligned.
Clients were interested, conversations were positive and the direction felt right.
And yet… movement was slower than expected.
After a point, it makes you pause and reflect —
not just on effortbut on the deeper journey within.
 
Years ago, I had experienced a meaningful sense of clarity through a session with Raseshvari.
So during a phase of uncertainty, I chose to reconnect and explore her revenue-focused healing session.
What I experienced in that space was not dramatic…
but quietly insightful.
It helped me step back, look within and reconnect with a sense of clarity and steadiness that I needed at that time.
I left the session feeling lighter, more centered and emotionally clearer about my path ahead.
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
      poster: "abhedika.png",
      transcript: `Abhedika Sahej: Hi everybody! My name is Abhedika Sahej. I'm pursuing my 12th class and I'm going to tell you how a small talk with Raseshvari Di assisted me in my everyday life.
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
      poster: "shashank.png",
      transcript: `There was a point in my life where I truly felt my business would shut down. I started it during college and everything was going great in the beginning—sales were high, growth was solid and overall, everything felt smooth.
Then, suddenly, sales started dropping. I tried everything: changed products, switched categoriesbut the sales kept going down. At one point, I genuinely felt like I'd have to close my business and shift back to a corporate job. My mind told me to quitbut my heart felt that the problem lay somewhere else.
 
That's when I did just one energy session with Raseshvari Ma'am. Honestly, I don't know what she did or how she did itbut I felt something shift within me instantly.
 
My stress lifted, I gained confidence and I found clarity in my mind. Things that had been stuck for months started solving themselves automatically.
It's been four to five months since that session. My business is stable, the growth is back on track and mentally, I feel very light. For me, this single session was a major turning point in my life.`,
    },
    {
      title: "Dream Job at a",
      highlight: "Product-Based Company",
      sub: "unlocked in just one",
      badge: "Career Shift Session",
      name: "Megha",
      role: "IT Professional, Bangalore",
      location: "",
      youtubeId: "xsL-pKPDCro",
      poster: "megha.png",
      transcript: `Hello everyone! My name is Megha. I am working in a prestigious IT company in Bangalore. So today I want to share with you a magical story that happened with me.

I had a very great shift in my career.

I had a very big dream that I want to work in a product-based company.

But somehow I landed up in a service-based company.

It was a good companybut deep down, I always had this feeling.

I discussed everything with Raseshvari ma’am.

I must say, just one day and I was very, very happy that I did.

It shifted my life magically.

I just felt very light, like I can do that.

After doing her session, I immediately got a job in a product-based company.

It is a really good company.

Nowadays I wait for my job to start.

There is no frustration, no irritation.

Whatever I am, whoever I am, I'm happy with that.

And that's all because of Raseshvari ma'am.

I must recommend all of you to just go for it, guys!



She has done miracles.

I love you, my miracle lady!

Thank you for all your blessings and hurray, thank you so much!
`,
    },

    {
      title: "Years of Exhaustion &",
      highlight: "Broken Relationships",
      sub: "healed in just one",
      badge: "Energy Healing Session",
      name: "Bitheeka Rao",
      role: "Working Professional, Gurgaon",
      location: "",
      youtubeId: "aZlBtFHqUG8",
      poster: "bitheeka.png",
      transcript: `
Honestly, I never believed in energy work.
In fact, I never even felt like trying something like this.

My name is Bithika Rao. I work in a private organization in Gurgaon.
At that time, juggling household responsibilities, office work and my daughter’s studies had completely exhausted me. Everything together had become overwhelming. During this phase, I was really struggling with my family relationships and had completely broken down. Mentally, I was absolutely drained. It was affecting my peace of mind, my sleep and even my health.

I had known Raseshvari for many years through her mother’s community. I had heard a lot about her work but I never imagined that I would personally reach out to her. 
Then one day, something just clicked..it felt like the time had come. I felt that I had to speak to her at least once.

When I reached out to her, she immediately agreed to give me a session.

During the session, she spoke about things that I had never shared with her. It felt like she was reading the energy of my life experiences on her own. Everything she said was absolutely true.

And when she started clearing those energies, I felt an unusual sense of calm. A kind of peace that’s very hard to put into words. Honestly, it felt like a huge emotional burden that had been building up for years had suddenly lifted from my body.

I had been struggling with sleep for a very long time. But that very night, I slept peacefully. And since then, falling asleep has become much easier.

From the very next day, I started noticing gradual changes. My reactions began to change. My relationships started feeling lighter. Even in my professional life, things began to move differently.

Now I understand why people call her “magical.” Not because of anything dramatic but because the shift feels real.

Sometimes the solution isn’t visible.
But that doesn’t mean it isn’t powerful.

If you ever feel stuck in your life and don’t know where to turn, at least have one conversation.
It might change more than you expect.

`,
    },

    {
      title: "Even a Healer",
      highlight: "Needed Healing",
      sub: "transformed in just one",
      badge: "Deep Energy Session",
      name: "Milli Bhargava",
      role: "Reiki Healer & Tarot Reader",
      location: "",
      youtubeId: "DFzjoI_yPjM",
      poster: "milli.png",
      transcript: `
I’m a Reiki healer and Tarot reader…
and I don’t get impressed easily.”

Hi I am MILLI BHARGAVA from Delhi 
I am deeply into Occult sciences 
I’ve known Raseshwari for a while and from our very first conversation, I could sense her level of work-
it’s far beyond words.
When you’re in this field, you know when someone is operating at a very different frequency.”

Even as a healer, I'm human. There was a phase in my life when I was struggling to manage things..both energetically and emotionally. Without thinking twice, she was the only person I felt called to reach out to.
During the session, things I couldn't even name began to surface and suddenly, they made sense. The baggage I had been carrying as a mother, daughter and wife quietly came up and started dissolving.
 I don't know how but it did.

What truly surprised me was how the burdens I had been carrying started getting resolved during the session itself. By the end, I felt incredibly light.

From the very next day, I could see a shift. My profession, my personal life..everything started moving with much more ease and flow.
I had heard people call her a “walking, talking miracle,” and after experiencing a session with her, I completely understood why.
Yes, the session was quite pricey but it was worth every single penny.
So even if you're a healer, coach or specialist, don't overthink it. Just go for it.

Thank you, Ras, from the bottom of my heart, for being in my life and helping me resolve what I couldn't resolve on my own.

`,
    },
//     {
//       title: "Even a Healer",
//       highlight: "Needed Healing",
//       sub: "transformed in just one",
//       badge: "Deep Energy Session",
//       name: "Milli Bhargava",
//       role: "Reiki Healer & Tarot Reader",
//       location: "",
//       youtubeId: "hWNj_VwGsEs",
//       poster: "milli.png",
//       transcript: `
// Raseshvari:

// Heartbreak isn't just pain, it's stuck energy. And when we shift that energy, we shift everything.
// Not everyone feels like smiling when healing. But even in this quiet moment, you will hear the shift.
// Grateful to this client for sharing his transformation, and it's his first time on the camera.

// Swapnil:

// Hello, friend. Myself, Sapnil. I'm interior designer from Mumbai. I would love to share about a magical transformation happening in my life in just one session.

// I was stuck in a relationship issue for more than one and a half year. I got into depression. I tried hard, but nothing was helping.
// But by God grace, Raseshvari ma'am helped me with her emotional freedom session.
// She's magical, guys. She can make anything possible. She can definitely help you out.

// Raseshvari:

// You don't have to carry the weight of heartbreak forever.
// Sometimes, one session is all it takes.

// `,
//     },
//       {
//       title: "Even a Healer",
//       highlight: "Needed Healing",
//       sub: "transformed in just one",
//       badge: "Deep Energy Session",
//       name: "Milli Bhargava",
//       role: "Reiki Healer & Tarot Reader",
//       location: "",
//       youtubeId: "6ce6FWIHzf0",
//       poster: "milli.png",
//       transcript: `
// Raseshvari:

// You would never imagine how this young, intelligent professional was silently sinking under the weight of societal pressure, expectations, criticism and pain that no one could see.

// Rahul:

// Itna pressure badh gaya tha ki main kisi se share bhi nahi kar pa raha tha. It demotivated me a lot. Mera confidence level bahut gir gaya tha.

// Even though I knew I was right, main kuch bol hi nahi pa raha tha.
// My sister noticed the change in me. She had already taken sessions with Raseshvari Didi, so she suggested that I take just one session.
// She told me, "After the session, you'll feel like you've found a sister who truly listens to you... and never judges you."
// And that's exactly what happened.

// Within three days, I spoke to people I hadn't even met or spoken to for six months. I started answering phone calls again.

// Her ability to shift my energy motivated me in a way I can't explain.
// After the session, I started feeling positive. I started feeling motivated again.
// There was a time when I would make schedules but I had no motivation to follow them. Now, the motivation is there too.
// After almost two years, I was finally able to open my heart and speak freely in front of someone.
// I'm so glad I took that session.
// Thank you so much, Raseshvari Didi.
// You are truly a sister, a mentor, a guide... and someone who helped me come out of overwhelm.

// Raseshvari:

// You don't have to carry the weight alone.
// You don't have to keep trying harder.
// You don't have to wait for years.
// You simply have to choose.

// I'll handle the rest.
// Let's connect.

// `,
//     },

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
        /* Ensure face-back fills its phone-frame and inner scroll works */
        .phone-frame { overflow: hidden !important; }
        .face-back { overflow: hidden; }
        .phone-frame > .face-back > div,
        .face-back > .phone-frame { height: 100%; }
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
              className="flex-shrink-0 w-[42vw] max-w-[180px] sm:max-w-[210px] relative"
              style={{ perspective: "800px" }}
            >
              <div className={`flip-inner ${isFeaturedFlipped ? "flipped" : ""}`} style={{ position: "relative" }}>
                {/* FRONT */}
                <div className="face">
                  <div className="phone-frame bg-black shadow-xl border-[2px] border-[#c42d2d]/30">
                    {fc.localVideo ? (
                      // ─ Local video: always mounted, ShortsPlayer handles its own play state
                      <ShortsPlayer
                        src={fc.localVideo}
                        poster={fc.poster ? `/reels/${fc.poster}` : undefined}
                        name={fc.name}
                        role={fc.role}
                      />
                    ) : playingVideo === featured ? (
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

                {/* BACK — Transcript (mobile featured): rendered OUTSIDE preserve-3d so scroll works */}
                <div className="face-back" aria-hidden="true" />
              </div>
            </div>

            {/* Transcript overlay — same exact size as video card, NOT inside preserve-3d */}
            {isFeaturedFlipped && (
              <div
                className="absolute top-0 left-0 w-[42vw] max-w-[180px] sm:max-w-[210px] bg-gradient-to-b from-[#c42d2d] to-[#7a1414] shadow-xl border-[2px] border-[#c42d2d]/60"
                style={{ zIndex: 20, borderRadius: '20px', aspectRatio: '9/16', overflow: 'hidden' }}
              >
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
                  <div className="flex-1 overflow-y-auto min-h-0 ts pr-1" style={{ WebkitOverflowScrolling: 'touch' }}>
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
            )}

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
              className="flex-shrink-0 w-[250px] md:w-[270px] relative"
              style={{ perspective: "800px" }}
            >
              <div className={`flip-inner ${isFeaturedFlipped ? "flipped" : ""}`} style={{ position: "relative" }}>
                {/* FRONT */}
                <div className="face">
                  <div className="phone-frame bg-black shadow-2xl border-[3px] border-[#c42d2d]/30">
                    {fc.localVideo ? (
                      // ─ Local video: ShortsPlayer with full custom UI
                      <ShortsPlayer
                        src={fc.localVideo}
                        poster={fc.poster ? `/reels/${fc.poster}` : undefined}
                        name={fc.name}
                        role={fc.role}
                      />
                    ) : playingVideo === featured ? (
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

                {/* BACK — Transcript (desktop featured): empty placeholder, real transcript below */}
                <div className="face-back" aria-hidden="true" />
              </div>
            </div>

            {/* Transcript overlay — same exact size as video card, NOT inside preserve-3d */}
            {isFeaturedFlipped && (
              <div
                className="absolute top-0 left-0 w-[250px] md:w-[270px] bg-gradient-to-b from-[#c42d2d] to-[#7a1414] shadow-2xl border-[3px] border-[#c42d2d]/60"
                style={{ zIndex: 20, borderRadius: '20px', aspectRatio: '9/16', overflow: 'hidden' }}
              >
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
                  <div className="flex-1 overflow-y-auto min-h-0 ts pr-2" style={{ WebkitOverflowScrolling: 'touch' }}>
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
            )}

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