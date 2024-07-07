"use client";

import { Button } from "@/components/ui/button";
import useMediaQuery from "@/hooks/use-media-query";
import { BookIcon, SearchIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function HeaderLinks({ isAuthenticated }: { isAuthenticated: boolean }) {
  const path = usePathname();
  const { isMobile } = useMediaQuery();
  const isLandingPage = path === "/";

  if (isMobile) return null;

  return (
    <>
      {!isLandingPage && isAuthenticated && (
        <div className="flex items-center gap-2">
          <Button
            variant={"link"}
            asChild
            className="flex items-center justify-center gap-2"
          >
            <Link href={"/dashboard"}>
              <UsersIcon className="w-4 h-4" /> Your Groups
            </Link>
          </Button>

          <Button
            variant={"link"}
            asChild
            className="flex items-center justify-center gap-2"
          >
            <Link href={"/browse"}>
              <SearchIcon className="w-4 h-4" /> Browse Groups
            </Link>
          </Button>

          <Button
            variant={"link"}
            asChild
            className="flex items-center justify-center gap-2"
          >
            <Link href={"/docs"}>
              <BookIcon className="w-4 h-4" /> API Docs
            </Link>
          </Button>
        </div>
      )}

      {(isLandingPage || !isAuthenticated) && (
        <div className="flex gap-4">
          <Button variant={"link"} asChild>
            <Link href="/#features">Features</Link>
          </Button>

          <Button variant={"link"} asChild>
            <Link href="/#pricing">Pricing</Link>
          </Button>

          <Button variant={"link"} asChild>
            <Link href={"/browse"}>Browse Groups</Link>
          </Button>
        </div>
      )}
    </>
  );
}
