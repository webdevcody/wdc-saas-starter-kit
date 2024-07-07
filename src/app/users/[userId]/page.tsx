import { redirect } from "next/navigation";

export default async function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  redirect(`/users/${params.userId}/info`);
}
