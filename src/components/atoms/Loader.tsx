import { Skeleton } from "../ui/skeleton";

export function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Skeleton className="w-40 h-2 rounded-full animate-pulse" />
    </div>
  );
}
