import logoWhite from "@/assets/bria-logo-white.png";
import { Linkedin, Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white pt-14 pb-8">
      <div className="mx-auto max-w-[1440px] px-6 grid md:grid-cols-3 gap-10 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <img src={logoWhite} alt="BRIA" className="w-[180px] h-auto mb-5" />
          <div className="flex items-center justify-center md:justify-start gap-3">
            {[Linkedin, Facebook, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-brand-navy transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-sm text-white/80">
            {["About Us", "Services", "Events", "News", "Information Hub", "Contact"].map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-brand-green transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Support</h4>
          <ul className="space-y-2.5 text-sm text-white/80">
            {[
              "FAQ",
              "Guides & Resources",
              "Community Support",
              "Privacy Policy",
              "Terms of Use",
            ].map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-brand-green transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-[1440px] px-6 mt-12 pt-6 border-t border-white/10 text-xs text-white/50 text-center md:text-left">
        © {new Date().getFullYear()} Brasil-Ireland Association. All rights reserved.
      </div>
    </footer>
  );
}
