'use client';

import Footer from "./components/Footer";
import Header from "./components/Header";
import Sections from "./sections";


export default function Home() {
  return (
      <div className="bg-black text-white scroll-smooth">
      <Header />
      <main className="pt-[90px]">
        <Sections />
      </main>
      <Footer />
    </div>
  );
}
