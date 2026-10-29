"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRestoration() {
  const pathname = usePathname();
  const isPopStateRef = useRef(false);

  useEffect(() => {
    // Enable manual scroll restoration so iOS Safari doesn't force snap to (0,0) prematurely
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const handlePopState = () => {
      isPopStateRef.current = true;
    };

    const saveScroll = () => {
      if (typeof window !== "undefined") {
        sessionStorage.setItem(`scroll_pos_${window.location.pathname}`, window.scrollY.toString());
      }
    };

    // Save scroll on pagehide (crucial for iOS Safari bfcache), beforeunload, and periodically
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("pagehide", saveScroll);
    window.addEventListener("beforeunload", saveScroll);

    let scrollTimeout: NodeJS.Timeout | null = null;
    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(saveScroll, 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("pagehide", saveScroll);
      window.removeEventListener("beforeunload", saveScroll);
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  useEffect(() => {
    const savedPos = sessionStorage.getItem(`scroll_pos_${pathname}`);
    const isPop = isPopStateRef.current;
    isPopStateRef.current = false;

    if (isPop && savedPos !== null) {
      const targetY = parseInt(savedPos, 10);
      if (!isNaN(targetY)) {
        // Attempt immediate restoration and retry across initial animation frames to handle dynamic content loads
        let attempts = 0;
        const maxAttempts = 15;

        const restore = () => {
          attempts++;
          window.scrollTo({
            top: targetY,
            behavior: "instant" as ScrollBehavior,
          });

          // If document height hasn't caught up or user hasn't reached target, keep trying for a short window
          if (attempts < maxAttempts && Math.abs(window.scrollY - targetY) > 5) {
            requestAnimationFrame(restore);
          }
        };

        requestAnimationFrame(restore);

        // Fallback timeouts for asynchronous layout settles
        setTimeout(restore, 50);
        setTimeout(restore, 150);
        setTimeout(restore, 350);
      }
    } else {
      // Normal forward navigation starts at the top
      window.scrollTo({
        top: 0,
        behavior: "instant" as ScrollBehavior,
      });
    }
  }, [pathname]);

  return null;
}
