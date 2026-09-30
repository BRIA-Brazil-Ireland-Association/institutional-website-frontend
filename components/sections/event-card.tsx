import ChevronRightIcon from "@/components/Icons/ChevronRightIcon";
import { formatEventDate } from "@/helpers/format-event-date";
import { Link } from "@/i18n/navigation";
import { cn } from "@/libs/utils";
import { getText } from "@/services/content";

type EventCardProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  event: any;
  isPast: boolean;
  locale: string;
};

export const EventCard = ({ event, isPast, locale }: EventCardProps) => {
  const eventTitle = getText(event, "title");
  const eventDescription = getText(event, "description");
  const eventUrl = isPast ? undefined : getText(event, "url");
  const isExternalUrl = Boolean(eventUrl?.startsWith("https://"));
  const isInternalUrl = Boolean(eventUrl?.startsWith("/"));
  const hasLink = isExternalUrl || isInternalUrl;
  const eventDate = formatEventDate(getText(event, "date"), locale);
  const registerLabel = locale === "pt-BR" ? "Inscreva-se" : "Register";
  const newTabLabel =
    locale === "pt-BR" ? "(abre em nova aba)" : "(opens in a new tab)";

  const cardClassName = cn(
    "relative flex overflow-hidden rounded-md bg-white shadow-[0_10px_24px_rgba(0,0,0,0.08)]",
    isPast && "opacity-50 grayscale",
    hasLink && "transition-shadow hover:shadow-[0_14px_28px_rgba(0,0,0,0.16)]",
  );

  const cardContent = (
    <>
      {eventDate && (
        <span className="flex w-16 shrink-0 flex-col items-center justify-center bg-[#104722] px-2 py-3 text-white">
          <span className="text-3xl leading-none font-bold">
            {eventDate.day}
          </span>
          <span className="mt-1 text-sm leading-none font-semibold uppercase">
            {eventDate.month}
          </span>
        </span>
      )}

      <span className="flex-1 p-3 pb-5">
        {eventTitle && (
          <span className="block border-b border-[#1a1a1a]/60 pb-1 text-sm font-bold text-[#1a1a1a]">
            {eventTitle}
          </span>
        )}
        {eventDescription && (
          <span className="mt-1.5 block text-xs leading-snug text-[#3d3d3d]">
            {eventDescription}
          </span>
        )}
        {isExternalUrl && (
          <span className="mt-2 inline-block text-xs font-semibold text-[#104722] underline underline-offset-2">
            {registerLabel}
            <span className="sr-only"> {newTabLabel}</span>
          </span>
        )}
      </span>

      {hasLink && (
        <span
          aria-hidden="true"
          className="absolute right-0 bottom-0 flex h-5 w-6 items-center justify-center bg-[#104722] text-white"
        >
          <ChevronRightIcon className="size-3" />
        </span>
      )}
    </>
  );

  if (isExternalUrl) {
    return (
      <a
        className={cardClassName}
        href={eventUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        {cardContent}
      </a>
    );
  }

  if (isInternalUrl) {
    return (
      <Link className={cardClassName} href={eventUrl!}>
        {cardContent}
      </Link>
    );
  }

  return <div className={cardClassName}>{cardContent}</div>;
};
