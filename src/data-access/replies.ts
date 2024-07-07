import { database } from "@/db";
import { NewReply, Reply, reply } from "@/db/schema";
import { count, eq } from "drizzle-orm";

export async function getReplyCountOnPost(postId: number) {
  const [{ count: total }] = await database
    .select({ count: count() })
    .from(reply)
    .where(eq(reply.postId, postId));
  return total;
}

export async function getRepliesOnPost(postId: number) {
  const posts = await database.query.reply.findMany({
    where: eq(reply.postId, postId),
  });
  return posts;
}

export async function createReply(newReply: NewReply) {
  const [createdReply] = await database
    .insert(reply)
    .values(newReply)
    .returning();
  return createdReply;
}

export async function getReplyById(replyId: number) {
  return await database.query.reply.findFirst({
    where: eq(reply.id, replyId),
  });
}

export async function deleteReply(replyId: number) {
  await database.delete(reply).where(eq(reply.id, replyId));
}

export async function updateReply(
  replyId: number,
  updatedRelpy: Partial<Reply>
) {
  const [updatedReply] = await database
    .update(reply)
    .set(updatedRelpy)
    .where(eq(reply.id, replyId))
    .returning();

  return updatedReply;
}
