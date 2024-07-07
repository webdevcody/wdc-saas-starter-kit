import { Lines } from "@/app/(coming-soon)/coming-soon";
import {
  DiscordIcon,
  GithubIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/icons";
import Link from "next/link";

export function ComingSoonFooter() {
  return (
    <section className="relative py-12 bg-gradient-to-b dark:from-slate-950 dark:to-slate-800 from-green-200 to-blue-100">
      <Lines />

      <div className="z-20 relative flex flex-col items-center gap-8 ">
        <div className="text-xl">Follow for updates!</div>

        <div className="flex justify-center gap-8">
          <Link href="https://youtube.com/@webdevcody" target="_blank">
            <YoutubeIcon className="w-10 h-10 hover:fill-slate-600 dark:fill-slate-200 dark:hover:fill-blue-400" />
          </Link>
          <Link href="https://x.com/webdevcody" target="_blank">
            <XIcon className="w-10 h-10 hover:fill-slate-600 dark:fill-slate-200 dark:hover:fill-blue-400" />
          </Link>
          <Link href="https://github.com/webdevcody" target="_blank">
            <GithubIcon className="w-10 h-10 hover:fill-slate-600 dark:fill-slate-200 dark:hover:fill-blue-400" />
          </Link>
          <Link href="https://discord.gg/4kGbBaa" target="_blank">
            <DiscordIcon className="w-10 h-10 hover:fill-slate-600 dark:fill-slate-200 dark:hover:fill-blue-400" />
          </Link>
        </div>

        <div className="flex gap-8">
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </section>
  );
}
