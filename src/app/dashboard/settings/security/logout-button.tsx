"use client";

import { LoaderButton } from "@/components/loader-button";
import { btnIconStyles, btnStyles } from "@/styles/icons";
import { LogOut } from "lucide-react";
import { useServerAction } from "zsa-react";
import { invalidateUserSessionsAction } from "./actions";

export function LogoutButton() {
  const { execute, isPending } = useServerAction(invalidateUserSessionsAction);

  return (
    <LoaderButton
      className={btnStyles}
      onClick={() => {
        execute();
      }}
      isLoading={isPending}
    >
      <LogOut className={btnIconStyles} />
      Logout of all Sessions
    </LoaderButton>
  );
}
