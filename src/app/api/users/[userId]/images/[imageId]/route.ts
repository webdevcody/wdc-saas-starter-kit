import { env } from "@/env";
import { getProfileImageUrlUseCase } from "@/use-cases/users";
import { NextResponse } from "next/server";

export async function streamImageFromUrl(url: string) {
  const fetchResponse = await fetch(url);

  if (!fetchResponse.ok) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const file = fetchResponse.body;

  if (!file) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const contentType = fetchResponse.headers.get("content-type") || "image/*";
  const contentLength =
    Number(fetchResponse.headers.get("content-length")) || 0;

  const stream = new ReadableStream({
    start(controller) {
      const reader = file.getReader();
      const pump = () => {
        reader.read().then(({ done, value }) => {
          if (done) {
            controller.close();
            return;
          }
          controller.enqueue(value);
          pump();
        });
      };
      pump();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": contentType,
      "Content-Length": String(contentLength),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

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
