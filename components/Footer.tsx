import Image from "next/image";

const socials = [
  {
    name: "Instagram",
    url: "https://instagram.com/laguru",
    d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    name: "TikTok",
    url: "https://tiktok.com/@lagurumusic",
    d: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 3.44.01 6.88-.02 10.32-.12 1.72-.75 3.41-1.84 4.75-1.8 2.24-4.63 3.58-7.49 3.63-1.73.04-3.45-.46-4.9-1.42-2.41-1.56-4-4.21-4.2-7.02-.02-.46-.02-.93 0-1.39.18-2.48 1.27-4.81 3.12-6.4 2.09-1.83 5.01-2.68 7.71-2.1.02 1.47-.04 2.94-.09 4.41-1.28-.49-2.78-.2-3.79.57-1.27 1.06-1.69 2.98-1.01 4.47.59 1.39 2.07 2.31 3.57 2.29 1.01-.02 2.03-.4 2.73-.96.47-.39.78-.95.94-1.55.14-1.21.06-2.43.07-3.65.02-5.41-.01-10.81.02-16.21z",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/channel/UCwM_itSIcn2arcJmOU-R3LQ",
    d: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/lagurudelsabor/",
    d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
];

export default function Footer() {
  return (
    <footer className="py-20 px-6 border-t border-white/[0.04]">
      <div className="max-w-2xl mx-auto text-center">
        <Image
          src="/logo.png"
          alt="La Guru"
          width={120}
          height={120}
          className="mx-auto mb-6 opacity-60"
        />

        {/* Social icons */}
        <div className="flex items-center justify-center gap-4 mb-6">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/20 hover:text-[var(--hot-pink)] transition-colors duration-300"
              title={s.name}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d={s.d} />
              </svg>
            </a>
          ))}
        </div>

        <div className="y2k-divider mb-6">
          <span className="text-[var(--hot-pink)] text-[8px] opacity-60">&#10022;</span>
        </div>
        <p className="text-white/30 text-[10px] font-semibold tracking-[3px] uppercase mb-2">
          &copy; {new Date().getFullYear()} La Guru. All rights reserved.
        </p>
        <a
          href="https://www.lagurumusic.com"
          className="text-white/20 text-[9px] font-light tracking-[2px] uppercase hover:text-[var(--hot-pink)] transition-colors"
        >
          lagurumusic.com
        </a>
      </div>
    </footer>
  );
}
