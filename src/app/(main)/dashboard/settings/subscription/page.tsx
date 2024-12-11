import { Button } from "@/components/ui/button";
import Link from "next/link";
import { env } from "@/env";
import { getUserPlanUseCase } from "@/use-cases/subscriptions";
import { ConfigurationPanel } from "@/components/configuration-panel";
import { assertAuthenticated } from "@/lib/session";

export default async function SubscriptionPage() {
  const user = await assertAuthenticated();
  const currrentPlan = await getUserPlanUseCase(user.id);

  return (
    currrentPlan !== "free" && (
      <ConfigurationPanel title="Manage Subscription">
        <div className="flex flex-col gap-4">
          <div>
            You are currently using the{" "}
            <span className="text-bold text-blue-400">{currrentPlan}</span>{" "}
            plan.
          </div>
          <div>You can upgrade or cancel your subscription below</div>
          <Button className="max-w-fit" asChild>
            <Link
              href={env.NEXT_PUBLIC_STRIPE_MANAGE_URL}
              target="_blank"
              rel="noreferrer"
            >
              Manage Subscription
            </Link>
          </Button>
        </div>
      </ConfigurationPanel>
    )
  );
}
