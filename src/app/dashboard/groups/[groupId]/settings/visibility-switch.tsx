"use client";

import { toggleGroupVisibilityAction } from "@/app/dashboard/groups/[groupId]/settings/actions";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Group } from "@/db/schema";
import { useServerAction } from "zsa-react";

export function GroupVisibilitySwitch({ group }: { group: Group }) {
  const { toast } = useToast();

  const { execute } = useServerAction(toggleGroupVisibilityAction, {
    onSuccess() {
      toast({
        title: "Update successful",
        description: "Group visibility updated.",
      });
    },
    onError({ err }) {
      toast({
        title: "Something went wrong",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="flex items-center space-x-2">
      <Switch
        defaultChecked={group.isPublic}
        onCheckedChange={() => {
          execute(group.id);
        }}
        id="visibility"
      />
      <Label htmlFor="visibility">Is Group Public</Label>
    </div>
  );
}
