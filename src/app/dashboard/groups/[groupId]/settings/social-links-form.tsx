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
import { updateGroupSocialLinksAction } from "./actions";
import { Group } from "@/db/schema";
import { socialUrlSchema } from "./schema";
import { useServerAction } from "zsa-react";

const updateSocialLinksSchema = z.object(socialUrlSchema);

export function SocialLinksForm({ group }: { group: Group }) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof updateSocialLinksSchema>>({
    resolver: zodResolver(updateSocialLinksSchema),
    defaultValues: {
      githubLink: group.githubLink ?? "",
      discordLink: group.discordLink ?? "",
      xLink: group.xLink ?? "",
      youtubeLink: group.youtubeLink ?? "",
    },
  });

  const { execute: updateSocialLinks, isPending } = useServerAction(
    updateGroupSocialLinksAction,
    {
      onSuccess: () => {
        toast({
          title: "Group Updated",
          description: "Your social links have been updated.",
        });
      },
      onError: ({ err }) => {
        toast({
          title: "Error",
          description: err.message || "Failed to update social links.",
          variant: "destructive",
        });
      },
    }
  );

  const onSubmit: SubmitHandler<z.infer<typeof updateSocialLinksSchema>> = (
    values
  ) => {
    updateSocialLinks({ groupId: group.id, ...values });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 flex flex-col gap-2 flex-1"
      >
        <FormField
          control={form.control}
          name="youtubeLink"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Youtube</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discordLink"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Discord</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="xLink"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>X</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="githubLink"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Github</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoaderButton className="w-fit ml-auto" isLoading={isPending}>
          Save
        </LoaderButton>
      </form>
    </Form>
  );
}
