"use client";

import { updateGroupInfoAction } from "@/app/dashboard/groups/[groupId]/info/actions";
import { LoaderButton } from "@/components/loader-button";
import { useToast } from "@/components/ui/use-toast";
import { GroupId } from "@/db/schema";
import { cn } from "@/lib/utils";
import { cardStyles } from "@/styles/common";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
} from "lucide-react";
import React, { useRef } from "react";
import { useServerAction } from "zsa-react";

export const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="tiptap__buttons">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <Bold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <Italic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        <Heading2 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        <Heading3 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        <Heading4 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
      >
        <Heading5 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
      >
        <Heading6 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <List />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <ListOrdered />
      </button>
    </div>
  );
};

export const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] } as any),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

export const EditGroupInfoForm = ({
  groupId,
  info,
  isAdminOrOwner,
}: {
  groupId: GroupId;
  info: string;
  isAdminOrOwner: boolean;
}) => {
  const { toast } = useToast();
  const { execute: updateGroupInfo, isPending } = useServerAction(
    updateGroupInfoAction,
    {
      onSuccess() {
        toast({
          title: "Success!",
          description: "Group info has been updated.",
        });
      },
      onError() {
        toast({
          title: "Uh-oh!",
          variant: "destructive",
          description: "The group info failed to update.",
        });
      },
    }
  );
  const htmlRef = useRef<string>(info);

  return (
    <div className={cn(cardStyles, "p-4 rounded space-y-4")}>
      <EditorProvider
        onUpdate={({ editor }) => {
          htmlRef.current = editor.getHTML();
        }}
        slotBefore={isAdminOrOwner ? <MenuBar /> : null}
        extensions={extensions}
        content={info}
        editable={isAdminOrOwner}
      ></EditorProvider>

      {isAdminOrOwner && (
        <div className="flex justify-end">
          <LoaderButton
            onClick={() => {
              updateGroupInfo({ groupId, info: htmlRef.current });
            }}
            isLoading={isPending}
            className="self-end"
          >
            Save Changes
          </LoaderButton>
        </div>
      )}
    </div>
  );
};
