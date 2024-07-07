import { ModeToggle } from "@/components/mode-toggle";
import { applicationName } from "@/app-config";
import Image from "next/image";
import Link from "next/link";

export function ComingSoonHeader() {
  return (
    <div className="relative z-20 container mx-auto py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link
            href="/"
            className="hover:text-blue-100 flex gap-1 items-center"
          >
            <Image
              src="/group.jpeg"
              width="60"
              height="60"
              alt="hero image"
              className="rounded-full w-16 h-16 mr-4"
            />
            <div className="flex flex-col">
              <div className="text-xs sm:text-xl">Coming Soon...</div>
              <div className="text-lg sm:text-3xl">{applicationName}</div>
            </div>
          </Link>
        </div>

        <ModeToggle />
      </div>
    </div>
  );
}
