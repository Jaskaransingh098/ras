"use client";

import { useRef, useState, useEffect } from "react";
import { Poppins , Roboto_Condensed} from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
 const Roboto = Roboto_Condensed({
    subsets: ["latin"],
    variable: "--font-roboto-condensed",
    weight: ["400", "700"],
  });

export default function Speaker() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

 

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress(
        video.duration ? (video.currentTime / video.duration) * 100 : 0,
      );
    };
    const onLoaded = () => setDuration(video.duration);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  useEffect(() => {
    const s = sectionRef.current;
    if (!s) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        s.querySelectorAll(".spk-reveal"),
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: s, start: "20% bottom", toggleActions: "play none none reset" },
        }
      );
    }, s);
    return () => ctx.revert();
  }, []);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play();
    else video.pause();
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    const video = videoRef.current;
    if (!video) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  }

  function formatTime(s: number) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] flex items-center overflow-hidden bg-white">
      <style jsx>{`
        .explore-btn {
          position: relative;
          overflow: hidden;
        }
        .explore-btn::after {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.25),
            transparent
          );
          transition: left 0.6s;
        }
        .explore-btn:hover::after {
          left: 120%;
        }
        .video-frame {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .video-frame:hover {
          transform: translateY(-4px);
          box-shadow: 0 30px 60px -16px rgba(0, 0, 0, 0.15);
        }
        .video-controls {
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .video-frame:hover .video-controls {
          opacity: 1;
        }
        .seek-bar {
          cursor: pointer;
          position: relative;
          height: 4px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.2);
          transition: height 0.2s;
        }
        .seek-bar:hover {
          height: 6px;
        }
        .ctrl-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s;
        }
        .ctrl-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.08);
        }
      `}</style>

      {/* Top separator */}
      <div className="absolute top-0 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-8xl mx-auto px-6 md:px-12 w-full relative z-10 py-16 md:py-20">
        <div className="flex flex-col-reverse md:flex-row gap-16 md:gap-24 items-center justify-center">
          {/* LEFT — Video */}
          <div className="spk-reveal w-full md:w-[300px] flex-shrink-0">
            <div className="video-frame shadow-xl shadow-black/[0.08]">
              <div className="relative aspect-[9/16] max-h-[75dvh] bg-[#f0ebe4]">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  src="/videos/speaking-teaser.mp4"
                />

                {/* Custom controls overlay — visible on hover */}
                <div className="video-controls absolute inset-0 flex flex-col justify-end">
                  {/* Gradient backdrop */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  <div className="relative z-10 px-5 pb-4 pt-8">
                    {/* Seek bar */}
                    <div className="seek-bar mb-3" onClick={handleSeek}>
                      <div
                        className="h-full rounded-full bg-[#c42d2d] relative"
                        style={{ width: `${progress}%` }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md border-2 border-[#c42d2d]" />
                      </div>
                    </div>

                    {/* Controls row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        {/* Play / Pause */}
                        <button className="ctrl-btn" onClick={togglePlay}>
                          {isPlaying ? (
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="white"
                              stroke="none"
                            >
                              <rect x="6" y="4" width="4" height="16" rx="1" />
                              <rect x="14" y="4" width="4" height="16" rx="1" />
                            </svg>
                          ) : (
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="white"
                              stroke="none"
                            >
                              <polygon points="6 3 20 12 6 21 6 3" />
                            </svg>
                          )}
                        </button>

                        {/* Mute / Unmute */}
                        <button className="ctrl-btn" onClick={toggleMute}>
                          {isMuted ? (
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                            >
                              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                              <line x1="23" y1="9" x2="17" y2="15" />
                              <line x1="17" y1="9" x2="23" y2="15" />
                            </svg>
                          ) : (
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                            >
                              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                            </svg>
                          )}
                        </button>

                        {/* Time */}
                        <span className="text-white/70 text-[11px] font-[var(--font-dm-sans)] ml-1 tabular-nums">
                          {formatTime(currentTime)} /{" "}
                          {formatTime(duration || 40)}
                        </span>
                      </div>

                      {/* Label */}
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#c42d2d] animate-pulse" />
                        <span className="text-white/70 text-[10px] font-semibold font-[var(--font-outfit)] tracking-wider uppercase">
                          Teaser
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Content */}
          <div className="spk-reveal md:w-[55%]">
            {/* Label */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-[2px] rounded-full bg-gradient-to-r from-[#c42d2d] to-transparent" />
              <p className="text-[10px] md:text-[11px] uppercase tracking-[.35em] text-[#c42d2d] font-semibold font-[var(--font-dm-sans)]">
                Speaking &amp; Conversations
              </p>
            </div>

            {/* Heading */}
          <h2 className="font-[var(--font-poppins)] text-[28px] md:text-[44px] text-[#111] leading-[1.1] mb-7">
              Talk that go
              <br />
              <span className="italic text-[#c42d2d] font-bold">
                beyond inspiration -
              </span>{""}
              <span className="text-[36px] p-3">into real awareness and action.</span>
            </h2>

            {/* Description */}
            <p className="text-[#333] text-[15px] md:text-[22px] leading-[1.55] font-[var(--font-dm-sans)] mb-7 max-w-2xl ">
              I&rsquo;m invited to speak with institutions, organizations,
              leaders, and young minds on how energy shapes choices and
              decisions&mdash;bringing{" "}
              <span className="text-[#111] font-semibold">
                clarity and ease
              </span>
              , especially in high-pressure environments, far more than
              we&rsquo;re taught.
            </p>

            {/* Quote */}
            <div className="border-l-[3px] border-[#c42d2d]/30 pl-5 mb-8">
              <p className="text-[#555] text-[14px] leading-[1.8] font-[var(--font-dm-sans)] italic">
                &ldquo;These are not motivational talks. They are grounded,
                experiential conversations that shift how people relate to{" "}
                <span className="text-[#111] not-italic font-semibold">
                  pressure, performance, and themselves.
                </span>
                &rdquo;
              </p>
            </div>

            {/* CTA */}
            <a
              href="#"
              className="explore-btn inline-flex items-center gap-2.5 bg-gradient-to-r from-[#c42d2d] to-[#a82525] text-white px-7 py-3.5 rounded-full text-[13px] font-bold font-[var(--font-outfit)] tracking-wide shadow-lg shadow-[#c42d2d]/20 hover:shadow-xl hover:shadow-[#c42d2d]/30 transition-all duration-300 group"
            >
              Explore
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
