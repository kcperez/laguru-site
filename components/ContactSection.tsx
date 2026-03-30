"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const socials = [
  { name: "Instagram", url: "https://www.instagram.com/laguru" },
  { name: "TikTok", url: "https://www.tiktok.com/@lagurudelsabor" },
  { name: "X", url: "https://x.com/lagurudelsabor" },
  { name: "Facebook", url: "https://www.facebook.com/lagurudelsabor/" },
  { name: "YouTube", url: "https://www.youtube.com/@lagurumusic" },
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={ref} className="py-28 px-6">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <div className="flex items-center gap-3 mb-10">
          <span className="w-6 h-px bg-[var(--hot-pink)]" />
          <span className="text-[9px] font-bold tracking-[4px] uppercase text-[var(--hot-pink)]">
            Contact
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Inquiries */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Get in touch.
            </h2>
            <div className="space-y-6">
              <div>
                <p className="text-[9px] font-bold tracking-[3px] uppercase text-white/30 mb-2">
                  General / Management
                </p>
                <a
                  href="mailto:info@lagurudelsabor.com"
                  className="text-white/60 text-sm font-light hover:text-[var(--hot-pink)] transition-colors"
                >
                  info@lagurudelsabor.com
                </a>
              </div>
              <div>
                <p className="text-[9px] font-bold tracking-[3px] uppercase text-white/30 mb-2">
                  Press / Media
                </p>
                <a
                  href="mailto:press@lagurudelsabor.com"
                  className="text-white/60 text-sm font-light hover:text-[var(--hot-pink)] transition-colors"
                >
                  press@lagurudelsabor.com
                </a>
              </div>
              <div>
                <p className="text-[9px] font-bold tracking-[3px] uppercase text-white/30 mb-2">
                  Booking
                </p>
                <a
                  href="mailto:booking@lagurudelsabor.com"
                  className="text-white/60 text-sm font-light hover:text-[var(--hot-pink)] transition-colors"
                >
                  booking@lagurudelsabor.com
                </a>
              </div>
            </div>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">
              Follow La Guru
            </h3>
            <div className="flex flex-col gap-4">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-3 border-b border-white/[0.04] hover:border-[var(--hot-pink)]/20 transition-colors"
                >
                  <span className="text-white/40 text-sm font-light group-hover:text-white transition-colors">
                    {s.name}
                  </span>
                  <span className="text-white/20 text-xs group-hover:text-[var(--hot-pink)] transition-colors">
                    &#8599;
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
