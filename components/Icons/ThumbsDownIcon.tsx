export default function ThumbsDownIcon({
  className = "size-6",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        d="M17 14V3h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-3Zm0 0-5.5 7a2 2 0 0 1-2-2.5l1-4.5H5a2 2 0 0 1-1.94-2.5l1.6-6.5A2 2 0 0 1 6.6 3H14a3 3 0 0 1 3 3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
