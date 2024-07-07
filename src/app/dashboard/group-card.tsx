import { getGroupImageUrl } from "@/app/dashboard/groups/[groupId]/settings/util";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Group } from "@/db/schema";
import { cn } from "@/lib/utils";
import { cardStyles } from "@/styles/common";
import { UsersIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function GroupCard({
  group,
  buttonText,
  memberCount,
}: {
  group: Pick<Group, "id" | "bannerId" | "name" | "description" | "id">;
  buttonText: string;
  memberCount: string;
}) {
  return (
    <Card className={cn(cardStyles)}>
      <CardHeader>
        <Image
          src={getGroupImageUrl(group)}
          width={200}
          height={200}
          alt="image of the group"
          className="rounded-lg w-full h-[100px] object-cover mb-2"
        />
        <CardTitle className="mb-2">{group.name}</CardTitle>
        <CardDescription className="line-clamp-4 h-20">
          {group.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 justify-center items-center">
          <UsersIcon /> {memberCount} members
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full mt-auto" variant="secondary" asChild>
          <Link href={`/dashboard/groups/${group.id}/info`}>{buttonText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
