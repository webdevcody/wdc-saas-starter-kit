import { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { ComingSoonFooter } from "@/app/(main)/(coming-soon)/footer";
import { Header } from "@/app/(main)/_header/header";
import { appConfig } from "@/app-config";

export default async function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full">
      {appConfig.mode === "live" && <Header />}
      <div>{children}</div>
      {appConfig.mode === "comingSoon" ? <ComingSoonFooter /> : <Footer />}
    </div>
  );
}
