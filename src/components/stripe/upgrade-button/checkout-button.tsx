"use client";

import { generateStripeSessionAction } from "./actions";
import { ReactNode } from "react";
import { useServerAction } from "zsa-react";
import { LoaderButton } from "@/components/loader-button";

export function CheckoutButton({
  className,
  children,
  priceId,
}: {
  className?: string;
  children: ReactNode;
  priceId: string;
}) {
  const { execute, isPending } = useServerAction(generateStripeSessionAction);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        execute({ priceId });
      }}
    >
      <LoaderButton isLoading={isPending} className={className}>
        {children}
      </LoaderButton>
    </form>
  );
}
