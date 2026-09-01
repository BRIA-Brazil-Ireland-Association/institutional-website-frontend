import { renderEmphasizedText } from "@/helpers/render-emphasized-text";
import { getMediaUrl, getObject, getText } from "@/services/cms";
import Image from "next/image";
import { Button } from "../ui/button";
import { RenderCms } from "../ui/render-cms";
import { SectionReveal } from "../ui/section-reveal";
import Skeleton from "../ui/skeleton";
import {
  TeamLeadershipGrid,
  type LeadershipMember,
} from "./team-leadership-grid";

const processLeadershipMembers = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  leaders: any[],
): LeadershipMember[] =>
  leaders.reduce<LeadershipMember[]>((members, leader, leaderIndex) => {
    const area = getText(leader, "area");
    const name = getText(leader, "name");

    if (!area || !name) {
      return members;
    }

    const avatar = getObject(leader, "avatar");
    const avatarUrl = getMediaUrl(avatar);
    const avatarAlt = getText(avatar, "alternativeText") ?? name;

    members.push({
      area,
      avatarAlt,
      avatarUrl,
      id: leader?.id ?? leaderIndex,
      name,
    });

    return members;
  }, []);

export function TeamBanner({
  locale,
  compact,
}: {
  locale: string;
  compact: boolean;
}) {
  return (
    <RenderCms
      locale={locale}
      populate={
        new URLSearchParams(
          compact
            ? [
                ["populate[cta]", "true"],
                ["populate[image]", "true"],
              ]
            : [
                ["populate[image]", "true"],
                ["populate[leadershipTeam][populate][avatar]", "true"],
              ],
        )
      }
      cmsPath={compact ? "team" : "team-page"}
      fallback={<Skeleton className="min-h-100" />}
      render={({ content }) => {
        const title = getText(content, "title");
        const sectionTitle = getText(content, "sectionTitle");
        const description = getText(content, "description");
        const image = getObject(content, "image");
        const imageUrl = getMediaUrl(image);
        const imageAlt = getText(image, "alternativeText") ?? "";
        const imageWidth =
          typeof image?.width === "number" ? image.width : 1484;
        const imageHeight =
          typeof image?.height === "number" ? image.height : 698;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ctas: any[] = Array.isArray(content?.cta) ? content.cta : [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const leadershipTeam: any[] = Array.isArray(content?.leadershipTeam)
          ? content.leadershipTeam
          : [];
        const leadershipMembers = processLeadershipMembers(leadershipTeam);

        return (
          <div
            id="team"
            className="relative scroll-mt-20 overflow-hidden bg-white text-black"
          >
            <div
              aria-hidden="true"
              className="absolute inset-y-0 right-0 hidden w-1/4 bg-[#fb8500] lg:block"
            />
            <SectionReveal>
              <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
                <div className="max-w-xl">
                  {title && (
                    <p className="text-lg font-bold tracking-wide text-[#1e3a8a] uppercase">
                      {title}
                    </p>
                  )}

                  {sectionTitle && (
                    <h2 className="mt-1 text-4xl font-medium text-[#1a1a1a] sm:text-5xl">
                      {sectionTitle}
                    </h2>
                  )}

                  {description && (
                    <p className="mt-5 text-base leading-relaxed text-[#3d3d3d] sm:text-lg">
                      {renderEmphasizedText(
                        description,
                        "font-semibold text-[#1a1a1a]",
                      )}
                    </p>
                  )}

                  {compact && (
                    <>
                      {ctas.length > 0 && (
                        <div className="mt-8 flex flex-wrap gap-4">
                          {ctas.map((cta, ctaIndex) => {
                            const ctaLabel = getText(cta, "label");
                            const ctaHref = getText(cta, "href");

                            if (!ctaLabel || !ctaHref) {
                              return null;
                            }

                            const ctaAccessibleLabel = sectionTitle
                              ? `${ctaLabel} - ${sectionTitle}`
                              : ctaLabel;

                            return (
                              <Button
                                aria-label={ctaAccessibleLabel}
                                href={ctaHref}
                                key={cta?.id ?? ctaIndex}
                              >
                                {ctaLabel}
                              </Button>
                            );
                          })}
                        </div>
                      )}
                    </>
                  )}
                </div>

                {imageUrl && (
                  <Image
                    alt={imageAlt}
                    className="h-auto w-full rounded-lg object-cover shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
                    height={imageHeight}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    src={imageUrl}
                    width={imageWidth}
                  />
                )}
              </div>
            </SectionReveal>

            {!compact && leadershipMembers.length > 0 && (
              <SectionReveal>
                <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
                  <TeamLeadershipGrid
                    locale={locale}
                    members={leadershipMembers}
                  />
                </div>
              </SectionReveal>
            )}
          </div>
        );
      }}
    />
  );
}
