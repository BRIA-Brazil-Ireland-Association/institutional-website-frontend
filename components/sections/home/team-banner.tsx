import { SectionReveal } from "../../ui/section-reveal";

export function TeamBanner() {
  return (
    <div className="flex min-h-96 items-center justify-center bg-orange-100 text-black">
      <SectionReveal>
        <h2 className="text-center text-xl font-semibold tracking-widest text-[#104722] uppercase">
          Team
        </h2>
      </SectionReveal>
    </div>
  );
}
