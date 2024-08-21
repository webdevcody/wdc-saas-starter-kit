import { redirect } from "next/navigation";

export default function GroupPage(props: { params: { groupId: string } }) {
  redirect(`/dashboard/groups/${props.params.groupId}/info`);
}
