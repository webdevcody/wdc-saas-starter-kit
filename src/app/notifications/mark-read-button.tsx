"use client";

import { useServerAction } from "zsa-react";
import { markAllNotificationsAsReadAction } from "./actions";
import { LoaderButton } from "@/components/loader-button";
import { CheckCheckIcon } from "lucide-react";
import { btnIconStyles, btnStyles } from "@/styles/icons";
import { useToast } from "@/components/ui/use-toast";

export function MarkReadAllButton() {
  const { toast } = useToast();
  const { execute, isPending } = useServerAction(
    markAllNotificationsAsReadAction,
    {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "All messages were marked as read.",
        });
      },
    }
  );

  return (
    <LoaderButton
      isLoading={isPending}
      onClick={() => {
        execute();
      }}
      className={btnStyles}
    >
      <CheckCheckIcon className={btnIconStyles} /> Mark all as read
    </LoaderButton>
  );
}
