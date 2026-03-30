"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, FormEvent } from "react";
import Image from "next/image";

const PEREKE_URL = "https://open.spotify.com/album/57aYYku5FSWOVJjQKUsPmn";

const streamingPlatforms = [
  { name: "Spotify", url: "https://open.spotify.com/artist/5t4bsXVxbRW0nxuCPuNuxz" },
  { name: "Apple Music", url: "https://music.apple.com/us/artist/la-guru/1498668188" },
  { name: "YouTube Music", url: "https://music.youtube.com/channel/UCFpzmrdLpLiBMUwgyN6RZfg" },
  { name: "Tidal", url: "https://tidal.com/browse/search?q=la+guru" },
  { name: "Amazon Music", url: "https://music.amazon.com/search/la+guru" },
  { name: "Deezer", url: "https://www.deezer.com/search/la%20guru" },
];

const recentSingles = [
  "NUMEN", "CAYÓ LA LEY", "GEOMETRÍA", "POLVO ESTELAR",
  "ColdS3x", "SDLM", "YAYA",
];

export default function MusicSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showPlatforms, setShowPlatforms] = useState(false);
  const [albumEmail, setAlbumEmail] = useState("");
  const [albumStatus, setAlbumStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleAlbumSubscribe(e: FormEvent) {
    e.preventDefault();
    if (!albumEmail) return;
    setAlbumStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Album Subscriber", email: albumEmail, source: "album" }),
      });
      if (res.ok) {
        setAlbumStatus("success");
        setAlbumEmail("");
      } else {
        setAlbumStatus("error");
      }
    } catch {
      setAlbumStatus("error");
    }
  }

  return (
    <section id="music" ref={ref} className="relative py-28 px-6 overflow-hidden">
      <motion.div
        className="relative z-10 max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-3 mb-10">
          <span className="w-6 h-px bg-[var(--hot-pink)]" />
          <span className="text-[9px] font-bold tracking-[4px] uppercase text-[var(--hot-pink)]">
            Music
          </span>
        </div>

        {/* Featured release: PEREKE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-20">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <a href={PEREKE_URL} target="_blank" rel="noopener noreferrer" className="block relative aspect-square overflow-hidden group y2k-img-glow">
              <Image
                src="/images/pereke-single.jpg"
                alt="PEREKE by La Guru"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 chrome-border" />
            </a>
            {/* NEW badge */}
            <div className="absolute -top-3 -right-3 bg-[var(--hot-pink)] px-4 py-1.5">
              <span className="text-[9px] font-bold tracking-[3px] uppercase text-white">
                New Single
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p className="text-[9px] font-bold tracking-[4px] uppercase text-white/30 mb-2">
              Latest Release
            </p>
            <h2 className="text-5xl sm:text-6xl font-bold text-white mb-2 chrome-text">
              PEREKE
            </h2>
            <p className="text-white/30 text-sm mb-6">
              Produced by KND, DJ Maff & La Guru
            </p>
            <p className="text-white/45 text-[15px] font-light leading-[1.8] mb-8">
              The first taste of what&apos;s coming. PEREKE is La Guru at
              her most raw. Gritty, rhythmic, impossible to sit still to.
              This is just the beginning.
            </p>

            {/* Embedded Spotify player */}
            <div className="mb-8">
              <iframe
                style={{ borderRadius: 0, border: "1px solid rgba(255,255,255,0.06)" }}
                src="https://open.spotify.com/embed/album/57aYYku5FSWOVJjQKUsPmn?utm_source=generator&theme=0"
                width="100%"
                height="80"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>

            {/* Listen button with expandable platforms */}
            <div className="relative">
              <button
                onClick={() => setShowPlatforms(!showPlatforms)}
                className="y2k-btn-solid !inline-flex items-center gap-3"
              >
                <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Listen On&hellip;</span>
                <svg
                  className={`w-2.5 h-2.5 shrink-0 transition-transform duration-300 ${showPlatforms ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {showPlatforms && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-4">
                      {streamingPlatforms.map((p) => (
                        <a
                          key={p.name}
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="y2k-pill text-center text-[10px]"
                        >
                          {p.name}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* ── Past Releases ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-10">
            <span className="w-6 h-px bg-white/10" />
            <span className="text-[9px] font-bold tracking-[4px] uppercase text-white/30">
              From the Catalog
            </span>
          </div>

          {/* GURUNDANGA */}
          <div className="border border-white/[0.06] p-6 sm:p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-[9px] font-bold tracking-[3px] uppercase text-white/30 mb-2">
                  Debut Album &middot; 2022
                </p>
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-3 chrome-text">
                  GURUNDANGA
                </h3>
                <p className="text-white/40 text-sm font-light leading-relaxed mb-4">
                  11 tracks. The album that started it all. Latin hip-hop,
                  R&B, and salsa fused into something only she could make.
                </p>
                <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.08] px-4 py-2">
                  <span className="text-[var(--hot-pink)] text-[8px]">&#10022;</span>
                  <span className="text-[10px] font-bold tracking-[2px] uppercase text-[var(--hot-pink)]">
                    Perra Melancólica &mdash; 13M+ Streams
                  </span>
                </div>
              </div>
              <div>
                <iframe
                  style={{ borderRadius: 0, border: "1px solid rgba(255,255,255,0.06)" }}
                  src="https://open.spotify.com/embed/album/6w2Fmjyrv5Vhs6ll216FQA?utm_source=generator&theme=0"
                  width="100%"
                  height="80"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Recent Singles */}
          <div className="mb-8">
            <p className="text-[9px] font-bold tracking-[3px] uppercase text-white/20 mb-4">
              Recent Singles
            </p>
            <div className="flex flex-wrap gap-2">
              {recentSingles.map((title) => (
                <a
                  key={title}
                  href="https://open.spotify.com/artist/5t4bsXVxbRW0nxuCPuNuxz/discography"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="y2k-pill text-[10px]"
                >
                  {title}
                </a>
              ))}
            </div>
          </div>

          {/* Full discography link */}
          <a
            href="https://open.spotify.com/artist/5t4bsXVxbRW0nxuCPuNuxz/discography"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/30 text-[11px] font-bold tracking-[2px] uppercase hover:text-[var(--hot-pink)] transition-colors"
          >
            View Full Discography
            <span>&#8599;</span>
          </a>
        </motion.div>

        {/* Divider */}
        <div className="my-16">
          <div className="y2k-divider">
            <span className="text-[var(--hot-pink)] text-[8px] opacity-60">&#10022;</span>
          </div>
        </div>

        {/* Album teaser */}
        <motion.div
          className="relative border border-white/[0.06] overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-[3/4] md:aspect-auto md:min-h-[360px]">
              <Image
                src="/images/laguru-silhouette.jpg"
                alt="La Guru — Agitese Bien Antes de Usar"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/80" />
            </div>

            {/* Text */}
            <div className="relative p-8 sm:p-12 flex flex-col justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--hot-pink)]/[0.03] to-transparent pointer-events-none" />
              <div className="relative z-10">
                <span className="text-[9px] font-bold tracking-[4px] uppercase text-[var(--hot-pink)] mb-3 block">
                  Coming May 2026
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  Agitese Bien Antes de Usar
                </h3>
                <p className="text-white/40 text-sm font-light max-w-lg leading-relaxed mb-6">
                  &ldquo;Shake well before use.&rdquo; The debut album. 13 years
                  of everything she&apos;s lived, felt, and fought for. Latin
                  hip-hop, R&B, and salsa fused into something only she could make.
                </p>

                {albumStatus === "success" ? (
                  <p className="text-[var(--hot-pink)] text-[11px] font-bold tracking-[2px] uppercase">
                    &#10022; You&apos;re in. We&apos;ll let you know when it drops.
                  </p>
                ) : (
                  <form onSubmit={handleAlbumSubscribe} className="flex gap-2 max-w-sm">
                    <input
                      type="email"
                      required
                      placeholder="Your email"
                      value={albumEmail}
                      onChange={(e) => setAlbumEmail(e.target.value)}
                      className="y2k-input flex-1 !py-3 !text-[11px]"
                    />
                    <button
                      type="submit"
                      disabled={albumStatus === "loading"}
                      className="y2k-btn-solid !py-3 !px-6 text-[9px] whitespace-nowrap"
                    >
                      {albumStatus === "loading" ? "..." : "Notify Me"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
