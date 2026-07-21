"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  readTime: string;
  content: string;
}

interface BlogPostClientProps {
  blog: Blog;
  relatedBlogs: Blog[];
}

export default function BlogPostClient({ blog, relatedBlogs }: BlogPostClientProps) {
  const pageRef = useRef<HTMLDivElement>(null);

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

  return (
    <main
      ref={pageRef}
      className="min-h-screen bg-gradient-to-b from-[#fdf8f4] to-[#fef5ef]"
    >
      <style>{`
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
                Let&apos;s explore what&apos;s really possible for you. Book an Energy
                Diagnostic Call to identify your blocks and chart your path
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
            {relatedBlogs.map((relatedBlog) => (
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
