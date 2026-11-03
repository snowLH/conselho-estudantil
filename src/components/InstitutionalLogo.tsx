import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark" | "compact";
  showSubtitle?: boolean;
}

export function InstitutionalLogo({
  className = "",
  variant = "dark",
  showSubtitle = true,
}: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link href="/" className={`inline-flex items-center gap-3.5 group select-none ${className}`}>
      {/* Institutional Crest SVG */}
      <div className="relative flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-civic-900 via-civic-800 to-civic-950 p-2 shadow-md border border-gold-500/30 flex items-center justify-center transition-transform group-hover:scale-[1.02]">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full text-gold-400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shield Outline */}
          <path
            d="M50 5 L88 20 V50 C88 74 50 94 50 94 C50 94 12 74 12 50 V20 L50 5 Z"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gold-400"
          />
          {/* Inner Inscribed Shield */}
          <path
            d="M50 15 L78 27 V48 C78 67 50 82 50 82 C50 82 22 67 22 48 V27 L50 15 Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
          {/* 3 Interconnected Pillars / Circles (Three High School Classes) */}
          <circle cx="38" cy="44" r="5" fill="currentColor" fillOpacity="0.85" />
          <circle cx="62" cy="44" r="5" fill="currentColor" fillOpacity="0.85" />
          <circle cx="50" cy="33" r="5" fill="currentColor" fillOpacity="0.85" />
          <path
            d="M38 44 L62 44 L50 33 Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.8"
          />
          {/* Open Book / Foundation Base */}
          <path
            d="M32 63 C38 60 46 60 50 63 C54 60 62 60 68 63 V72 C62 69 54 69 50 72 C46 69 38 69 32 72 V63 Z"
            fill="currentColor"
            fillOpacity="0.95"
          />
          {/* Torch / Flame of Civic Participation */}
          <path
            d="M50 49 C50 49 53 45 53 43 C53 41.5 51.5 40 50 40 C48.5 40 47 41.5 47 43 C47 45 50 49 50 49 Z"
            fill="#F59E0B"
          />
        </svg>
        {/* Subtle gold badge dot */}
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold-500"></span>
        </span>
      </div>

      {/* Typography Hierarchy */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span
            className={`font-bold tracking-tight text-base sm:text-lg leading-tight uppercase font-sans ${
              isLight ? "text-white" : "text-civic-900"
            }`}
          >
            Conselho Estudantil
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-gold-500/15 text-gold-700 border border-gold-500/30">
            CEEM
          </span>
        </div>
        {showSubtitle && (
          <span
            className={`text-xs tracking-wider uppercase font-medium ${
              isLight ? "text-slate-300" : "text-slate-500"
            }`}
          >
            Ensino Médio • Representação Cívica
          </span>
        )}
      </div>
    </Link>
  );
}
