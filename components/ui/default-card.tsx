import { cn } from "@/libs/utils";
import type { HTMLAttributes, ReactNode } from "react";

type DefaultCardProps = {
  hoverable?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, "className" | "children">;

const baseClasses =
  "rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-shadow";

const hoverableClasses = "hover:shadow-xl";

export const DefaultCard = ({
  hoverable = false,
  className,
  children,
  ...rest
}: DefaultCardProps) => {
  return (
    <div
      className={cn(baseClasses, hoverable && hoverableClasses, className)}
      {...rest}
    >
      {children}
    </div>
  );
};
