import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <>
      <div className="flex flex-col gap-8 items-center pb-24">
        <h1 className="text-4xl mt-24">Not interested? No worries at all</h1>

        <p className="text-2xl max-w-xl text-center">
          Checkout a free starter kit below until you&apos;re ready for the
          premium starter kit
        </p>

        <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400 py-4">
          <Button variant="secondary" asChild size="lg">
            <Link
              target="_blank"
              href="https://github.com/webdevcody/ppai-next-starter"
            >
              🆓 Checkout my free next.js starter kit 🆓
            </Link>
          </Button>
        </p>

        <Button variant="default" asChild size="lg">
          <Link href="/">
            <ChevronLeft className="w-4 h-4 mr-2" /> Let my landing page
            convince you
          </Link>
        </Button>
      </div>
    </>
  );
}
