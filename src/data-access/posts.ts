import { database } from "@/db";
import { GroupId, NewPost, Post, groups, posts, reply } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function getPostsInGroup(groupId: GroupId) {
  return await database.query.posts.findMany({
    where: eq(posts.groupId, groupId),
    limit: 20,
  });
}

export async function createPost(newPost: NewPost) {
  return await database.insert(posts).values(newPost);
}

export async function deletePost(postId: number) {
  const [post] = await database
    .delete(posts)
    .where(eq(posts.id, postId))
    .returning();
  return post;
}

export async function getPostById(postId: number) {
  return await database.query.posts.findFirst({
    where: eq(posts.id, postId),
  });
}

export async function getRecentPublicPostsByUserId(userId: number) {
  const results = await database
    .select()
    .from(posts)
    .innerJoin(groups, eq(posts.groupId, groups.id))
    .where(and(eq(groups.isPublic, true), eq(posts.userId, userId)))
    .limit(20);
  return results.map((result) => result.gf_posts);
}

export async function updatePost(postId: number, updatedPost: Partial<Post>) {
  const [post] = await database
    .update(posts)
    .set(updatedPost)
    .where(eq(posts.id, postId))
    .returning();
  return post;
}
