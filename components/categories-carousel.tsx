"use client";
import { useEffect, useRef, useState } from "react";
import { client } from "@/sanity/lib/client";
import { categoriesQuery } from "@/sanity/lib/queries";
import Link from "next/link";

type Category = {
  _id: string;
  title: string;
  slug: { current: string };
  image: string;
  section: { title: string; slug: { current: string } };
};

export default function CategoriesCarousel() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeSection, setActiveSection] = useState("men");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    client.fetch(categoriesQuery).then(setCategories);
  }, []);

  const filtered = categories.filter((c) => c.section?.slug?.current === activeSection);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -400 : 400, behavior: "smooth" });
  };

  return (
    <section id="categories" className="py-16 bg-white">
      <div className="w-full px-6 md:px-12">
        {/* Tabs */}
        <div className="flex justify-center gap-12 mb-10 border-b border-gray-200">
          {["men", "women"].map((s) => (
            <button
              key={s}
              onClick={() => setActiveSection(s)}
              className={`pb-4 text-2xl font-bold uppercase tracking-widest transition-all border-b-2 -mb-px ${
                activeSection === s
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-300 hover:text-gray-600"
              }`}
            >
              {s === "men" ? "MEN" : "WOMEN"}
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md hover:bg-gray-50 text-gray-900 rounded-full w-12 h-12 flex items-center justify-center text-2xl -ml-2 transition-all"
          >‹</button>

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filtered.length === 0
              ? [1,2,3,4,5].map((i) => (
                  <div key={i} className="flex-shrink-0 w-72 h-[480px] bg-gray-100 animate-pulse" />
                ))
              : filtered.map((cat) => (
                  <Link
                    key={cat._id}
                    href={`/category/${cat.slug.current}`}
                    className="flex-shrink-0 w-72 group relative overflow-hidden cursor-pointer"
                  >
                    {cat.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-[480px] bg-gray-100 flex items-center justify-center">
                        <span className="text-6xl">🛍️</span>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-white py-3 px-4">
                      <p className="font-semibold text-gray-900 text-base tracking-widest uppercase">{cat.title}</p>
                    </div>
                  </Link>
                ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md hover:bg-gray-50 text-gray-900 rounded-full w-12 h-12 flex items-center justify-center text-2xl -mr-2 transition-all"
          >›</button>
        </div>
      </div>
    </section>
  );
}
