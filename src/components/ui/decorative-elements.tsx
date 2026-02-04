"use client";

import { motion } from "framer-motion";

/**
 * Decorative accent line with gradient
 */
export function AccentLine({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent rounded-full ${className}`}
    />
  );
}

/**
 * Floating decorative element
 */
export function FloatingElement({
  delay = 0,
  duration = 20,
  className = "",
}: {
  delay?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-20, 20, -20] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={`absolute opacity-10 ${className}`}
    >
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="25" stroke="currentColor" strokeWidth="2" className="text-primary" />
        <circle cx="30" cy="30" r="15" stroke="currentColor" strokeWidth="1" className="text-primary" />
      </svg>
    </motion.div>
  );
}

/**
 * Corner accent decoration
 */
export function CornerAccent({ position = "top-left" }: { position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0 rotate-90",
    "bottom-left": "bottom-0 left-0 -rotate-90",
    "bottom-right": "bottom-0 right-0 rotate-180",
  };

  return (
    <div className={`absolute ${positionClasses[position]} w-24 h-24 opacity-20 pointer-events-none`}>
      <svg viewBox="0 0 100 100" fill="none">
        <path d="M0 0 L100 0 L100 20 L20 20 L20 100 L0 100 Z" fill="currentColor" className="text-primary" />
      </svg>
    </div>
  );
}

/**
 * Section divider with icon
 */
export function SectionDivider({ icon }: { icon?: React.ReactNode }) {
  return (
    <div className="relative flex items-center justify-center my-12">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border/50" />
      </div>
      {icon && (
        <div className="relative bg-background px-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Gradient blur blob - decorative background element
 */
export function GradientBlob({
  className = "",
  color = "primary",
}: {
  className?: string;
  color?: "primary" | "accent" | "success";
}) {
  const colorClasses = {
    primary: "bg-primary/20",
    accent: "bg-accent/20",
    success: "bg-success/20",
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className={`absolute rounded-full blur-3xl ${colorClasses[color]} ${className}`}
      style={{ filter: "blur(80px)" }}
    />
  );
}

/**
 * Animated stats number with counting effect
 */
export function AnimatedNumber({
  value,
  duration = 2,
  suffix = "",
  className = "",
}: {
  value: number;
  duration?: number;
  suffix?: string;
  className?: string;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration }}
      >
        {value}
      </motion.span>
      {suffix}
    </motion.span>
  );
}

/**
 * Pulse dot indicator
 */
export function PulseDot({ className = "" }: { className?: string }) {
  return (
    <span className={`relative flex h-3 w-3 ${className}`}>
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
    </span>
  );
}

/**
 * Card shine effect on hover
 */
export function CardShine() {
  return (
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </div>
  );
}
