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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useServerAction } from "zsa-react";
import { clearReadNotificationsAction } from "./actions";
import { useToast } from "@/components/ui/use-toast";
import { TrashIcon } from "lucide-react";
import { btnIconStyles, btnStyles } from "@/styles/icons";

export function ClearReadButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { execute, isPending } = useServerAction(clearReadNotificationsAction, {
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Read messages were cleared.",
      });
      setIsOpen(false);
    },
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button className={btnStyles} variant="destructive">
          <TrashIcon className={btnIconStyles} /> Clear read notifications
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently clear all your read notifications from the
            system.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <LoaderButton
            onClick={() => {
              execute();
            }}
            isLoading={isPending}
          >
            Clear Notifications
          </LoaderButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
