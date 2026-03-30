"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SubscribeForm from "./SubscribeForm";

const DISMISSED_KEY = "laguru-popup-dismissed";

export default function EmailPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISSED_KEY)) return;
    const timer = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  function handleClose() {
    setShow(false);
    sessionStorage.setItem(DISMISSED_KEY, "true");
  }

  function handleSuccess() {
    setTimeout(() => {
      setShow(false);
      sessionStorage.setItem(DISMISSED_KEY, "true");
    }, 2000);
  }

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[201] flex items-center justify-center px-6 pointer-events-none"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="relative w-full max-w-md pointer-events-auto overflow-hidden bg-black border border-white/10">
              {/* Close */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>

              {/* Accent band */}
              <div className="h-1 w-full bg-gradient-to-r from-[var(--hot-pink)] via-[var(--y2k-lilac)] to-[var(--hot-pink)]" />

              <div className="p-8 pt-10 text-center">
                <Image
                  src="/logo.png"
                  alt="La Guru"
                  width={160}
                  height={160}
                  className="mx-auto mb-6 opacity-80"
                />

                <h2 className="text-2xl font-bold text-white mb-2">
                  Don&apos;t miss what&apos;s next
                </h2>
                <p className="text-white/40 text-sm font-light mb-8 max-w-xs mx-auto leading-relaxed">
                  New drops, unreleased content, and exclusive access.
                  Straight to your inbox.
                </p>

                <SubscribeForm
                  source="landing"
                  buttonText="I'm In"
                  onSuccess={handleSuccess}
                />

                <button
                  onClick={handleClose}
                  className="mt-6 text-white/20 text-[10px] font-bold tracking-[2px] uppercase hover:text-white/40 transition-colors"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
