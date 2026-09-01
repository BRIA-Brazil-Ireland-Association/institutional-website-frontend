export default function VolunteersHandsIcon({
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
      <path d="M8 21v-7.5L6 9a1.4 1.4 0 0 1 2.5-1l1.5 3.2" />
      <path d="M16 21v-7.5L18 9a1.4 1.4 0 0 0-2.5-1l-1.5 3.2" />
      <path d="M10 21v-8a1.4 1.4 0 0 1 2.8 0" />
      <path d="M12.8 21v-6.5a1.4 1.4 0 0 1 2.8 0V21" />
    </svg>
  );
}
