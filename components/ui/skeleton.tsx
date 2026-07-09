type SkeletonProps = {
  className?: string;
  label?: string;
  text?: string;
};

export function Skeleton({
  className = "",
  label = "Loading content",
  text,
}: SkeletonProps) {
  return (
    <div
      aria-label={label}
      className={`animate-pulse bg-[#f0f0f0] ${className}`}
      role="status"
    >
      {text ? text : <span className="sr-only">{label}</span>}
    </div>
  );
}
