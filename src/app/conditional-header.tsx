"use client";

import { BookIcon, RocketIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { LogOut, Settings2Icon } from "lucide-react";

import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { Session } from "next-auth";
import Link from "next/link";
import { applicationName } from "@/app-config";
import { Button } from "@/components/ui/button";

export function ConditionalHeader({
  session,
}: {
  isPremium: boolean;
  session: Session | null;
}) {
  const path = usePathname();
  const isDashboard =
    path.startsWith("/dashboard") || path.startsWith("/purchases");
  const isSignedIn = !!session;

  return (
    <div className="border-b py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-8 items-center">
          <Link href="/" className="flex gap-2 items-center text-xl">
            <Image
              className="rounded w-8 h-8"
              width="50"
              height="50"
              src="/group.jpeg"
              alt="hero image"
            />
            {applicationName}
          </Link>

          {isDashboard && (
            <div className="flex items-center gap-2">
              <Button
                variant={"link"}
                asChild
                className="flex items-center justify-center gap-2"
              >
                <Link href={"/docs"}>
                  <BookIcon className="w-4 h-4" /> Documentation
                </Link>
              </Button>

              <Button
                variant={"link"}
                asChild
                className="flex items-center justify-center gap-2"
              >
                <Link href={"/purchases"}>
                  <RocketIcon className="w-4 h-4" /> Dashboard
                </Link>
              </Button>
            </div>
          )}

          {!isDashboard && (
            <div>
              <Button variant={"link"} asChild>
                <Link href="/#features">Features</Link>
              </Button>

              <Button variant={"link"} asChild>
                <Link href="/#pricing">Pricing</Link>
              </Button>
            </div>
          )}
        </div>

        <div className="flex justify-between gap-4">
          {isSignedIn ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={session?.user?.image || undefined} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link
                      href="/dashboard/settings"
                      className="flex gap-2 items-center"
                    >
                      <Settings2Icon className="w-4 h-4" /> Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/api/auth/signout?callbackUrl=/"
                      className="flex gap-2 items-center"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button asChild variant="secondary">
                <Link href="/api/auth/signin/google">Sign In</Link>
              </Button>
            </>
          )}

          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
