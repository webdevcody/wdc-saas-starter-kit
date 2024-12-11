import { afterLoginUrl } from "@/app-config";
import { rateLimitByIp } from "@/lib/limiter";
import { setSession } from "@/lib/session";
import { loginWithMagicLinkUseCase } from "@/use-cases/magic-link";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  try {
    await rateLimitByIp({ key: "magic-token", limit: 5, window: 60000 });
    const url = new URL(request.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/sign-in",
        },
      });
    }

    const user = await loginWithMagicLinkUseCase(token);

    await setSession(user.id);

    return new Response(null, {
      status: 302,
      headers: {
        Location: afterLoginUrl,
      },
    });
  } catch (err) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/sign-in/magic/error",
      },
    });
  }
}
