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
    d: "M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.929-.924-1.929-2.292 0-2.692 2.415-3.182 4.706-3.182v.685zm3.186 7.705c-.209.189-.512.2-.748.074-1.051-.872-1.24-1.276-1.816-2.106-1.736 1.77-2.969 2.3-5.219 2.3-2.667 0-4.741-1.645-4.741-4.94 0-2.573 1.397-4.325 3.387-5.183 1.724-.758 4.132-.893 5.972-1.103v-.41c0-.753.058-1.643-.383-2.294-.385-.578-1.124-.817-1.775-.817-1.205 0-2.277.618-2.54 1.897-.054.285-.261.566-.546.58l-3.063-.33c-.258-.058-.544-.266-.47-.66C5.845 1.334 9.278 0 12.347 0c1.573 0 3.627.418 4.867 1.608 1.573 1.473 1.422 3.44 1.422 5.58v5.049c0 1.518.63 2.184 1.223 3.003.209.293.255.645-.009.863-.66.553-1.836 1.58-2.483 2.156l-.223-.464zM21.13 20.3c-1.815 1.433-4.43 2.2-6.67 2.2-3.157 0-5.998-1.167-8.147-3.108-.168-.153-.019-.361.185-.243 2.32 1.35 5.19 2.163 8.152 2.163 1.998 0 4.195-.414 6.218-1.272.305-.13.56.2.262.26zM22.12 19.1c-.24-.31-1.594-.146-2.2-.074-.185.022-.213-.138-.047-.254 1.078-.756 2.848-.538 3.053-.284.206.254-.054 2.013-1.066 2.852-.156.13-.304.06-.234-.112.228-.566.735-1.82.494-2.128z",
  },
  {
    name: "Deezer",
    url: "https://www.deezer.com/album/936304121",
    d: "M15.2 0h4.8v2.4h-4.8V0zm0 3.6h4.8V6h-4.8V3.6zm0 3.6h4.8v2.4h-4.8V7.2zm0 3.6h4.8v2.4h-4.8v-2.4zm0 3.6h4.8v2.4h-4.8v-2.4zm0 3.6h4.8V24h-4.8v-6zM9.6 7.2h4.8v2.4H9.6V7.2zm0 3.6h4.8v2.4H9.6v-2.4zm0 3.6h4.8v2.4H9.6v-2.4zm0 3.6h4.8V24H9.6v-6zM4 14.4h4.8v2.4H4v-2.4zm0 3.6h4.8V24H4v-6z",
  },
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
                style={{ borderRadius: 0, border: "none" }}
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

          {/* Perra Melancólica — hero track */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-12">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <div className="relative aspect-square overflow-hidden y2k-img-glow">
                <Image
                  src="/images/laguru-red-glasses.jpg"
                  alt="La Guru — Perra Melancólica"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="absolute -top-3 -right-3 bg-[var(--hot-pink)] px-4 py-1.5">
                <span className="text-[9px] font-bold tracking-[3px] uppercase text-white">
                  13M+ Streams
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <p className="text-[9px] font-bold tracking-[3px] uppercase text-white/30 mb-2">
                Fan Favorite
              </p>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2 chrome-text whitespace-nowrap">
                Perra Melancólica
              </h3>
              <p className="text-white/30 text-sm font-light mb-4">
                From the album <span className="text-white/50 font-medium">GURUNDANGA</span> &middot; 2022
              </p>
              <iframe
                style={{ borderRadius: 0, border: "none" }}
                src="https://open.spotify.com/embed/track/1oz56HcDz9gNaN659hDg3Z?utm_source=generator&theme=0"
                width="100%"
                height="80"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />

              <p className="text-[9px] font-bold tracking-[3px] uppercase text-white/20 mt-6 mb-3">
                Full Album
              </p>
              <iframe
                style={{ borderRadius: 0, border: "none" }}
                src="https://open.spotify.com/embed/album/6w2Fmjyrv5Vhs6ll216FQA?utm_source=generator&theme=0"
                width="100%"
                height="352"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </motion.div>
          </div>

          {/* More Music */}
          <div className="mb-8 max-w-2xl">
            <p className="text-[9px] font-bold tracking-[3px] uppercase text-white/20 mb-4">
              More Music
            </p>
            <iframe
              src="https://www.youtube.com/embed/videoseries?list=PLX7LGyzfnnww6jjmYX7FzF-70Y-de-5W_&theme=dark"
              width="100%"
              height="300"
              allowFullScreen
              allow="autoplay; encrypted-media"
              style={{ border: "none" }}
              loading="lazy"
            />
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
