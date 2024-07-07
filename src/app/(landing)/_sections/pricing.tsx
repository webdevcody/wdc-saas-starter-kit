import { SignedIn } from "@/components/auth";
import { SignedOut } from "@/components/auth";
import { CheckoutButton } from "@/components/stripe/upgrade-button/checkout-button";
import { Button } from "@/components/ui/button";
import { env } from "@/env";
import { CheckIcon } from "lucide-react";
import Link from "next/link";

function PricingCard({
  title,
  price,
  features,
  hasSubscription,
  priceId,
}: {
  title: string;
  price: string;
  priceId: string;
  hasSubscription: boolean;
  features: string[];
}) {
  return (
    <div className="flex flex-col w-fit p-6 text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
      <h3 className="text-2xl font-semibold">{title}</h3>

      <div className="flex flex-col items-center my-8">
        <div className="mr-2 text-4xl font-extrabold mb-2">
          ${price} / month
        </div>
      </div>

      <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
        What this plan includes:
      </p>

      <ul role="list" className="mb-8 text-left leading-10">
        {features.map((feature) => (
          <li key={feature} className="flex items-center space-x-3">
            <CheckIcon className="text-green-400" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <SignedIn>
          {hasSubscription ? (
            <Button variant={"default"} asChild>
              <Link href={"/dashboard"}>Go to Dashboard</Link>
            </Button>
          ) : (
            <CheckoutButton priceId={priceId} className="w-full">
              Upgrade now
            </CheckoutButton>
          )}
        </SignedIn>

        <SignedOut>
          <Button variant={"default"} asChild>
            <Link href={"/sign-in"}>Sign in to Upgrade</Link>
          </Button>
        </SignedOut>
      </div>
    </div>
  );
}

export function PricingSection({
  hasSubscription,
}: {
  hasSubscription: boolean;
}) {
  return (
    <section className="bg-white dark:bg-gray-900" id="pricing">
      <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-24 lg:px-6">
        <div className="max-w-screen-md mx-auto mb-8 text-center lg:mb-12">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Pricing
          </h2>
        </div>

        <div className="flex justify-center mx-auto gap-8">
          {/* <PricingCard
            title="Free"
            price="0"
            features={[
              "Complete Next.js Solution",
              "Stripe Integration",
              "User Authentication",
              "Role Based Authorization",
              "User Dashboard",
            ]}
          /> */}

          <PricingCard
            title="Basic"
            price="5"
            hasSubscription={hasSubscription}
            priceId={env.NEXT_PUBLIC_PRICE_ID_BASIC}
            features={[
              "Complete Next.js Solution",
              "Stripe Integration",
              "User Authentication",
              "Role Based Authorization",
              "User Dashboard",
            ]}
          />

          <PricingCard
            title="Premium"
            price="10"
            hasSubscription={hasSubscription}
            priceId={env.NEXT_PUBLIC_PRICE_ID_PREMIUM}
            features={[
              "Complete Next.js Solution",
              "Stripe Integration",
              "User Authentication",
              "Role Based Authorization",
              "User Dashboard",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
