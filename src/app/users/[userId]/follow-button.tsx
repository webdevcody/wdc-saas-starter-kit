"use client";

import { useToast } from "@/components/ui/use-toast";
import { useServerAction } from "zsa-react";
import { followUserAction } from "./actions";
import { UserId } from "@/use-cases/types";
import { LoaderButton } from "@/components/loader-button";
import { UserPlus } from "lucide-react";
import { btnIconStyles, btnStyles } from "@/styles/icons";

export function FollowButton({ foreignUserId }: { foreignUserId: UserId }) {
  const { toast } = useToast();

  const { execute, isPending } = useServerAction(followUserAction, {
    onSuccess() {
      toast({
        title: "Success",
        description: "You've followed that user.",
      });
    },
    onError() {
      toast({
        title: "Uh oh",
        variant: "destructive",
        description: "Something went wrong trying to follow that user.",
      });
    },
  });

  return (
    <LoaderButton
      className={btnStyles}
      onClick={() => execute({ foreignUserId })}
      isLoading={isPending}
    >
      <UserPlus className={btnIconStyles} /> Follow
    </LoaderButton>
  );
}
