import type { ReactNode } from "react";

export function DefaultContainer({ children }: { children: ReactNode }) {
  return <main>{children}</main>;
}
