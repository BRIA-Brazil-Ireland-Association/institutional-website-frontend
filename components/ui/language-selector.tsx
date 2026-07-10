"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/libs/utils";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { BrazilFlag } from "../ui/brazil-flag";
import { IrelandFlag } from "../ui/ireland-flag";

type LanguageSelectorProps = {
  compact?: boolean;
};

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
        className="flex min-h-9 items-center gap-1.5 rounded-sm px-2 whitespace-nowrap text-black transition-colors hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#169b62]"
        onClick={() => setIsOpen((currentIsOpen) => !currentIsOpen)}
        type="button"
      >
        <SelectedFlag />
        <span className="font-semibold">{selectedLanguage.code}</span>
        <span
          aria-hidden="true"
          className={cn(
            "h-1.5 w-1.5 rotate-45 border-r border-b border-current transition-transform",
            isOpen && "rotate-[225deg]",
          )}
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-full right-0 z-50 mt-2 min-w-28 overflow-hidden rounded-sm border border-black/10 bg-white py-1 shadow-[0_10px_24px_rgba(0,0,0,0.16)]"
          role="menu"
        >
          {languages.map(
            ({ Flag, ariaLabel, code, locale: languageLocale }) => {
              const isActive = locale === languageLocale;

              return (
                <Link
                  aria-label={ariaLabel}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#169b62]",
                    isActive ? "text-black" : "text-black/55",
                  )}
                  href={pathname}
                  key={languageLocale}
                  locale={languageLocale}
                  onClick={() => setIsOpen(false)}
                  role="menuitem"
                >
                  <Flag />
                  <span>{code}</span>
                </Link>
              );
            },
          )}
        </div>
      )}
    </div>
  );
}
