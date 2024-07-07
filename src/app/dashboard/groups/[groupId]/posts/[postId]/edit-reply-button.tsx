"use client";

import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { btnIconStyles, btnStyles } from "@/styles/icons";
import { InteractiveOverlay } from "@/components/interactive-overlay";
import { Reply } from "@/db/schema";
import { useState } from "react";
import { EditReplyForm } from "./edit-reply-form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function EditReplyButton({ reply }: { reply: Reply }) {
  const [isEditPostOpen, setIsEditPostOpen] = useState(false);

  return (
    <>
      <InteractiveOverlay
        title={"Edit Reply"}
        description={"Update the message in your reply"}
        form={<EditReplyForm reply={reply} />}
        isOpen={isEditPostOpen}
        setIsOpen={setIsEditPostOpen}
      />

      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setIsEditPostOpen(true)}
              className={btnStyles}
              variant="secondary"
            >
              <PencilIcon className={btnIconStyles} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit Reply</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
