"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { useState } from "react";

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "Session Inquiry",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate brief network submission delay
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const faqs = [
    {
      q: "How do I prepare for my 1-on-1 Energy Transformation or Diagnostic Call?",
      a: "No special spiritual preparation is required. Ensure you are in a quiet, private room with a stable internet connection. Keep an open mind and be ready to share what you have been experiencing.",
    },
    {
      q: "What is the difference between an Energy Diagnostic Call and a full session?",
      a: "The Energy Diagnostic Call is an initial paid diagnostic session designed to map out where your energy is dropping or blocked. A full energy transformation session (such as Revenue Energetics) goes deep into shifting root energy blockages instantly.",
    },
    {
      q: "Can I reschedule my booked session?",
      a: "Yes, you can reschedule your session up to 24 hours prior to your scheduled time slot by sending an email or contacting support.",
    },
    {
      q: "Are the sessions conducted online or in person?",
      a: "All diagnostic calls and energy transformation sessions are conducted 1-on-1 via secure online video calls (Zoom/Google Meet) so you can join from anywhere in the world.",
    },
    {
      q: "What if I experience technical issues joining my call?",
      a: "If you experience any video link or technical difficulty, reach out to us via this support form or email raseshvari@rashindustani.com right away.",
    },
  ];

  return (
    <>
      <main className="bg-[#faf7f5] min-h-screen flex flex-col justify-between font-[var(--font-dm-sans)]">
        <Navbar />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-[#8a0a0a] to-[#4a0e0e] text-white pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
          {/* Ambient Glow Orbs */}
          <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-[#c42d2d]/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[10%] left-[5%] w-[250px] h-[250px] bg-[#e85d5d]/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[2px] rounded-full bg-gradient-to-r from-transparent to-[#e85d5d]" />
              <span className="text-[11px] md:text-xs uppercase tracking-[.3em] text-white/70 font-semibold font-[var(--font-dm-sans)]">
                We Are Here For You
              </span>
              <div className="w-8 h-[2px] rounded-full bg-gradient-to-l from-transparent to-[#e85d5d]" />
            </div>

            <h1 className="text-[36px] sm:text-[48px] md:text-[56px] font-[var(--font-playfair)] text-white font-bold leading-[1.1] mb-5">
              Support & <span className="italic font-light text-white/90">Assistance</span>
            </h1>

            <p className="text-white/80 text-[15px] sm:text-[17px] md:text-[19px] max-w-2xl mx-auto leading-relaxed font-[var(--font-dm-sans)]">
              Have questions about your session booking, energy diagnostic roadmap, or technical setup? Our dedicated team is here to assist you.
            </p>

            <div className="inline-flex items-center gap-2 mt-6 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-[12px] text-white/90">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Typical response time: Within 24 hours
            </div>
          </div>
        </section>

        {/* Support Categories */}
        <section className="py-12 md:py-16 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto w-full -mt-8 relative z-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-[#c42d2d]/10 text-[#c42d2d] flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <h3 className="font-bold text-lg font-[var(--font-playfair)] text-[#111] mb-1">Session Bookings</h3>
              <p className="text-gray-600 text-xs leading-relaxed">Help with scheduling, rescheduling, or changing session time slots.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-[#c42d2d]/10 text-[#c42d2d] flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              </div>
              <h3 className="font-bold text-lg font-[var(--font-playfair)] text-[#111] mb-1">Diagnostic Inquiries</h3>
              <p className="text-gray-600 text-xs leading-relaxed">Questions regarding Energy Score Quiz or Energy Diagnostic Call roadmap.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-[#c42d2d]/10 text-[#c42d2d] flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              </div>
              <h3 className="font-bold text-lg font-[var(--font-playfair)] text-[#111] mb-1">Technical Support</h3>
              <p className="text-gray-600 text-xs leading-relaxed">Assistance with video call links, audio setup, or payment confirmation.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-[#c42d2d]/10 text-[#c42d2d] flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h3 className="font-bold text-lg font-[var(--font-playfair)] text-[#111] mb-1">Collaborations</h3>
              <p className="text-gray-600 text-xs leading-relaxed">Speaking requests, podcast appearances, and corporate workshops.</p>
            </div>

          </div>
        </section>

        {/* Contact Form & Direct Info Section */}
        <section className="py-8 md:py-16 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Left Column: Interactive Support Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-gray-150 shadow-sm">
              <div className="mb-6">
                <span className="text-[11px] uppercase tracking-widest text-[#c42d2d] font-bold block mb-1">Direct Helpdesk</span>
                <h2 className="text-2xl sm:text-3xl font-bold font-[var(--font-playfair)] text-[#1a1a1a]">
                  Send Us a Support Message
                </h2>
                <p className="text-gray-500 text-sm mt-1">Fill out the form below and our team will get back to you shortly.</p>
              </div>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center animate-fadeUp">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <h3 className="text-xl font-bold font-[var(--font-playfair)] text-emerald-900 mb-2">Message Received!</h3>
                  <p className="text-emerald-700 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. We have logged your support request and will reply to <strong>{formData.email}</strong> within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", category: "Session Inquiry", message: "" });
                    }}
                    className="mt-6 text-xs uppercase tracking-wider font-bold text-[#c42d2d] hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[#c42d2d] focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[#c42d2d] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 9876543210"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[#c42d2d] focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Inquiry Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[#c42d2d] focus:bg-white transition-all"
                      >
                        <option value="Session Inquiry">Session Inquiry & Booking</option>
                        <option value="Energy Diagnostic Call">Energy Diagnostic Call</option>
                        <option value="Technical & Video Link Issue">Technical & Video Link Issue</option>
                        <option value="Payment / Billing Issue">Payment / Billing Issue</option>
                        <option value="Speaking & Collaboration">Speaking & Collaboration</option>
                        <option value="Other">Other Query</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Your Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe how we can assist you..."
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[#c42d2d] focus:bg-white transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#c42d2d] hover:bg-[#8a0a0a] text-white font-bold text-sm tracking-wider uppercase font-[var(--font-outfit)] transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Support Ticket"
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Direct Info Card & Office Details */}
            <div className="lg:col-span-5 space-y-6">

              <div className="bg-gradient-to-br from-[#8a0a0a] to-[#4a0e0e] text-white p-8 rounded-3xl shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#c42d2d]/20 rounded-full blur-2xl pointer-events-none" />

                <span className="text-[11px] uppercase tracking-widest text-white/70 font-semibold block mb-1">
                  Direct Support Contact
                </span>
                <h3 className="text-2xl font-bold font-[var(--font-playfair)] mb-6">
                  Get in Touch Directly
                </h3>

                <div className="space-y-5 text-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-amber-300">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </div>
                    <div>
                      <span className="text-xs text-white/60 block">Email Address</span>
                      <a href="mailto:raseshvari@rashindustani.com" className="font-semibold hover:text-amber-200 transition-colors">
                        raseshvari@rashindustani.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-amber-300">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </div>
                    <div>
                      <span className="text-xs text-white/60 block">Support Working Hours</span>
                      <span className="font-medium text-white/90">Monday - Saturday (10:00 AM - 7:00 PM IST)</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-amber-300">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                    <div>
                      <span className="text-xs text-white/60 block">Primary Location</span>
                      <span className="font-medium text-white/90">Mumbai / New Delhi, India</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/15 flex items-center justify-between">
                  <span className="text-xs text-white/70">Need urgent session help?</span>
                  <Link
                    href="/energy-diagnostic-call"
                    className="text-xs font-bold text-amber-300 hover:text-white underline transition-colors"
                  >
                    Book Diagnostic Call
                  </Link>
                </div>
              </div>

              {/* Quick Links Box */}
              <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm">
                <h4 className="font-bold text-base font-[var(--font-playfair)] text-[#111] mb-3">
                  Helpful Quick Links
                </h4>
                <div className="flex flex-col gap-2.5 text-xs text-gray-600 font-medium">
                  <Link href="/services" className="hover:text-[#c42d2d] flex items-center justify-between py-1 border-b border-gray-100">
                    <span>Explore Transformation Services</span>
                    <span>→</span>
                  </Link>
                  <Link href="/energy-diagnostic-call" className="hover:text-[#c42d2d] flex items-center justify-between py-1 border-b border-gray-100">
                    <span>Energy Diagnostic Call</span>
                    <span>→</span>
                  </Link>
                  <Link href="/privacy-policy" className="hover:text-[#c42d2d] flex items-center justify-between py-1">
                    <span>View Privacy Policy</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* FAQs Accordion Section */}
        <section className="py-12 md:py-20 px-4 sm:px-6 md:px-12 max-w-5xl mx-auto w-full">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-[#c42d2d] font-bold block mb-1">Common Questions</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-playfair)] text-[#111]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-semibold text-base text-[#1a1a1a] hover:text-[#c42d2d] transition-colors"
                >
                  <span className="font-[var(--font-playfair)] text-lg">{faq.q}</span>
                  <span className="text-xl text-[#c42d2d] flex-shrink-0">
                    {openFaq === index ? "−" : "+"}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4 animate-fadeUp">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
