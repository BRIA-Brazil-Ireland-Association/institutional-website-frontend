export default function AvatarPlaceholderIcon({
  className = "size-6",
}: {
  className?: string;
}) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-9 2.24-9 5v1a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1c0-2.76-4.58-5-9-5Z" />
    </svg>
  );
}
