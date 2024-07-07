"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tabStyles } from "@/styles/common";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SettingsTab({ hasSubscription }: { hasSubscription: boolean }) {
  const path = usePathname();
  const tabInUrl = path.split("/").pop();

  return (
    <div className={tabStyles}>
      <div className="container mx-auto">
        <Tabs value={tabInUrl} defaultValue={tabInUrl} activationMode="manual">
          <TabsList className="space-x-4 bg-inherit">
            <TabsTrigger asChild value="profile">
              <Link href={`/dashboard/settings/profile`}>Profile</Link>
            </TabsTrigger>

            <TabsTrigger asChild value="security">
              <Link href={`/dashboard/settings/security`}>Security</Link>
            </TabsTrigger>

            {hasSubscription && (
              <TabsTrigger asChild value="subscription">
                <Link href={`/dashboard/settings/subscription`}>
                  Subscription
                </Link>
              </TabsTrigger>
            )}

            <TabsTrigger asChild value="danger">
              <Link href={`/dashboard/settings/danger`}>Danger</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
