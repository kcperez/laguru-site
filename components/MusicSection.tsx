"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, FormEvent } from "react";
import Image from "next/image";

const PEREKE_URL = "https://open.spotify.com/album/57aYYku5FSWOVJjQKUsPmn";

const streamingPlatforms = [
  {
    name: "Spotify",
    url: "https://open.spotify.com/album/57aYYku5FSWOVJjQKUsPmn",
    d: "M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z",
  },
  {
    name: "Apple Music",
    url: "https://music.apple.com/co/album/1883845307",
    d: "M18.428 13.61c-.027-2.737 2.267-4.074 2.373-4.138-1.298-1.876-3.306-2.132-4.012-2.154-1.694-.174-3.332 1.003-4.196 1.003-.878 0-2.213-.986-3.652-.957-1.862.028-3.6 1.09-4.553 2.756-1.967 3.382-.502 8.363 1.387 11.1.943 1.34 2.05 2.84 3.507 2.786 1.417-.057 1.948-.9 3.659-.9 1.697 0 2.188.9 3.665.866 1.524-.025 2.478-1.35 3.394-2.7 1.09-1.54 1.53-3.058 1.548-3.137-.034-.012-2.95-1.116-2.978-4.425h-.002zM15.622 3.805c.76-.95 1.283-2.244 1.14-3.555-1.104.047-2.476.753-3.27 1.68-.702.823-1.33 2.168-1.168 3.436 1.237.093 2.506-.626 3.298-1.56z",
  },
  {
    name: "YouTube Music",
    url: "https://music.youtube.com/playlist?list=OLAK5uy_m7Sjil7Dsq5pqclFwd0t3VY2Nc2z7ZIFI",
    d: "M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228 18.228 15.432 18.228 12 15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z",
  },
  {
    name: "Tidal",
    url: "https://www.tidal.com/album/505701243",
    d: "M4.008 8.004L0 12.012l4.008 4.008 4.008-4.008L4.008 8.004zM12.024 0l-4.008 4.008 4.008 4.008 4.008-4.008L12.024 0zm0 8.004l-4.008 4.008 4.008 4.008 4.008-4.008-4.008-4.008zm8.016 0l-4.008 4.008 4.008 4.008L24.048 12l-4.008-3.996z",
  },
  {
    name: "Amazon Music",
    url: "https://music.amazon.com/albums/B0GRX82Y6W",
    d: "M.045 18.02c.07-.116.21-.04.31.014 2.62 1.57 5.66 2.38 8.63 2.38 3.27 0 6.48-.96 9.23-2.76.18-.1.34-.21.52-.31.18-.1.36.08.2.26-1.04 1.2-2.97 2.61-4.96 3.42-2.06.84-4.27 1.26-6.37 1.26-3.24 0-6.33-.87-8.95-2.46-.31-.19-.7-.29-.61-.8zm22.49-2.1c-.23-.3-1.42-.48-2.58-.35-1.14.11-2.07.52-1.98.79.05.12.16.08.62.04.46-.04 1.67-.18 2.27.23.6.4-.15 1.79-.29 2.12-.1.26.14.12.53-.25.53-.49.88-1.56.69-2.16-.08-.24-.25-.44-.61-.73zM11.25 7.69V6.32h4.72v1.37h-1.6v5.43h-1.53V7.69h-1.59zM7.5 6.08c.62 0 1.14.12 1.56.37.42.25.73.59.94 1.02.21.43.32.92.32 1.47s-.11 1.04-.32 1.47c-.21.43-.52.77-.94 1.02-.42.25-.94.37-1.56.37s-1.14-.12-1.56-.37c-.42-.25-.73-.59-.94-1.02-.21-.43-.32-.92-.32-1.47s.11-1.04.32-1.47c.21-.43.52-.77.94-1.02.42-.25.94-.37 1.56-.37zm0 1.31c-.39 0-.69.14-.9.42-.21.28-.32.66-.32 1.13s.11.85.32 1.13c.21.28.51.42.9.42s.69-.14.9-.42c.21-.28.32-.66.32-1.13s-.11-.85-.32-1.13c-.21-.28-.51-.42-.9-.42z",
  },
  {
    name: "Deezer",
    url: "https://www.deezer.com/album/936304121",
    d: "M15.2 0h4.8v2.4h-4.8V0zm0 3.6h4.8V6h-4.8V3.6zm0 3.6h4.8v2.4h-4.8V7.2zm0 3.6h4.8v2.4h-4.8v-2.4zm0 3.6h4.8v2.4h-4.8v-2.4zm0 3.6h4.8V24h-4.8v-6zM9.6 7.2h4.8v2.4H9.6V7.2zm0 3.6h4.8v2.4H9.6v-2.4zm0 3.6h4.8v2.4H9.6v-2.4zm0 3.6h4.8V24H9.6v-6zM4 14.4h4.8v2.4H4v-2.4zm0 3.6h4.8V24H4v-6z",
  },
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
                          className="y2k-pill text-[10px] !inline-flex items-center gap-2"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 opacity-60">
                            <path d={p.d} />
                          </svg>
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
                src="/images/laguru-smoke.jpg"
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
