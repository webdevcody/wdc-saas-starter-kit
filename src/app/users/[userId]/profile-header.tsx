import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/session";
import { headerStyles, pageTitleStyles } from "@/styles/common";
import { btnIconStyles, btnStyles } from "@/styles/icons";
import { getUserProfileUseCase } from "@/use-cases/users";
import { UserId } from "lucia";
import { SquareUser } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FollowButton } from "./follow-button";
import { isFollowingUserUseCase } from "@/use-cases/following";
import { UnfollowButton } from "./unfollow-button";
import { cn } from "@/lib/utils";

export async function ProfileHeader({ userId }: { userId: UserId }) {
  const user = await getCurrentUser();
  const profile = await getUserProfileUseCase(userId);
  const isOwnProfile = user?.id === userId;

  const isFollowingUser = user
    ? await isFollowingUserUseCase(user, userId)
    : false;

  const shouldShowFollowButtons = user && !isOwnProfile;

  return (
    <div className={cn(headerStyles, "py-8")}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center md:flex-row gap-8">
            <Image
              src={profile.image ?? "/group.jpeg"}
              width={60}
              height={60}
              alt="image of the group"
              className="rounded-full object-cover h-[60px]"
            />

            <h1 className={pageTitleStyles}>{profile.displayName} </h1>
          </div>

          {shouldShowFollowButtons &&
            (isFollowingUser ? (
              <UnfollowButton foreignUserId={userId} />
            ) : (
              <FollowButton foreignUserId={userId} />
            ))}

          {isOwnProfile && (
            <Button asChild className={btnStyles}>
              <Link href={`/dashboard/settings/profile`}>
                <SquareUser className={btnIconStyles} /> Edit your Profile
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
