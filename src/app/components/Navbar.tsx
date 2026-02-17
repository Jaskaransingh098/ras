"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="absolute top-0 left-0 w-full py-6 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Pill Container */}
        <div
          className="w-[50vw] bg-white flex items-center justify-between 
border border-gray-200 rounded-full px-8 py-4 shadow-2xl"
        >
          {/* Logo Circle */}
          <div className="w-10 h-10 bg-red-600 rounded-full mr-10"></div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-10 text-gray-700 font-medium">
            <Link href="#" className="hover:text-black transition">
              About us
            </Link>
            <Link href="#" className="hover:text-black transition">
              Service
            </Link>
            <Link href="#" className="hover:text-black transition">
              Testimonial
            </Link>
            <Link href="#" className="hover:text-black transition">
              Blog
            </Link>
          </nav>
        </div>

        {/* Contact Button */}
        <Link
          href="#"
          className="bg-red-600 z-10 text-white px-8 py-4 rounded-full font-semibold hover:bg-red-700 transition shadow-2xl"
        >
          Contact us
        </Link>
      </div>
    </header>
  );
}
