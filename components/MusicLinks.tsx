"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const platforms = [
  { name: "Spotify", url: "https://open.spotify.com/artist/5t4bsXVxbRW0nxuCPuNuxz" },
  { name: "Apple Music", url: "https://music.apple.com/us/artist/la-guru/1498668188" },
  { name: "YouTube Music", url: "https://music.youtube.com/channel/UCFpzmrdLpLiBMUwgyN6RZfg" },
  { name: "YouTube", url: "https://www.youtube.com/@lagurumusic" },
  { name: "TikTok", url: "https://www.tiktok.com/@lagurudelsabor" },
];

export default function MusicLinks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-6">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <div className="y2k-divider mb-8">
          <span className="text-[var(--hot-pink)] text-xs">&#10022;</span>
        </div>

        <p className="text-[9px] font-bold tracking-[5px] uppercase text-[var(--y2k-silver)] mb-3">
          Listen Now
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-12 chrome-text">
          Find La Guru
        </h2>

        <div className="flex flex-wrap justify-center gap-3">
          {platforms.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="y2k-pill"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              {p.name}
            </motion.a>
          ))}
        </div>

        <div className="y2k-divider mt-12">
          <span className="text-[var(--hot-pink)] text-xs">&#10022;</span>
        </div>
      </motion.div>
    </section>
  );
}
