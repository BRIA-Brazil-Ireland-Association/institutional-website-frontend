"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/libs/utils";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";

type LanguageSelectorProps = {
  compact?: boolean;
};

function IrelandFlag() {
  return (
    <span
      aria-hidden="true"
      className="grid h-4 w-5 shrink-0 grid-cols-3 overflow-hidden rounded-[1px] ring-1 ring-black/10"
    >
      <span className="bg-[#169b62]" />
      <span className="bg-white" />
      <span className="bg-[#ff883e]" />
    </span>
  );
}

function BrazilFlag() {
  return (
    <span
      aria-hidden="true"
      className="relative h-4 w-5 shrink-0 overflow-hidden rounded-[1px] bg-[#009b3a] ring-1 ring-black/10"
    >
      <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#ffdf00]" />
      <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#002776]" />
    </span>
  );
}

export function LanguageSelector({ compact = false }: LanguageSelectorProps) {
  const locale = useLocale();
  const pathname = usePathname() || "/";
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const languages = [
    {
      Flag: IrelandFlag,
      ariaLabel: "Switch to English",
      code: "EN",
      locale: "en",
    },
    {
      Flag: BrazilFlag,
      ariaLabel: "Switch to Portuguese",
      code: compact ? "PT" : "PT-BR",
      locale: "pt-BR",
    },
  ];
  const selectedLanguage =
    languages.find((language) => language.locale === locale) ?? languages[0];

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const SelectedFlag = selectedLanguage.Flag;

  return (
    <div
      aria-label="Language selector"
      className="relative text-sm font-medium"
      ref={containerRef}
    >
      <button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex min-h-9 items-center gap-1.5 whitespace-nowrap rounded-sm px-2 text-black transition-colors hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#169b62]"
        onClick={() => setIsOpen((currentIsOpen) => !currentIsOpen)}
        type="button"
      >
        <span>{selectedLanguage.code}</span>
        <SelectedFlag />
        <span
          aria-hidden="true"
          className={cn(
            "h-1.5 w-1.5 rotate-45 border-b border-r border-current transition-transform",
            isOpen && "rotate-[225deg]",
          )}
        />
      </button>

      {isOpen ? (
        <div
          className="absolute right-0 top-full z-50 mt-2 min-w-28 overflow-hidden rounded-sm border border-black/10 bg-white py-1 shadow-[0_10px_24px_rgba(0,0,0,0.16)]"
          role="menu"
        >
          {languages.map(({ Flag, ariaLabel, code, locale: languageLocale }) => {
            const isActive = locale === languageLocale;

            return (
              <Link
                aria-label={ariaLabel}
                className={cn(
                  "flex items-center justify-between gap-3 px-3 py-2 text-left transition-colors hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#169b62]",
                  isActive ? "text-black" : "text-black/55",
                )}
                href={pathname}
                key={languageLocale}
                locale={languageLocale}
                onClick={() => setIsOpen(false)}
                role="menuitem"
              >
                <span>{code}</span>
                <Flag />
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
