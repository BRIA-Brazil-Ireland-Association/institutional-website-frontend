import ChevronRightIcon from "@/components/Icons/ChevronRightIcon";
import { formatEventDate } from "@/helpers/format-event-date";
import { Link } from "@/i18n/navigation";
import { cn } from "@/libs/utils";
import { getText } from "@/services/content";
import Image from "next/image";

type EventCardProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  event: any;
  isPast: boolean;
  locale: string;
};

const LINK_LABELS: Record<string, { en: string; pt: string }> = {
  details: { en: "View details", pt: "Ver detalhes" },
  register: { en: "Register", pt: "Inscreva-se" },
  tickets: { en: "Tickets", pt: "Ingressos" },
};

export const EventCard = ({ event, isPast, locale }: EventCardProps) => {
  const eventTitle = getText(event, "title");
  const eventDescription = getText(event, "description");
  const eventUrl = isPast ? undefined : getText(event, "url");
  const eventImageText = getText(event, "image");
  const eventImage = eventImageText?.startsWith("https://")
    ? eventImageText
    : undefined;
  const isExternalUrl = Boolean(eventUrl?.startsWith("https://"));
  const isInternalUrl = Boolean(eventUrl?.startsWith("/"));
  const hasLink = isExternalUrl || isInternalUrl;
  const eventDate = formatEventDate(getText(event, "date"), locale);
  const isOndeTem = getText(event, "origin") === "ondetem";
  const eventLinkType = getText(event, "linkType");
  const linkLabels =
    LINK_LABELS[eventLinkType ?? "register"] ?? LINK_LABELS.register;
  const registerLabel = locale === "pt-BR" ? linkLabels.pt : linkLabels.en;
  const newTabLabel =
    locale === "pt-BR" ? "(abre em nova aba)" : "(opens in a new tab)";

  const cardClassName = cn(
    "relative flex overflow-hidden rounded-md bg-white shadow-[0_10px_24px_rgba(0,0,0,0.08)]",
    isOndeTem && "border border-[#104722]/50",
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
        {isOndeTem && (
          <span className="mt-1.5 flex items-center gap-1 text-[10px] leading-none text-[#3d3d3d]">
            <Image
              alt="OndeTem"
              className="h-5 w-auto"
              height={112}
              src="/assets/partner/ondetem-logo.png"
              width={283}
            />
          </span>
        )}
      </span>

      {eventImage && (
        <span
          className={cn(
            "relative size-24 shrink-0 self-center overflow-hidden rounded-md bg-[#d4ecf6]",
            hasLink ? "mr-8" : "mr-3",
          )}
        >
          <Image
            alt=""
            className="object-cover"
            fill
            sizes="56px"
            src={eventImage}
            unoptimized
          />
        </span>
      )}

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
