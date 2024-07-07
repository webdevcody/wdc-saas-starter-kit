import Confetti from "@/components/confetti";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <>
      <div className="flex flex-col gap-8 items-center pb-24">
        <h1 className="text-4xl mt-24">You&apos;ve been upgraded!</h1>

        <Confetti />

        <p>Click below to start using our service</p>

        <Button asChild>
          <Link href={"/dashboard"}>View Dashboard</Link>
        </Button>
      </div>
    </>
  );
}
