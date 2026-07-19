"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  fullName: string;
  src: string;
  variant: "hero" | "sidebar";
};

export function ProfileAvatar({ fullName, src, variant }: Props) {
  const [error, setError] = useState(false);

  const initials = fullName
    ? fullName.split(" ").map((p) => p[0]).slice(0, 2).join("")
    : "?";

  if (error) {
    return (
      <div className="flex size-full items-center justify-center font-mono font-extrabold tracking-tighter text-accent/40">
        {initials}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={fullName}
      fill
      className="object-cover"
      sizes={variant === "hero" ? "480px" : "112px"}
      onError={() => setError(true)}
    />
  );
}
