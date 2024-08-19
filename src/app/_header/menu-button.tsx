"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookIcon, MenuIcon, SearchIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MenuButton() {
  const path = usePathname();
  const isLandingPage = path === "/";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MenuIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-2">
        {!isLandingPage && (
          <>
            <DropdownMenuItem asChild>
              <Link
                href="/dashboard"
                className="flex gap-2 items-center cursor-pointer"
              >
                <UsersIcon className="w-4 h-4" /> Your Groups
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/browse"
                className="flex gap-2 items-center cursor-pointer"
              >
                <SearchIcon className="w-4 h-4" /> Browse Groups
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/docs"
                className="flex gap-2 items-center cursor-pointer"
              >
                <BookIcon className="w-4 h-4" /> API Docs
              </Link>
            </DropdownMenuItem>
          </>
        )}
        {isLandingPage && (
          <>
            <DropdownMenuItem asChild>
              <Link
                href="/#features"
                className="flex gap-2 items-center cursor-pointer"
              >
                Features
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/#pricing"
                className="flex gap-2 items-center cursor-pointer"
              >
                Pricing
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/browse"
                className="flex gap-2 items-center cursor-pointer"
              >
                <SearchIcon className="w-4 h-4" /> Browse Groups
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
