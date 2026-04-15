"use client";

import { useEffect, useRef, use } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const blogs = [
  {
    id: 1,
    title: "But You Create Miracles For Others... How Can You Feel Low?",
    excerpt:
      "Every coach, healer, and leader carries silent pain. But here's the truth: the healer also needs healing.",
    tag: "Energy & Frequency",
    date: "Mar 2025",
    readTime: "6 min read",
    content:
      "\"But you create miracles for others… how can you ever feel low?\" 😳\n\nI smile when people ask me this.\n\nBecause yes - I help others heal, transform and reconnect with their bodies…\nBut I am also human.\n\nWhat most people don't realize is that coaches, healers, leaders too have moments of doubt, heaviness and silence.\n\nOur lives are not without ups and downs. The only difference is, even in those moments, we choose to spread more light in the world.\n\nAnd here's something I've seen again and again:\n\nWhen I speak with coaches or energy workers, they don't even have to tell me ..\nI can perceive the energy of their past still weighing on them. Old hurts still bothering them.\n\nBut because they are \"the coach\"… they feel they cannot admit it.\n\nBecause they are \"the healer\"… they hide it out of fear of judgment.\n\nAnd honestly — that breaks my heart. 💔\n\nSo much silent pain, carried quietly… just because of the pressure to appear perfect.\n\nBut here's the truth:\n• The healer also needs healing.\n• The giver also needs to receive.\n• The leader also needs a space to be vulnerable.\n\nThe days are gone when vulnerability was seen as weakness.\n\nToday, vulnerability is courage. It is leadership.\n\nSo to every coach, healer, leader reading this ..\nplease remember:\n• You are human.\n• You are allowed to ask for help.\n• You are allowed to receive.\n\nBecause unless we are truly happy inside out, how can we spread more happiness in the world?\n\nAnd from my heart ❤️\ndeep gratitude to every one of you…\n\nFor the light you spread.\nFor the courage you show.\nFor choosing, again and again, to contribute to others at your fullest.\n\nBut remember -\nyou don't have to walk alone.\n\nI'm here for you. Always.\nIf you've been waiting for a hand to hold, this is it.\n\nLet's come forward. Let's hold each other's hands.\n\nBecause together, we can create a world where even healers, coaches and leaders feel safe to receive.\n\nEase & magic\nRaseshvari",
  },
  {
    id: 2,
    title: "Peace or Pressure — What Are You Still Holding Onto?",
    excerpt:
      "Three years back, life forced me to pause. I chose peace over pressure and released everything. Here's what I learned.",
    tag: "Revenue Energetics™",
    date: "Feb 2025",
    readTime: "7 min read",
    content:
      "PEACE or PRESSURE - what are you still holding on to, just because you once created it?\n\nThree years back, life forced me to pause.\nNot a gentle pause...  a complete collapse!!\n\nMy body gave up.\nMy mind went blank.\n\nAnd suddenly, all the things I had built - my community, my organization, my brand, didn't matter anymore.\n\nI didn't have the strength to handle them.\nI didn't even have the will to continue.\n\nSo I made a decision most people are scared to make..\nYes, I decided to let it all go.\n\nA few of my close friends said,\n\"Ras, you were doing so well. Don't leave everything.\"\n\nBut deep down, I knew that for me, peace was more important than pressure.\n\nWhat's the point of holding something just because you once created it,\nif it's not contributing to your happiness in the present?\n\nSo I released it all.\nThe name. The work. The identity I had built for years.\n\nIt wasn't easy.\nBut the moment I let go, I felt light.\n\nFree from the weight.\nAlmost like a child again :) no pressure, no roles, no masks.\n\nAnd today, when I look back, I know, it was the wisest decision of my life.\n\nYes, I had to start again from zero.\nBut there's no baggage.\nJust excitement, peace and a comeback that feels like a phoenix rising from the ashes.\n\nSo I ask you:\n👉 What are you still holding on to, just because you once created it?\n👉 What if letting go is the real act of leadership?\n\nBecause when you keep holding things that no longer serve your present,  the energy becomes heavy.\n\nAnd heaviness will always pull you down,\nno matter how high your title or success.\n\nAt some point, you have to choose -\n✨ Peace or Pressure.!!\n\nWe all have that choice. 💫\nWhat's yours?",
  },
];

