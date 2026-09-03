"use client";
import { useGlobalContext } from "@/providers/global-context";
import { getMediaUrl, getObject, getText } from "@/services/content";
import Image from "next/image";

export function BriaLogo({
  type = "default",
  className = "",
  width = 16,
  height = 16,
  priority = false,
}: {
  type?: "default" | "white";
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  const { globalContent } = useGlobalContext();
  const siteName = getText(globalContent, "siteName") ?? "";
  const logo = getObject(
    globalContent,
    type === "default" ? "Logo" : "logoWhite",
  );
  const logoUrl = getMediaUrl(logo);
  return (
    <>
      {logoUrl && (
        <Image
          alt={siteName}
          className={className}
          src={logoUrl}
          width={width}
          height={height}
          priority={priority}
        />
      )}
    </>
  );
}
