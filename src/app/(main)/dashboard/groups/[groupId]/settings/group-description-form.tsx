"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoaderButton } from "@/components/loader-button";
import { useToast } from "@/components/ui/use-toast";
import { updateGroupDescriptionAction } from "./actions";
import { GroupId } from "@/db/schema";
import { Textarea } from "@/components/ui/textarea";
import { useServerAction } from "zsa-react";

const updateGroupDescription = z.object({
  description: z.string().min(1).max(750),
});

export function GroupDescriptionForm({
  description,
  groupId,
}: {
  description: string;
  groupId: GroupId;
}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof updateGroupDescription>>({
    resolver: zodResolver(updateGroupDescription),
    defaultValues: {
      description,
    },
  });

  const { execute: updateDescription, isPending } = useServerAction(
    updateGroupDescriptionAction,
    {
      onSuccess: () => {
        toast({
          title: "Update Successful",
          description: "Your group description has been updated.",
        });
      },
      onError: ({ err }) => {
        toast({
          title: "Uh-oh, something went wrong",
          description:
            err.message || "Your description was not successfully updated.",
          variant: "destructive",
        });
      },
    }
  );

  const onSubmit: SubmitHandler<z.infer<typeof updateGroupDescription>> = (
    values
  ) => {
    updateDescription({ description: values.description, groupId });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 flex-1"
      >
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Group Description</FormLabel>
              <FormControl>
                <Textarea
                  className="text-base leading-7"
                  rows={10}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoaderButton className="w-fit self-end" isLoading={isPending}>
          Save
        </LoaderButton>
      </form>
    </Form>
  );
}
