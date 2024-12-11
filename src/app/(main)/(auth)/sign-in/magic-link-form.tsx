import { z } from "zod";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signInMagicLinkAction } from "./actions";
import { LoaderButton } from "@/components/loader-button";
import { useServerAction } from "zsa-react";
import { useToast } from "@/components/ui/use-toast";

const magicLinkSchema = z.object({
  email: z.string().email(),
});

export function MagicLinkForm() {
  const { toast } = useToast();

  const { execute, isPending } = useServerAction(signInMagicLinkAction, {
    onError({ err }) {
      toast({
        title: "Something went wrong",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const form = useForm<z.infer<typeof magicLinkSchema>>({
    resolver: zodResolver(magicLinkSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof magicLinkSchema>) {
    execute(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  placeholder="Enter your email"
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoaderButton isLoading={isPending} className="w-full" type="submit">
          Sign in with magic link
        </LoaderButton>
      </form>
    </Form>
  );
}
