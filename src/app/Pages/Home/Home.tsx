"use client";

import Hero from "./Sections/hero";
import Welcome from "./Sections/welcome";

export default function Home() {
  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <section className="snap-start h-screen">
        <div className="px-6 h-full">
          <Hero />
        </div>
      </section>

      <section className="snap-start h-screen">
        <Welcome />
      </section>
    </main>
  );
}
