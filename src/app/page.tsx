"use client"

import Navbar from "./components/Navbar";
import Home from "./Pages/Home/Home";

export default function App() {
  return (
    <>
      <main className="bg-[#f6f4ef]">
        <Navbar />
        <Home />
      </main>
    </>
  )
}