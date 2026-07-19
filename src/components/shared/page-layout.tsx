import type { ReactNode } from "react";
import { Container } from "./container";

type Props = {
  children: ReactNode;
  className?: string;
};

export function PageLayout({ children, className = "" }: Props) {
  return (
    <main className={`flex-1 ${className}`}>
      {children}
    </main>
  );
}
