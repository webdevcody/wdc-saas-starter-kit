import Link from "next/link";
import Image from "next/image";
import { HeaderLinks } from "@/app/_header/header-links";
import { Suspense } from "react";
import { getCurrentUser } from "@/lib/session";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings2Icon } from "lucide-react";
import { HeaderActionsFallback } from "@/app/_header/header-actions-fallback";
import { applicationName } from "@/app-config";
import { SignOutItem } from "@/app/_header/sign-out-item";
import {
  getUnreadNotificationsForUserUseCase,
  getUserProfileUseCase,
} from "@/use-cases/users";
import { getProfileImageFullUrl } from "@/app/dashboard/settings/profile/profile-image";
import { Notifications } from "./notifications";
import { MenuButton } from "./menu-button";

export async function Header() {
  const user = await getCurrentUser();

  return (
    <div className="px-5 md:px-6">
      <div className="mx-auto flex w-full max-w-7xl py-4 justify-between">
        <div className="flex justify-between gap-10 items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/group.jpeg"
              alt="Group Finder Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-sm md:text-base lg:text-2xl font-bold">
              {applicationName}
            </span>
          </Link>

          <HeaderLinks isAuthenticated={!!user} />
        </div>

        <div className="flex items-center justify-between gap-5">
          <Suspense fallback={<HeaderActionsFallback />}>
            <HeaderActions />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function ProfileAvatar({ userId }: { userId: number }) {
  const profile = await getUserProfileUseCase(userId);

  return (
    <Avatar>
      <AvatarImage src={getProfileImageFullUrl(profile)} />
      <AvatarFallback>
        {profile.displayName?.substring(0, 2).toUpperCase() ?? "AA"}
      </AvatarFallback>
    </Avatar>
  );
}

async function HeaderActions() {
  const user = await getCurrentUser();
  const isSignedIn = !!user;

  return (
    <>
      {isSignedIn ? (
        <>
          <Suspense>
            <NotificationsWrapper />
          </Suspense>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Suspense
                fallback={
                  <div className="bg-gray-800 rounded-full h-10 w-10 shrink-0 flex items-center justify-center">
                    ..
                  </div>
                }
              >
                <ProfileAvatar userId={user.id} />
              </Suspense>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="space-y-2">
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/settings"
                  className="flex gap-2 items-center cursor-pointer"
                >
                  <Settings2Icon className="w-4 h-4" /> Settings
                </Link>
              </DropdownMenuItem>
              <SignOutItem />
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="md:hidden">
            <MenuButton />
          </div>
        </>
      ) : (
        <>
          <Button asChild variant="secondary">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </>
      )}
    </>
  );
}

export async function NotificationsWrapper() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const notifications = await getUnreadNotificationsForUserUseCase(user.id);

  return <Notifications notifications={notifications} />;
}
