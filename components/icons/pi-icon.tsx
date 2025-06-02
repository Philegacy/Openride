import type React from "react"

export function CarCoinLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Outer Gold Ring - Blockchain Network */}
      <circle cx="32" cy="32" r="30" fill="url(#goldGradient)" stroke="url(#goldStroke)" strokeWidth="2" />

      {/* Inner Circle - Coin Base */}
      <circle cx="32" cy="32" r="26" fill="url(#innerGold)" stroke="rgba(255, 215, 0, 0.3)" strokeWidth="1" />

      {/* Blockchain Network Nodes */}
      <g opacity="0.4">
        {/* Network nodes around the circle */}
        <circle cx="32" cy="8" r="1.5" fill="#FFD700" />
        <circle cx="50" cy="18" r="1.5" fill="#FFD700" />
        <circle cx="56" cy="32" r="1.5" fill="#FFD700" />
        <circle cx="50" cy="46" r="1.5" fill="#FFD700" />
        <circle cx="32" cy="56" r="1.5" fill="#FFD700" />
        <circle cx="14" cy="46" r="1.5" fill="#FFD700" />
        <circle cx="8" cy="32" r="1.5" fill="#FFD700" />
        <circle cx="14" cy="18" r="1.5" fill="#FFD700" />

        {/* Connection lines */}
        <path
          d="M32 8 L50 18 L56 32 L50 46 L32 56 L14 46 L8 32 L14 18 Z"
          stroke="#FFD700"
          strokeWidth="0.5"
          fill="none"
          opacity="0.6"
        />
      </g>

      {/* Car Body - Modern Design */}
      <g transform="translate(32, 32)">
        {/* Main car body */}
        <path
          d="M-12 2 L12 2 C14 2 16 4 16 6 L16 8 C16 9 15 10 14 10 L-14 10 C-15 10 -16 9 -16 8 L-16 6 C-16 4 -14 2 -12 2 Z"
          fill="url(#carBodyGradient)"
          stroke="rgba(0, 0, 0, 0.2)"
          strokeWidth="0.5"
        />

        {/* Car roof/cabin */}
        <path
          d="M-8 2 L-8 -2 C-8 -4 -6 -6 -4 -6 L4 -6 C6 -6 8 -4 8 -2 L8 2"
          fill="url(#carRoofGradient)"
          stroke="rgba(0, 0, 0, 0.2)"
          strokeWidth="0.5"
        />

        {/* Windows */}
        <rect x="-6" y="-4" width="4" height="3" rx="0.5" fill="rgba(135, 206, 250, 0.8)" />
        <rect x="-1" y="-4" width="4" height="3" rx="0.5" fill="rgba(135, 206, 250, 0.8)" />
        <rect x="4" y="-4" width="2" height="3" rx="0.5" fill="rgba(135, 206, 250, 0.8)" />

        {/* Wheels */}
        <circle cx="-8" cy="8" r="2.5" fill="url(#wheelGradient)" stroke="#333" strokeWidth="0.5" />
        <circle cx="-8" cy="8" r="1.5" fill="#666" />
        <circle cx="8" cy="8" r="2.5" fill="url(#wheelGradient)" stroke="#333" strokeWidth="0.5" />
        <circle cx="8" cy="8" r="1.5" fill="#666" />

        {/* Headlights */}
        <circle cx="14" cy="4" r="1" fill="#FFF" opacity="0.9" />
        <circle cx="14" cy="6" r="1" fill="#FFF" opacity="0.9" />

        {/* Tiny Pi Symbol on car */}
        <g transform="translate(0, -8) scale(0.3)">
          <circle cx="0" cy="0" r="3" fill="#F6C343" />
          <path d="M-1.5 -1 L1.5 -1 L1.5 -0.5 L-1.5 -0.5 Z" fill="#000" />
          <path d="M-1.5 0 L1.5 0 L1.5 0.5 L-1.5 0.5 Z" fill="#000" />
          <path d="M-1.5 1 L0.5 1 L0.5 1.5 L-1.5 1.5 Z" fill="#000" />
        </g>
      </g>

      {/* Decentralization Indicators */}
      <g opacity="0.3">
        {/* Small connecting dots */}
        <circle cx="20" cy="20" r="0.8" fill="#FFD700" />
        <circle cx="44" cy="20" r="0.8" fill="#FFD700" />
        <circle cx="44" cy="44" r="0.8" fill="#FFD700" />
        <circle cx="20" cy="44" r="0.8" fill="#FFD700" />

        {/* Connection lines to center */}
        <line x1="20" y1="20" x2="32" y2="32" stroke="#FFD700" strokeWidth="0.3" />
        <line x1="44" y1="20" x2="32" y2="32" stroke="#FFD700" strokeWidth="0.3" />
        <line x1="44" y1="44" x2="32" y2="32" stroke="#FFD700" strokeWidth="0.3" />
        <line x1="20" y1="44" x2="32" y2="32" stroke="#FFD700" strokeWidth="0.3" />
      </g>

      {/* Gradients */}
      <defs>
        <radialGradient id="goldGradient" cx="0.3" cy="0.3">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFA500" />
          <stop offset="100%" stopColor="#FF8C00" />
        </radialGradient>

        <linearGradient id="goldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFF00" />
          <stop offset="100%" stopColor="#DAA520" />
        </linearGradient>

        <radialGradient id="innerGold" cx="0.4" cy="0.4">
          <stop offset="0%" stopColor="#FFF8DC" />
          <stop offset="70%" stopColor="#F6C343" />
          <stop offset="100%" stopColor="#DAA520" />
        </radialGradient>

        <linearGradient id="carBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8E8E8" />
          <stop offset="100%" stopColor="#C0C0C0" />
        </linearGradient>

        <linearGradient id="carRoofGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0F0F0" />
          <stop offset="100%" stopColor="#D3D3D3" />
        </linearGradient>

        <radialGradient id="wheelGradient" cx="0.3" cy="0.3">
          <stop offset="0%" stopColor="#888" />
          <stop offset="100%" stopColor="#444" />
        </radialGradient>
      </defs>
    </svg>
  )
}

// Keep the original PiIcon for backward compatibility
export function PiIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="12" fill="currentColor" />
      <path d="M8 8h8v2H8V8zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" fill="black" fillOpacity="0.8" />
      <path
        d="M7 6h10c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2z"
        stroke="black"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
    </svg>
  )
}

// Legacy export for backward compatibility
export const CarWithPiLogo = CarCoinLogo
