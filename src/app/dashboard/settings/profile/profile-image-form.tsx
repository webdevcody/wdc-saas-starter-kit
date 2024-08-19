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
import { updateProfileImageAction } from "./actions";
import {
  MAX_UPLOAD_IMAGE_SIZE,
  MAX_UPLOAD_IMAGE_SIZE_IN_MB,
} from "@/app-config";

const uploadImageSchema = z.object({
  file: z.instanceof(File).refine((file) => file.size < MAX_UPLOAD_IMAGE_SIZE, {
    message: `Your image must be less than ${MAX_UPLOAD_IMAGE_SIZE_IN_MB}MB.`,
  }),
});

export function ProfileImageForm() {
  const [pending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof uploadImageSchema>>({
    resolver: zodResolver(uploadImageSchema),
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<z.infer<typeof uploadImageSchema>> = (
    values,
    event
  ) => {
    startTransition(() => {
      const formData = new FormData();
      formData.append("file", values.file!);
      updateProfileImageAction({ fileWrapper: formData })
        .then(() => {
          if (event) {
            const form = event.target as HTMLFormElement;
            form.reset();
          }
          toast({
            title: "Image Updated",
            description: "You've successfully updated your profile image.",
          });
        })
        .catch((error) => {
          toast({
            title: "Error",
            description: error.message || "Failed to update profile image.",
            variant: "destructive",
          });
        });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex gap-2"
      >
        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files && event.target.files[0];
                    onChange(file);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoaderButton isLoading={pending}>Upload</LoaderButton>
      </form>
    </Form>
  );
}
