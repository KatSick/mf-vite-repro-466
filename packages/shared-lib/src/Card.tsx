import type { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return <div style={{ border: "1px solid #ccc", padding: 16, borderRadius: 8 }}>{children}</div>;
}
