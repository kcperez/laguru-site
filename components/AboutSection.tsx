"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="relative py-28 px-6 overflow-hidden">
      {/* Faint grid */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        className="relative z-10 max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 items-center">
          {/* Images */}
          <motion.div
            className="md:col-span-5 md:col-start-1 relative"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-[3/4] overflow-hidden y2k-img-glow">
              <Image
                src="/images/laguru-crouch-new.jpg"
                alt="La Guru"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 chrome-border" />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Pereke art overlapping */}
            <div className="absolute -bottom-6 -right-6 w-28 h-28 border border-white/15 shadow-2xl">
              <Image
                src="/images/pereke-single.jpg"
                alt="PEREKE"
                fill
                className="object-cover"
              />
            </div>

            {/* Badge */}
            <div className="absolute -top-3 -left-3 bg-black border border-white/10 px-4 py-2 flex items-center gap-2">
              <span className="text-[var(--hot-pink)] text-[8px]">&#10022;</span>
              <span className="text-[9px] font-bold tracking-[2px] uppercase text-white/60">13+ Years Independent</span>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            className="md:col-span-6 md:col-start-7 md:pl-4"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-px bg-[var(--hot-pink)]" />
              <span className="text-[9px] font-bold tracking-[4px] uppercase text-[var(--hot-pink)]">
                The Artist
              </span>
            </div>

            <h2
              className="text-5xl sm:text-6xl text-white mb-8"
              style={{ fontFamily: "'UnifrakturCook', cursive" }}
            >
              La Guru
            </h2>

            <p className="text-white/45 text-[15px] font-light leading-[1.8] mb-6">
              Born in Pereira, Colombia. Based in Miami. Over 13 years building
              her own sound, fusing Latin hip-hop, R&B, and salsa into
              something that refuses to be categorized.
            </p>

            <p className="text-white/45 text-[15px] font-light leading-[1.8] mb-8">
              She caught Karol G&apos;s attention with &ldquo;Perra
              Melancólica,&rdquo; performed during Mañana Será Bonito, and
              has worked with Maluma, Manuel Turizo, and Anitta. But the music
              was never about the co-signs. It&apos;s always been about the message.
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                { label: "130K", platform: "Instagram" },
                { label: "125K", platform: "TikTok" },
                { label: "37K", platform: "YouTube" },
                { label: "220K", platform: "Spotify Monthly Listeners" },
              ].map((stat) => (
                <span
                  key={stat.platform}
                  className="text-[9px] font-bold tracking-[2px] uppercase text-white/25 bg-white/[0.03] border border-white/[0.05] px-4 py-2"
                >
                  {stat.label} {stat.platform}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
