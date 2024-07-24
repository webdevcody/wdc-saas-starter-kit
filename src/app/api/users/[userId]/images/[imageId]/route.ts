import { streamImageFromUrl } from "@/app/api/streams";
import { env } from "@/env";
import { getProfileImageUrlUseCase } from "@/use-cases/users";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { userId: string; imageId: string } }
) => {
  try {
    const userId = params.userId;

    if (!params.imageId) {
      return NextResponse.json(
        { error: "Image ID is required" },
        { status: 400 }
      );
    }

    const url =
      params.imageId === "default"
        ? `${env.HOST_NAME}/group.jpeg`
        : await getProfileImageUrlUseCase({
            userId: parseInt(userId),
            imageId: params.imageId,
          });

    return streamImageFromUrl(url);
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
};
