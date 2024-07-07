import { assertAuthenticated } from "@/lib/session";
import { pageTitleStyles } from "@/styles/common";
import { getGroupByIdUseCase } from "@/use-cases/groups";
import { ConfigurationPanel } from "@/components/configuration-panel";
import { DeleteGroupButton } from "./delete-group-button";

export default async function DangerTab({
  params,
}: {
  params: { groupId: string };
}) {
  const user = await assertAuthenticated();
  const group = await getGroupByIdUseCase(user, parseInt(params.groupId));

  if (!group) {
    return <div>Group not found</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className={pageTitleStyles}>Danger</h1>

      <div className="grid grid-cols-2 gap-8">
        <ConfigurationPanel variant="destructive" title={"Delete this Group"}>
          <div className="flex flex-col gap-8">
            <p className="dark:text-gray-400">
              Delete this group and all it's data.
            </p>
            <DeleteGroupButton />
          </div>
        </ConfigurationPanel>
      </div>
    </div>
  );
}
