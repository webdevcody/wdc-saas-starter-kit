import { ProfileImage } from "@/app/dashboard/settings/profile/profile-image";
import { ProfileName } from "@/app/dashboard/settings/profile/profile-name";
import { EditBioForm } from "./edit-bio-form";
import { assertAuthenticated } from "@/lib/session";
import { Suspense, cache } from "react";
import { getUserProfileUseCase } from "@/use-cases/users";
import { Skeleton } from "@/components/ui/skeleton";
import { ConfigurationPanel } from "@/components/configuration-panel";
import { ModeToggle } from "@/components/mode-toggle";

export const getUserProfileLoader = cache(getUserProfileUseCase);

export default async function SettingsPage() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <ProfileImage />
        <ProfileName />
      </div>

      <ConfigurationPanel title="Profile Bio">
        <Suspense fallback={<Skeleton className="w-full h-[400px] rounded" />}>
          <BioFormWrapper />
        </Suspense>
      </ConfigurationPanel>

      <ConfigurationPanel title="Theme">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <span className="mb-2 sm:mb-0">Toggle dark mode</span>
          <ModeToggle />
        </div>
      </ConfigurationPanel>
    </div>
  );
}

export async function BioFormWrapper() {
  const user = await assertAuthenticated();
  const profile = await getUserProfileLoader(user.id);
  return <EditBioForm bio={profile.bio} />;
}
