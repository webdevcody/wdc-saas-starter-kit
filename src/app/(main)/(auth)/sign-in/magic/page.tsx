import { pageTitleStyles } from "@/styles/common";

export default function MagicLinkPage() {
  return (
    <div className="py-24 mx-auto max-w-[400px] space-y-6">
      <h1 className={pageTitleStyles}>Check your email</h1>
      <p className="text-xl">
        We sent you a magic link to sign in. Click the link in your email to
        sign in.
      </p>
    </div>
  );
}
