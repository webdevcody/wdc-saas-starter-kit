import { DocsLayout } from "fumadocs-ui/layout";
import type { ReactNode } from "react";
import { pageTree } from "@/app/source";

export default function RootDocsLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={pageTree} nav={{ title: "Group Finder" }}>
      {children}
    </DocsLayout>
  );
}
