"use client";

import { extensions } from "@/app/dashboard/groups/[groupId]/info/edit-group-info-form";
import { EditorProvider } from "@tiptap/react";

export default function BioView({ bio }: { bio: string }) {
  return (
    <div className="no-scroll">
      <EditorProvider
        extensions={extensions}
        content={bio}
        editable={false}
      ></EditorProvider>
    </div>
  );
}
