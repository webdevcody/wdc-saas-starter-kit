import { redirect } from "next/navigation";

export default async function GroupPage(props: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = await props.params;
  redirect(`/dashboard/groups/${groupId}/info`);
}
