"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Result2 from "../Pages/Home/Sections/result2";
import Phases from "../Pages/Home/Sections/phases";
import FAQ from "../Pages/Home/Sections/faq";

export default function ServicesPage() {
  return (
    <>
      <main className="bg-white">
        <Navbar />

        {/* Hero Banner */}
        <section className="relative bg-gradient-to-b from-[#8a0a0a] to-[#4a0e0e] overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20">
          {/* Subtle background orbs */}
          <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-[#c42d2d]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[10%] left-[5%] w-[250px] h-[250px] bg-[#e85d5d]/8 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[2px] rounded-full bg-gradient-to-r from-transparent to-[#e85d5d]" />
              <p className="text-[10px] md:text-xs uppercase tracking-[.3em] text-white/70 font-semibold font-[var(--font-dm-sans)]">
                Energy Transformation
              </p>
              <div className="w-8 h-[2px] rounded-full bg-gradient-to-l from-transparent to-[#e85d5d]" />
            </div>

            <h1 className="text-[36px] md:text-[56px] font-[var(--font-playfair)] text-white font-bold leading-[1.1] mb-5">
              Services That{" "}
              <span className="italic text-white/90 font-light">Shift</span>{" "}
              Everything
            </h1>

            <p className="text-white/80 text-[16px] md:text-[19px] max-w-2xl mx-auto leading-relaxed font-[var(--font-dm-sans)]">
              From energy diagnostics to deep transformation, explore the full
              spectrum of what&apos;s possible when you shift at the root.
            </p>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-2 mt-8">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/30" />
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section>
          <Result2 />
        </section>

        {/* Phases Section */}
        <section>
          <Phases />
        </section>

        {/* FAQ Section */}
        <section>
          <FAQ />
        </section>

        <Footer />
      </main>
    </>
  );
}
