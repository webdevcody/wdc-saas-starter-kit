import { streamImageFromUrl } from "@/app/(main)/api/streams";
import { env } from "@/env";
import { getProfileImageUrlUseCase } from "@/use-cases/users";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ userId: string; imageId: string }> }
) => {
  const { userId, imageId } = await params;
  try {
    if (!imageId) {
      return NextResponse.json(
        { error: "Image ID is required" },
        { status: 400 }
      );
    }

    const url =
      imageId === "default"
        ? `${env.HOST_NAME}/group.jpeg`
        : await getProfileImageUrlUseCase({
            userId: parseInt(userId),
            imageId: imageId,
          });

    return streamImageFromUrl(url);
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
};
