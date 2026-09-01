export default function PartnersHandshakeIcon({
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
      <path d="M3 10h3.5l3 2.5 2.5-2 2.5 2 3-2.5H21" />
      <path d="M8 12.5 5 15v5a1 1 0 0 0 1 1h1.5M16 12.5 19 15v5a1 1 0 0 1-1 1h-1.5" />
    </svg>
  );
}
