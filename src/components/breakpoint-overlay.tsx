"use client";

export function BreakpointOverlay() {
  if (process.env.NEXT_PUBLIC_IS_LOCAL !== "true") return null;

  return (
    <div className="fixed bottom-2 right-2 bg-yellow-300/50 bg-opacity-75 text-white px-2 py-1 rounded-md text-sm z-50">
      <span className="sm:hidden">xs</span>
      <span className="hidden sm:inline md:hidden">sm</span>
      <span className="hidden md:inline lg:hidden">md</span>
      <span className="hidden lg:inline xl:hidden">lg</span>
      <span className="hidden xl:inline 2xl:hidden">xl</span>
      <span className="hidden 2xl:inline">2xl</span>
    </div>
  );
}
