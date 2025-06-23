'use client';

import dynamic from 'next/dynamic';
import Header from "./components/Header";
import Footer from "./components/Footer";

// Dynamically load the client-only Sections component
const Sections = dynamic(() => import("./sections"), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white scroll-smooth">
      <Header />
      <main className="pt-[90px]">
        <Sections />
      </main>
      <Footer />
    </div>
  );
}
