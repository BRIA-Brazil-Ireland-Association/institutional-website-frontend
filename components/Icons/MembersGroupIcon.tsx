export default function MembersGroupIcon({
  className = "size-6",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="8" r="3" />
      <path d="M6 21v-1a6 6 0 0 1 12 0v1" />
      <circle cx="5" cy="10" r="2" />
      <path d="M2 21v-.5A3.5 3.5 0 0 1 5.5 17H6" />
      <circle cx="19" cy="10" r="2" />
      <path d="M22 21v-.5a3.5 3.5 0 0 0-3.5-3.5H18" />
    </svg>
  );
}
