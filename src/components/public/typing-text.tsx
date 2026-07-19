"use client";

import { useState, useEffect } from "react";

type Props = {
  text: string;
  speed?: number;
  className?: string;
  cursor?: boolean;
  onComplete?: () => void;
};

export function TypingText({
  text,
  speed = 40,
  className = "",
  cursor = true,
  onComplete,
}: Props) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      setDisplayed(text.slice(0, idx));
      if (idx >= text.length) {
        clearInterval(interval);
        setDone(true);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return (
    <span className={`inline-grid ${className}`}>
      {/* Hidden full text reserves space — no layout shift */}
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {text}
      </span>
      <span className="col-start-1 row-start-1">
        {displayed}
        {cursor && !done && (
          <span className="inline-block w-[2px] h-[1em] bg-accent ml-0.5 align-middle animate-pulse" />
        )}
      </span>
    </span>
  );
}
