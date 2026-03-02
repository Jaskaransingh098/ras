"use client";

import { useRef } from "react";
import Hero from "./Sections/hero";
import Welcome from "./Sections/welcome";
import Experience from "./Sections/experience";
import Reel from "./Sections/reels";
import How from "./Sections/how";
import ScrollPoints from "./Sections/scrollPoints";
import Journey from "./Sections/journey";
import Services from "./Sections/services";

export default function Home() {
  const scrollRef = useRef<HTMLElement | null>(null);

  return (
    <main
      ref={scrollRef}
      className="h-screen"
    >
      <section className="h-screen px-0">
        <Hero />
      </section>

      <section className="h-[50vh]">
        <Welcome scrollRef={scrollRef} />
      </section>

      <section className="h-[90vh] mt-2 px-0">
        <Experience scrollRef={scrollRef} />
      </section>

      <section className="">
        <Reel scrollRef={scrollRef} />
      </section>

      <section className="">
        <How scrollRef={scrollRef} />
      </section>

      <section className="">
        <ScrollPoints />
      </section>

      <section className="">
        <Journey />
      </section>

      <section className="">
        <Services />
      </section>
    </main>
  );
}
