import { useState } from "react";
import { Badge } from "@repro/design-system";

export function Button({ label }: { label: string }) {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount((c) => c + 1)}>
      <Badge text={String(count)} /> {label}
    </button>
  );
}
