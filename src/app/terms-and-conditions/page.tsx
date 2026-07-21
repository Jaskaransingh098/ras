"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { useState } from "react";

export default function TermsAndConditionsPage() {
  const [activeSection, setActiveSection] = useState<string>("acceptance");

  const sections = [
    { id: "acceptance", title: "1. Acceptance of Terms" },
    { id: "eligibility", title: "2. Service Eligibility" },
    { id: "payments-bookings", title: "3. Bookings, Payments & Rescheduling" },
    { id: "refund-policy", title: "4. No-Refund Policy" },
    { id: "disclaimer", title: "5. Energy Transformation Disclaimer" },
    { id: "intellectual-property", title: "6. Intellectual Property" },
    { id: "liability-limit", title: "7. Limitation of Liability" },
    { id: "governing-law", title: "8. Governing Law" },
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
                Agreement & Guidelines
              </span>
              <div className="w-8 h-[2px] rounded-full bg-gradient-to-l from-transparent to-[#e85d5d]" />
            </div>

            <h1 className="text-[36px] sm:text-[48px] md:text-[56px] font-[var(--font-playfair)] text-white font-bold leading-[1.1] mb-5">
              Terms & <span className="italic font-light text-white/90">Conditions</span>
            </h1>

            <p className="text-white/80 text-[15px] sm:text-[17px] md:text-[19px] max-w-2xl mx-auto leading-relaxed font-[var(--font-dm-sans)]">
              Welcome to Raseshvari Hindustani. Please read these terms carefully before scheduling your energy sessions.
            </p>

            <div className="inline-flex items-center gap-2 mt-6 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-[12px] text-white/80">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Effective Date: July 2026
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
                  Document Sections
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
                  <span className="text-[12px] text-gray-500">Need clarification?</span>
                  <Link
                    href="/support"
                    className="inline-flex items-center justify-center gap-2 text-[13px] font-semibold text-white bg-[#c42d2d] hover:bg-[#8a0a0a] py-2.5 px-4 rounded-xl transition-all duration-200 shadow-sm"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>

            {/* Terms Document Details */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Section 1 */}
              <div
                id="acceptance"
                className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#c42d2d]/10 text-[#c42d2d] flex items-center justify-center font-bold text-sm">
                    01
                  </div>
                  <h2 className="text-2xl font-bold font-[var(--font-playfair)] text-[#1a1a1a]">
                    Acceptance of Terms
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  By using this website, filling out our diagnostic quizzes, or scheduling any session (including the Energy Diagnostic Call and Revenue Energetics), you agree to comply with and be bound by these Terms and Conditions. If you do not accept any part of these terms, you must refrain from booking sessions or using our digital materials.
                </p>
              </div>

              {/* Section 2 */}
              <div
                id="eligibility"
                className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#c42d2d]/10 text-[#c42d2d] flex items-center justify-center font-bold text-sm">
                    02
                  </div>
                  <h2 className="text-2xl font-bold font-[var(--font-playfair)] text-[#1a1a1a]">
                    Service Eligibility
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  You must be at least 18 years of age to book any energy shift or diagnostic consultation. By scheduling a session, you represent that you possess the legal authority and capacity to enter into this agreement, and that you take full personal responsibility for your emotional, spiritual, and physical health during and after the sessions.
                </p>
              </div>

              {/* Section 3 */}
              <div
                id="payments-bookings"
                className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#c42d2d]/10 text-[#c42d2d] flex items-center justify-center font-bold text-sm">
                    03
                  </div>
                  <h2 className="text-2xl font-bold font-[var(--font-playfair)] text-[#1a1a1a]">
                    Bookings, Payments & Rescheduling
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-[15px] mb-4">
                  Our services are offered on an advance-booking basis. Payment must be cleared in full prior to scheduling or accessing the diagnostic video links.
                </p>
                <h4 className="font-semibold text-sm text-[#8a0a0a] mb-2 font-[var(--font-playfair)]">
                  Rescheduling Policy:
                </h4>
                <p className="text-gray-600 leading-relaxed text-[14px] mb-3">
                  We understand that circumstances change. You may reschedule your scheduled energy consultation or diagnostic call free of charge, provided you submit a request at least <strong>24 hours in advance</strong> of your booked time slot. Requests received within 24 hours of the session may be subject to a rescheduling fee or forfeiture of the session fee.
                </p>
              </div>

              {/* Section 4 */}
              <div
                id="refund-policy"
                className="bg-white border border-[#c42d2d]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#c42d2d]/10 to-transparent pointer-events-none rounded-bl-full" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#c42d2d] text-white flex items-center justify-center font-bold text-sm">
                    04
                  </div>
                  <h2 className="text-2xl font-bold font-[var(--font-playfair)] text-[#1a1a1a]">
                    Strict No-Refund Policy
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  Because our diagnostic roadmaps, energy clearing statements, and custom session slots involve personalized spiritual consultation, pre-session energy diagnostic preparation, and dedicated time, <strong>all purchases and session bookings are strictly non-refundable</strong>.
                </p>
                <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed">
                  <strong>Important:</strong> We do not guarantee specific timeline outcomes as energy work is subjective and relies heavily on client openness, personal actions, and systemic variables. However, we guarantee that the full, designated time and energetic space will be dedicated to your path during scheduled sessions.
                </div>
              </div>

              {/* Section 5 */}
              <div
                id="disclaimer"
                className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#c42d2d]/10 text-[#c42d2d] flex items-center justify-center font-bold text-sm">
                    05
                  </div>
                  <h2 className="text-2xl font-bold font-[var(--font-playfair)] text-[#1a1a1a]">
                    Energy Transformation Disclaimer
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  All energy consulting sessions, clearings, and diagnostic evaluations offered by Raseshvari Hindustani are spiritual, mindset, and energetic in nature. <strong>These services do not constitute medical, psychological, psychiatric, or financial diagnostics or treatments.</strong>
                </p>
                <p className="text-gray-600 leading-relaxed text-[15px] mt-3">
                  If you are suffering from clinical depression, severe mental illness, or require physical medical attention, you should consult with a licensed professional therapist, physician, or medical provider immediately. Energetic alignment is meant to complement, not replace, professional healthcare.
                </p>
              </div>

              {/* Section 6 */}
              <div
                id="intellectual-property"
                className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#c42d2d]/10 text-[#c42d2d] flex items-center justify-center font-bold text-sm">
                    06
                  </div>
                  <h2 className="text-2xl font-bold font-[var(--font-playfair)] text-[#1a1a1a]">
                    Intellectual Property Rights
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  All material, graphics, video recordings, audio tracks, written text, clearing statements, and proprietary methods showcased on this website (including Revenue Energetics and Energy Score branding) are the intellectual property of Raseshvari Hindustani and are protected by applicable trademark and copyright laws.
                </p>
                <p className="text-gray-600 leading-relaxed text-[15px] mt-3">
                  You are granted a limited, personal, non-transferable license to access our online materials for personal reflection and growth. Any commercial exploitation, duplication, redistribution, or modification of this content without prior written permission is strictly prohibited.
                </p>
              </div>

              {/* Section 7 */}
              <div
                id="liability-limit"
                className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#c42d2d]/10 text-[#c42d2d] flex items-center justify-center font-bold text-sm">
                    07
                  </div>
                  <h2 className="text-2xl font-bold font-[var(--font-playfair)] text-[#1a1a1a]">
                    Limitation of Liability
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  Under no circumstances shall Raseshvari Hindustani, our team, or our affiliates be liable for any direct, indirect, incidental, punitive, or consequential damages resulting from your session choices, energetic shifts, career changes, relationship transitions, or the use of clearing statements. You agree to indemnify and hold us harmless from any claims or disputes arising out of your session outcomes.
                </p>
              </div>

              {/* Section 8 */}
              <div
                id="governing-law"
                className="bg-gradient-to-br from-[#8a0a0a] to-[#4a0e0e] text-white rounded-2xl p-6 sm:p-8 shadow-md scroll-mt-28"
              >
                <h2 className="text-2xl font-bold font-[var(--font-playfair)] mb-2">
                  Governing Law & Dispute Resolution
                </h2>
                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  These Terms and Conditions are governed by and construed in accordance with the laws of India. Any legal dispute, claim, or controversy arising out of these terms shall be settled exclusively within the courts of New Delhi or Mumbai, India.
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-white/10 rounded-xl border border-white/15">
                  <div>
                    <span className="text-xs text-white/60 block uppercase tracking-wider">For Legal Inquiries</span>
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
                    Contact Support Team
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
