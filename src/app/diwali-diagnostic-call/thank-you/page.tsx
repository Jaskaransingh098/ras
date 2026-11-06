"use client";

import { useEffect } from "react";

type FbqWindow = Window & { fbq?: (...args: unknown[]) => void };

export default function DiwaliThankYou() {
  // Fires the Meta Purchase event once per browser session (guards against refresh).
  // Waits for the pixel to load and only marks it tracked after it actually fires.
  useEffect(() => {
    const KEY = "diwali-purchase-tracked";
    try { if (sessionStorage.getItem(KEY)) return; } catch {}
    const w = window as FbqWindow;
    let tries = 0;
    const timer = setInterval(() => {
      if (w.fbq) {
        clearInterval(timer);
        w.fbq("track", "Purchase", { value: 9999, currency: "INR", content_name: "Energy Diagnostic Call - Diwali" });
        try { sessionStorage.setItem(KEY, "1"); } catch {}
      } else if (++tries > 50) {
        clearInterval(timer);
      }
    }, 200);
    return () => clearInterval(timer);
  }, []);

  const trackContact = () => (window as FbqWindow).fbq?.("track", "Contact");

  return (
    <div className="min-h-screen bg-[#f5f0eb] font-serif flex items-center justify-center px-6">
      <div className="max-w-xl bg-white rounded-3xl shadow-xl p-10 text-center">
        <div className="w-16 h-16 bg-[#8B0000] rounded-full flex items-center justify-center mx-auto mb-5">
          <span className="text-white text-2xl">🪔</span>
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-3">Thank you, your payment is received</h1>
        <p className="text-gray-700 mb-2">Your Energy Diagnostic Call is confirmed. The Zoom link will reach you by email before your call.</p>
        <p className="text-gray-500 text-sm mb-8">Questions? Message us on WhatsApp and we&apos;ll help.</p>
        <a
          href="https://wa.me/917700801831?text=Hi%2C%20I%20have%20a%20question%20about%20my%20Diagnostic%20Call"
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackContact}
          className="inline-block bg-[#25D366] text-white px-8 py-3 rounded-full font-bold hover:bg-[#20b958] transition-colors"
        >
          WhatsApp us
        </a>
      </div>
    </div>
  );
}
