"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const links = [
  { label: "Music", href: "#music" },
  { label: "About", href: "#about" },
  { label: "Film", href: "#documentary" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* === HERO STATE: top-left overlay, centered items === */}
      <div
        className={`fixed left-0 top-0 z-[80] px-6 sm:px-8 pt-6 sm:pt-8 transition-opacity duration-500 pointer-events-none ${
          scrolled ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex flex-col items-center gap-4 pointer-events-auto">
          <a href="#">
            <Image
              src="/logo.png"
              alt="La Guru"
              width={70}
              height={70}
              className="opacity-60 hover:opacity-100 transition-opacity sm:w-[100px] sm:h-auto"
            />
          </a>

          <div className="hidden sm:flex flex-col items-center gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[12px] font-bold tracking-[5px] uppercase text-white/30 hover:text-[var(--hot-pink)] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* === SCROLLED: fixed top bar with logo + links === */}
      <div
        className={`fixed top-0 left-0 right-0 z-[105] transition-all duration-500 ${
          scrolled
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-black/90 backdrop-blur-md border-b border-white/[0.04] px-6 py-3 flex items-center justify-center">
          <div className="flex items-center gap-4 sm:gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[9px] sm:text-[10px] font-bold tracking-[2px] sm:tracking-[3px] uppercase text-white/30 hover:text-[var(--hot-pink)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
