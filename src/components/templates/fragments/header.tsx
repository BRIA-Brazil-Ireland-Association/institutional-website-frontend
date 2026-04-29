import { useState } from "react";
import logo from "@/assets/bria-logo.png";
import { ChevronDown, Menu, Search, X } from "lucide-react";
const navItems = ["Home", "About Us", "Services", "Events", "News", "Partners"];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "PT">("EN");
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 h-20 lg:h-32 flex items-center justify-between gap-4 lg:gap-6">
        <a href="/" className="flex items-center shrink-0">
          <img src={logo} alt="BRIA - Brasil-Ireland Association" className="h-28 lg:h-40 w-auto" />
        </a>
        <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-brand-navy">
          {navItems.map((item, i) => (
            <a
              key={item}
              href="#"
              className={`relative transition-colors hover:text-brand-green ${i === 0 ? "text-brand-green" : ""}`}
            >
              {item}
              {i === 0 && (
                <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-brand-green rounded-full" />
              )}
            </a>
          ))}
          <a href="#" className="hover:text-brand-green transition-colors">
            Information Hub
          </a>
          <a href="#" className="hover:text-brand-green transition-colors">
            Contact
          </a>
        </nav>
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <div className="hidden md:block relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              onBlur={() => setTimeout(() => setLangOpen(false), 150)}
              className="flex items-center gap-1.5 text-sm font-medium text-brand-navy hover:text-brand-green transition-colors"
              aria-haspopup="menu"
              aria-expanded={langOpen}
            >
              <span className="text-base">{lang === "EN" ? "🇮🇪" : "🇧🇷"}</span>
              {lang === "EN" ? "EN" : "PT"}
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${langOpen ? "rotate-180" : ""}`}
              />
            </button>
            {langOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 w-44 rounded-xl bg-white border border-border shadow-lg overflow-hidden z-50"
              >
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setLang("EN");
                    setLangOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-secondary transition-colors ${lang === "EN" ? "text-brand-green font-semibold" : "text-brand-navy"}`}
                >
                  <span className="text-base">🇮🇪</span> EN
                </button>
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setLang("PT");
                    setLangOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-secondary transition-colors ${lang === "PT" ? "text-brand-green font-semibold" : "text-brand-navy"}`}
                >
                  <span className="text-base">🇧🇷</span> PT
                </button>
              </div>
            )}
          </div>
          <button className="hidden sm:inline-flex bg-brand-green hover:bg-[color:var(--brand-green-dark)] transition-colors text-white font-semibold text-sm px-4 md:px-5 py-2.5 rounded-full shadow-soft">
            Become a Member
          </button>
          <button className="hidden lg:flex w-9 h-9 rounded-full items-center justify-center text-brand-navy hover:bg-secondary transition-colors">
            <Search className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-brand-navy hover:bg-secondary transition-colors"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-white">
          <nav className="mx-auto max-w-[1440px] px-4 md:px-6 py-4 flex flex-col gap-1 text-[15px] font-medium text-brand-navy">
            {navItems.map((item, i) => (
              <a
                key={item}
                href="#"
                onClick={() => setOpen(false)}
                className={`py-2 transition-colors hover:text-brand-green ${i === 0 ? "text-brand-green" : ""}`}
              >
                {item}
              </a>
            ))}
            <a
              href="#"
              onClick={() => setOpen(false)}
              className="py-2 hover:text-brand-green transition-colors"
            >
              Information Hub
            </a>
            <a
              href="#"
              onClick={() => setOpen(false)}
              className="py-2 hover:text-brand-green transition-colors"
            >
              Contact
            </a>
            <button className="sm:hidden mt-2 bg-brand-green hover:bg-[color:var(--brand-green-dark)] transition-colors text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-soft self-start">
              Become a Member
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
