import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import dublinBridge from "@/assets/dublin-bridge.png";
import networkingNight from "@/assets/networking-night.jpg";
import newsBridge from "@/assets/news-bridge.jpg";

export default function AboutEvent() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 grid lg:grid-cols-2 gap-12 items-start">
      {/* Left: About */}
      <div className="grid sm:grid-cols-2 gap-8 items-center">
        <div className="relative">
          <p className="text-brand-green text-xs font-bold tracking-[0.2em] uppercase mb-3">
            About BRIA
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy leading-tight">
            We're here to
            <br />
            help you <span className="text-brand-green">belong</span>,<br />
            <span className="text-brand-navy">grow</span> and{" "}
            <span className="text-[color:var(--brand-purple)]">thrive.</span>
          </h2>
          <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
            We support Brazilian professionals and their families in building successful lives in
            Ireland through information, connections and community.
          </p>
          <button className="mt-6 inline-flex items-center gap-2 bg-brand-green hover:bg-[color:var(--brand-green-dark)] transition-colors text-white font-semibold px-5 py-3 rounded-full shadow-soft text-sm">
            Learn more about BRIA <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="relative">
          <div className="absolute -bottom-4 -left-4 grid grid-cols-6 gap-1.5 opacity-60">
            {Array.from({ length: 24 }).map((_, i) => (
              <span key={i} className="w-1 h-1 rounded-full bg-brand-green" />
            ))}
          </div>
          <div className="rounded-[28px] overflow-hidden aspect-[4/5]">
            <img
              src={dublinBridge}
              alt="Ha'penny Bridge in Dublin at sunset"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Right: cards */}
      <div className="space-y-5">
        {/* Event card */}
        <div
          className="bg-[#fff7ed] rounded-2xl p-6 flex gap-5 items-center"
          style={{
            boxShadow: "0 1px 3px rgba(15,23,42,0.06), 0 8px 20px -10px rgba(15,23,42,0.1)",
          }}
        >
          <div className="flex-1">
            <p className="text-brand-orange text-xs font-bold tracking-[0.2em] uppercase mb-2">
              Upcoming Event
            </p>
            <h3 className="text-xl font-bold text-brand-navy">Networking Night</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-brand-navy">
              <li className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-green" /> 12 AUG 2026
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-green" /> 7:00 PM
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-green" /> Dublin, Ireland
              </li>
            </ul>
            <a
              href="#"
              className="mt-4 inline-flex items-center gap-2 text-brand-navy font-semibold text-sm"
            >
              View all events
              <span className="w-6 h-6 rounded-full border border-brand-green flex items-center justify-center">
                <ArrowRight className="w-3 h-3 text-brand-green" />
              </span>
            </a>
          </div>
          <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0">
            <img
              src={networkingNight}
              alt="Networking night"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* News card */}
        <div
          className="bg-secondary/60 rounded-2xl p-6 flex gap-5 items-center"
          style={{
            boxShadow: "0 1px 3px rgba(15,23,42,0.06), 0 8px 20px -10px rgba(15,23,42,0.1)",
          }}
        >
          <div className="flex-1">
            <p className="text-[color:var(--brand-purple)] text-xs font-bold tracking-[0.2em] uppercase mb-2">
              Latest News
            </p>
            <h3 className="text-base font-bold text-brand-navy leading-snug">
              NEW STUDY: Who Are the
              <br />
              Brazilians Making Ireland Happen?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              An initiative by the Brazil-Ireland Association seeks to understand the profile of
              Brazilian...
            </p>
            <a
              href="#"
              className="mt-3 inline-flex items-center gap-2 text-brand-navy font-semibold text-sm"
            >
              Read more
              <span className="w-6 h-6 rounded-full border border-brand-green flex items-center justify-center">
                <ArrowRight className="w-3 h-3 text-brand-green" />
              </span>
            </a>
          </div>
          <div className="w-28 h-28 rounded-2xl overflow-hidden shrink-0">
            <img
              src={newsBridge}
              alt="Latest news"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
