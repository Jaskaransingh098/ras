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
import Result from "./Sections/result";
import Phases from "./Sections/phases";
import Speaker from "./Sections/speaker";
import LinkedIn from "./Sections/linkedin";
import Dare from "./Sections/dare";
import MomsCommunity from "./Sections/momscommun";
import FAQ from "./Sections/faq";
import Contact from "./Sections/contact";

export default function Home() {
  const scrollRef = useRef<HTMLElement | null>(null);

  return (
    <main
      ref={scrollRef}
      className="min-h-screen"
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

      <section className="">
        <Result />
      </section>

      <section className="">
        <Phases />
      </section>

      <section className="mt-1">
        <Speaker />
      </section>

      <section className="">
        <LinkedIn />
      </section>

      <section className="">
        <Dare />
      </section>

      <section className="">
        <MomsCommunity />
      </section>

      <section className="">
        <Contact />
      </section>

      <section className="">
        <FAQ />
      </section>

    </main>
  );
}
