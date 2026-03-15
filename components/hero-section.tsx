"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1509941943102-10c232535736?w=1600&q=80",
    title: "NEW COLLECTION",
    subtitle: "Premium Watches & Jewelry",
    btn: "Shop Now",
    link: "#categories",
  },
  {
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600&q=80",
    title: "LUXURY WATCHES",
    subtitle: "Timeless elegance for every occasion",
    btn: "Explore Men",
    link: "#categories",
  },
  {
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1600&q=80",
    title: "FINE JEWELRY",
    subtitle: "Crafted with passion and precision",
    btn: "Explore Women",
    link: "#categories",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="relative w-full h-screen min-h-[600px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slides[current].image}')` }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex items-center px-8 md:px-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7 }}
              className="max-w-xl"
            >
              <p className="text-white/60 uppercase tracking-[0.3em] text-sm mb-4">UniqueTrends.pk</p>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight uppercase mb-4">
                {slides[current].title}
              </h1>
              <p className="text-white/70 text-lg mb-8 max-w-sm">{slides[current].subtitle}</p>
              <div className="flex gap-4">
                <Link href={slides[current].link} className="px-8 py-3 bg-white text-gray-900 font-bold uppercase tracking-widest text-sm hover:bg-gray-100 transition-all">
                  {slides[current].btn}
                </Link>
                <Link href="#contact" className="px-8 py-3 border border-white text-white font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-all">
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-white" : "w-2 bg-white/40"}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <button onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-2xl transition-all">
          ‹
        </button>
        <button onClick={() => setCurrent((current + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-2xl transition-all">
          ›
        </button>
      </div>

      {/* Features Bar */}
      <div className="bg-gray-900 text-white py-5 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: "🚚", title: "Free Delivery", sub: "On orders over PKR 2000" },
            { icon: "🔄", title: "Easy Returns", sub: "7 day return policy" },
            { icon: "🎁", title: "Gift Wrapping", sub: "Available on all orders" },
            { icon: "📞", title: "24/7 Support", sub: "Call: 0349-7669537" },
          ].map((f) => (
            <div key={f.title} className="flex items-center gap-3">
              <span className="text-2xl">{f.icon}</span>
              <div>
                <p className="font-semibold text-sm uppercase tracking-wide">{f.title}</p>
                <p className="text-white/50 text-xs">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
