"use client";

import { useState } from "react";

interface SubscribeFormProps {
  source: "landing" | "documentary";
  buttonText?: string;
  onSuccess?: () => void;
}

const COUNTRIES = [
  "United States", "Colombia", "Mexico", "Argentina", "Spain", "Brazil",
  "Chile", "Peru", "Ecuador", "Venezuela", "Dominican Republic", "Puerto Rico",
  "Panama", "Costa Rica", "Guatemala", "Cuba", "Bolivia", "Paraguay", "Uruguay",
  "Honduras", "El Salvador", "Nicaragua", "Canada", "United Kingdom", "France",
  "Germany", "Italy", "Portugal", "Netherlands", "Australia", "Japan", "Other",
];

export default function SubscribeForm({
  source,
  buttonText = "Sign Up",
  onSuccess,
}: SubscribeFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, country, source }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
      onSuccess?.();
    } catch {
      setErrorMsg("Something went wrong. Try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-6">
        <p className="text-lg font-bold text-white tracking-wide">You&apos;re in. &#10022;</p>
        <p className="text-sm mt-2 text-[var(--text-dim)]">
          Welcome to the inner circle.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
      <div className="flex flex-col gap-2 w-full">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="y2k-input"
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="y2k-input"
        />
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          className="y2k-input appearance-none"
        >
          <option value="" disabled>Country</option>
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button
          type="submit"
          disabled={status === "loading"}
          className="y2k-btn-solid w-full mt-1 disabled:opacity-50"
        >
          {status === "loading" ? "..." : buttonText}
        </button>
      </div>
      {status === "error" && (
        <p className="text-[var(--hot-pink)] text-xs mt-3 text-center">{errorMsg}</p>
      )}
    </form>
  );
}
