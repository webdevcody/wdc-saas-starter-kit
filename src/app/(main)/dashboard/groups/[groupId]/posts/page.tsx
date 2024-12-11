import { getCurrentUser } from "@/lib/session";
import { cardStyles, pageTitleStyles } from "@/styles/common";
import { getPostsInGroupUseCase } from "@/use-cases/posts";
import Image from "next/image";
import { CreatePostButton } from "./create-post-button";
import { PostCard } from "./post-card";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  isGroupVisibleToUserUseCase,
  isUserMemberOfGroupUseCase,
} from "@/use-cases/membership";
import { cn } from "@/lib/utils";

export default async function PostsPage({
  params,
}: {
  params: { groupId: string };
}) {
  const { groupId } = params;

  const user = await getCurrentUser();
  const canPost = await isUserMemberOfGroupUseCase(user, parseInt(groupId));

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h2 className={pageTitleStyles}>Posts</h2>
        {canPost && <CreatePostButton />}
      </div>

      <Suspense fallback={<PostsListLoader />}>
        <PostsList groupId={groupId} />
      </Suspense>
    </div>
  );
}

function PostsListLoader() {
  return new Array(4).fill("").map(() => {
    return <Skeleton className="h-40 w-full" />;
  });
}

async function PostsList({ groupId }: { groupId: string }) {
  const user = await getCurrentUser();

  const posts = await getPostsInGroupUseCase(user, parseInt(groupId));

  return (
    <>
      {posts.length === 0 && (
        <div
          className={cn(
            cardStyles,
            "flex flex-col gap-8 justify-center items-center py-12"
          )}
        >
          <Image
            src="/empty-state/no-data.svg"
            width="200"
            height="200"
            alt="no image placeholder image"
          ></Image>
          <h2>No posts created yet</h2>
          <CreatePostButton />
        </div>
      )}

      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}
