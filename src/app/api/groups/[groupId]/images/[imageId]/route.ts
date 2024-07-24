import { streamImageFromUrl } from "@/app/api/streams";
import { env } from "@/env";
import { getCurrentUser } from "@/lib/session";
import { getGroupImageUrlUseCase } from "@/use-cases/files";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { groupId: string; imageId: string } }
) => {
  try {
    const groupId = parseInt(params.groupId);

    const user = await getCurrentUser();

    const url =
      params.imageId === "default"
        ? `${env.HOST_NAME}/group.jpeg`
        : await getGroupImageUrlUseCase(user, {
            imageId: params.imageId,
            groupId,
          });

    return streamImageFromUrl(url);
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
};
