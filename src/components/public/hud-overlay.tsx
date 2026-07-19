"use client";

import { useRef, useEffect, useState, type ReactNode, type ElementType } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
  as?: ElementType;
  showCoordinates?: boolean;
  showScanLine?: boolean;
  label?: string;
};

export function HudOverlay({
  children,
  className = "",
  as: Tag = "div",
  showCoordinates = true,
  showScanLine = true,
  label,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el || !showCoordinates) return;
    const handle = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMousePos({
        x: Math.round(e.clientX - rect.left),
        y: Math.round(e.clientY - rect.top),
      });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [showCoordinates]);

  return (
    <Tag
      ref={ref}
      className={`relative ${showScanLine ? "overflow-hidden" : ""} ${className}`}
    >
      {showScanLine && (
        <div className="pointer-events-none absolute inset-0 z-10">
          <div className="h-px w-full animate-scan-line bg-accent/10" />
        </div>
      )}

      {showCoordinates && (
        <div className="pointer-events-none absolute bottom-2 right-3 z-10 hidden text-[10px] font-bold tracking-wider text-accent/40 md:block">
          {String(mousePos.x).padStart(4, "0")} x {String(mousePos.y).padStart(4, "0")}
        </div>
      )}

      {label && (
        <div className="pointer-events-none absolute left-3 top-3 z-10 text-[10px] font-bold tracking-widest text-accent/40">
          {label}
        </div>
      )}

      {children}
    </Tag>
  );
}
