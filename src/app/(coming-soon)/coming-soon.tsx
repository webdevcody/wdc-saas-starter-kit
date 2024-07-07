import { ComingSoonHeader } from "@/app/(coming-soon)/header";
import { NewsletterForm } from "@/app/(coming-soon)/newsletter-form";
import Image from "next/image";

export function Lines() {
  return (
    <svg
      className="absolute inset-0 z-10 h-full w-full stroke-slate-100 dark:stroke-slate-800"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
          width="230"
          height="230"
          x="50%"
          y="-1"
          patternUnits="userSpaceOnUse"
        >
          <path d="M.5 230V.5H230" fill="none"></path>
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth="0"
        fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
      ></rect>
    </svg>
  );
}

export function ComingSoon() {
  return (
    <>
      <section className="relative pt-12 min-h-screen gap-8 bg-gradient-to-b dark:from-slate-900 dark:to-slate-800 from-green-200 to-blue-100 shadow-md">
        <Lines />

        <ComingSoonHeader />

        <div className="relative z-20 container mx-auto flex flex-col justify-center">
          <div className="grid max-w-screen-xl px-4 pt-12 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-24 lg:grid-cols-12 lg:pt-16">
            <div className="mr-auto place-self-center col-span-7">
              <h1 className="font-semibold max-w-2xl mb-6 text-4xl leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
                🚀 I&apos;m working on the{" "}
                <span className="italic text-red-400">perfect</span> SaaS
                starter kit.
              </h1>

              <h2 className="text-2xl mb-8 font-light">
                This Next.js starter kit will enable you to setup your own SaaS
                product with monthly subscriptions, including a complete
                walkthrough on how to set it all up and maintain it.
              </h2>

              <p className="text-3xl mb-4">Get Notified When I Launch 🚀</p>

              <NewsletterForm />
            </div>

            <div className="col-span-1"></div>

            <div className="w-full col-span-4">
              <Image
                className="rounded-xl w-full shadow-xl hidden lg:block"
                width="300"
                height="200"
                src="/group.jpeg"
                alt="hero image"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-slate-400 border-t border-b dark:border-slate-500 relative py-12 dark:bg-gray-950 shadow-sm bg-repeat bg-paper dark:bg-plus">
        <div className="container mx-auto max-w-4xl pt-12 dark:text-gray-200">
          <h2 className="text-5xl mb-8 font-bold">
            What I&apos;m working on 🛠️
          </h2>

          <p className="mb-6 text-xl leading-10">
            For those who watch my channel, you know I work on lot of different
            side projects. I&apos;ve even lost track how many times I&apos;ve
            reinstalled the same ShadCN components. To speed up my personal time
            to launch new products, I&apos;m building a complete starter kit
            which includes most of everything you&apos;d need when creating a
            new online SaaS product.
          </p>

          <p className="mb-8 text-xl leading-10">
            Buckle up, it&apos;s going to be BIG; I plan to include:
          </p>

          <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 md:mx-12 mb-12">
            <li>🚦 Next.js 14</li>
            <li>📦 DrizzleORM</li>
            <li>🌑 ShadCN</li>
            <li>🌈 Tailwind CSS</li>
            <li>📝 Typescript</li>
            <li>🔒 Authentication (Next-Auth) </li>
            <li>🌐 Google & Github Login </li>
            <li>🔗 Magic Link Login </li>
            <li>👥 Role Based Authorization </li>
            <li>🗄️ File Storage (R2) </li>
            <li>🛡️ DDoS Protection </li>
            <li>🌐 Hosting Walkthrough </li>
            <li>🌟 Turso</li>
            <li>💳 Stripe Subscriptions </li>
            <li>📚 Documentation </li>
            <li>📰 Newsletter </li>
            <li>⏳ Coming Soon Mode</li>
            <li>🚧 Maintenance Mode</li>
            <li>📧 Emailing (Resend) </li>
            <li>📊 Analytics (Posthog) </li>
            <li>🚀 And More!</li>
          </ul>

          <p className="mb-6 text-xl leading-10">
            Additionally, I&apos;m working on a complete walkthrough on how to
            setup the project including any third party services, hosting, and
            how to run migrations and add new features, etc.
          </p>

          <p className="text-xl leading-10 text-center mt-24 mb-24">
            I don&apos;t want to sell you code. I want to{" "}
            <strong>teach you</strong> how to build, launch, and iterate on your
            product. I&apos;m excited to help you build!
          </p>
        </div>
      </section>
    </>
  );
}
