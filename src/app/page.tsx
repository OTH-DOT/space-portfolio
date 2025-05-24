'use client';

import Footer from "./components/Footer";
import Header from "./components/Header";
import Sections from "./sections";


export default function Home() {
  return (
      <div className="bg-white text-black scroll-smooth">
      <Header />
      <main className="pt-20">
        <Sections />
      </main>
      <Footer />
    </div>
  );
}
