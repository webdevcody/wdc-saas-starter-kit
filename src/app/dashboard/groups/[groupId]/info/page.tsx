import { EditGroupInfoForm } from "./edit-group-info-form";
import { getCurrentUser } from "@/lib/session";
import {
  getPublicGroupInfoByIdUseCase,
  isAdminOrOwnerOfGroupUseCase,
} from "@/use-cases/groups";
import { getGroupImageUrl } from "../settings/util";
import Image from "next/image";
import {
  DiscordIcon,
  GithubIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/icons";
import Link from "next/link";
import { socialIconStyles } from "@/styles/icons";
import { NotFoundError } from "@/app/util";
import { cardStyles, pageTitleStyles } from "@/styles/common";
import { cn } from "@/lib/utils";

export default async function InfoPage({
  params,
}: {
  params: { groupId: string };
}) {
  const { groupId } = params;

  const user = await getCurrentUser();

  const isAdminOrOwner = await isAdminOrOwnerOfGroupUseCase(
    user,
    parseInt(groupId)
  );

  const group = await getPublicGroupInfoByIdUseCase(parseInt(groupId));

  if (!group) {
    throw new NotFoundError("Group not found");
  }

  return (
    <div className="space-y-8">
      <h1 className={cn(pageTitleStyles, "flex justify-between items-center")}>
        <div>Info</div>
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div
          className={cn(
            cardStyles,
            "w-full lg:w-[300px] p-4 lg:p-8 flex-shrink-0 space-y-8 order-first lg:order-last"
          )}
        >
          <Image
            src={getGroupImageUrl(group)}
            width={300}
            height={200}
            alt="image of the group"
            className="rounded-lg object-cover w-full mb-8 max-h-[100px] md:max-h-[150px]"
          />

          <div className="break-words">{group.description}</div>

          <div className="flex justify-center gap-6">
            {group.githubLink && (
              <Link
                href={group.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2"
              >
                <GithubIcon className={socialIconStyles} />
              </Link>
            )}
            {group.youtubeLink && (
              <Link
                href={group.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2"
              >
                <YoutubeIcon className={socialIconStyles} />
              </Link>
            )}
            {group.discordLink && (
              <Link
                href={group.discordLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2"
              >
                <DiscordIcon className={socialIconStyles} />
              </Link>
            )}
            {group.xLink && (
              <Link
                href={group.xLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2"
              >
                <XIcon className={socialIconStyles} />
              </Link>
            )}
          </div>
        </div>

        <div className="flex-grow w-full lg:w-auto">
          <EditGroupInfoForm
            isAdminOrOwner={isAdminOrOwner}
            groupId={group.id}
            info={group.info ?? ""}
          />
        </div>
      </div>
    </div>
  );
}
