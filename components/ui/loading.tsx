import { cn } from "@/libs/utils";

type IProps = {
  className?: string;
};

export const Spinner = ({ className = "" }: IProps) => {
  return (
    <span
      className={cn(
        "size-6 animate-spin rounded-full border-4 border-gray-200/30 border-t-gray-500/40 [animation-delay:-0.3s]",
        className,
      )}
    />
  );
};

export const Loading = ({ className = "" }: IProps) => {
  return (
    <div
      className={cn("flex w-full items-center justify-center py-20", className)}
    >
      <Spinner />
    </div>
  );
};
