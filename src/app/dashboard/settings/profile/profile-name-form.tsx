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
import { SubmitHandler, useForm } from "react-hook-form";
import { LoaderButton } from "@/components/loader-button";
import { useToast } from "@/components/ui/use-toast";
import { updateProfileNameAction } from "./actions";
import { useServerAction } from "zsa-react";

const updateProfileNameSchema = z.object({
  profileName: z.string().min(1),
});

export function ProfileNameForm({ profileName }: { profileName: string }) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof updateProfileNameSchema>>({
    resolver: zodResolver(updateProfileNameSchema),
    defaultValues: {
      profileName: profileName,
    },
  });

  const { execute: updateProfileName, isPending } = useServerAction(
    updateProfileNameAction,
    {
      onSuccess: () => {
        toast({
          title: "Name Updated",
          description: "Name updated successfully.",
        });
        form.reset();
      },
      onError: ({ err }) => {
        toast({
          title: "Error",
          description: err.message || "Failed to update profile name.",
          variant: "destructive",
        });
      },
    }
  );

  const onSubmit: SubmitHandler<z.infer<typeof updateProfileNameSchema>> = (
    values
  ) => {
    updateProfileName(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex gap-2 flex-1"
      >
        <FormField
          control={form.control}
          name="profileName"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoaderButton isLoading={isPending}>Save</LoaderButton>
      </form>
    </Form>
  );
}
