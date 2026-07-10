import { Circle } from "@/components/ui/circle";
import { SectionReveal } from "../../ui/section-reveal";

export function EventsBanner() {
  return (
    <div
      id="events"
      className="relative flex min-h-96 scroll-mt-20 items-center justify-center bg-sky-100 text-black"
    >
      <SectionReveal>
        <h2 className="text-center text-xl font-semibold tracking-widest text-[#104722] uppercase">
          Events
        </h2>
      </SectionReveal>
      <Circle
        className="absolute -right-20 -bottom-15 hidden lg:block"
        size="190px"
        borderSize="30px"
        color="#0b461b"
      />
    </div>
  );
}
