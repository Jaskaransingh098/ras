"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div id="main-navbar" className="w-full mt-5 px-6 absolute z-50">
      <div className="flex items-center justify-between">
        {/* LEFT BLOCK */}
        <div
          className="flex items-center justify-between w-full md:w-auto bg-white/70 backdrop-blur-xl 
                        rounded-2xl px-5 md:px-10 py-4 shadow-2xl border border-[#ece8df] md:gap-19"
        >
          {/* Logo */}
          <h2 className="text-lg md:text-xl font-semibold tracking-wide text-[#2d2d2d] font-[var(--font-inter)]">
            RAS
          </h2>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 ml-10 text-[#5c5c5c] text-sm tracking-wide">
            <Link href="/" className="hover:text-[#6a5acd] transition">
              Home
            </Link>
            <Link href="/about" className="hover:text-[#6a5acd] transition">
              About
            </Link>
            <Link href="/sessions" className="hover:text-[#6a5acd] transition">
              Sessions
            </Link>
            <Link href="/blog" className="hover:text-[#6a5acd] transition">
              Blog
            </Link>
          </div>
           <div className="hidden md:block ml-4">
          <Link
            href="/contact"
            className="bg-[#c42d2d] border-1 hover:bg-[#fff] hover:text-black hover:border-black text-white italic px-6 py-3 rounded-3xl text-sm tracking-wide transition-all duration-300 shadow-md"
          >
            Contact Us
          </Link>
        </div>

          {/* Mobile Hamburger */}
          <button className="md:hidden ml-4" onClick={() => setOpen(!open)}>
            <div className="w-6 h-[2px] bg-black mb-1"></div>
            <div className="w-6 h-[2px] bg-black mb-1"></div>
            <div className="w-6 h-[2px] bg-black"></div>
          </button>
        </div>

        {/* RIGHT BLOCK (Contact Button) */}
        {/* <div className="hidden md:block ml-4">
          <Link
            href="/contact"
            className="bg-[#6a5acd] hover:bg-[#5b4bd6] text-white italic px-6 py-3 rounded-full text-sm tracking-wide transition-all duration-300 shadow-md"
          >
            Contact Us
          </Link>
        </div> */}
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="md:hidden mt-4 bg-white rounded-2xl shadow-lg border border-[#ece8df] p-6 space-y-4">
          <Link href="/" className="block text-[#5c5c5c] hover:text-[#6a5acd]">
            Home
          </Link>
          <Link
            href="/about"
            className="block text-[#5c5c5c] hover:text-[#6a5acd]"
          >
            About
          </Link>
          <Link
            href="/sessions"
            className="block text-[#5c5c5c] hover:text-[#6a5acd]"
          >
            Sessions
          </Link>
          <Link
            href="/blog"
            className="block text-[#5c5c5c] hover:text-[#6a5acd]"
          >
            Blog
          </Link>

          <Link
            href="/contact"
            className="block bg-[#6a5acd] text-white text-center py-3 rounded-full mt-4"
          >
            Contact Us
          </Link>
        </div>
      )}
    </div>
  );
}
