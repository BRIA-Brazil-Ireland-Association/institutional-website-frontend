import { Circle } from "@/components/ui/circle";
import { SectionReveal } from "../../ui/section-reveal";

export function AboutBanner() {
  return (
    <div
      id="about"
      className="relative flex min-h-96 scroll-mt-20 items-center justify-center overflow-hidden bg-emerald-100 text-black"
    >
      <SectionReveal>
        <h2 className="text-center text-xl font-semibold tracking-widest text-[#104722] uppercase">
          About
        </h2>
        <Circle
          className="absolute -bottom-35 left-[20%] hidden lg:block"
          size="250px"
          borderSize="40px"
          color="#fb8500"
        />
      </SectionReveal>
    </div>
  );
}
