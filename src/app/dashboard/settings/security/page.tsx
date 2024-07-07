import { ConfigurationPanel } from "@/components/configuration-panel";
import { LogoutButton } from "./logout-button";

export default async function SecurityPage() {
  return <SessionsPanel />;
}
export async function SessionsPanel() {
  return (
    <ConfigurationPanel title="Sessions">
      <div className="flex flex-col gap-4">
        <p>
          If you're logged in on multiple devices, you can force a logout on all
          of them.
        </p>

        <div className="w-fit">
          <LogoutButton />
        </div>
      </div>
    </ConfigurationPanel>
  );
}
