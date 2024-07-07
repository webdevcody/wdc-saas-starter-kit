import { Profile } from "@/db/schema";
import { ProfileImageForm } from "./profile-image-form";
import { getCurrentUser } from "@/lib/session";
import { getProfileImageUrl } from "@/use-cases/users";
import Image from "next/image";
import { ConfigurationPanel } from "@/components/configuration-panel";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { getUserProfileLoader } from "./page";

export function getProfileImageFullUrl(profile: Profile) {
  return profile.imageId
    ? getProfileImageUrl(profile.userId, profile.imageId)
    : profile.image
    ? profile.image
    : "/profile.png";
}

export async function ProfileImage() {
  return (
    <ConfigurationPanel title="Profile Image">
      <Suspense fallback={<Skeleton className="w-full h-[200px] rounded" />}>
        <ProfileImageContent />
      </Suspense>
    </ConfigurationPanel>
  );
}

async function ProfileImageContent() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const profile = await getUserProfileLoader(user.id);

  return (
    <>
      <Image
        src={getProfileImageFullUrl(profile)}
        width={200}
        height={200}
        className="h-[200px] object-cover rounded-xl"
        alt="image of the group"
      />
      <ProfileImageForm />
    </>
  );
}
