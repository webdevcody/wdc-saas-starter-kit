"use client";

import { subscribeEmailAction } from "@/app/(coming-soon)/actions";
import { LoaderButton } from "@/components/loader-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Terminal } from "lucide-react";
import { useRef } from "react";
import { useServerAction } from "zsa-react";

export function NewsletterForm() {
  const { toast } = useToast();

  const ref = useRef<HTMLFormElement>(null);
  const { execute, status, isError, error } = useServerAction(
    subscribeEmailAction,
    {
      onSuccess() {
        ref.current?.reset();
        toast({
          title: "Success",
          description: "You have been subscribed to our newsletter.",
        });
      },
      onError({ err }) {
        console.log("error", err.message);
      },
    }
  );

  return (
    <>
      <form
        ref={ref}
        className="flex gap-2"
        onSubmit={async (event) => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          const email = formData.get("email") as string;
          await execute({ email });
        }}
      >
        <Label className="sr-only" htmlFor="email" />
        <Input
          required
          type="email"
          name="email"
          className="text max-w-[320px] dark:bg-slate-100 dark:text-slate-900 dark:placeholder-slate-600"
          id="email"
          placeholder="Enter your email address"
        />

        <LoaderButton isLoading={status === "pending"}>Subscribe</LoaderButton>
      </form>

      <div className="mt-4">
        {status === "success" && (
          <Alert variant="success">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Successfully subscribed</AlertTitle>
            <AlertDescription>
              We&apos;ll let you know when this starter kit is ready!
            </AlertDescription>
          </Alert>
        )}

        {isError && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}
      </div>
    </>
  );
}
