import { Lines } from "@/app/(coming-soon)/coming-soon";
import { ComingSoonHeader } from "@/app/(coming-soon)/header";
import { appConfig } from "@/app-config";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative bg-gradient-to-b dark:from-slate-900 dark:to-slate-800 from-green-200 to-blue-100 shadow-md">
      <Lines />
      {appConfig.mode === "comingSoon" && <ComingSoonHeader />}
      <div className="relative z-20 mx-auto container prose dark:prose-invert py-12 ">
        {children}
      </div>
    </div>
  );
}
