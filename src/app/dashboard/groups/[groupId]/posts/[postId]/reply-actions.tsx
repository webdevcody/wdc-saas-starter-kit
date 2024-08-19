"use client";

import { Button } from "@/components/ui/button";
import { MoreVertical, PencilIcon, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { btnIconStyles } from "@/styles/icons";
import { InteractiveOverlay } from "@/components/interactive-overlay";
import { Reply } from "@/db/schema";
import { useState } from "react";
import { EditReplyForm } from "./edit-reply-form";
import { useToast } from "@/components/ui/use-toast";
import { useServerAction } from "zsa-react";
import { deleteReplyAction } from "./actions";
import { LoaderButton } from "@/components/loader-button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function ReplyActions({ reply }: { reply: Reply }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditPostOpen, setIsEditPostOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();
  const { execute, isPending } = useServerAction(deleteReplyAction, {
    onSuccess() {
      toast({
        title: "Success",
        description: "Reply deleted",
      });
      setIsDeleteDialogOpen(false);
    },
  });

  return (
    <>
      <InteractiveOverlay
        title={"Edit Reply"}
        description={"Update the message in your reply"}
        form={<EditReplyForm reply={reply} />}
        isOpen={isEditPostOpen}
        setIsOpen={setIsEditPostOpen}
      />

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
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

      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="flex items-center gap-2"
            onSelect={(e) => {
              e.preventDefault();
              setIsEditPostOpen(true);
              setIsOpen(false);
            }}
          >
            <PencilIcon className={btnIconStyles} /> Edit Reply
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2 text-red-500"
            onSelect={(e) => {
              e.preventDefault();
              setIsDeleteDialogOpen(true);
              setIsOpen(false);
            }}
          >
            <Trash className={btnIconStyles} /> Delete Reply
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
