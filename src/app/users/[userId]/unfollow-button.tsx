"use client";

import { useToast } from "@/components/ui/use-toast";
import { useServerAction } from "zsa-react";
import { unfollowUserAction } from "./actions";
import { UserId } from "@/use-cases/types";
import { LoaderButton } from "@/components/loader-button";
import { UserMinus } from "lucide-react";
import { btnIconStyles, btnStyles } from "@/styles/icons";

export function UnfollowButton({ foreignUserId }: { foreignUserId: UserId }) {
  const { toast } = useToast();

  const { execute, isPending } = useServerAction(unfollowUserAction, {
    onSuccess() {
      toast({
        title: "Success",
        description: "You've unfollowed that user.",
      });
    },
    onError() {
      toast({
        title: "Uh oh",
        variant: "destructive",
        description: "Something went wrong trying to unfollow.",
      });
    },
  });

  return (
    <LoaderButton
      className={btnStyles}
      onClick={() => execute({ foreignUserId })}
      isLoading={isPending}
      variant={"destructive"}
    >
      <UserMinus className={btnIconStyles} /> Unfollow
    </LoaderButton>
  );
}
