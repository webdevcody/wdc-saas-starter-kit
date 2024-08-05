"use client";

import { EditorProvider } from "@tiptap/react";
import {
  MenuBar,
  extensions,
} from "../../groups/[groupId]/info/edit-group-info-form";
import { LoaderButton } from "@/components/loader-button";
import { useServerAction } from "zsa-react";
import { updateProfileBioAction } from "./actions";
import { useRef } from "react";
import { useToast } from "@/components/ui/use-toast";

export function EditBioForm({ bio }: { bio: string }) {
  const { execute, isPending } = useServerAction(updateProfileBioAction);
  const htmlRef = useRef<string>(bio);
  const { toast } = useToast();

  return (
    <div className="w-full space-y-4">
      <EditorProvider
        onUpdate={({ editor }) => {
          htmlRef.current = editor.getHTML();
        }}
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={bio}
        editable={true}
      ></EditorProvider>

      <div className="flex justify-end">
        <LoaderButton
          onClick={() => {
            execute({ bio: htmlRef.current }).then(([, err]) => {
              if (err) {
                toast({
                  title: "Uh-oh!",
                  variant: "destructive",
                  description: "Your profile bio failed to update.",
                });
              } else {
                toast({
                  title: "Success!",
                  description: "Your profile bio has been updated.",
                });
              }
            });
          }}
          isLoading={isPending}
          className="self-end"
        >
          Save Changes
        </LoaderButton>
      </div>
    </div>
  );
}
