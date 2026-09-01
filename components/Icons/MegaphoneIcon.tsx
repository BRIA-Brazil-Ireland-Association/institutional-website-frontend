export default function MegaphoneIcon({
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
      <path d="M3 10.5v3a1 1 0 0 0 1 1h2l7 3.5v-12L6 9.5H4a1 1 0 0 0-1 1Z" />
      <path d="M17.5 9a3.5 3.5 0 0 1 0 6M20 6a7 7 0 0 1 0 12" />
      <path d="M8 15v2.5a1.75 1.75 0 0 0 3.5 0V16" />
    </svg>
  );
}
