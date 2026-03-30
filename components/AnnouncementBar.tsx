"use client";

import { useState } from "react";

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[110] bg-[var(--hot-pink)] py-2.5 px-4">
      <div className="max-w-5xl mx-auto flex items-center justify-center gap-2 relative">
        <a
          href="https://open.spotify.com/album/57aYYku5FSWOVJjQKUsPmn"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] sm:text-[11px] font-bold tracking-[3px] uppercase text-white hover:underline"
        >
          Listen to &apos;PEREKE&apos; &bull; Out Now
          <span className="ml-2 underline">HERE</span>
        </a>
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-0 text-white/60 hover:text-white transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
