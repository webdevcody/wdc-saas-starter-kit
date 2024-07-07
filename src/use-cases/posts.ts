import { GroupId } from "@/db/schema";
import { UserSession } from "./types";
import { getGroupById } from "@/data-access/groups";
import { isGroupOwnerUseCase, isGroupVisibleToUserUseCase } from "./membership";
import {
  createPost,
  deletePost,
  getPostById,
  getRecentPublicPostsByUserId,
  getPostsInGroup,
  updatePost,
} from "@/data-access/posts";
import { isAdminOrOwnerOfGroup } from "./authorization";
import { AuthenticationError } from "@/app/util";

// TODO: clean up this function
export async function getPostsInGroupUseCase(
  authenticatedUser: UserSession | undefined,
  groupId: GroupId
) {
  const group = await getGroupById(groupId);

  if (!group) {
    throw new Error("Group not found");
  }

  if (!isGroupVisibleToUserUseCase(authenticatedUser, groupId)) {
    throw new AuthenticationError();
  }

  const posts = await getPostsInGroup(groupId);
  return posts;
}

export async function getPostByIdUseCase(
  authenticatedUser: UserSession | undefined,
  postId: number
) {
  const post = await getPostById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  if (!isGroupVisibleToUserUseCase(authenticatedUser, post.groupId)) {
    throw new AuthenticationError();
  }

  return post;
}

export async function createPostUseCase(
  authenticatedUser: UserSession,
  {
    groupId,
    title,
    message,
  }: {
    groupId: GroupId;
    title: string;
    message: string;
  }
) {
  const group = await getGroupById(groupId);

  if (!group) {
    throw new Error("Group not found");
  }

  if (!isGroupVisibleToUserUseCase(authenticatedUser, groupId)) {
    throw new AuthenticationError();
  }

  await createPost({
    userId: authenticatedUser.id,
    groupId,
    title,
    message,
    createdOn: new Date(),
  });
}

export async function deletePostUseCase(
  authenticatedUser: UserSession,
  {
    postId,
  }: {
    postId: number;
  }
) {
  const post = await getPostById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  const group = await getGroupById(post.groupId);

  if (!group) {
    throw new Error("Group not found");
  }

  const isPostOwner = post.userId === authenticatedUser.id;

  if (!isGroupOwnerUseCase(authenticatedUser, group.id) && !isPostOwner) {
    throw new AuthenticationError();
  }

  await deletePost(postId);

  return post;
}

export async function updatePostUseCase(
  authenticatedUser: UserSession,
  {
    postId,
    message,
    title,
  }: {
    postId: number;
    message: string;
    title: string;
  }
) {
  const post = await getPostById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  const group = await getGroupById(post.groupId);

  if (!group) {
    throw new Error("Group not found");
  }

  const isPostOwner = post.userId === authenticatedUser.id;

  if (!isGroupOwnerUseCase(authenticatedUser, group.id) && !isPostOwner) {
    throw new AuthenticationError();
  }

  const updatedPost = await updatePost(postId, {
    message,
    title,
  });

  return updatedPost;
}

export async function canEditPostUseCase(
  authenticatedUser: UserSession | undefined,
  postId: number
) {
  if (!authenticatedUser) return false;

  const post = await getPostById(postId);

  if (!post) {
    return false;
  }

  return (
    (await isAdminOrOwnerOfGroup(authenticatedUser, post.groupId)) ||
    post.userId === authenticatedUser.id
  );
}

export async function getPublicPostsByUserUseCase(userId: number) {
  const posts = await getRecentPublicPostsByUserId(userId);
  return posts;
}
