import { cn } from "@/libs/utils";

export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className="w-full p-4">
      <div
        className={cn(
          "w-ful animate-pulse space-y-2.5 rounded-md bg-gray-100",
          className,
        )}
      />
    </div>
  );
}
