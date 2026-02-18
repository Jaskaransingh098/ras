"use client"

import Navbar from "./components/Navbar";
import Hero from "./Pages/Home/Sections/hero";

export default function App() {
  return (
    <>
      <main className="bg-[#f6f4ef] px-6">
        <Navbar />
        <Hero />
      </main>
    </>
  )
}