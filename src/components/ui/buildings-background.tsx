"use client";

/**
 * Buildings Background - Decorative silhouettes inspired by logo
 * Creates a subtle cityscape pattern in the background
 */
export function BuildingsBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/95" />

      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

      {/* Building silhouettes - bottom left */}
      <svg
        className="absolute bottom-0 left-0 w-96 h-96 opacity-[0.03] dark:opacity-[0.05]"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Tall building */}
        <rect x="50" y="100" width="60" height="300" fill="currentColor" className="text-foreground">
          <animate attributeName="opacity" values="1;0.7;1" dur="8s" repeatCount="indefinite" />
        </rect>
        <rect x="55" y="110" width="10" height="15" fill="currentColor" className="text-background" opacity="0.3" />
        <rect x="70" y="110" width="10" height="15" fill="currentColor" className="text-background" opacity="0.3" />
        <rect x="90" y="110" width="10" height="15" fill="currentColor" className="text-background" opacity="0.3" />
        <rect x="55" y="140" width="10" height="15" fill="currentColor" className="text-background" opacity="0.3" />
        <rect x="70" y="140" width="10" height="15" fill="currentColor" className="text-background" opacity="0.3" />
        <rect x="90" y="140" width="10" height="15" fill="currentColor" className="text-background" opacity="0.3" />

        {/* Medium building */}
        <rect x="120" y="200" width="50" height="200" fill="currentColor" className="text-foreground">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="10s" repeatCount="indefinite" />
        </rect>
        <rect x="125" y="210" width="8" height="12" fill="currentColor" className="text-background" opacity="0.3" />
        <rect x="137" y="210" width="8" height="12" fill="currentColor" className="text-background" opacity="0.3" />
        <rect x="155" y="210" width="8" height="12" fill="currentColor" className="text-background" opacity="0.3" />

        {/* Short building */}
        <rect x="180" y="280" width="40" height="120" fill="currentColor" className="text-foreground">
          <animate attributeName="opacity" values="1;0.8;1" dur="12s" repeatCount="indefinite" />
        </rect>
        <rect x="185" y="290" width="8" height="10" fill="currentColor" className="text-background" opacity="0.3" />
        <rect x="200" y="290" width="8" height="10" fill="currentColor" className="text-background" opacity="0.3" />

        {/* Very tall building */}
        <rect x="230" y="50" width="45" height="350" fill="currentColor" className="text-foreground">
          <animate attributeName="opacity" values="0.9;1;0.9" dur="15s" repeatCount="indefinite" />
        </rect>
        <polygon points="230,50 252.5,30 275,50" fill="currentColor" className="text-foreground" />
        <rect x="235" y="70" width="7" height="10" fill="currentColor" className="text-background" opacity="0.3" />
        <rect x="247" y="70" width="7" height="10" fill="currentColor" className="text-background" opacity="0.3" />
        <rect x="260" y="70" width="7" height="10" fill="currentColor" className="text-background" opacity="0.3" />
      </svg>

      {/* Building silhouettes - top right */}
      <svg
        className="absolute top-0 right-0 w-80 h-80 opacity-[0.02] dark:opacity-[0.04] rotate-180"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="50" y="150" width="50" height="250" fill="currentColor" className="text-foreground">
          <animate attributeName="opacity" values="1;0.8;1" dur="9s" repeatCount="indefinite" />
        </rect>
        <rect x="110" y="100" width="60" height="300" fill="currentColor" className="text-foreground">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="11s" repeatCount="indefinite" />
        </rect>
        <rect x="180" y="180" width="45" height="220" fill="currentColor" className="text-foreground">
          <animate attributeName="opacity" values="1;0.9;1" dur="13s" repeatCount="indefinite" />
        </rect>
      </svg>

      {/* Floating dots pattern */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
      </div>

      {/* Grid pattern overlay - very subtle */}
      <div
        className="absolute inset-0 opacity-[0.01] dark:opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}
