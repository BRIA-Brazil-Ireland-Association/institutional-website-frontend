"use client";

import AvatarPlaceholderIcon from "@/components/Icons/AvatarPlaceholderIcon";
import { cn } from "@/libs/utils";
import Image from "next/image";
import { useState } from "react";

export type LeadershipMember = {
  id: string | number;
  area: string;
  name: string;
  avatarUrl?: string;
  avatarAlt: string;
};

const copy = {
  en: { viewAll: "View all" },
  "pt-BR": { viewAll: "Ver todos" },
} as const;

const processAreas = (members: LeadershipMember[]) =>
  Array.from(new Set(members.map((member) => member.area)));

export const TeamLeadershipGrid = ({
  members,
  locale,
}: {
  members: LeadershipMember[];
  locale: string;
}) => {
  const [activeArea, setActiveArea] = useState<string | null>(null);
  const areas = processAreas(members);
  const t = copy[locale as keyof typeof copy] ?? copy.en;
  const visibleMembers = activeArea
    ? members.filter((member) => member.area === activeArea)
    : members;

  return (
    <div>
      <div
        className="flex flex-wrap items-center justify-center gap-1.5"
        role="tablist"
      >
        <button
          aria-selected={activeArea === null}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
            activeArea === null
              ? "border border-gray-200 bg-white text-[#1a1a1a] shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
              : "border border-transparent text-[#6b6b6b] hover:text-[#1a1a1a]",
          )}
          onClick={() => setActiveArea(null)}
          role="tab"
          type="button"
        >
          {t.viewAll}
        </button>

        {areas.map((area) => (
          <button
            aria-selected={activeArea === area}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              activeArea === area
                ? "border border-gray-200 bg-white text-[#1a1a1a] shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                : "border border-transparent text-[#6b6b6b] hover:text-[#1a1a1a]",
            )}
            key={area}
            onClick={() => setActiveArea(area)}
            role="tab"
            type="button"
          >
            {area}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
        {visibleMembers.map((member) => (
          <div
            className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-gray-100 bg-[#eef0ef] shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
            key={member.id}
          >
            {member.avatarUrl ? (
              <Image
                alt={member.avatarAlt}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                fill
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
                src={member.avatarUrl}
              />
            ) : (
              <div className="flex size-full items-center justify-center text-[#b5b8b7]">
                <AvatarPlaceholderIcon className="size-16" />
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/85 to-transparent px-3.5 pt-10 pb-3.5">
              <p className="truncate text-sm font-bold text-[#1a1a1a] sm:text-base">
                {member.name}
              </p>
              <p className="truncate text-xs text-[#6b6b6b] sm:text-sm">
                {member.area}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
