"use client";

import { joinGroupAction } from "@/app/dashboard/groups/[groupId]/actions";
import { LoaderButton } from "@/components/loader-button";
import { useToast } from "@/components/ui/use-toast";
import { btnIconStyles } from "@/styles/icons";
import { Handshake } from "lucide-react";
import { useParams } from "next/navigation";
import { useServerAction } from "zsa-react";

export function JoinGroupButton() {
  const { groupId } = useParams<{ groupId: string }>();
  const { toast } = useToast();
  const { execute, status } = useServerAction(joinGroupAction, {
    onSuccess() {
      toast({
        title: "Success",
        description: "You joined this group.",
      });
    },
  });

  return (
    <LoaderButton
      isLoading={status === "pending"}
      onClick={() => {
        execute(parseInt(groupId));
      }}
    >
      <Handshake className={btnIconStyles} /> Join Group
    </LoaderButton>
  );
}
