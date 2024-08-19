"use client";

import { Input } from "@/components/ui/input";
import { GroupId } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadImageAction } from "@/app/dashboard/groups/[groupId]/settings/actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoaderButton } from "@/components/loader-button";
import { useToast } from "@/components/ui/use-toast";
import {
  MAX_UPLOAD_IMAGE_SIZE,
  MAX_UPLOAD_IMAGE_SIZE_IN_MB,
} from "@/app-config";
import { useServerAction } from "zsa-react";

const uploadImageSchema = z.object({
  file: z.instanceof(File).refine((file) => file.size < MAX_UPLOAD_IMAGE_SIZE, {
    message: `Your image must be less than ${MAX_UPLOAD_IMAGE_SIZE_IN_MB}MB.`,
  }),
});

export function BannerUploadForm({ groupId }: { groupId: GroupId }) {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof uploadImageSchema>>({
    resolver: zodResolver(uploadImageSchema),
    defaultValues: {},
  });

  const { execute: uploadImage, isPending } = useServerAction(
    uploadImageAction,
    {
      onError: ({ err }) => {
        toast({
          title: "Error",
          description: err.message || "Failed to update group image.",
          variant: "destructive",
        });
      },
      onSuccess: () => {
        toast({
          title: "Image Updated",
          description: "You've successfull updated your group image.",
        });
        formRef.current?.reset();
      },
    }
  );

  const onSubmit: SubmitHandler<z.infer<typeof uploadImageSchema>> = (
    values
  ) => {
    const formData = new FormData();
    formData.append("file", values.file!);
    uploadImage({ fileWrapper: formData, groupId });
  };

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
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
        <div className="flex justify-end">
          <LoaderButton isLoading={isPending}>Upload</LoaderButton>
        </div>
      </form>
    </Form>
  );
}
