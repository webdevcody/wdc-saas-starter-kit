import { getUserProfileUseCase } from "@/use-cases/users";
import BioView from "./bio-view";
import Image from "next/image";
import { cardStyles } from "@/styles/common";
import { cn } from "@/lib/utils";

export default async function InfoContent({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;

  const profile = await getUserProfileUseCase(parseInt(userId));

  return (
    <div>
      {!profile.bio && (
        <div
          className={cn(
            cardStyles,
            "flex flex-col items-center justify-center py-12 gap-8"
          )}
        >
          <Image
            src="/empty-state/mountain.svg"
            width="200"
            height="200"
            alt="no gruops placeholder image"
          ></Image>
          <h2 className="text-2xl">This user has no bio</h2>
        </div>
      )}

      {profile.bio && <BioView bio={profile.bio} />}
    </div>
  );
}
