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
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Artist photo — full bleed, B&W, dialed back so the 3D logo dominates */}
      <div className="absolute inset-0">
        <Image
          src="/images/laguru-red-glasses.jpg"
          alt="La Guru"
          fill
          className="object-cover object-center grayscale"
          priority
        />
        {/* Lighter overlay — let more of the photo through; gradient still
            holds the bottom dark for tagline + CTA legibility */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/15" />
      </div>

      {/* Chrome stars — Y2K aesthetic kept, distributed around the centerpiece */}
      <ChromeStar className="w-3 h-3 top-[14%] left-[8%]" delay={0} />
      <ChromeStar className="w-4 h-4 top-[10%] right-[10%]" delay={1.2} />
      <ChromeStar className="w-2 h-2 top-[42%] right-[6%]" delay={0.6} />
      <ChromeStar className="w-3 h-3 bottom-[26%] left-[10%]" delay={2.0} />
      <ChromeStar className="w-2 h-2 bottom-[34%] right-[12%]" delay={0.3} />

      {/* CENTERPIECE — 3D logo takeover. Sits vertically centered, dominates the
          hero. Plays on mount, loops continuously. Source order: HEVC w/ alpha
          for Safari, WebM VP9 w/ alpha for everything else. Static PNG poster
          shows while video loads so there's no blank frame. */}
      <motion.div
        className="relative z-10 w-[80vw] max-w-[990px] flex items-center justify-center -translate-y-[7%]"
        style={{ aspectRatio: "2644 / 1923" }}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/logo.png"
          preload="auto"
          className="w-full h-full object-contain"
        >
          {/* HEVC w/ alpha — Safari only. hvc1 tag is required for Safari to recognize it. */}
          <source src="/logo-3d.mov" type='video/mp4; codecs="hvc1"' />
          {/* WebM VP9 w/ alpha — Chrome / Firefox / Edge. */}
          <source src="/logo-3d.webm" type="video/webm" />
        </video>
      </motion.div>

      {/* Tagline + CTAs — bottom-anchored so the logo owns the center.
          Staggered reveal AFTER the logo lands so the takeover plays clean. */}
      <div className="absolute bottom-12 md:bottom-16 left-0 right-0 flex flex-col items-center px-6 z-10">
        <motion.p
          className="text-white/70 text-sm sm:text-base font-light max-w-md leading-relaxed mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.6 }}
        >
          Pereira to Miami. 13 years making music that hits different.
          Latin hip-hop, R&B, salsa, and everything in between.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.9 }}
        >
          <a href="#music" className="y2k-btn-solid">
            Listen Now
          </a>
          <a href="#documentary" className="y2k-btn">
            Watch Documentary
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.4 }}
      >
        <span className="block w-px h-6 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
}
