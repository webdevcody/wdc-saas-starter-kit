"use client";

import { LoaderButton } from "@/components/loader-button";
import { useToast } from "@/components/ui/use-toast";
import { useContext } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { SendIcon, Terminal } from "lucide-react";
import { btnIconStyles } from "@/styles/icons";
import { Textarea } from "@/components/ui/textarea";
import { useServerAction } from "zsa-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ToggleContext } from "@/components/interactive-overlay";
import { createReplyAction } from "./actions";
import { GroupId } from "@/db/schema";

const createReplySchema = z.object({
  message: z.string().min(1),
});

export function PostReplyForm({
  postId,
  groupId,
}: {
  postId: number;
  groupId: GroupId;
}) {
  const { setIsOpen: setIsOverlayOpen } = useContext(ToggleContext);
  const { toast } = useToast();

  const { execute, error, isPending } = useServerAction(createReplyAction, {
    onSuccess() {
      toast({
        title: "Success",
        description: "Reply created successfully.",
      });
      setIsOverlayOpen(false);
      form.reset();
    },
    onError() {
      toast({
        title: "Uh oh",
        variant: "destructive",
        description: "Something went wrong creating your reply.",
      });
    },
  });

  const form = useForm<z.infer<typeof createReplySchema>>({
    resolver: zodResolver(createReplySchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof createReplySchema>> = (
    values,
    event
  ) => {
    execute({
      postId,
      groupId,
      message: values.message,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 flex-1 px-2"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea rows={4} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error creating reply</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        <LoaderButton isLoading={isPending}>
          <SendIcon className={btnIconStyles} /> Post Reply
        </LoaderButton>
      </form>
    </Form>
  );
}
