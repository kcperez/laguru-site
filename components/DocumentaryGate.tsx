"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SubscribeForm from "./SubscribeForm";

const STORAGE_KEY = "laguru-doc-unlocked";

export default function DocumentaryGate() {
  const [unlocked, setUnlocked] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "true") {
      setUnlocked(true);
    }
    setChecking(false);
  }, []);

  function handleUnlock() {
    localStorage.setItem(STORAGE_KEY, "true");
    setUnlocked(true);
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-5 h-5 border border-white/20 border-t-white/60 rounded-full animate-spin" />
      </div>
    );
  }

  if (unlocked) {
    return (
      <div className="min-h-screen bg-black">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-[var(--hot-pink)]" />
              <span className="text-[10px] font-bold tracking-[4px] uppercase text-[var(--hot-pink)]">
                Now Playing
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8 chrome-text">
              The Documentary
            </h1>

            {/* Video embed placeholder */}
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/[0.08] mb-8">
              <Image
                src="/images/laguru-hero.jpg"
                alt="Documentary"
                fill
                className="object-cover opacity-30"
              />
              {/* Scan lines */}
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-full bg-white/10 blur-xl"
                    style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
                  />
                  <div className="relative w-20 h-20 rounded-full border border-white/20 bg-white/[0.06] backdrop-blur-sm flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <p className="text-white/30 text-xs font-semibold tracking-[3px] uppercase mt-4">
                  Video Coming Soon
                </p>
              </div>
            </div>

            <p className="text-white/40 font-light leading-relaxed max-w-2xl text-sm">
              An intimate look behind the music, the journey, and the woman
              behind La Guru. From Pereira to Miami. Her story, unfiltered.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Registration gate
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/laguru-red.jpg"
        alt="La Guru"
        fill
        className="object-cover opacity-15"
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.7)_100%)]" />

      {/* Scan lines */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
        }}
      />

      {/* Decorative ring */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/[0.03] pointer-events-none"
        style={{ animation: "spin-slow 50s linear infinite" }}
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <motion.div
          className="max-w-md w-full text-center"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Image
            src="/logo.png"
            alt="La Guru"
            width={100}
            height={100}
            className="mx-auto mb-10 opacity-40"
            style={{ animation: "float 6s ease-in-out infinite" }}
          />

          {/* Play icon */}
          <div className="mb-8 inline-block">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full bg-[var(--hot-pink)]/10 blur-xl"
                style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
              />
              <div className="relative w-16 h-16 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-sm flex items-center justify-center">
                <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-6 h-px bg-[var(--hot-pink)]/40" />
            <span className="text-[10px] font-bold tracking-[5px] uppercase text-[var(--hot-pink)]">
              Exclusive Access
            </span>
            <span className="w-6 h-px bg-[var(--hot-pink)]/40" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            The <span className="chrome-text">Documentary</span>
          </h1>

          <p className="text-white/40 text-sm font-light mb-10 leading-relaxed">
            Register for free to get instant access.
            <br />
            Your email is your ticket.
          </p>

          <SubscribeForm
            source="documentary"
            buttonText="Watch Now"
            onSuccess={handleUnlock}
          />

          <p className="text-white/20 text-[10px] tracking-[2px] uppercase mt-8">
            No spam &bull; Unsubscribe anytime
          </p>
        </motion.div>
      </div>
    </div>
  );
}
