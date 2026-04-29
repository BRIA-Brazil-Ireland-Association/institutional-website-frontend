import { ArrowRight } from "lucide-react";
import handsTogether from "@/assets/hero-hands.png";
import logoMark from "@/assets/bria-mark.png";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 grid lg:grid-cols-[5fr_7fr] gap-12 items-center pt-0 pb-[20px]">
        {/* Left */}
        <div className="relative">
          {/* dot pattern */}
          <div className="hidden md:grid absolute -top-8 -left-2 grid-cols-6 gap-2 opacity-70">
            {Array.from({ length: 18 }).map((_, i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-brand-green" />
            ))}
          </div>
          <h1 className="text-5xl md:text-6xl leading-[1.1] font-bold text-brand-navy tracking-tight">
            A bridge
            <br />
            between two
            <br />
            homelands,
          </h1>
          <div className="mt-2">
            <span className="font-script font-bold text-brand-green text-6xl md:text-7xl leading-none">
              one community.
            </span>
          </div>
          <div className="mt-6 w-20 h-1 rounded-full bg-brand-yellow" />
          <p className="mt-6 text-[15px] text-brand-navy/80 max-w-md leading-relaxed">
            BRIA connects people, opportunities and cultures
            <br className="hidden md:block" />
            through support, networking and knowledge.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <button className="group inline-flex items-center gap-3 bg-brand-green hover:bg-[color:var(--brand-green-dark)] transition-colors text-white font-semibold px-7 py-4 rounded-full shadow-soft">
              Explore our Services
              <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-brand-navy font-semibold hover:text-brand-green transition-colors"
            >
              About BRIA <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        {/* Right */}
        <div className="relative h-[480px] md:h-[560px] hidden md:block mb-6 md:mb-0">
          {/* hands image with integrated colorful blobs */}
          <div className="absolute inset-0 z-10">
            <img
              src={handsTogether}
              alt="Diverse hands joined together with colorful organic shapes"
              className="w-full h-full object-contain object-center"
            />
          </div>
          {/* logo badge — bottom-left over image */}
          <div className="absolute left-2 -bottom-2 md:left-6 md:-bottom-4 w-40 h-40 rounded-full bg-white flex items-center justify-center p-5 z-20 shadow-soft">
            <img src={logoMark} alt="BRIA" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}
