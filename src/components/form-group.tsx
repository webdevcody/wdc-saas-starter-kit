import { ReactNode } from "react";

export function FormGroup({ children }: { children: ReactNode }) {
  return <div className="space-y-3">{children}</div>;
}
