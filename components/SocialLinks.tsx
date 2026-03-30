"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const socials = [
  { name: "Instagram", url: "https://www.instagram.com/laguru" },
  { name: "TikTok", url: "https://www.tiktok.com/@lagurudelsabor" },
  { name: "X", url: "https://x.com/lagurudelsabor" },
  { name: "Facebook", url: "https://www.facebook.com/lagurudelsabor/" },
];

export default function SocialLinks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 px-6">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="text-[9px] font-bold tracking-[5px] uppercase text-[var(--text-dim)] mb-8">
          Follow
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/25 text-[10px] font-bold tracking-[3px] uppercase hover:text-[var(--hot-pink)] transition-colors duration-300"
            >
              {s.name}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
