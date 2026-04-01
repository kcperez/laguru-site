"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";

interface WallMessage {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

const COLORS = [
  "#FF6B9D", "#C084FC", "#67E8F9", "#FDE047",
  "#A78BFA", "#FB923C", "#4ADE80", "#F472B6",
  "#E879F9", "#FFFFFF", "#38BDF8", "#FF5555",
];

const SIZES = ["text-sm", "text-base", "text-lg", "text-xl", "text-2xl"];

const FONTS = [
  "'Permanent Marker', cursive",
  "'Rock Salt', cursive",
  "'Rubik Spray Paint', system-ui",
  "'Bungee Shade', cursive",
  "'UnifrakturCook', cursive",
];

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function GraffitiWall() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [messages, setMessages] = useState<WallMessage[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch("/api/wall");
      const data = await res.json();
      setMessages(data.messages || []);
    } catch {
      // silently fail
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !message) return;

    const lastPost = sessionStorage.getItem("wall-last-post");
    if (lastPost && Date.now() - parseInt(lastPost) < 60000) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/wall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("");
        sessionStorage.setItem("wall-last-post", Date.now().toString());
        fetchMessages();
        setTimeout(() => setStatus("idle"), 2000);
      } else {
        const data = await res.json();
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Try again.");
    }
  }

  return (
    <section ref={ref} className="relative py-28 px-6 overflow-hidden">
      <motion.div
        className="relative z-10 max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-3 mb-10">
          <span className="w-6 h-px bg-[var(--hot-pink)]" />
          <span className="text-[9px] font-bold tracking-[4px] uppercase text-[var(--hot-pink)]">
            The Wall
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 chrome-text">
          Leave Your Mark
        </h2>
        <p className="text-white/40 text-sm font-light mb-10 max-w-md leading-relaxed">
          Tag the wall. Say what you feel. 140 characters, no filter.
        </p>

        {/* Graffiti wall display */}
        <div className="relative min-h-[400px] sm:min-h-[500px] p-6 mb-10 overflow-hidden" style={{
          background: "linear-gradient(180deg, #0d0d0d 0%, #141414 50%, #0a0a0a 100%)",
          boxShadow: "inset 0 0 80px rgba(0,0,0,0.8)",
        }}>
          {/* Brick texture */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
              backgroundSize: "60px 30px",
            }}
          />
          {/* Grime overlay */}
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: "128px 128px",
            }}
          />

          {messages.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white/15 text-sm tracking-[3px] uppercase">
                Be the first to tag the wall
              </p>
            </div>
          ) : (
            <div className="relative min-h-[370px] sm:min-h-[470px]">
              {messages.map((msg, i) => {
                const seed = parseInt(msg.id, 10) || i + 1;
                const x = seededRandom(seed * 1) * 70;
                const y = seededRandom(seed * 2) * 80;
                const rotation = (seededRandom(seed * 3) - 0.5) * 30;
                const color = COLORS[Math.floor(seededRandom(seed * 4) * COLORS.length)];
                const size = SIZES[Math.floor(seededRandom(seed * 5) * SIZES.length)];
                const font = FONTS[Math.floor(seededRandom(seed * 6) * FONTS.length)];
                const skew = (seededRandom(seed * 7) - 0.5) * 8;

                return (
                  <motion.div
                    key={msg.id}
                    className={`absolute ${size} font-black uppercase`}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: `rotate(${rotation}deg) skewX(${skew}deg)`,
                      color,
                      fontFamily: font,
                      maxWidth: "220px",
                      textShadow: `0 0 10px ${color}40, 0 2px 4px rgba(0,0,0,0.8)`,
                      WebkitTextStroke: seededRandom(seed * 8) > 0.7 ? `1px ${color}` : "none",
                      paintOrder: "stroke fill",
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <p className="leading-tight">{msg.message}</p>
                    <p className="text-[7px] tracking-[2px] normal-case opacity-40 mt-1" style={{ fontFamily: "system-ui", WebkitTextStroke: "none" }}>
                      — {msg.name}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Submit form */}
        <form onSubmit={handleSubmit} className="max-w-md">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={30}
              className="y2k-input !py-3 !text-[12px]"
            />
            <input
              type="text"
              placeholder="Leave your mark..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              maxLength={140}
              className="y2k-input !py-3 !text-[12px]"
            />
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={status === "loading"}
                className="y2k-btn-solid !py-3 !px-8 text-[9px]"
              >
                {status === "loading" ? "..." : status === "success" ? "Tagged ✦" : "Tag It"}
              </button>
              <span className="text-white/20 text-[10px]">
                {message.length}/140
              </span>
            </div>
          </div>
          {status === "error" && (
            <p className="text-[var(--hot-pink)] text-xs mt-3">
              {errorMsg || "Wait a minute before posting again."}
            </p>
          )}
        </form>
      </motion.div>
    </section>
  );
}
