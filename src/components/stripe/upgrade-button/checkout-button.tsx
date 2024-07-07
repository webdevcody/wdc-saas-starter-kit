import { generateStripeSessionAction } from "./actions";
import { ReactNode } from "react";
import { SubmitButton } from "@/components/submit-button";

export function CheckoutButton({
  className,
  children,
  priceId,
}: {
  className?: string;
  children: ReactNode;
  priceId: string;
}) {
  return (
    <form action={generateStripeSessionAction.bind(null, { priceId })}>
      <SubmitButton className={className}>{children}</SubmitButton>
    </form>
  );
}
