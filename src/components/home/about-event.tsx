import { ArrowRight, Briefcase, GraduationCap, Search, ShieldCheck, Users } from "lucide-react";
const hubCards = [
  {
    title: "Work & Career\nDevelopment",
    desc: "Find resources on job opportunities, CV tips, interview preparation and workplace integration in Ireland.",
    icon: Briefcase,
    color: "var(--brand-green)",
    bar: "var(--brand-green)",
  },
  {
    title: "Legal & Immigration\nSupport",
    desc: "Access clear information on visas, permits, taxation, PPS numbers and your legal rights.",
    icon: ShieldCheck,
    color: "var(--brand-blue)",
    bar: "var(--brand-blue)",
  },
  {
    title: "Culture &\nCommunity",
    desc: "Discover Brazilian-Irish culture, events, support networks and useful contacts.",
    icon: Users,
    color: "var(--brand-orange)",
    bar: "var(--brand-orange)",
  },
  {
    title: "Education &\nTraining",
    desc: "Explore courses, certifications and professional development opportunities in Ireland.",
    icon: GraduationCap,
    color: "var(--brand-purple)",
    bar: "var(--brand-purple)",
  },
];

export default function InformationHub() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 -mt-2 pb-16">
      <div className="relative bg-brand-navy rounded-[28px] p-8 md:p-12 overflow-hidden">
        {/* dot decorations */}
        <div className="absolute top-8 right-8 grid grid-cols-6 gap-1.5 opacity-30">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="w-1 h-1 rounded-full bg-white" />
          ))}
        </div>
        <div className="absolute bottom-8 left-8 grid grid-cols-6 gap-1.5 opacity-20">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="w-1 h-1 rounded-full bg-white" />
          ))}
        </div>

        <div className="relative grid md:grid-cols-2 gap-8 items-end mb-10">
          <div>
            <p className="text-brand-green text-xs font-bold tracking-[0.2em] uppercase mb-3">
              Information Hub
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Everything you need,
              <br />
              in <span className="text-brand-yellow">one place.</span>
            </h2>
            <p className="mt-4 text-white/70 text-sm max-w-md">
              Your go-to source for trusted information about living, working and thriving in
              Ireland.
            </p>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search topics, guides, and more..."
              className="w-full bg-white text-brand-navy placeholder:text-muted-foreground rounded-full pl-6 pr-16 py-4 text-sm outline-none focus:ring-2 focus:ring-brand-green"
            />
            <button className="absolute right-1.5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-brand-green hover:bg-[color:var(--brand-green-dark)] transition-colors flex items-center justify-center">
              <Search className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {hubCards.map(({ title, desc, icon: Icon, color, bar }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-6 flex flex-col relative overflow-hidden group hover:-translate-y-1 transition-transform"
            >
              <span className="absolute top-0 left-0 right-0 h-1" style={{ background: bar }} />
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: color }}
              >
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-brand-navy whitespace-pre-line leading-tight">
                {title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">{desc}</p>
              <a
                href="#"
                className="mt-5 inline-flex items-center gap-2 text-brand-navy font-semibold text-sm"
              >
                Explore
                <span
                  className="w-6 h-6 rounded-full border border-brand-green flex items-center justify-center"
                  style={{ color }}
                >
                  <ArrowRight className="w-3 h-3" style={{ color: "var(--brand-green)" }} />
                </span>
              </a>
            </div>
          ))}
        </div>

        <div className="relative mt-8 flex justify-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-white text-sm font-semibold hover:text-brand-green transition-colors"
          >
            View all topics
            <span className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center">
              <ArrowRight className="w-3 h-3" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
