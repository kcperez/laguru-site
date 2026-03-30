"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SubscribeForm from "./SubscribeForm";

export default function EmailCaptureBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <>
      {/* Marquee — one strip, slower, not overbearing */}
      <div className="overflow-hidden bg-black py-3 border-y border-white/[0.04]">
        <div className="marquee-track">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="flex items-center whitespace-nowrap">
              <span className="text-[9px] font-bold tracking-[4px] uppercase text-white/50 mx-8">
                New Music Coming
              </span>
              <span className="y2k-star" style={{opacity: 0.8}}>&#10022;</span>
              <span className="text-[9px] font-bold tracking-[4px] uppercase text-[var(--hot-pink)] opacity-60 mx-8">
                La Guru
              </span>
              <span className="y2k-star" style={{opacity: 0.8}}>&#10022;</span>
              <span className="text-[9px] font-bold tracking-[4px] uppercase text-white/50 mx-8">
                Agítese Bien Antes de Usar
              </span>
              <span className="y2k-star" style={{opacity: 0.8}}>&#10022;</span>
            </span>
          ))}
        </div>
      </div>

      {/* Capture section */}
      <section
        ref={ref}
        className="relative py-28 px-6 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #111 0%, #0a0a0a 100%)",
        }}
      >
        {/* Decorative rings */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/[0.02] pointer-events-none"
          style={{ animation: "spin-slow 40s linear infinite" }}
        />

        <motion.div
          className="relative z-10 max-w-xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block mb-6">
            <span className="text-[9px] font-bold tracking-[5px] uppercase text-[var(--hot-pink)] bg-[var(--hot-pink)]/[0.06] px-5 py-2 border border-[var(--hot-pink)]/15">
              Exclusive
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-3 leading-tight">
            Get early access
            <br />
            <span className="chrome-text">to everything.</span>
          </h2>

          <p className="text-white/40 text-sm font-light mb-10 max-w-sm mx-auto leading-relaxed">
            Drops, unreleased content, and behind-the-scenes — straight from La Guru. No spam, ever.
          </p>

          <SubscribeForm source="landing" buttonText="I'm In" />
        </motion.div>
      </section>
    </>
  );
}
