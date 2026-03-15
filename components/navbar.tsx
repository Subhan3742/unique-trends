"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/cart-context";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="UniqueTrends" className="h-10 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {[
            { label: "Home", href: "/" },
            { label: "Men", href: "#categories" },
            { label: "Women", href: "#categories" },
            { label: "Contact", href: "#contact" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-semibold uppercase tracking-widest text-gray-700 hover:text-gray-900 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6">
          <Link href="/cart" className="relative text-gray-700 hover:text-gray-900 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {[
            { label: "Home", href: "/" },
            { label: "Men", href: "#categories" },
            { label: "Women", href: "#categories" },
            { label: "Contact", href: "#contact" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-sm font-semibold uppercase tracking-widest text-gray-700"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
