import { redirect } from "next/navigation";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  redirect(`/users/${userId}/info`);
}
