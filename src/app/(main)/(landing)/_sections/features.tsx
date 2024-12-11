import { cn } from "@/lib/utils";
import {
  BarChartIcon,
  BlocksIcon,
  BrushIcon,
  CodeIcon,
  DatabaseIcon,
  DollarSignIcon,
  FileIcon,
  FishIcon,
  LineChartIcon,
  LockIcon,
  LockKeyhole,
  MailIcon,
  PlugZap,
  ShieldCheck,
  ShipIcon,
  Smartphone,
  SmartphoneNfc,
  SunIcon,
  UserIcon,
} from "lucide-react";

const techClass =
  "text-black hover:scale-105 transition hover:rotate-1 shadow-lg shadow-blue-400/50 bg-slate-200 rounded-xl drop-shadow-xl p-4 flex flex-col justify-center items-center";

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="container mx-auto py-24 bg-gray-100 dark:bg-background"
    >
      <h2 className="max-w-6xl mx-auto text-6xl text-center mb-12">
        So what&apos;s included in a &quot;modern&quot; starter kit?
      </h2>

      <p className="text-center text-2xl max-w-2xl mx-auto mb-12">
        This code starter kit includes the frameworks, libraries, and tech I use
        most and believe in to be a great choice in regards to performance, ease
        of development, and customizability.
      </p>

      <ul className="max-w-6xl mx-auto grid grid-cols-3 px-12 leading-10 gap-6">
        <div className="flex flex-col gap-6">
          <li className={techClass}>
            <CodeIcon /> Next.js 14 App Router
          </li>
          <li className={techClass}>
            <LockIcon /> Authentication with Artic and Oslo
          </li>
          <li className={techClass}>
            <DollarSignIcon /> One-Off Payments with Stripe
          </li>
          <li className={techClass}>
            <SmartphoneNfc /> Stripe Webhooks
          </li>

          <li className={techClass}>
            <MailIcon /> Emails with Resend
          </li>
        </div>

        <div className="flex flex-col gap-6">
          <li className={techClass}>
            <FileIcon /> File Storage on R2
          </li>

          <li className={techClass}>
            <PlugZap /> Drizzle ORM
          </li>

          <li className={techClass}>
            <DatabaseIcon /> LibSQL using Turso
          </li>

          <li className={techClass}>
            <ShipIcon /> Railway Deployments
          </li>

          <li className={techClass}>
            <ShieldCheck /> CloudFlare DDoS Protection
          </li>
        </div>

        <div className="flex flex-col gap-6">
          <li className={techClass}>
            <BrushIcon /> Tailwind CSS
          </li>

          <li className={techClass}>
            <UserIcon /> Account Deletion
          </li>

          <li className={techClass}>
            <LineChartIcon /> Analytics via Posthog
          </li>

          <li className={techClass}>
            <BlocksIcon /> ShadCN Components
          </li>

          <li className={techClass}>
            <SunIcon /> Light / Dark Mode
          </li>

          <li className={techClass}>
            <LockKeyhole /> Role Based Auth
          </li>
        </div>
      </ul>
    </section>
  );
}
