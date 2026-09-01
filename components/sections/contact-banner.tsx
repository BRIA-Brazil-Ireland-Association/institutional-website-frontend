import CommunitiesGlobeIcon from "@/components/Icons/CommunitiesGlobeIcon";
import MegaphoneIcon from "@/components/Icons/MegaphoneIcon";
import MembersGroupIcon from "@/components/Icons/MembersGroupIcon";
import PartnersHandshakeIcon from "@/components/Icons/PartnersHandshakeIcon";
import SponsorsIcon from "@/components/Icons/SponsorsIcon";
import VolunteersHandsIcon from "@/components/Icons/VolunteersHandsIcon";
import { renderEmphasizedText } from "@/helpers/render-emphasized-text";
import { getText } from "@/services/cms";
import { DefaultCard } from "../ui/default-card";
import { RenderCms } from "../ui/render-cms";
import { SectionReveal } from "../ui/section-reveal";
import Skeleton from "../ui/skeleton";
import { ContactForm } from "./contact-form";

const engagementIcons: Record<string, typeof SponsorsIcon> = {
  ambassadors: MegaphoneIcon,
  communities: CommunitiesGlobeIcon,
  members: MembersGroupIcon,
  partners: PartnersHandshakeIcon,
  sponsors: SponsorsIcon,
  volunteers: VolunteersHandsIcon,
};

export function ContactBanner({ locale }: { locale: string }) {
  return (
    <RenderCms
      locale={locale}
      populate={new URLSearchParams([["populate[engagementOptions]", "true"]])}
      cmsPath="contact-page"
      fallback={<Skeleton className="min-h-100" />}
      render={({ content }) => {
        const title = getText(content, "title");
        const sectionTitle = getText(content, "sectionTitle");
        const description = getText(content, "description");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const engagementOptions: any[] = Array.isArray(
          content?.engagementOptions,
        )
          ? content.engagementOptions
          : [];

        return (
          <div
            id="contact"
            className="relative scroll-mt-20 bg-white text-black"
          >
            <SectionReveal>
              <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
                <div>
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

                  {engagementOptions.length > 0 && (
                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {engagementOptions.map((option, optionIndex) => {
                        const icon = getText(option, "icon");
                        const optionTitle = getText(option, "title");
                        const optionDescription = getText(
                          option,
                          "description",
                        );
                        const Icon = engagementIcons[icon ?? ""];

                        if (!optionTitle || !optionDescription) {
                          return null;
                        }

                        return (
                          <DefaultCard
                            className="text-center"
                            key={option?.id ?? optionIndex}
                          >
                            {Icon && (
                              <Icon className="mx-auto size-8 text-[#104722]" />
                            )}
                            <h3 className="mt-3 text-base font-semibold text-[#1a1a1a]">
                              {optionTitle}
                            </h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-[#3d3d3d]">
                              {optionDescription}
                            </p>
                          </DefaultCard>
                        );
                      })}
                    </div>
                  )}
                </div>

                <ContactForm locale={locale} />
              </div>
            </SectionReveal>
          </div>
        );
      }}
    />
  );
}
