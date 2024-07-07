import { BannerUploadForm } from "@/app/dashboard/groups/[groupId]/settings/banner-upload-form";
import { getGroupImageUrl } from "@/app/dashboard/groups/[groupId]/settings/util";
import { GroupVisibilitySwitch } from "@/app/dashboard/groups/[groupId]/settings/visibility-switch";
import { assertAuthenticated } from "@/lib/session";
import { pageTitleStyles } from "@/styles/common";
import { getGroupByIdUseCase } from "@/use-cases/groups";
import Image from "next/image";
import { GroupNameForm } from "./group-name-form";
import { ConfigurationPanel } from "@/components/configuration-panel";
import { GroupDescriptionForm } from "./group-description-form";
import { SocialLinksForm } from "./social-links-form";

export default async function Settings({
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
      <h1 className={pageTitleStyles}>Group Settings</h1>

      <div className="grid grid-cols-3 gap-8">
        <ConfigurationPanel title={"Group Image"}>
          <div className="flex flex-col gap-8">
            <Image
              src={getGroupImageUrl(group)}
              width={200}
              height={200}
              className="w-full h-[100px] object-cover"
              alt="image of the group"
            />
            <p className="dark:text-gray-400">
              Upload a group image to make your group stand out.
            </p>
            <BannerUploadForm groupId={group.id} />
          </div>
        </ConfigurationPanel>

        <ConfigurationPanel title={"Group Name"}>
          <GroupNameForm groupId={group.id} groupName={group?.name ?? ""} />
        </ConfigurationPanel>

        <ConfigurationPanel title={"Group Visibility"}>
          <div className="flex flex-col gap-8">
            <p className="dark:text-gray-400">
              Groups are private by default. If you want random people on the
              internet to find and join your group without an invite, switch
              this to on.
            </p>
            <GroupVisibilitySwitch group={group} />
          </div>
        </ConfigurationPanel>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <ConfigurationPanel title={"Group Description"}>
          <GroupDescriptionForm
            groupId={group.id}
            description={group?.description ?? ""}
          />
        </ConfigurationPanel>

        <ConfigurationPanel title={"Social Links"}>
          <SocialLinksForm group={group} />
        </ConfigurationPanel>
      </div>
    </div>
  );
}
