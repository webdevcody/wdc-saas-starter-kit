import { cn } from "@/lib/utils";

type BoundedProps = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
};

export default function Container({
  as: Component = "section",
  className,
  children,
  ...restProps
}: BoundedProps) {
  return (
    <Component
      className={cn("px-5 py-14 md:px-6 md:py-20 lg:py-24", className)}
      {...restProps}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        {children}
      </div>
    </Component>
  );
}
