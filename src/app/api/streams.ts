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
