"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { useState } from "react";

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState<string>("overview");

  const sections = [
    { id: "overview", title: "1. Overview & Commitment" },
    { id: "information-collected", title: "2. Information We Collect" },
    { id: "use-of-info", title: "3. How We Use Information" },
    { id: "confidentiality", title: "4. Session Confidentiality" },
    { id: "data-security", title: "5. Data Protection & Security" },
    { id: "cookies", title: "6. Cookies & Analytics" },
    { id: "user-rights", title: "7. Your Privacy Rights" },
    { id: "contact-privacy", title: "8. Privacy Inquiries" },
  ];

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <main className="bg-[#faf7f5] min-h-screen flex flex-col justify-between font-[var(--font-dm-sans)]">
        <Navbar />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-[#8a0a0a] to-[#4a0e0e] text-white pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
          {/* Subtle Background Glow Orbs */}
          <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-[#c42d2d]/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[10%] left-[5%] w-[250px] h-[250px] bg-[#e85d5d]/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[2px] rounded-full bg-gradient-to-r from-transparent to-[#e85d5d]" />
              <span className="text-[11px] md:text-xs uppercase tracking-[.3em] text-white/70 font-semibold font-[var(--font-dm-sans)]">
                Trust & Transparency
              </span>
              <div className="w-8 h-[2px] rounded-full bg-gradient-to-l from-transparent to-[#e85d5d]" />
            </div>

            <h1 className="text-[36px] sm:text-[48px] md:text-[56px] font-[var(--font-playfair)] text-white font-bold leading-[1.1] mb-5">
              Privacy <span className="italic font-light text-white/90">Policy</span>
            </h1>

            <p className="text-white/80 text-[15px] sm:text-[17px] md:text-[19px] max-w-2xl mx-auto leading-relaxed font-[var(--font-dm-sans)]">
              Your trust is our sacred priority. Learn how we honor, protect, and safeguard your personal details and session data.
            </p>

            <div className="inline-flex items-center gap-2 mt-6 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-[12px] text-white/80">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Last updated: July 2026
            </div>
          </div>
        </section>

        {/* Content Container */}
        <section className="py-12 md:py-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Sticky Navigation Sidebar for Desktop */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 bg-white border border-[#c42d2d]/10 rounded-2xl p-6 shadow-sm">
                <h3 className="text-xs uppercase tracking-wider text-[#c42d2d] font-bold mb-4 font-[var(--font-dm-sans)]">
                  Table of Contents
                </h3>
                <nav className="flex flex-col gap-2">
                  {sections.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => scrollTo(sec.id)}
                      className={`text-left text-[13px] md:text-[14px] py-2 px-3 rounded-lg transition-all duration-200 font-medium ${
                        activeSection === sec.id
                          ? "bg-[#c42d2d]/10 text-[#c42d2d] font-semibold translate-x-1"
                          : "text-[#444] hover:bg-gray-100 hover:text-[#111]"
                      }`}
                    >
                      {sec.title}
                    </button>
                  ))}
                </nav>

                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-3">
                  <span className="text-[12px] text-gray-500">Need legal assistance?</span>
                  <Link
                    href="/support"
                    className="inline-flex items-center justify-center gap-2 text-[13px] font-semibold text-white bg-[#c42d2d] hover:bg-[#8a0a0a] py-2.5 px-4 rounded-xl transition-all duration-200 shadow-sm"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>

            {/* Policy Document Details */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Section 1 */}
              <div
                id="overview"
                className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#c42d2d]/10 text-[#c42d2d] flex items-center justify-center font-bold text-sm">
                    01
                  </div>
                  <h2 className="text-2xl font-bold font-[var(--font-playfair)] text-[#1a1a1a]">
                    Overview & Commitment
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  Welcome to Raseshvari Hindustani (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We hold deep respect for your personal privacy and the sacred nature of the energy transformation work we conduct. This Privacy Policy outlines the types of personal data we collect, how it is processed, used, stored, and protected when you visit our website or participate in our sessions, energy diagnostics, or community events.
                </p>
                <p className="text-gray-600 leading-relaxed text-[15px] mt-3">
                  By accessing our platform or enrolling in any session, you agree to the terms described in this policy.
                </p>
              </div>

              {/* Section 2 */}
              <div
                id="information-collected"
                className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#c42d2d]/10 text-[#c42d2d] flex items-center justify-center font-bold text-sm">
                    02
                  </div>
                  <h2 className="text-2xl font-bold font-[var(--font-playfair)] text-[#1a1a1a]">
                    Information We Collect
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-[15px] mb-4">
                  We only collect information necessary to deliver meaningful energy diagnostics and transformative session experiences:
                </p>
                <ul className="space-y-3 text-gray-600 text-[14px]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#c42d2d] font-bold">•</span>
                    <span><strong>Personal Contact Details:</strong> Name, email address, phone number, city, and country submitted during booking or diagnostic quizzes.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#c42d2d] font-bold">•</span>
                    <span><strong>Session Intake & Diagnostic Responses:</strong> Background context regarding your career, relationship, or energy blocks provided prior to or during sessions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#c42d2d] font-bold">•</span>
                    <span><strong>Transaction & Payment Information:</strong> Payment processor metadata (we do not store raw credit/debit card numbers on our servers; transactions are encrypted by standard payment gateways).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#c42d2d] font-bold">•</span>
                    <span><strong>Technical & Usage Data:</strong> IP address, browser type, device info, and analytics data collected via standard web cookies.</span>
                  </li>
                </ul>
              </div>

              {/* Section 3 */}
              <div
                id="use-of-info"
                className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#c42d2d]/10 text-[#c42d2d] flex items-center justify-center font-bold text-sm">
                    03
                  </div>
                  <h2 className="text-2xl font-bold font-[var(--font-playfair)] text-[#1a1a1a]">
                    How We Use Your Information
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-[15px] mb-4">
                  Your information is utilized solely for legitimate, high-vibrational purposes:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#faf7f5] rounded-xl border border-[#c42d2d]/10">
                    <h4 className="font-semibold text-sm text-[#8a0a0a] mb-1">Session Delivery</h4>
                    <p className="text-xs text-gray-600">To tailor energy roadmaps, conduct 1-on-1 calls, and provide customized transformational guidance.</p>
                  </div>
                  <div className="p-4 bg-[#faf7f5] rounded-xl border border-[#c42d2d]/10">
                    <h4 className="font-semibold text-sm text-[#8a0a0a] mb-1">Communication</h4>
                    <p className="text-xs text-gray-600">To send booking confirmations, meeting links, reminders, and updates regarding your requested services.</p>
                  </div>
                  <div className="p-4 bg-[#faf7f5] rounded-xl border border-[#c42d2d]/10">
                    <h4 className="font-semibold text-sm text-[#8a0a0a] mb-1">Security & Operations</h4>
                    <p className="text-xs text-gray-600">To prevent fraud, verify transactions, and maintain website integrity and safety.</p>
                  </div>
                  <div className="p-4 bg-[#faf7f5] rounded-xl border border-[#c42d2d]/10">
                    <h4 className="font-semibold text-sm text-[#8a0a0a] mb-1">Service Improvement</h4>
                    <p className="text-xs text-gray-600">To refine user experience based on feedback and anonymized website navigation statistics.</p>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div
                id="confidentiality"
                className="bg-white border border-[#c42d2d]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#c42d2d]/10 to-transparent pointer-events-none rounded-bl-full" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#c42d2d] text-white flex items-center justify-center font-bold text-sm">
                    04
                  </div>
                  <h2 className="text-2xl font-bold font-[var(--font-playfair)] text-[#1a1a1a]">
                    Session Confidentiality & Integrity
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  All discussions, emotional breakthroughs, and personal energy disclosures shared during 1-on-1 sessions or Energy Diagnostic Calls are strictly confidential. We do not publish client names, recordings, or testimonials without explicit written permission.
                </p>
                <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed">
                  <strong>Note:</strong> Publicly showcased testimonials and video reels on our website are shared exclusively with the explicit consent and joy of clients who wished to inspire others.
                </div>
              </div>

              {/* Section 5 */}
              <div
                id="data-security"
                className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#c42d2d]/10 text-[#c42d2d] flex items-center justify-center font-bold text-sm">
                    05
                  </div>
                  <h2 className="text-2xl font-bold font-[var(--font-playfair)] text-[#1a1a1a]">
                    Data Protection & Security
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  We enforce technical and organizational measures to protect your information against unauthorized access, loss, alteration, or disclosure. SSL encryption, secure servers, and strict access controls are applied across all database systems.
                </p>
              </div>

              {/* Section 6 */}
              <div
                id="cookies"
                className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#c42d2d]/10 text-[#c42d2d] flex items-center justify-center font-bold text-sm">
                    06
                  </div>
                  <h2 className="text-2xl font-bold font-[var(--font-playfair)] text-[#1a1a1a]">
                    Cookies & Web Analytics
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  Our website uses cookies and similar tracking technologies to analyze site traffic, remember user preferences, and deliver seamless performance. You can disable cookies in your web browser settings at any time without compromising basic site browsing.
                </p>
              </div>

              {/* Section 7 */}
              <div
                id="user-rights"
                className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#c42d2d]/10 text-[#c42d2d] flex items-center justify-center font-bold text-sm">
                    07
                  </div>
                  <h2 className="text-2xl font-bold font-[var(--font-playfair)] text-[#1a1a1a]">
                    Your Privacy Rights
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-[15px] mb-3">
                  Depending on your jurisdiction, you possess the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 text-[14px]">
                  <li>Request access to the personal data we hold about you.</li>
                  <li>Request correction of inaccurate or incomplete information.</li>
                  <li>Request deletion or erasure of your personal records.</li>
                  <li>Opt out of marketing communications at any time.</li>
                </ul>
              </div>

              {/* Section 8 */}
              <div
                id="contact-privacy"
                className="bg-gradient-to-br from-[#8a0a0a] to-[#4a0e0e] text-white rounded-2xl p-6 sm:p-8 shadow-md scroll-mt-28"
              >
                <h2 className="text-2xl font-bold font-[var(--font-playfair)] mb-2">
                  Privacy Inquiries & Requests
                </h2>
                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  If you have questions regarding this Privacy Policy or wish to exercise your data rights, please contact our team:
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-white/10 rounded-xl border border-white/15">
                  <div>
                    <span className="text-xs text-white/60 uppercase tracking-wider block">Official Contact Email</span>
                    <a
                      href="mailto:raseshvari@rashindustani.com"
                      className="text-white font-semibold text-base hover:text-amber-200 transition-colors"
                    >
                      raseshvari@rashindustani.com
                    </a>
                  </div>
                  <Link
                    href="/support"
                    className="bg-white text-[#8a0a0a] hover:bg-gray-100 font-bold text-xs uppercase tracking-wider py-2.5 px-5 rounded-lg transition-all"
                  >
                    Submit Support Ticket
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
