"use client";

import ChevronRightIcon from "@/components/Icons/ChevronRightIcon";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/libs/utils";
import { useGlobalContext } from "@/providers/global-context";
import { getObject, getText } from "@/services/content";
import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type AnnouncementMessage = {
  href?: string;
  linkLabel?: string;
  text: string;
};

const ROTATION_INTERVAL_MS = 6000;
const MAX_TIMEOUT_MS = 2_147_483_647;

const getMsUntil = (date: string) => Date.parse(date) - Date.now();

const processAnnouncementMessages = (
  messages: unknown,
): AnnouncementMessage[] => {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages.reduce<AnnouncementMessage[]>((result, message) => {
    const text = getText(message, "text");

    if (!text) {
      return result;
    }

    result.push({
      href: getText(message, "href"),
      linkLabel: getText(message, "linkLabel"),
      text,
    });

    return result;
  }, []);
};

const linkClassName =
  "relative inline-flex items-center gap-1 font-semibold whitespace-nowrap text-[#f8e509] after:absolute after:-inset-x-1.5 after:-inset-y-3 after:content-[''] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f8e509]";

const AnnouncementLink = ({
  href,
  isActive,
  label,
}: {
  href: string;
  isActive: boolean;
  label: string;
}) => {
  const content = (
    <>
      {label}
      <ChevronRightIcon className="size-3.5" />
    </>
  );

  if (/^https?:\/\//.test(href)) {
    return (
      <a
        className={linkClassName}
        href={href}
        tabIndex={isActive ? undefined : -1}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      className={linkClassName}
      href={href}
      tabIndex={isActive ? undefined : -1}
    >
      {content}
    </Link>
  );
};

export const AnnouncementBar = () => {
  const { globalContent } = useGlobalContext();
  const pathname = usePathname() || "/";
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const announcementBar = getObject(globalContent, "announcementBar");
  const startsAt = getText(announcementBar, "startsAt");
  const [hasStarted, setHasStarted] = useState(!startsAt);
  const isEnabled = announcementBar?.enabled === true && hasStarted;
  const messages = processAnnouncementMessages(announcementBar?.messages);
  const isHome = pathname === "/";

  useEffect(() => {
    if (!startsAt) {
      return;
    }

    const wait = getMsUntil(startsAt);

    if (Number.isNaN(wait) || wait > MAX_TIMEOUT_MS) {
      return;
    }

    const timeoutId = window.setTimeout(
      () => setHasStarted(true),
      Math.max(0, wait),
    );

    return () => window.clearTimeout(timeoutId);
  }, [startsAt]);

  const shouldRotate =
    isEnabled &&
    isHome &&
    messages.length > 1 &&
    !isPaused &&
    !shouldReduceMotion;

  useEffect(() => {
    if (!shouldRotate) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % messages.length);
    }, ROTATION_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [shouldRotate, messages.length]);

  if (!isEnabled || !isHome || messages.length === 0) {
    return null;
  }

  return (
    <div
      className="w-full overflow-hidden bg-[#0b461b] text-white"
      onBlur={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto grid w-full max-w-7xl items-center px-4 py-3.5 text-center sm:px-6 lg:px-8">
        {messages.map((message, messageIndex) => {
          const isActive = messageIndex === activeIndex;

          return (
            <p
              aria-hidden={!isActive}
              className={cn(
                "text-sm leading-snug transition-[opacity,transform] duration-300 [grid-area:1/1] sm:text-[15px]",
                {
                  "translate-y-0 opacity-100": isActive,
                  "pointer-events-none invisible translate-y-2 opacity-0":
                    !isActive,
                },
              )}
              key={messageIndex}
            >
              {message.text}
              {message.href && message.linkLabel && (
                <>
                  {" "}
                  <AnnouncementLink
                    href={message.href}
                    isActive={isActive}
                    label={message.linkLabel}
                  />
                </>
              )}
            </p>
          );
        })}
      </div>
    </div>
  );
};
