import Image from "next/image";

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
        <div className="y2k-divider mb-6">
          <span className="text-[var(--hot-pink)] text-[8px] opacity-60">&#10022;</span>
        </div>
        <p className="text-white/30 text-[10px] font-semibold tracking-[3px] uppercase mb-2">
          &copy; {new Date().getFullYear()} La Guru. All rights reserved.
        </p>
        <a
          href="https://www.lagurudelsabor.com"
          className="text-white/20 text-[9px] font-light tracking-[2px] uppercase hover:text-[var(--hot-pink)] transition-colors"
        >
          lagurudelsabor.com
        </a>
      </div>
    </footer>
  );
}
