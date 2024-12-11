"use client";

import { cn } from "@/lib/utils";
import React from "react";

const cellClass =
  "flex items-center justify-center rounded-xl bg-green-800 p-4 text-xl text-center";

export function TheProblemSection() {
  return (
    <div className="relative overflow-x-clip">
      <div className="z-10 absolute w-[2000px] dark:bg-background rotate-6 h-[200px] top-[20px] -left-[300px]"></div>
      <div className="z-10 absolute w-[2000px] dark:bg-background -rotate-6 h-[200px] top-[20px] -left-[300px]"></div>
      <section
        id="features"
        className="z-20 relative container mx-auto py-12 pt-24 bg-gray-100 dark:bg-background"
      >
        <p className="text-6xl mb-24 max-w-4xl mx-auto text-center">
          I know, you know, starting a project has{" "}
          <span className="font-bold">too many options</span>...
        </p>

        <div className="grid grid-cols-3 gap-12 mb-24">
          <p className={cn(cellClass, "bg-green-800")}>
            1. just run your favorite npx create command... on wait, should I
            use next? vite? nuxt? sveltekit? someone said use angular 😊
          </p>

          <p className={cn(cellClass, "bg-cyan-800")}>
            2. Now find a component library that does&apos;t suck. DaisyUI?
            Mantine? Chakra? Install it, set it up, determine is was a mistake.
            🤔
          </p>

          <p className={cn(cellClass, "bg-blue-800")}>
            3. But how will users register? reading through the next-auth docs
            sucks. How do I figure out if someone is authenticated AND
            authorized to see that button? 🫠
          </p>

          <p className={cn(cellClass, "bg-yellow-800")}>
            4. Uh oh, where should I store my data? What ORM to use? Not
            DynamoDB that&apos;s for sure. Where do I store my files? R2, S3? 😟
          </p>

          <p className={cn(cellClass, "bg-pink-800")}>
            5. Now you need to deploy your app, but where that won&apos;t
            bankrupt you in case you get DDoSed? Railway? Vercel? AWS? A VPS?!
            😖
          </p>

          <p className={cn(cellClass, "bg-red-800")}>
            6. OH WAIT you forgot that environment variable for the 3rd time and
            have to redeploy because you didn&apos;t use a typesafe env library
            from the start 🤬
          </p>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900 py-24">
        <p className="text-4xl text-center max-w-xl mx-auto mb-12">
          I&apos;ve built a LOT of projects and wasted a lot of time with the
          initial project setup.
        </p>

        <p className="text-4xl text-center max-w-xl mx-auto mb-12">
          <span className="rotate-3 text-blue-300">Trust me...</span>{" "}
          you&apos;ll want a starter kit. It&apos;s why I&apos;m using this for
          all my SaaS products.
        </p>

        <p className="text-6xl text-center max-w-xl mx-auto text-green-400">
          let&apos;s get to the fun stuff!
        </p>
      </section>
    </div>
  );
}
