import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

function PartnerLogo({ name }: { name: string }) {
  if (name === "IDA") {
    return (
      <div className="flex items-center gap-2.5">
        <div className="grid grid-cols-2 gap-0.5">
          <div className="w-3 h-3 bg-[#16A34A] [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)]" />
          <div className="w-3 h-3 bg-[#16A34A] [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)]" />
          <div className="w-3 h-3 bg-[#16A34A] [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)] col-start-1" />
        </div>
        <div className="leading-none">
          <div className="text-3xl font-extrabold text-brand-navy tracking-tight">IDA</div>
          <div className="text-base text-brand-navy/80 font-medium -mt-0.5">Ireland</div>
        </div>
      </div>
    );
  }
  if (name === "Enterprise Ireland") {
    return (
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full border-[3px] border-[#0FB8A1] flex items-center justify-center">
          <span className="text-[#0FB8A1] text-lg font-light">C</span>
        </div>
        <div className="leading-tight">
          <div className="text-xl font-light text-brand-navy">Enterprise</div>
          <div className="text-xl font-light text-brand-navy -mt-1">Ireland</div>
        </div>
      </div>
    );
  }
  return (
    <div className="leading-none text-center">
      <div className="text-[10px] font-semibold text-brand-navy/70 uppercase tracking-wider mb-0.5">
        Technological University
      </div>
      <div className="text-3xl font-extrabold text-brand-navy tracking-tight italic">
        T<span className="text-brand-navy">u</span>
        <br />
        Dublin
      </div>
    </div>
  );
}

const partners = ["IDA", "Enterprise Ireland", "Dublin", "IDA", "Enterprise Ireland", "Dublin"];

export default function Partners() {
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const update = () => setPerView(window.innerWidth >= 640 ? 3 : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, partners.length - perView);
  const safeIndex = Math.min(index, maxIndex);
  const prev = () => setIndex((i) => Math.max(0, Math.min(i, maxIndex) - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, Math.min(i, maxIndex) + 1));

  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-16 flex gap-10 items-center">
      <div className="w-full md:w-4/12">
        <p className="text-brand-green text-xs font-bold tracking-[0.2em] uppercase mb-3">
          Our Partners
        </p>
        <h2 className="text-3xl font-extrabold text-brand-navy leading-tight">Stronger together</h2>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          We collaborate with organizations share our mission to support the Brazilian community in
          Ireland.
        </p>
        <a
          href="#"
          className="mt-4 inline-flex items-center gap-2 text-brand-navy font-semibold text-sm"
        >
          Meet our partners
          <span className="w-6 h-6 rounded-full bg-brand-green flex items-center justify-center">
            <ArrowRight className="w-3 h-3 text-white" />
          </span>
        </a>
      </div>
      <div className="relative hidden md:flex items-center gap-4 w-full  md:w-8/12">
        <button
          onClick={prev}
          disabled={safeIndex === 0}
          className="w-11 h-11 rounded-full bg-brand-green text-white flex items-center justify-center shrink-0 hover:bg-[color:var(--brand-green-dark)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Previous partners"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${safeIndex * (100 / perView)}%)` }}
          >
            {partners.map((p, i) => (
              <div
                key={`${p}-${i}`}
                className="shrink-0 px-3"
                style={{ width: `${100 / perView}%` }}
              >
                <div
                  className="h-36 rounded-2xl bg-white flex items-center justify-center px-8 text-center"
                  style={{
                    boxShadow: "0 1px 3px rgba(15,23,42,0.06), 0 6px 16px -8px rgba(15,23,42,0.08)",
                  }}
                >
                  <PartnerLogo name={p} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={next}
          disabled={safeIndex >= maxIndex}
          className="w-11 h-11 rounded-full bg-brand-green text-white flex items-center justify-center shrink-0 hover:bg-[color:var(--brand-green-dark)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Next partners"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
