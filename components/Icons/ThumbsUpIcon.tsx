export default function ThumbsUpIcon({
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
        d="M7 10v11H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h3Zm0 0 5.5-7a2 2 0 0 1 2 2.5L13.5 10H19a2 2 0 0 1 1.94 2.5l-1.6 6.5A2 2 0 0 1 17.4 21H10a3 3 0 0 1-3-3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
