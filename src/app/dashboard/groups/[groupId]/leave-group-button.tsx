"use client";

import { leaveGroupAction } from "@/app/dashboard/groups/[groupId]/actions";
import { LoaderButton } from "@/components/loader-button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { btnIconStyles, btnStyles } from "@/styles/icons";
import { DoorOpen } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useServerAction } from "zsa-react";

export function LeaveGroupButton() {
  const { toast } = useToast();
  const { groupId } = useParams<{ groupId: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const { execute, status } = useServerAction(leaveGroupAction, {
    onSuccess() {
      toast({
        title: "Success",
        description: "You left this group.",
      });
    },
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} className={btnStyles}>
          <DoorOpen className={btnIconStyles} /> Leave Group
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Leave Group</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to leave this group? If it was a private group
            an admin will need to reinvite you.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <LoaderButton
            variant={"destructive"}
            isLoading={status === "pending"}
            onClick={() => {
              execute(parseInt(groupId));
            }}
          >
            Yes, leave group
          </LoaderButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
