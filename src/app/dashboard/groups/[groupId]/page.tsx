import { safeRoute } from "@/lib/safe-route";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  params: z.object({
    groupId: z.number(),
  }),
});

export default safeRoute(schema, async (props) => {
  redirect(`/dashboard/groups/${props.params.groupId}/info`);
});
