"use client";

import { Loader2Icon } from "lucide-react";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SubmitButton({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
} & ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      {...props}
      disabled={pending}
      type="submit"
      className={cn("flex gap-2 justify-center", className)}
    >
      {pending && <Loader2Icon className="animate-spin w-4 h-4" />} {children}
    </Button>
  );
}
