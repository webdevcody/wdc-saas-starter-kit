import { ConfigurationPanel } from "@/components/configuration-panel";
import { LogoutAllDevicesButton } from "./logout-all-devices-button";

export default async function SecurityPage() {
  return (
    <ConfigurationPanel title="Sessions">
      <div className="flex flex-col gap-4">
        <p>
          If you're logged in on multiple devices, you can force a logout on all
          of them.
        </p>

        <div className="w-fit">
          <LogoutAllDevicesButton />
        </div>
      </div>
    </ConfigurationPanel>
  );
}
