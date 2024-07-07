import { GroupCard } from "@/app/dashboard/group-card";
import { Button } from "@/components/ui/button";
import { assertAuthenticated } from "@/lib/session";
import { cn } from "@/lib/utils";
import { cardStyles, pageTitleStyles } from "@/styles/common";
import { btnIconStyles, btnStyles } from "@/styles/icons";
import { getGroupsByUserUseCase } from "@/use-cases/groups";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CreateGroupButton } from "./create-group-button";
import { PageHeader } from "@/components/page-header";

export default async function DashboardPage() {
  const user = await assertAuthenticated();

  const groups = await getGroupsByUserUseCase(user);

  const hasGroups = groups.length > 0;

  if (!hasGroups) {
    return (
      <div
        className={cn(
          "space-y-8 container mx-auto py-24 min-h-screen max-w-2xl flex flex-col items-center"
        )}
      >
        <div className="flex justify-between items-center">
          <h1 className={pageTitleStyles}>Your Groups</h1>
        </div>

        <div
          className={cn(
            cardStyles,
            "flex flex-col items-center gap-6 p-12 w-full"
          )}
        >
          <Image
            src="/empty-state/no-data.svg"
            width="200"
            height="200"
            alt="no image placeholder image"
          ></Image>
          <h2>Uhoh, you don't own any groups</h2>

          <div className="flex gap-4">
            <CreateGroupButton />

            <Button asChild className={btnStyles} variant={"secondary"}>
              <Link href={`/browse`}>
                <Search className={btnIconStyles} /> Browse Groups
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const ownedGroups = groups.filter((group) => group.userId === user.id);
  const memberGroups = groups.filter((group) => group.userId !== user.id);

  return (
    <>
      <PageHeader>
        <h1
          className={cn(
            pageTitleStyles,
            "flex justify-between items-center flex-wrap gap-4"
          )}
        >
          Your Groups
          {hasGroups && <CreateGroupButton />}
        </h1>
      </PageHeader>
      <div className={cn("space-y-8 container mx-auto py-12 min-h-screen")}>
        <div className="flex justify-between items-center">
          <h2 className={"text-2xl"}>Groups You Manage</h2>
        </div>

        {ownedGroups.length === 0 && (
          <p className="flex gap-8 items-center mt-8 py-4 rounded border bg-gray-800 px-4">
            You don't manage any groups
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {ownedGroups.map((group) => (
            <GroupCard
              memberCount={group.memberCount.toString()}
              group={group}
              key={group.id}
              buttonText={"Manage Group"}
            />
          ))}
        </div>

        <div className="flex justify-between items-center">
          <h2 className={"text-2xl"}>Your Other Groups</h2>
        </div>

        {memberGroups.length === 0 && (
          <p
            className={cn(cardStyles, "flex gap-8 items-center mt-8 py-4 px-4")}
          >
            You're not part of any groups
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {memberGroups.map((group) => (
            <GroupCard
              memberCount={group.memberCount.toString()}
              group={group}
              key={group.id}
              buttonText={"View Group"}
            />
          ))}
        </div>
      </div>
    </>
  );
}
