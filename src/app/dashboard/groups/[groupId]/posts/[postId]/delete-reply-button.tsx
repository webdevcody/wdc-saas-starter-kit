"use client";

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
import { Button, buttonVariants } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { btnIconStyles, btnStyles } from "@/styles/icons";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useServerAction } from "zsa-react";
import { cn } from "@/lib/utils";
import { deleteReplyAction } from "./actions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Reply } from "@/db/schema";

export function DeleteReplyButton({ reply }: { reply: Reply }) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const { execute, isPending } = useServerAction(deleteReplyAction, {
    onSuccess() {
      toast({
        title: "Success",
        description: "Reply deleted",
      });
    },
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <Button
              variant={"destructive"}
              className={cn(btnStyles, "w-fit")}
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <Trash className={btnIconStyles} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete Reply</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Reply</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this reply?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <LoaderButton
            isLoading={isPending}
            onClick={() => {
              execute({
                postId: reply.postId,
                groupId: reply.groupId,
                replyId: reply.id,
              });
            }}
          >
            Delete Reply
          </LoaderButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
