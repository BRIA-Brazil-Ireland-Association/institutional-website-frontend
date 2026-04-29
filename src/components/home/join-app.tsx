import { ArrowRight } from "lucide-react";
import handsTeam from "@/assets/hands-team.jpg";
import appPhone from "@/assets/app-phone.jpg";

export default function JoinApp() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-16 grid md:grid-cols-2 gap-6">
      {/* Join */}
      <div className="bg-secondary/60 rounded-2xl p-6 flex gap-5 items-center shadow-card">
        <div className="flex-1">
          <p className="text-[color:var(--brand-purple)] text-xs font-bold tracking-[0.2em] uppercase mb-2">
            Join Our Team
          </p>
          <h3 className="text-xl font-bold text-brand-navy">
            Make a bigger
            <br />
            impact together
          </h3>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            We're always looking for passionate people to join our team of volunteers.
          </p>
          <a
            href="#"
            className="mt-4 inline-flex items-center gap-2 text-brand-navy font-semibold text-sm"
          >
            See open positions
            <span className="w-6 h-6 rounded-full border border-brand-green flex items-center justify-center">
              <ArrowRight className="w-3 h-3 text-brand-green" />
            </span>
          </a>
        </div>
        <div className="w-40 h-40 rounded-2xl overflow-hidden shrink-0">
          <img
            src={handsTeam}
            alt="Hands together"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
      {/* App */}
      <div className="bg-[#fff7ed] rounded-2xl p-6 flex gap-5 items-center shadow-card">
        <div className="flex-1">
          <p className="text-brand-orange text-xs font-bold tracking-[0.2em] uppercase mb-2">
            BRIA Onde Tem App
          </p>
          <h3 className="text-xl font-bold text-brand-navy">
            Your connection
            <br />
            to the community
          </h3>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Discover places, services and events. All in one app.
          </p>
          <a
            href="#"
            className="mt-4 inline-flex items-center gap-2 text-brand-navy font-semibold text-sm"
          >
            Learn more
            <span className="w-6 h-6 rounded-full border border-brand-green flex items-center justify-center">
              <ArrowRight className="w-3 h-3 text-brand-green" />
            </span>
          </a>
        </div>
        <div className="w-40 h-40 rounded-2xl overflow-hidden shrink-0 bg-white">
          <img
            src={appPhone}
            alt="BRIA app on a phone"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
