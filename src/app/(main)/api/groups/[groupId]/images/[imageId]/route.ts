import { streamImageFromUrl } from "@/app/(main)/api/streams";
import { env } from "@/env";
import { getCurrentUser } from "@/lib/session";
import { getGroupImageUrlUseCase } from "@/use-cases/files";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ groupId: string; imageId: string }> }
) => {
  try {
    let { groupId, imageId } = await params;
    const groupIdInt = parseInt(groupId);

    const user = await getCurrentUser();

    const url =
      imageId === "default"
        ? `${env.HOST_NAME}/group.jpeg`
        : await getGroupImageUrlUseCase(user, {
            imageId,
            groupId: groupIdInt,
          });

    return streamImageFromUrl(url);
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
};
