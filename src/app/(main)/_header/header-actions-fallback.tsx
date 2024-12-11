"use client";

import { Loader2Icon } from "lucide-react";

export function HeaderActionsFallback() {
  return (
    <div className="flex items-center justify-center w-40">
      <Loader2Icon className="animate-spin w-4 h-4" />
    </div>
  );
}
