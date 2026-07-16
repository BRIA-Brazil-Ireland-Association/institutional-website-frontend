"use client";

import EnvelopeIcon from "@/components/Icons/EnvelopeIcon";
import InstagramIcon from "@/components/Icons/InstagramIcon";
import LinkedinIcon from "@/components/Icons/LinkedinIcon";
import { Link } from "@/i18n/navigation";
import { useGlobalContext } from "@/providers/global-context";
import { getObject, getText } from "@/services/cms";
import { BriaLogo } from "./bria-logo";

type FooterLink = {
  label: string;
  url: string;
};

const processFooterLinks = (links: unknown): FooterLink[] => {
  if (!Array.isArray(links)) {
    return [];
  }

  return links.map((link) => ({
    label: getText(link, "label") ?? "",
    url: getText(link, "href", "url") ?? "",
  }));
};

const FooterLinkGroup = ({
  title,
  links,
}: {
  title?: string;
  links: FooterLink[];
}) => {
  return (
    <div>
      {title && (
        <h3 className="text-[15px] font-semibold text-white">{title}</h3>
      )}
      <ul className="mt-4 space-y-2.5 text-sm text-white/90">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              className="transition-colors hover:text-[#169b62] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#169b62]"
              href={link.url}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export function Footer() {
  const { globalContent } = useGlobalContext();
  const footerContent = getObject(globalContent, "footer");
  const navigationTitle = getText(footerContent, "navigationTitle");
  const informationTitle = getText(footerContent, "informationTitle");
  const communityTitle = getText(footerContent, "communityTitle");
  const contactTitle = getText(footerContent, "contactTitle");
  const socialMediaTitle = getText(footerContent, "socialMediaTitle");
  const navigationLinks = processFooterLinks(footerContent?.navigationLinks);
  const informationLinks = processFooterLinks(footerContent?.informationLinks);
  const communityLinks = processFooterLinks(footerContent?.communityLinks);
  const siteName = getText(globalContent, "siteName");
  const contactEmail = getText(globalContent, "contactEmail");
  const instagramUrl = getText(globalContent, "instagramUrl");
  const linkedinUrl = getText(globalContent, "linkedinUrl");
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="scroll-mt-20 bg-black text-white">
      <div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 md:pt-14 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 pb-14 text-center sm:grid-cols-2 md:text-left lg:grid-cols-3">
          <FooterLinkGroup links={navigationLinks} title={navigationTitle} />
          <FooterLinkGroup links={informationLinks} title={informationTitle} />
          <div>
            {contactTitle && (
              <h3 className="text-[15px] font-semibold text-white">
                {contactTitle}
              </h3>
            )}
            {contactEmail && (
              <a
                className="mt-4 inline-flex items-center gap-3 transition-colors hover:text-[#169b62] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#169b62]"
                href={`mailto:${contactEmail}`}
              >
                <EnvelopeIcon className="size-8 shrink-0" />
                <span className="flex flex-col items-start">
                  <span className="text-sm font-semibold">Email</span>
                  <span className="text-sm text-white/90">{contactEmail}</span>
                </span>
              </a>
            )}
          </div>

          <div className="flex flex-col items-center md:items-start">
            {socialMediaTitle && (
              <h3 className="text-[15px] font-semibold text-white">
                {socialMediaTitle}
              </h3>
            )}
            <div className="mt-4 flex items-center gap-3">
              {instagramUrl && (
                <a
                  aria-label="Instagram"
                  className="flex size-10 items-center justify-center rounded-full border border-white/40 transition-colors hover:border-[#169b62] hover:text-[#169b62] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#169b62]"
                  href={instagramUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <InstagramIcon className="size-4" />
                </a>
              )}
              {linkedinUrl && (
                <a
                  aria-label="LinkedIn"
                  className="flex size-10 items-center justify-center rounded-full border border-white/40 transition-colors hover:border-[#169b62] hover:text-[#169b62] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#169b62]"
                  href={linkedinUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <LinkedinIcon className="size-4" />
                </a>
              )}
            </div>
          </div>

          <FooterLinkGroup links={communityLinks} title={communityTitle} />

          <div className="flex items-center justify-center md:justify-start">
            <BriaLogo
              type="white"
              className="h-auto w-56 max-w-full"
              height={68}
              width={224}
            />
          </div>
        </div>

        <div className="border-t border-white/20 py-5">
          <p className="text-center text-sm text-white/90">
            Copyright © {currentYear} | {siteName}
          </p>
        </div>
      </div>
    </footer>
  );
}
