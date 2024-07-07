import { ConfigurationPanel } from "@/components/configuration-panel";
import { ProfileNameForm } from "./profile-name-form";
import { getCurrentUser } from "@/lib/session";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserProfileLoader } from "./page";

export async function ProfileName() {
  return (
    <ConfigurationPanel title="Display Name">
      <Suspense fallback={<Skeleton className="w-full h-[200px] rounded" />}>
        <ProfileNameWrapper />
      </Suspense>
    </ConfigurationPanel>
  );
}

async function ProfileNameWrapper() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const profile = await getUserProfileLoader(user.id);

  return <ProfileNameForm profileName={profile.displayName ?? ""} />;
}
