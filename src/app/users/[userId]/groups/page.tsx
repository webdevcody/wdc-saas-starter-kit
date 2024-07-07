import { GroupCard } from "@/app/dashboard/group-card";
import { getPublicGroupsByUserIdUseCase } from "@/use-cases/groups";
import Image from "next/image";

export default async function GroupsContent({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;
  const userGroups = await getPublicGroupsByUserIdUseCase(parseInt(userId));

  return (
    <div>
      {userGroups.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 gap-8 bg-slate-900 rounded-xl">
          <Image
            src="/empty-state/mountain.svg"
            width="200"
            height="200"
            alt="no gruops placeholder image"
          ></Image>
          <h2 className="text-2xl">This user isn't part of any groups</h2>
        </div>
      )}

      <div className="grid grid-cols-3 gap-8">
        {userGroups.map((group) => (
          <GroupCard
            memberCount={group.memberCount.toString()}
            group={group}
            key={group.id}
            buttonText={"View Group"}
          />
        ))}
      </div>
    </div>
  );
}
