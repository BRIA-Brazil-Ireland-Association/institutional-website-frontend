import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="relative bg-gradient-stats overflow-hidden">
      <div className="absolute top-6 right-10 grid grid-cols-8 gap-1.5 opacity-40">
        {Array.from({ length: 32 }).map((_, i) => (
          <span key={i} className="w-1 h-1 rounded-full bg-white" />
        ))}
      </div>
      <div className="relative mx-auto max-w-[1440px] px-6 py-10 md:py-12">
        <div className="grid md:grid-cols-[auto_1fr_auto] items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shrink-0">
              <Mail className="w-7 h-7 text-brand-navy" />
            </div>
            <h3 className="text-2xl font-extrabold text-white leading-tight">
              Stay informed,
              <br />
              stay connected.
            </h3>
          </div>
          <div className="text-white/95 text-sm max-w-sm">
            Subscribe to our newsletter and receive updates on events, opportunities and BRIA news.
          </div>
          <form
            className="flex flex-col md:flex-row md:items-center gap-3 md:bg-white/10 md:rounded-full md:p-1.5 w-full md:w-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="bg-white rounded-full px-5 py-3 text-sm text-brand-navy placeholder:text-muted-foreground outline-none min-w-0 w-full md:w-auto md:min-w-[260px]"
            />
            <button className="bg-brand-green hover:bg-[color:var(--brand-green-dark)] transition-colors text-white font-semibold text-sm px-6 py-3 rounded-full w-full md:w-auto">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
