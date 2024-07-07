"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function NotFound() {
  const { groupId } = useParams();

  return (
    <div>
      <Image
        src="/empty-state/no-data.svg"
        width="200"
        height="200"
        alt="no image placeholder image"
      ></Image>
      <h2>Uhoh, this route wasn't found</h2>
      <Button asChild>
        <Link href={`/dashboard/groups/${groupId}/info`}>View Group Info</Link>
      </Button>
    </div>
  );
}
