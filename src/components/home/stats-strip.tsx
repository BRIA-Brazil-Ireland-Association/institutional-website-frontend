import { CalendarCheck, Sparkles, UserRound, Users } from "lucide-react";

const stats = [
  { icon: UserRound, value: "5,000+", label: "Members and\ngrowing!" },
  { icon: CalendarCheck, value: "100+", label: "Events\nhosted" },
  { icon: Users, value: "50+", label: "Partner\norganizations" },
  { icon: Sparkles, value: "1", label: "Strong and vibrant\ncommunity" },
];

export default function StatsStrip() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-16">
      <div className="bg-gradient-stats rounded-2xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map(({ icon: Icon, value, label }) => (
          <div key={value + label} className="flex items-center gap-4 text-white">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center shrink-0">
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-extrabold leading-none">{value}</div>
              <div className="text-xs mt-1 whitespace-pre-line opacity-90">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
