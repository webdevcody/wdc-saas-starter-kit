import { GroupCard } from "@/app/(main)/dashboard/group-card";
import { getPublicGroupsByUserIdUseCase } from "@/use-cases/groups";
import Image from "next/image";

export default async function GroupsContent({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const userIdInt = parseInt(userId);
  const userGroups = await getPublicGroupsByUserIdUseCase(userIdInt);

  return (
    <div className="space-y-8">
      {userGroups.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 gap-8 dark:bg-slate-900 rounded-xl">
          <Image
            src="/empty-state/mountain.svg"
            width="200"
            height="200"
            alt="no groups placeholder image"
            className="w-full max-w-[200px] h-auto"
          />
          <h2 className="text-2xl text-center px-4">
            This user isn't part of any groups
          </h2>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {userGroups.map((group) => (
          <GroupCard
            memberCount={group.memberCount.toString()}
            group={group}
            key={group.id}
            buttonText="View Group"
          />
        ))}
      </div>
    </div>
  );
}
