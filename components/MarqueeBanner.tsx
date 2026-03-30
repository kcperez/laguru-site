"use client";

export default function MarqueeBanner() {
  return (
    <div className="overflow-hidden bg-black py-3 border-y border-white/[0.04]">
      <div className="marquee-track">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="text-[9px] font-bold tracking-[4px] uppercase text-white/50 mx-8">
              New Music Coming
            </span>
            <span className="y2k-star" style={{ opacity: 0.8 }}>&#10022;</span>
            <span className="text-[9px] font-bold tracking-[4px] uppercase text-[var(--hot-pink)] opacity-60 mx-8">
              La Guru
            </span>
            <span className="y2k-star" style={{ opacity: 0.8 }}>&#10022;</span>
            <span className="text-[9px] font-bold tracking-[4px] uppercase text-white/50 mx-8">
              Agitese Bien Antes de Usar
            </span>
            <span className="y2k-star" style={{ opacity: 0.8 }}>&#10022;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
