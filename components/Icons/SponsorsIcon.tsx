export default function SponsorsIcon({
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
      <path d="m12 2.5 1.3 2.7 2.9.4-2.1 2 .5 2.9L12 9.1l-2.6 1.4.5-2.9-2.1-2 2.9-.4L12 2.5Z" />
      <path d="M4 21v-4a3 3 0 0 1 3-3h1.5l4 1.5h2.8a2 2 0 0 1 0 4H12" />
    </svg>
  );
}
