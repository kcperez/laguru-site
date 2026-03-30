"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function DocumentaryTeaser() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="documentary" ref={ref} className="relative overflow-hidden">
      <div className="relative min-h-[85vh] flex items-center justify-center">
        <Image
          src="/images/laguru-documentary.jpg"
          alt="La Guru Documentary"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)]" />

        {/* Scan lines */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
          }}
        />

        <motion.div
          className="relative z-10 text-center px-6 max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Play icon */}
          <div className="mb-8 inline-block">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full bg-white/10 blur-xl"
                style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
              />
              <div className="relative w-20 h-20 border border-white/20 bg-white/[0.06] backdrop-blur-sm flex items-center justify-center">
                <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-[var(--hot-pink)]/40" />
            <span className="text-[9px] font-bold tracking-[5px] uppercase text-[var(--hot-pink)]">
              Exclusive Film
            </span>
            <span className="w-8 h-px bg-[var(--hot-pink)]/40" />
          </div>

          <h2 className="text-4xl sm:text-6xl font-bold text-white mb-4 leading-tight">
            The<br />
            <span className="chrome-text">Documentary</span>
          </h2>

          <p className="text-white/40 text-sm font-light mb-10 leading-relaxed max-w-md mx-auto">
            Behind the music. Behind the name. An exclusive look at the
            woman who built her own lane for over a decade.
            Register free to watch.
          </p>

          <Link href="/documentary" className="y2k-btn">
            Watch Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
