import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import {
  formGroupStyles,
  pageTitleStyles,
  pageWrapperStyles,
} from "@/styles/common";
import { searchPublicGroupsUseCase } from "@/use-cases/groups";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { GroupCard } from "@/app/dashboard/group-card";
import { PageHeader } from "@/components/page-header";
import Image from "next/image";
import { GroupPagination } from "./pagination";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import Link from "next/link";

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: { search?: string; page?: string };
}) {
  const search = searchParams.search;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  return (
    <>
      <PageHeader>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-8 flex-grow">
            <h1 className={pageTitleStyles}>Browse Groups</h1>

            <form
              key={search}
              action={async (formData: FormData) => {
                "use server";
                const searchString = formData.get("search") as string;
                redirect(
                  searchString ? `/browse?search=${searchString}` : "/browse"
                );
              }}
            >
              <div className={formGroupStyles}>
                <div className="flex gap-2 items-center">
                  <div className="flex relative max-w-md w-full">
                    <Input
                      defaultValue={search}
                      placeholder="basketball, programming, crafting, etc."
                      name="search"
                      id="group"
                    />
                    {search && (
                      <Button
                        size="icon"
                        variant="link"
                        className="absolute right-1"
                        asChild
                      >
                        <Link href={`/browse`}>
                          <XIcon />
                        </Link>
                      </Button>
                    )}
                  </div>
                  <SubmitButton>Search</SubmitButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </PageHeader>

      <div className={pageWrapperStyles}>
        <Suspense fallback={<GroupsListSkeleton />}>
          <GroupsList page={page} search={search} />
        </Suspense>
      </div>
    </>
  );
}

function GroupsListSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-8">
      {new Array(6).fill("").map((v, idx) => (
        <div key={idx} className="rounded border p-4 space-y-4 h-[300px]">
          <Skeleton className="w-[140px] h-[20px] rounded" />
          <Skeleton className="h-[40px] rounded w-full" />
          <Skeleton className="w-[80px] h-[40px] rounded" />
        </div>
      ))}
    </div>
  );
}

async function GroupsList({ search, page }: { search?: string; page: number }) {
  const { data, perPage, total } = await searchPublicGroupsUseCase(
    search ?? "",
    page
  );

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-8 bg-slate-900 rounded-xl">
        <Image
          src="/empty-state/mountain.svg"
          width="200"
          height="200"
          alt="no gruops placeholder image"
        ></Image>
        <h2 className="text-2xl">No groups matching your search</h2>
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-3 gap-8">
        {data.map((group) => (
          <GroupCard
            memberCount={group.memberCount.toString()}
            key={group.id}
            group={group}
            buttonText="View"
          />
        ))}
      </div>

      <GroupPagination
        search={search ?? ""}
        page={page}
        totalPages={Math.ceil(total / perPage)}
      />
    </>
  );
}
