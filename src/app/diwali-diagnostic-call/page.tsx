"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";

export default function DiwaliDiagnosticCall() {
  const [showQRModal, setShowQRModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Countdown to 15 November
  useEffect(() => {
    const target = new Date("2024-11-15T23:59:59");
    const timer = setInterval(() => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      if (diff <= 0) { clearInterval(timer); return; }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f0eb] font-serif">
      <Navbar />

      {/* Diwali Offer Banner */}
      <div className="bg-[#8B0000] text-white text-center py-3 px-4 text-sm sm:text-base">
        <span className="mr-2">🪔</span>
        <span className="font-bold text-[#d4a853]">Diwali offer:</span>
        {" "}Diagnostic Call{" "}
        <span className="line-through opacity-70">₹15,000</span>{" "}
        <span className="font-bold text-[#d4a853]">₹9,999</span>
        {"   "}·{"   "}
        Ends 15 November · {timeLeft.days}d {timeLeft.hours.toString().padStart(2,"0")}h {timeLeft.minutes.toString().padStart(2,"0")}m left
      </div>

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10 grid md:grid-cols-2 gap-10 items-center">
        <div>
          {/* Logo / Name */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#8B0000] rounded text-white flex items-center justify-center font-bold text-sm">RH</div>
            <span className="font-semibold text-gray-800 text-lg">Raseshvari Hindustani</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-700 mb-6">
            Called <span className="text-[#8B0000] font-semibold">"Miracle Lady"</span> by Dainik Tribune
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-4">
            You've tried fixing the problem.{" "}
            <span className="text-[#8B0000] italic font-bold">What if the real cause runs deeper?</span>
          </h1>

          <p className="text-gray-700 text-lg mb-6">
            In one <strong>private 1-hour Energy Diagnostic Call</strong>, I look beneath the surface of what keeps going wrong. You leave knowing <strong>what's really holding you back, why it keeps repeating, and what can change.</strong>
          </p>

          {/* Price */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="text-4xl font-bold text-[#8B0000]">₹9,999</span>
            <span className="line-through text-gray-400 text-xl">₹15,000</span>
            <span className="bg-[#8B0000] text-white text-xs font-bold px-3 py-1 rounded-full">DIWALI OFFER · TILL 15 NOV</span>
          </div>
          <p className="text-gray-500 text-sm mb-2">India pricing. Outside India, country pricing applies.</p>

          {/* Scarcity */}
          <div className="inline-flex items-center gap-2 bg-[#fdf0f0] border border-[#e8c0c0] rounded-full px-4 py-2 text-sm text-[#8B0000] mb-8">
            <span className="w-2 h-2 rounded-full bg-[#8B0000] inline-block"></span>
            Only 4 Diagnostic Calls a day
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setShowQRModal(true)}
              className="bg-[#8B0000] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#6d0000] transition-colors"
            >
              Book my Diagnostic Call
            </button>
            <a
              href="#how-it-works"
              className="border-2 border-[#8B0000] text-[#8B0000] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#fdf0f0] transition-colors"
            >
              How it works
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm text-gray-700">
            <span>✦ 15+ years of energy work</span>
            <span>✦ 150+ lives transformed</span>
            <span>✦ Clients in 5+ countries</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative flex justify-center items-end">
          <div className="w-72 h-80 sm:w-80 sm:h-96 rounded-t-full border-2 border-[#d4a853] overflow-hidden relative">
            <Image src="/raseshwari-photo.jpg" alt="Raseshvari Hindustani" fill className="object-cover object-top" />
          </div>
          {/* Floating Card */}
          <div className="absolute bottom-4 right-0 bg-[#8B0000] text-white rounded-xl p-4 shadow-xl">
            <p className="font-bold text-lg leading-tight">Raseshvari<br />Hindustani</p>
            <p className="text-[#d4a853] text-sm mt-1">Energy Transformation<br />Expert</p>
          </div>
        </div>
      </section>

      {/* PRESS / SOCIAL PROOF */}
      <section className="bg-white py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-6">
          <div className="flex -space-x-3">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="w-10 h-10 rounded-full bg-[#d4a853] border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest text-[#8B0000] uppercase">With Padma Awardees, Public Leaders & Artists</p>
            <p className="text-gray-600 font-semibold mt-1">Dainik Jagran · Dainik Tribune · BSE</p>
          </div>
        </div>
      </section>

      {/* IS THIS YOU */}
      <section className="py-20 px-6 bg-[#f5f0eb]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest text-[#8B0000] uppercase mb-3">Kya Yeh Aap Hain? · Is This You?</p>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3">The words you've<br />never said out loud</h2>
          <div className="w-16 h-0.5 bg-[#d4a853] mx-auto mb-12"></div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { q: '"Itna pyaar hai andar… bas lene wala koi nahi."', a: 'So much love inside, and no one to receive it.' },
              { q: '"Bahar se sab sorted… andar se khaali."', a: 'Everything looks perfect outside. Inside, something is empty.' },
              { q: '"Paisa aata hai… par tikta nahi."', a: 'Money comes in, and somehow it never stays.' },
              { q: '"Har rishte mein wahi kahani dohraati hai."', a: 'Different people, the same painful story, every time.' },
              { q: '"Mehnat poori… result aadha."', a: 'I give everything, and my business or career stays stuck at the same level.' },
              { q: '"Sab kuch hai… phir bhi khushi kyun nahi?"', a: 'I have everything I worked for. So why don\'t I feel happy?' },
              { q: '"Sabke liye sab kuch kiya… apne liye kuch nahi bacha."', a: 'Nothing was left for me.' },
              { q: '"Kitne courses, kitne coaches… phir bhi same jagah."', a: 'I follow every advice, and I\'m still in the same place.' },
              { q: '"Mere saath hi aisa kyun hota hai?"', a: 'Why does this only happen to me?' },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-[#e8c0c0] rounded-2xl p-5 text-left">
                <p className="text-[#8B0000] font-bold text-base mb-2">{item.q}</p>
                <p className="text-gray-600 text-sm">{item.a}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-lg text-gray-700 max-w-2xl mx-auto">
            If even one of these made your heart sink a little,{" "}
            <span className="text-[#8B0000] font-bold">there is a reason it keeps happening.</span>{" "}
            And it is usually not where you have been looking.
          </p>
        </div>
      </section>

      {/* A MESSAGE FROM RASESHVARI */}
      <section className="py-20 px-6 bg-[#faf8f5]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative flex justify-center">
            <div className="w-64 rounded-3xl border-4 border-gray-800 overflow-hidden bg-gray-900 shadow-2xl">
              <div className="relative h-96">
                <Image src="/raseshwari-photo.jpg" alt="Raseshvari" fill className="object-cover object-top" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer opacity-90 hover:opacity-100">
                    <div className="w-0 h-0 border-t-8 border-b-8 border-l-14 border-transparent border-l-[#8B0000] ml-1"></div>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">1 min</div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest text-[#8B0000] uppercase mb-3">A Message From Raseshvari</p>
            <h2 className="text-4xl font-black text-gray-900 mb-4">Hear it from<br />me first</h2>
            <p className="text-gray-700 mb-6">In one minute: who I am, what happens in your call, and why this is different from anything you've tried.</p>
            <div className="flex gap-3 flex-wrap">
              {["No judgement", "No pressure", "Just clarity"].map(t => (
                <span key={t} className="border border-[#8B0000] text-[#8B0000] rounded-full px-4 py-1 text-sm font-medium">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SOUND FAMILIAR */}
      <section className="py-20 px-6 bg-[#f5f0eb]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest text-[#8B0000] uppercase mb-3">Sound Familiar?</p>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3">The problem you see is<br />rarely the real problem.</h2>
          <div className="w-16 h-0.5 bg-[#d4a853] mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-left">
              <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">On The Surface</p>
              <h3 className="text-xl font-bold text-gray-900 mb-6">What keeps happening</h3>
              <ul className="space-y-4">
                {[
                  "The <strong>same pattern</strong> repeats in every relationship.",
                  "A caring, committed partner <strong>still hasn't arrived.</strong>",
                  "You give your best, and <strong>nothing changes.</strong>",
                  "A loneliness or heaviness that's <strong>hard to explain.</strong>",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-gray-700">
                    <span className="text-[#8B0000] font-bold mt-0.5">✕</span>
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#8B0000] text-white rounded-2xl p-8 text-left">
              <p className="text-xs font-bold tracking-widest text-[#d4a853] uppercase mb-4">Beneath The Surface</p>
              <h3 className="text-xl font-bold mb-6">What the Diagnostic Call reveals</h3>
              <ul className="space-y-4">
                {[
                  "<strong>Why</strong> the same struggle keeps returning in new forms.",
                  "What you may have been <strong>carrying for years.</strong>",
                  "<strong>What can change,</strong> and how.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-[#d4a853] font-bold mt-0.5">✦</span>
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BIG QUOTE */}
      <section className="bg-[#8B0000] py-20 px-6 text-center">
        <p className="text-3xl sm:text-4xl font-bold italic text-white max-w-3xl mx-auto leading-relaxed">
          "Just as a doctor diagnoses your health, I diagnose the energy of your problem."
        </p>
        <p className="text-[#d4a853] mt-4 font-semibold tracking-widest text-sm">— RASESHVARI HINDUSTANI</p>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-6 bg-[#f5f0eb]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest text-[#8B0000] uppercase mb-3">How It Works</p>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3">Four simple steps</h2>
          <div className="w-16 h-0.5 bg-[#d4a853] mx-auto mb-12"></div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                n: "1", title: "Pick your time",
                desc: 'Click "Book my Diagnostic Call", choose a date and time that suit you, and answer a few short questions.'
              },
              {
                n: "2", title: "Pay by UPI",
                desc: "Scan the QR shown after booking, pay ₹9,999 and send us the screenshot on WhatsApp. Your slot is confirmed once payment is received."
              },
              {
                n: "3", title: "Your 1-hour call",
                desc: "A private Zoom conversation. You share. I listen beneath your words and diagnose the energy behind it."
              },
              {
                n: "4", title: "Your way forward",
                desc: "You know the real reason and what can change. If you'd like me to shift it for you, I'll explain my private Energy Transformation Session. No pressure."
              },
            ].map((step) => (
              <div key={step.n} className="bg-white border border-[#e8c0c0] rounded-2xl p-6 text-left">
                <div className="w-12 h-12 rounded-full bg-[#8B0000] border-2 border-[#d4a853] text-white flex items-center justify-center font-bold text-xl mb-4">
                  {step.n}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IS THIS FOR YOU */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest text-[#8B0000] uppercase mb-3">Is This For You?</p>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3">This call is for people<br />ready to look deeper</h2>
          <div className="w-16 h-0.5 bg-[#d4a853] mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-[#8B0000] text-white rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#d4a853] flex items-center justify-center">✓</div>
                <h3 className="text-xl font-bold">This is for you if</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "The same struggle keeps returning, no matter what you try.",
                  "You want a loving, nurturing relationship and can't understand why it hasn't happened.",
                  "Life looks sorted from outside, yet something inside feels stuck.",
                  "You're tired of working harder through logic and hard work.",
                  "You're open to seeing your life in a new way.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#d4a853] flex items-center justify-center text-[#8B0000] flex-shrink-0 text-xs font-bold mt-0.5">✓</div>
                    <span className="font-semibold">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#faf8f5] border border-gray-200 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center text-gray-500">✕</div>
                <h3 className="text-xl font-bold text-gray-900">This is not for you if</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "You want a quick trick or a guaranteed outcome.",
                  "You need medical, psychological or financial advice.",
                  "You want to debate rather than explore.",
                  "You're only curious, with no wish to change.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-gray-700">
                    <span className="text-gray-400 font-bold flex-shrink-0 mt-0.5">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6 bg-[#f5f0eb]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest text-[#8B0000] uppercase mb-3">In Their Words</p>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3">What people say after working with her</h2>
          <div className="w-16 h-0.5 bg-[#d4a853] mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            {[
              {
                text: '"I originally came because the same patterns kept repeating in my relationships no matter how much I tried to change things. During the call, I understood something I had never connected before."',
                name: "Priya M.", role: "Entrepreneur, Mumbai"
              },
              {
                text: '"I didn\'t even know how to properly explain what I was feeling before the call. But somehow, things that had felt confusing for years started making sense in a very different way."',
                name: "Ananya R.", role: "Professional, Delhi"
              },
              {
                text: '"I have spent years reading books and attending workshops. Nothing gave me the clarity that one hour with Raseshvari did. It was like someone finally switched on a light."',
                name: "Meera K.", role: "Teacher, Bangalore"
              },
              {
                text: '"She heard things I didn\'t say. And explained things I didn\'t know were even there. Honestly life-changing."',
                name: "Sunita D.", role: "Mother & Business Owner"
              },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="text-[#d4a853] text-4xl font-serif mb-4">"</div>
                <p className="text-gray-700 leading-relaxed italic mb-6">{t.text}</p>
                <div>
                  <p className="font-bold text-gray-900">{t.name}</p>
                  <p className="text-gray-500 text-sm">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEET RASESHVARI */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest text-[#8B0000] uppercase mb-3">Meet Raseshvari</p>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-2">The Walking Talking Miracle</h2>
          <p className="text-[#8B0000] italic text-xl mb-4">She doesn't fix people. She shifts energy.</p>
          <div className="w-16 h-0.5 bg-[#d4a853] mx-auto mb-12"></div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {[
              { n: "15+", l: "years of energy\ntransformation work" },
              { n: "150+", l: "lives transformed in a\nsingle private session" },
              { n: "25+", l: "years on a\nspiritual path" },
              { n: "5+", l: "countries,\nall online" },
            ].map((s, i) => (
              <div key={i} className="border-2 border-[#8B0000] rounded-2xl p-5">
                <p className="text-3xl font-black text-[#8B0000]">{s.n}</p>
                <p className="text-gray-600 text-sm mt-1 whitespace-pre-line">{s.l}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-[#faf8f5] rounded-2xl p-8 space-y-6">
              {[
                { icon: "✦", title: "Works with the whole of you", desc: "No single modality. Present conditioning, the logical mind and the deeper layers beneath it." },
                { icon: "✦", title: "Educator turned energy expert", desc: "Former UGC NET qualified college lecturer, now 15+ years with professionals, founders, mothers and leaders." },
                { icon: "✦", title: "A lifelong spiritual path in Krishna consciousness", desc: "" },
                { icon: "✦", title: "A name that stands for unity", desc: "The first Indian to officially take the surname Hindustani, for an identity beyond caste, creed and religion." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 bg-[#8B0000] rounded-full flex items-center justify-center text-[#d4a853] flex-shrink-0">✦</div>
                  <div>
                    <p className="font-bold text-gray-900">{item.title}</p>
                    {item.desc && <p className="text-gray-600 text-sm mt-1">{item.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#8B0000] text-white rounded-2xl p-8">
              <h3 className="font-bold text-xl mb-6">Recognition</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "GUEST OF HONOUR", value: "Bombay Stock Exchange" },
                  { label: "GUEST OF HONOUR", value: "MSME Mahotsav 2026" },
                  { label: "JURY MEMBER", value: "Fempreneur Awards" },
                  { label: "FORMER FACILITATOR", value: "Access Consciousness" },
                  { label: "FOUNDER", value: "MOMS community" },
                  { label: "FEATURED IN", value: "National media" },
                ].map((r, i) => (
                  <div key={i} className="bg-[#6d0000] rounded-xl p-3">
                    <p className="text-[#d4a853] text-xs font-bold uppercase">{r.label}</p>
                    <p className="text-white font-semibold text-sm mt-1">{r.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl p-3 text-center">
                  <p className="text-[#8B0000] text-xs font-bold">Dainik Tribune: "Miracle Lady"</p>
                </div>
                <div className="bg-white rounded-xl p-3 text-center">
                  <p className="text-[#8B0000] text-xs font-bold">Dainik Jagran: the surname Hindustani</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#8B0000] py-24 px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-black italic text-[#d4a853] mb-4">space for clarity within.</h2>
        <p className="text-white text-xl font-bold max-w-2xl mx-auto mb-3">
          If the Universe has brought you this far... what is stopping you from taking the next step?
        </p>
        <p className="text-white opacity-80 mb-2">Jo cheez saalon se nahi badli, uski asli wajah jaaniye.</p>
        <p className="text-white font-bold mb-10">₹9,999 instead of ₹15,000, only till 15 November.</p>
        <button
          onClick={() => setShowQRModal(true)}
          className="bg-white text-[#8B0000] px-10 py-4 rounded-full font-bold text-xl hover:bg-gray-100 transition-colors"
        >
          Book my Diagnostic Call
        </button>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-gray-400 text-sm py-8 px-6 text-center space-y-3">
        <p>© 2026 Raseshvari Hindustani · Beyond Imagination Club · rashindustani.com</p>
        <p className="max-w-2xl mx-auto">
          The Energy Diagnostic Call is not a medical, psychological or financial service. Individual experiences vary and no specific outcome is guaranteed. This site is not part of, or endorsed by, Meta, Facebook or Instagram.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a href="/privacy-policy" className="underline hover:text-white">Privacy policy</a>
          <span>·</span>
          <a href="/terms-and-conditions" className="underline hover:text-white">Terms & conditions</a>
          <span>·</span>
          <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Contact us on WhatsApp</a>
        </div>
      </footer>

      {/* QR CODE MODAL */}
      {showQRModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowQRModal(false); }}
        >
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center relative">
            <button
              onClick={() => setShowQRModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 font-bold text-lg"
            >
              ✕
            </button>

            <div className="w-16 h-16 bg-[#8B0000] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🪔</span>
            </div>

            <h3 className="text-xl font-black text-gray-900 mb-1">Book Your Diagnostic Call</h3>
            <p className="text-[#8B0000] font-bold text-lg mb-1">₹9,999 <span className="line-through text-gray-400 text-base">₹15,000</span></p>
            <p className="text-gray-500 text-sm mb-6">Diwali Special · Till 15 November</p>

            <div className="bg-gray-50 rounded-2xl p-4 mb-4">
              <p className="text-gray-600 text-sm mb-3 font-medium">Scan to pay via Google Pay / UPI</p>
              <div className="relative w-52 h-52 mx-auto rounded-xl overflow-hidden border-4 border-[#8B0000]">
                <Image
                  src="/gpay-qr.jpg"
                  alt="Google Pay QR Code"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="bg-[#fdf0f0] rounded-xl p-3 mb-4">
              <p className="text-xs text-gray-500 mb-1">UPI ID</p>
              <p className="font-bold text-[#8B0000] text-lg tracking-wide">raseshwari1@oksbi</p>
            </div>

            <div className="bg-[#fffbf0] border border-[#d4a853] rounded-xl p-3 text-sm text-gray-700">
              <p className="font-bold text-[#8B0000] mb-1">After payment:</p>
              <p>Send the payment screenshot on WhatsApp to confirm your slot. Your booking is confirmed once payment is received.</p>
            </div>

            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full bg-[#25D366] text-white py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-[#20b958] transition-colors"
            >
              <span>📱</span> Send Screenshot on WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

