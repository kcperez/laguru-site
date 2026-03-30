"use client";

import { motion } from "framer-motion";
import Image from "next/image";

function ChromeStar({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <div
      className={`absolute ${className}`}
      style={{ animation: `sparkle 3s ease-in-out ${delay}s infinite` }}
    >
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path
          d="M12 0L14.5 8.5L24 12L14.5 15.5L12 24L9.5 15.5L0 12L9.5 8.5Z"
          fill="url(#cs)"
        />
        <defs>
          <linearGradient id="cs" x1="0" y1="0" x2="24" y2="24">
            <stop offset="0%" stopColor="#ccc" />
            <stop offset="50%" stopColor="#fff" />
            <stop offset="100%" stopColor="#999" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-end bg-black overflow-hidden">
      {/* Artist photo — full bleed, B&W */}
      <div className="absolute inset-0">
        <Image
          src="/images/laguru-red-glasses.jpg"
          alt="La Guru"
          fill
          className="object-cover object-center grayscale"
          priority
        />
        {/* Gradient: heavy at bottom for text, light elsewhere to let photo breathe */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
      </div>

      {/* Chrome stars */}
      <ChromeStar className="w-3 h-3 top-[18%] left-[8%]" delay={0} />
      <ChromeStar className="w-4 h-4 top-[12%] right-[10%]" delay={1.2} />
      <ChromeStar className="w-2 h-2 top-[45%] right-[6%]" delay={0.6} />

      {/* Content at bottom */}
      <div className="relative z-10 w-full px-8 sm:px-10 pb-16 pt-40 md:pb-20 md:pl-[200px]">
        <div className="max-w-3xl">
          <motion.div
            className="-mb-6 overflow-hidden -ml-3 md:-ml-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: "800px" }}
          >
            <div className="w-full max-w-xl relative" style={{ aspectRatio: "3/1" }}>
              <Image
                src="/logo.png"
                alt="La Guru"
                fill
                className="object-contain object-left scale-[1.55]"
                style={{ animation: "spin-y 10s ease-in-out infinite" }}
                priority
              />
            </div>
          </motion.div>

          <motion.p
            className="text-white/60 text-sm sm:text-base font-light max-w-md leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Pereira to Miami. 13 years making music that hits different.
            Latin hip-hop, R&B, salsa, and everything in between.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a href="#music" className="y2k-btn-solid">
              Listen Now
            </a>
            <a href="#documentary" className="y2k-btn">
              Watch Documentary
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <span className="block w-px h-6 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
}
