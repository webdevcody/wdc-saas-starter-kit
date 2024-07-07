import { ReactNode } from "react";

export function InputError({ children }: { children: ReactNode }) {
  return <div className="text-red-400 mt-2">{children}</div>;
}
