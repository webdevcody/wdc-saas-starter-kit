import Link from "next/link";
import { formatDate } from "@/util/date";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Post } from "@/db/schema";
import { canEditPostUseCase } from "@/use-cases/posts";
import { getCurrentUser } from "@/lib/session";
import { getReplyCountUseCase } from "@/use-cases/replies";
import { getUserProfileUseCase } from "@/use-cases/users";
import { getProfileImageFullUrl } from "@/app/dashboard/settings/profile/profile-image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getGroupById } from "@/data-access/groups";
import { cardStyles, linkStyles } from "@/styles/common";
import { cn } from "@/lib/utils";

function PostAvatarFallback() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="rounded-full w-8 h-8" />
      <Skeleton className="w-20 h-6" />
    </div>
  );
}

async function PostAvatar({ userId }: { userId: number }) {
  const profile = await getUserProfileUseCase(userId);

  return (
    <div className="flex items-center gap-2">
      <Avatar className="w-8 h-8">
        <AvatarImage src={getProfileImageFullUrl(profile)} />
        <AvatarFallback>
          {profile.displayName?.substring(0, 2).toUpperCase() ?? "AA"}
        </AvatarFallback>
      </Avatar>

      <p>{profile.displayName}</p>
    </div>
  );
}

export async function UserPostCard({ post }: { post: Post }) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const canDeletePost = await canEditPostUseCase(user, post.id);
  const replyCount = await getReplyCountUseCase(user, post.id);
  // TODO: this should be a use case
  const group = (await getGroupById(post.groupId))!;

  return (
    <div className={cn(cardStyles, "p-4 flex flex-col gap-4")}>
      <div className="flex justify-between">
        <h3 className="text-xl font-bold">{post.title}</h3>
      </div>

      <p>{post.message}</p>

      <div className="flex justify-between">
        <div className="text-gray-400 flex gap-4 w-full items-center">
          <div className="flex gap-2 items-center text-sm">
            <MessageCircle className="w-4 h-4" /> {replyCount}
          </div>
          <div>|</div>
          <Suspense fallback={<PostAvatarFallback />}>
            <PostAvatar userId={post.userId} />
          </Suspense>
          <div className="text-sm"> {formatDate(post.createdOn)}</div>
          <Link
            scroll={false}
            className={linkStyles}
            href={`/dashboard/groups/${group.id}/info`}
          >
            {group.name}
          </Link>
        </div>

        {canDeletePost ? (
          <Button asChild className="w-fit">
            <Link href={`/dashboard/groups/${post.groupId}/posts/${post.id}`}>
              Manage post...
            </Link>
          </Button>
        ) : (
          <Button asChild className="w-fit" variant={"secondary"}>
            <Link href={`/dashboard/groups/${post.groupId}/posts/${post.id}`}>
              Read post...
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
