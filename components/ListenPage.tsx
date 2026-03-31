"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const platforms = [
  {
    name: "Spotify",
    url: "https://open.spotify.com/artist/5t4bsXVxbRW0nxuCPuNuxz",
    d: "M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z",
  },
  {
    name: "Apple Music",
    url: "https://music.apple.com/us/artist/la-guru/1498668188",
    d: "M18.428 13.61c-.027-2.737 2.267-4.074 2.373-4.138-1.298-1.876-3.306-2.132-4.012-2.154-1.694-.174-3.332 1.003-4.196 1.003-.878 0-2.213-.986-3.652-.957-1.862.028-3.6 1.09-4.553 2.756-1.967 3.382-.502 8.363 1.387 11.1.943 1.34 2.05 2.84 3.507 2.786 1.417-.057 1.948-.9 3.659-.9 1.697 0 2.188.9 3.665.866 1.524-.025 2.478-1.35 3.394-2.7 1.09-1.54 1.53-3.058 1.548-3.137-.034-.012-2.95-1.116-2.978-4.425h-.002zM15.622 3.805c.76-.95 1.283-2.244 1.14-3.555-1.104.047-2.476.753-3.27 1.68-.702.823-1.33 2.168-1.168 3.436 1.237.093 2.506-.626 3.298-1.56z",
  },
  {
    name: "YouTube Music",
    url: "https://music.youtube.com/channel/UCFpzmrdLpLiBMUwgyN6RZfg",
    d: "M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228 18.228 15.432 18.228 12 15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z",
  },
  {
    name: "Tidal",
    url: "https://www.tidal.com/browse/search?q=la+guru",
    d: "M4.008 8.004L0 12.012l4.008 4.008 4.008-4.008L4.008 8.004zM12.024 0l-4.008 4.008 4.008 4.008 4.008-4.008L12.024 0zm0 8.004l-4.008 4.008 4.008 4.008 4.008-4.008-4.008-4.008zm8.016 0l-4.008 4.008 4.008 4.008L24.048 12l-4.008-3.996z",
  },
  {
    name: "Amazon Music",
    url: "https://music.amazon.com/search/la+guru",
    d: "M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.929-.924-1.929-2.292 0-2.692 2.415-3.182 4.706-3.182v.685zm3.186 7.705c-.209.189-.512.2-.748.074-1.051-.872-1.24-1.276-1.816-2.106-1.736 1.77-2.969 2.3-5.219 2.3-2.667 0-4.741-1.645-4.741-4.94 0-2.573 1.397-4.325 3.387-5.183 1.724-.758 4.132-.893 5.972-1.103v-.41c0-.753.058-1.643-.383-2.294-.385-.578-1.124-.817-1.775-.817-1.205 0-2.277.618-2.54 1.897-.054.285-.261.566-.546.58l-3.063-.33c-.258-.058-.544-.266-.47-.66C5.845 1.334 9.278 0 12.347 0c1.573 0 3.627.418 4.867 1.608 1.573 1.473 1.422 3.44 1.422 5.58v5.049c0 1.518.63 2.184 1.223 3.003.209.293.255.645-.009.863-.66.553-1.836 1.58-2.483 2.156l-.223-.464zM21.13 20.3c-1.815 1.433-4.43 2.2-6.67 2.2-3.157 0-5.998-1.167-8.147-3.108-.168-.153-.019-.361.185-.243 2.32 1.35 5.19 2.163 8.152 2.163 1.998 0 4.195-.414 6.218-1.272.305-.13.56.2.262.26zM22.12 19.1c-.24-.31-1.594-.146-2.2-.074-.185.022-.213-.138-.047-.254 1.078-.756 2.848-.538 3.053-.284.206.254-.054 2.013-1.066 2.852-.156.13-.304.06-.234-.112.228-.566.735-1.82.494-2.128z",
  },
  {
    name: "Deezer",
    url: "https://www.deezer.com/search/la%20guru",
    d: "M15.2 0h4.8v2.4h-4.8V0zm0 3.6h4.8V6h-4.8V3.6zm0 3.6h4.8v2.4h-4.8V7.2zm0 3.6h4.8v2.4h-4.8v-2.4zm0 3.6h4.8v2.4h-4.8v-2.4zm0 3.6h4.8V24h-4.8v-6zM9.6 7.2h4.8v2.4H9.6V7.2zm0 3.6h4.8v2.4H9.6v-2.4zm0 3.6h4.8v2.4H9.6v-2.4zm0 3.6h4.8V24H9.6v-6zM4 14.4h4.8v2.4H4v-2.4zm0 3.6h4.8V24H4v-6z",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/channel/UCwM_itSIcn2arcJmOU-R3LQ",
    d: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

export default function ListenPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] relative overflow-hidden">
      {/* Home button */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 opacity-60 hover:opacity-100 transition-opacity"
      >
        <Image src="/logo.png" alt="La Guru — Home" width={70} height={47} />
      </Link>

      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
        <motion.div
          className="max-w-sm w-full text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Logo */}
          <div className="mb-8" style={{ perspective: "800px" }}>
            <Image
              src="/logo.png"
              alt="La Guru"
              width={200}
              height={133}
              className="mx-auto w-[180px] h-auto"
              style={{ animation: "spin-y 10s ease-in-out infinite" }}
            />
          </div>

          <p className="text-white/40 text-sm font-light mb-10 tracking-wide">
            Find La Guru on your favorite platform
          </p>

          {/* Platform links */}
          <div className="flex flex-col gap-3">
            {platforms.map((p, i) => (
              <motion.a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-4 px-6 py-4 border border-white/[0.08] border-t-white/[0.15] border-b-white/[0.04] bg-gradient-to-b from-white/[0.06] to-white/[0.02] hover:border-[var(--hot-pink)]/40 hover:from-[var(--hot-pink)]/[0.08] hover:to-[var(--hot-pink)]/[0.02] transition-all duration-300"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white/40 group-hover:text-[var(--hot-pink)] transition-colors shrink-0">
                  <path d={p.d} />
                </svg>
                <span className="text-[12px] font-bold tracking-[3px] uppercase text-white/60 group-hover:text-white transition-colors">
                  {p.name}
                </span>
                <span className="ml-auto text-white/20 group-hover:text-[var(--hot-pink)] transition-colors text-sm">
                  &#8599;
                </span>
              </motion.a>
            ))}
          </div>

          <div className="y2k-divider mt-10 mb-6">
            <span className="text-[var(--hot-pink)] text-[8px] opacity-60">&#10022;</span>
          </div>

          <Link
            href="/"
            className="text-white/20 text-[10px] font-bold tracking-[2px] uppercase hover:text-[var(--hot-pink)] transition-colors"
          >
            lagurumusic.com
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
