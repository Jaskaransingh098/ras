"use client";

import { useRef } from "react";
import Hero from "./Sections/hero";
import Welcome from "./Sections/welcome";
import Experience from "./Sections/experience";
import Reel from "./Sections/reels";

export default function Home() {
  const scrollRef = useRef<HTMLElement | null>(null);

  return (
    <main
      ref={scrollRef}
      className="h-screen"
    >
      <section className="h-screen px-4">
        <Hero />
      </section>

      <section className="h-[50vh]">
        <Welcome scrollRef={scrollRef} />
      </section>

      <section className="h-[90vh] mt-2 px-4">
        <Experience scrollRef={scrollRef} />
      </section>
    </main>
  );
}
