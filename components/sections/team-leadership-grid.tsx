"use client";

import AvatarPlaceholderIcon from "@/components/Icons/AvatarPlaceholderIcon";
import LinkedinIcon from "@/components/Icons/LinkedinIcon";
import { cn } from "@/libs/utils";
import Image from "next/image";
import { useState } from "react";

export type LeadershipMember = {
  area: string;
  name: string;
  avatarUrl?: string;
  avatarAlt: string;
  linkedinUrl?: string;
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
            "cursor-pointer rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] shadow-lg",
            { "shadow-none": activeArea !== null },
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
              "cursor-pointer rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a]",
              { "shadow-lg": activeArea === area },
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

      <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-5">
        {visibleMembers.map((member, memberIndex) => (
          <div
            className="w-52 flex-none pl-4 sm:w-64 md:w-72"
            key={memberIndex}
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl shadow-md">
              {member.avatarUrl ? (
                <Image
                  alt={member.avatarAlt}
                  className="object-cover"
                  fill
                  sizes="(min-width: 768px) 18rem, 13rem"
                  src={member.avatarUrl}
                />
              ) : (
                <div className="flex size-full items-center justify-center text-[#b5b8b7]">
                  <AvatarPlaceholderIcon className="size-16" />
                </div>
              )}

              {(member.name || member.area || member.linkedinUrl) && (
                <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/60 to-transparent p-4 transition-opacity duration-300">
                  {member.linkedinUrl && (
                    <a
                      aria-label={`${member.name} - LinkedIn`}
                      className="absolute right-3 bottom-4 flex size-8 items-center justify-center rounded-full bg-white/90 text-[#0A66C2] shadow-md transition-colors hover:bg-white"
                      href={member.linkedinUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <LinkedinIcon className="size-4" />
                    </a>
                  )}
                  <span className="text-sm font-medium text-white">
                    <h4 className="mb-2">{member.name}</h4>
                    <div className="text-xs opacity-60">{member.area}</div>
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