export default function BlogPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const pageRef = useRef<HTMLDivElement>(null);
  const blogId = parseInt(id, 10);
  const blog = blogs.find((b) => b.id === blogId);

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      const elements = pageRef.current!.querySelectorAll(".animate-in");

      if (!elements.length) return;

      gsap.fromTo(
        elements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  if (!blog) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#fdf8f4] to-[#fef5ef]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">
          <p className="text-2xl font-[var(--font-playfair)] text-[#1a0e0e]">
            Blog post not found
          </p>
          <Link
            href="/#blog"
            className="text-[#c42d2d] hover:text-[#a01f1f] mt-6 inline-block"
          >
            ← Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      ref={pageRef}
      className="min-h-screen bg-gradient-to-b from-[#fdf8f4] to-[#fef5ef]"
    >
      <style jsx>{`
        .article-content p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }

        .article-content p:first-letter {
          font-weight: 600;
        }

        .article-divider {
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(196, 45, 45, 0.2),
            transparent
          );
          margin: 2rem 0;
        }
      `}</style>

      {/* Header */}
      <div className="relative pt-12 pb-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#c42d2d]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-20 left-0 w-80 h-80 bg-gradient-to-br from-[#e85d5d]/3 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-[#c42d2d] hover:text-[#a01f1f] transition-colors mb-8 animate-in"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-semibold font-[var(--font-dm-sans)]">
              Back to Blog
            </span>
          </Link>

          <div className="animate-in">
            <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#c42d2d]/10 to-[#c42d2d]/5 text-[#c42d2d] text-[9px] font-bold uppercase tracking-wider rounded-full px-3 py-1 border border-[#c42d2d]/15 shadow-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c42d2d] animate-pulse" />
              {blog.tag}
            </span>

            <h1 className="text-[36px] md:text-[52px] font-[var(--font-playfair)] font-bold text-[#1a0e0e] leading-[1.1] mb-6">
              {blog.title}
            </h1>

            <div className="flex flex-col md:flex-row md:items-center md:gap-6 text-[14px] font-[var(--font-dm-sans)]">
              <div className="flex items-center gap-2">
                <span style={{ color: "#7f2828ff" }}>{blog.date}</span>
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ background: "#d4b0a0" }}
                />
                <span style={{ color: "#c4a090" }}>{blog.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-12">
        <article className="article-content">
          {blog.content.split("\n\n").map((paragraph, index) => (
            <p
              key={index}
              className="animate-in text-[16px] md:text-[18px] text-[#3d2010] leading-[1.8]"
              style={{
                font: "var(--font-dm-sans)",
              }}
            >
              {paragraph}
            </p>
          ))}
        </article>

        <div className="article-divider" />

        {/* CTA Section */}
        <div className="mt-12 pt-8 border-t border-[#e0d0c8] animate-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-[18px] md:text-[20px] font-[var(--font-playfair)] font-bold text-[#1a0e0e] mb-3">
                Ready to shift?
              </h3>
              <p className="text-[14px] md:text-[16px] text-[#6a4a3a] leading-relaxed font-[var(--font-dm-sans)]">
                Let's explore what's really possible for you. Book an Energy
                Diagnostic Call™ to identify your blocks and chart your path
                forward.
              </p>
            </div>
            <div className="flex items-start justify-end">
              <Link href="/#contact">
                <button
                  className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-[var(--font-outfit)] font-bold text-[11px] uppercase tracking-[0.12em] transition-all duration-300 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #c42d2d, #9b1c1c)",
                    color: "#fff",
                    boxShadow: "0 10px 28px -8px rgba(196,45,45,0.3)",
                  }}
                >
                  Book a Call
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-16 pt-8 border-t border-[#e0d0c8]">
          <h3 className="text-[20px] md:text-[24px] font-[var(--font-playfair)] font-bold text-[#1a0e0e] mb-8 animate-in">
            More Insights
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs
              .filter((b) => b.id !== blog.id)
              .map((relatedBlog, index) => (
                <Link key={relatedBlog.id} href={`/blog/${relatedBlog.id}`}>
                  <div
                    className="animate-in p-5 rounded-lg border border-[#e0d0c8] hover:border-[#c42d2d] transition-all duration-300 hover:shadow-md cursor-pointer"
                    style={{
                      background: "rgba(255,255,255,0.5)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <span className="b-tag">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c42d2d]" />
                      {relatedBlog.tag}
                    </span>

                    <h4 className="text-[16px] font-[var(--font-playfair)] font-bold text-[#1a0e0e] mt-3 mb-2">
                      {relatedBlog.title}
                    </h4>

                    <p className="text-[14px] text-[#6a4a3a] line-clamp-2">
                      {relatedBlog.excerpt}
                    </p>

                    <div className="flex items-center gap-2 mt-4 text-[#c42d2d] text-[12px] font-bold">
                      Read More
                      <svg
                        className="w-3 h-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
