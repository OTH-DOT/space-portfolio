'use client';

import Footer from "./components/Footer";
import Header from "./components/Header";
import Sections from "./sections";


export default function Home() {
  return (
      <div className="bg-black text-white scroll-smooth">
      <Header />
      <main className="overflow-hidden">
        <Sections />
      </main>
      <Footer />
    </div>
  );
}
