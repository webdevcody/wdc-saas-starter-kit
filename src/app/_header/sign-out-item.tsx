"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import * as NProgress from "nprogress";
import { signOutAction } from "./actions";

export function SignOutItem() {
  return (
    <DropdownMenuItem
      className="cursor-pointer"
      onSelect={async () => {
        NProgress.start();
        signOutAction().then(() => {
          NProgress.done();
        });
      }}
    >
      <LogOut className="w-4 h-4 mr-2" />
      Sign Out
    </DropdownMenuItem>
  );
}
