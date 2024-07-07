"use client";

import { Input } from "@/components/ui/input";
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
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoaderButton } from "@/components/loader-button";
import { useToast } from "@/components/ui/use-toast";
import { updateGroupNameAction } from "./actions";
import { GroupId } from "@/db/schema";

const updateGroupNameSchema = z.object({
  name: z.string().min(1),
});

export function GroupNameForm({
  groupName,
  groupId,
}: {
  groupName: string;
  groupId: GroupId;
}) {
  const [pending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof updateGroupNameSchema>>({
    resolver: zodResolver(updateGroupNameSchema),
    defaultValues: {
      name: groupName,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof updateGroupNameSchema>> = (
    values,
    event
  ) => {
    startTransition(() => {
      updateGroupNameAction({ name: values.name, groupId }).then(() => {
        if (event) {
          const form = event.target as HTMLFormElement;
          form.reset();
        }
        toast({
          title: "Name Updated",
          description: "Name updated successfully.",
        });
      });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex gap-2 flex-1"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Group Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoaderButton isLoading={pending}>Save</LoaderButton>
      </form>
    </Form>
  );
}
