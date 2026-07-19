import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "main" | "header" | "footer";
};

export function Container({ children, className = "", as: Tag = "div" }: Props) {
  return (
    <Tag className={`mx-auto w-full px-5 lg:px-8 ${className}`}
      style={{ maxWidth: "var(--content-max-width, 1600px)" }}
    >
      {children}
    </Tag>
  );
}
