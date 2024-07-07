import { cn } from "@/lib/utils";
import { cardStyles } from "@/styles/common";
import { ReactNode } from "react";

export function ConfigurationPanel({
  title,
  children,
  variant = "default",
}: {
  title: string;
  children: ReactNode;
  variant?: "destructive" | "default";
}) {
  return (
    <div
      className={cn(cardStyles, {
        "border-red-500": variant === "destructive",
      })}
    >
      <div className="border-b px-4 py-2 sm:px-6 md:py-3 bg-gray-200 dark:bg-gray-800 rounded-t-md">
        <span className="text-base sm:text-lg font-medium mb-4">{title}</span>
      </div>
      <div className="p-4 sm:px-6">
        <div className="mb-4 flex text-sm sm:text-base flex-col gap-4">
          <div className="flex gap-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
