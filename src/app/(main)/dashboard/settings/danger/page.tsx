import { ConfigurationPanel } from "@/components/configuration-panel";
import { DeleteAccountButton } from "./delete-account-button";

export default async function DangerPage() {
  return (
    <ConfigurationPanel variant="destructive" title="Delete Account">
      <div className="flex flex-col gap-4">
        <div>You can delete your account below</div>
        <DeleteAccountButton />
      </div>
    </ConfigurationPanel>
  );
}
