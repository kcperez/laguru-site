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
  "rgba(184,154,173,0.9)",
  "rgba(168,152,184,0.9)",
  "rgba(196,196,196,0.8)",
  "rgba(255,255,255,0.6)",
  "rgba(184,154,173,0.7)",
  "rgba(200,180,200,0.8)",
];

const SIZES = ["text-xs", "text-sm", "text-base", "text-lg"];

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
        <div className="relative border border-white/[0.06] min-h-[400px] sm:min-h-[500px] p-6 mb-10 overflow-hidden">
          {/* Subtle texture */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
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
                const x = seededRandom(seed * 1) * 75;
                const y = seededRandom(seed * 2) * 85;
                const rotation = (seededRandom(seed * 3) - 0.5) * 24;
                const color = COLORS[Math.floor(seededRandom(seed * 4) * COLORS.length)];
                const size = SIZES[Math.floor(seededRandom(seed * 5) * SIZES.length)];

                return (
                  <motion.div
                    key={msg.id}
                    className={`absolute ${size} font-bold`}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: `rotate(${rotation}deg)`,
                      color,
                      maxWidth: "200px",
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <p className="leading-tight">{msg.message}</p>
                    <p className="text-[8px] tracking-[2px] uppercase opacity-50 mt-1">
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
