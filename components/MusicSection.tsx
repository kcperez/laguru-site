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
    d: "M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.297.228.468.043.936.064 1.405.076.12.003.236.01.355.01h12.066c.236 0 .474-.007.71-.02.564-.03 1.123-.08 1.67-.23 1.286-.352 2.3-1.07 3.022-2.204.27-.425.464-.886.58-1.376.1-.41.157-.826.197-1.244.048-.493.074-.988.087-1.484v-.078c.003-.14.003-12.022 0-12.163zM17.78 17.46c-.133.276-.322.49-.558.668a2.127 2.127 0 01-.87.396c-.284.07-.57.102-.858.102-.16 0-.32-.008-.48-.028a2.89 2.89 0 01-.716-.168 1.662 1.662 0 01-.592-.358 1.41 1.41 0 01-.376-.606 2.02 2.02 0 01-.105-.467c-.015-.2-.007-.395.035-.59.06-.27.168-.52.327-.744.185-.26.42-.465.694-.62.326-.183.677-.296 1.04-.37.248-.05.497-.086.748-.11.22-.023.44-.043.655-.086.16-.03.313-.08.452-.166a.411.411 0 00.19-.282c.02-.1.02-.197-.003-.295a.65.65 0 00-.195-.377.812.812 0 00-.368-.203c-.163-.048-.33-.065-.5-.062-.24.004-.472.044-.688.15-.227.112-.38.29-.468.53l-.002.005c-.06.145-.16.18-.258.17a.158.158 0 01-.062-.017.217.217 0 01-.092-.078.205.205 0 01-.038-.122V8.49c0-.08.035-.15.1-.2a.348.348 0 01.15-.073c.48-.12.966-.2 1.462-.192.2.004.4.022.597.063.332.07.64.195.902.413.288.24.468.544.528.913.03.188.028.376.006.565-.01.08-.027.16-.048.24v.012l-.002.008v7.44c0 .1-.016.203-.053.3a.564.564 0 01-.114.2c-.11.12-.238.197-.39.236-.098.025-.2.04-.3.042-.147.005-.29-.012-.43-.053a.57.57 0 01-.24-.133.44.44 0 01-.132-.262c-.01-.057-.008-.116.005-.173.033-.14.105-.26.21-.354zM12 22.5c-.082 0-.232-.003-.382-.01-.63-.03-1.258-.072-1.873-.204-1.238-.265-2.165-.905-2.773-2.04-.287-.536-.423-1.12-.488-1.723-.047-.44-.066-.882-.07-1.324V7.58a.54.54 0 01.003-.063c.01-.082.05-.142.126-.167a.204.204 0 01.13.003c.06.022.1.063.12.124a.42.42 0 01.02.12v3.062c.02-.017.04-.03.056-.047.24-.244.53-.392.858-.468.158-.037.32-.057.483-.065.357-.017.7.02 1.033.13.38.123.7.333.95.63.287.338.445.734.504 1.17.04.29.044.582.025.875-.025.384-.093.76-.232 1.12-.216.557-.57.998-1.06 1.343-.32.225-.67.39-1.043.504-.192.058-.387.1-.585.126-.243.03-.487.03-.73.007a2.1 2.1 0 01-.41-.082V20.1c.003.26.023.52.066.776.06.356.17.695.37.998.324.49.78.795 1.342.94.24.063.484.094.73.11.256.014.512.012.768.005.398-.012.794-.054 1.184-.138.51-.11.98-.303 1.392-.618.407-.312.71-.71.877-1.2.096-.278.148-.567.17-.86.023-.292.024-.585.01-.878V6.564c0-.19.003-.38.03-.57.04-.28.124-.546.27-.793a2.1 2.1 0 01.476-.527c.28-.23.6-.382.947-.476.24-.064.485-.098.733-.112.404-.023.805.003 1.2.073.34.06.665.162.967.326a.2.2 0 01.1.11.16.16 0 01-.006.145.186.186 0 01-.1.09.2.2 0 01-.138-.01 3.32 3.32 0 00-.648-.196 4.18 4.18 0 00-.786-.088c-.248-.003-.494.018-.735.073a1.64 1.64 0 00-.75.378 1.27 1.27 0 00-.38.66c-.04.172-.055.346-.055.522V19.14c0 .268-.013.536-.047.803-.053.41-.145.81-.31 1.19-.27.627-.68 1.12-1.243 1.48-.442.28-.926.452-1.438.55-.35.066-.704.1-1.06.12-.195.01-.396.017-.595.017z",
  },
  {
    name: "YouTube Music",
    url: "https://music.youtube.com/playlist?list=OLAK5uy_m7Sjil7Dsq5pqclFwd0t3VY2Nc2z7ZIFI",
    d: "M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228 18.228 15.432 18.228 12 15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z",
  },
  {
    name: "Tidal",
    url: "https://www.tidal.com/album/505701243",
    d: "M12.012 3.992L8.008 7.996 4.004 3.992 0 7.996l4.004 4.004L8.008 8l4.004 4 4.004-4-4.004-4.004zM12.012 12l-4.004 4.004L4.004 12 0 16.004l4.004 4.004 4.004-4.004 4.004 4.004 4.004-4.004L12.012 12zm4.004-8.008L12.012 7.996l4.004 4.004 4.004-4.004-4.004-4.004zm4.004 4.004l-4.004 4.004 4.004 4.004L24 11.996l-3.98-4.004z",
  },
  {
    name: "Amazon Music",
    url: "https://music.amazon.com/albums/B0GRX82Y6W",
    d: "M17.77 10.848c-.238-.143-.495-.238-.767-.286-.272-.047-.557-.071-.857-.071-.414 0-.766.095-1.057.286-.29.19-.438.476-.438.857 0 .333.138.586.414.762.276.176.643.324 1.1.443.358.095.705.2 1.043.314.338.114.638.262.9.443.262.181.471.41.629.686.157.276.238.619.238 1.029 0 .505-.105.933-.314 1.286-.21.352-.49.638-.843.857a3.454 3.454 0 01-1.2.471c-.448.1-.91.148-1.386.148-.59 0-1.162-.076-1.714-.229a4.233 4.233 0 01-1.457-.7l1.043-1.843c.286.21.6.371.943.486.343.114.695.171 1.057.171.462 0 .838-.09 1.129-.271.29-.181.433-.452.433-.814 0-.352-.152-.619-.457-.8-.305-.181-.71-.338-1.214-.471a7.666 7.666 0 01-1-.314 3.043 3.043 0 01-.843-.457 2.114 2.114 0 01-.586-.686c-.143-.276-.214-.619-.214-1.029 0-.49.1-.909.3-1.257.2-.348.467-.633.8-.857a3.51 3.51 0 011.129-.5c.424-.11.862-.167 1.314-.167.505 0 1 .067 1.486.2.486.133.919.343 1.3.629l-1.086 1.843zM20.15 18.036c-1.862 1.376-4.562 2.107-6.886 2.107-3.257 0-6.19-1.205-8.41-3.21-.174-.157-.019-.372.19-.248 2.4 1.395 5.362 2.234 8.424 2.234 2.067 0 4.338-.429 6.429-1.314.314-.138.581.205.252.43zM20.95 17.107c-.238-.305-.576-.262-.895-.124-.319.138-.533.262-.443.405.09.143.405.124.657-.048.252-.171.538-.414.681-.233z M6.862 7.5h2.314l2.2 5.743L13.576 7.5h2.314v8.357H14.09V9.614l-2.114 6.243h-1.5L8.362 9.614v6.243H6.562V7.5z",
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
