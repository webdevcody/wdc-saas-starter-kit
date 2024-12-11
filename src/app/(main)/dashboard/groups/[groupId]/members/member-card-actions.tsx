"use client";

import { Crown, EllipsisVertical, Gavel, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteModal } from "@/components/delete-modal";
import { useServerAction } from "zsa-react";
import { btnIconStyles, btnStyles } from "@/styles/icons";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { kickMemberAction, switchMemberRoleAction } from "./actions";

export function MemberCardActions({
  userId,
  groupId,
  userRole,
}: {
  userId: number;
  groupId: number;
  userRole: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const { execute: executeSwitchRole } = useServerAction(
    switchMemberRoleAction,
    {
      onSuccess() {
        setIsDeleteModalOpen(false);
      },
    }
  );
  const { execute, isPending } = useServerAction(kickMemberAction, {
    onSuccess() {
      setIsDeleteModalOpen(false);
    },
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        title="Kick Member"
        description="Are you sure you want to kick this member from the group?"
        confirmText="Yes, Kick Them"
        onConfirm={() => {
          execute({
            userId,
            groupId,
          });
        }}
        isPending={isPending}
      />

      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size={"icon"}>
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {userRole === "member" && (
            <DropdownMenuItem
              className={btnStyles}
              onClick={(e) => {
                executeSwitchRole({
                  userId,
                  groupId,
                  role: "admin",
                });
              }}
            >
              <Crown className={btnIconStyles} />
              Promote to Admin
            </DropdownMenuItem>
          )}

          {userRole === "admin" && (
            <DropdownMenuItem
              className={btnStyles}
              onClick={(e) => {
                executeSwitchRole({
                  userId,
                  groupId,
                  role: "member",
                });
              }}
            >
              <User className={btnIconStyles} />
              Demote to Member
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            onClick={(e) => {
              setIsDeleteModalOpen(true);
            }}
            className={cn(btnStyles, "text-red-500")}
          >
            <Gavel className={btnIconStyles} />
            Kick
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
