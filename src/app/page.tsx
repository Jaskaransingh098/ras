"use client"

import Navbar from "./components/Navbar";
import Home from "./Pages/Home/Home";

export default function App() {
  return (
    <>
      <main className="bg-white">
        <Navbar />
        <Home />
      </main>
    </>
  )
}