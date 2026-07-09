import { getMediaUrl, getObject, getText, type CmsEntry } from "@/services/cms";
import Image from "next/image";

type NavbarProps = {
  globalContent: CmsEntry | null;
};

export function Navbar({ globalContent }: NavbarProps) {
  const siteName = getText(globalContent, "siteName") ?? "Navbar";
  const favicon = getObject(globalContent, "favicon");
  const faviconUrl = getMediaUrl(favicon);
  const faviconAlt = getText(favicon, "alternativeText") ?? siteName;

  return (
    <nav className="flex min-h-20 items-center justify-center gap-3 bg-white text-black">
      {faviconUrl ? (
        <Image
          alt={faviconAlt}
          className="h-8 w-8 object-contain"
          height={32}
          src={faviconUrl}
          width={32}
        />
      ) : null}
      {siteName}
    </nav>
  );
}
