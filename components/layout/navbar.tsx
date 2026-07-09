"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/libs/utils";
import { useEffect, useMemo, useState } from "react";
import { BriaLogo } from "../ui/bria-logo";
import { LanguageSelector } from "./language-selector";

type MenuItem = {
  id?: number;
  label: string;
  url?: string;
  href?: string;
};

type NavbarProps = {
  menuItems?: MenuItem[];
};

export function Navbar({ menuItems = [] }: NavbarProps) {
  const [isPinned, setIsPinned] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nextIsPinned = window.scrollY > 24;

      setIsPinned((currentIsPinned) =>
        currentIsPinned === nextIsPinned ? currentIsPinned : nextIsPinned,
      );
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const translatedMenuItems = useMemo(() => {
    return menuItems.map((item) => {
      return {
        id: item.id ?? item.url ?? item.href ?? item.label,
        label: item.label,
        url: item.url ?? item.href ?? "#",
      };
    });
  }, [menuItems]);
  const hasMenuItems = translatedMenuItems.length > 0;

  const navPositionClass = isPinned
    ? "fixed inset-x-0 top-0 shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
    : "relative shadow-[0_5px_18px_rgba(0,0,0,0.14)]";

  return (
    <div className={cn(isPinned && "min-h-20")}>
      <nav
        className={cn(
          navPositionClass,
          "z-50 bg-white text-black transition-[box-shadow,transform] duration-300",
        )}
      >
        <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            aria-label="BRIA"
            className="flex shrink-0 items-center"
            href="/"
            onClick={() => setIsOpen(false)}
          >
            <BriaLogo
              className="h-auto w-32 sm:w-40"
              height={64}
              priority
              width={160}
            />
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {hasMenuItems ? (
              <ul className="flex items-center text-sm font-medium">
                {translatedMenuItems.map((item) => (
                  <li className="flex items-center" key={item.id}>
                    <Link
                      className="px-5 py-3 whitespace-nowrap transition-colors hover:text-[#169b62] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#169b62]"
                      href={item.url}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}

            <LanguageSelector />
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <LanguageSelector compact />
            {hasMenuItems ? (
              <button
                aria-expanded={isOpen}
                aria-label={
                  isOpen ? "Close navigation menu" : "Open navigation menu"
                }
                className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-sm border border-black/15 transition-colors hover:border-black/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#169b62]"
                onClick={() => setIsOpen((currentIsOpen) => !currentIsOpen)}
                type="button"
              >
                <span className="h-0.5 w-5 bg-current" />
                <span className="h-0.5 w-5 bg-current" />
                <span className="h-0.5 w-5 bg-current" />
              </button>
            ) : null}
          </div>
        </div>

        {isOpen && hasMenuItems ? (
          <div className="border-t border-black/10 bg-white px-4 py-3 shadow-[0_12px_24px_rgba(0,0,0,0.12)] lg:hidden">
            <ul className="mx-auto flex max-w-7xl flex-col divide-y divide-black/10 text-base font-medium">
              {translatedMenuItems.map((item) => (
                <li key={item.id}>
                  <Link
                    className="block py-4 transition-colors hover:text-[#169b62] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#169b62]"
                    href={item.url}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </nav>
    </div>
  );
}
