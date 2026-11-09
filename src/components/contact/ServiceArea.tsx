// src/components/contact/ServiceArea.tsx
// Server component: no JavaScript needed. The map iframe is lazy-loaded.
import { siteConfig } from "@/config/site";

const { contact } = siteConfig;

// Only the suburbs you are sure about. Add more as Joe confirms them, e.g.
// "Chatsworth", "Umhlanga". Each one is local-search keyword text.
const AREAS = [contact.region.split(",")[0], contact.city] as const;

const address = `${contact.streetAddress}, ${contact.city}`;
const query = encodeURIComponent(`${siteConfig.name}, ${address}`);
const embedSrc = `https://www.google.com/maps?q=${query}&output=embed`;
const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${query}`;

export function ServiceArea() {
  return (
    <section
      aria-labelledby="area-heading"
      className="bg-concrete/35 py-16 md:py-24 lg:py-28"
    >
      {/* Same horizontal padding scale as the header and every section */}
      <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-5">
            <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-girder sm:text-sm">
              <span
                aria-hidden
                className="h-0.5 w-8 shrink-0 bg-hivis"
              />
              Where we work
            </p>
            <h2
              id="area-heading"
              className="font-display wdth-wide text-[clamp(1.8rem,3.8vw,3.5rem)] font-extrabold leading-[1.04] tracking-[-0.03em]"
            >
              Based in {AREAS[0]}, working across Durban.
            </h2>
            <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-girder md:text-lg">
              Not sure we cover your suburb? Call us with the address and we
              will tell you straight away.
            </p>

            <ul
              role="list"
              className="mt-6 flex flex-wrap gap-2"
            >
              {AREAS.map((area) => (
                <li
                  key={area}
                  className="inline-flex min-h-11 items-center rounded-full border border-steel/20 bg-formwork px-4 text-sm font-medium transition-colors duration-300 ease-course hover:border-hivis hover:bg-hivis"
                >
                  {area}
                </li>
              ))}
            </ul>

            <address className="mt-8 not-italic">
              <p className="text-sm text-girder">Our address</p>
              <p className="font-display wdth-wide mt-1 text-lg font-extrabold leading-snug tracking-tight md:text-xl">
                {address}
              </p>
            </address>

            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-12 items-center rounded-full border border-steel/25 px-6 font-semibold transition-colors duration-300 ease-course hover:border-hivis hover:bg-hivis hover:text-steel"
            >
              Get directions
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-steel/10 bg-concrete shadow-[0_24px_60px_-30px_rgba(31,39,44,0.35)] lg:aspect-auto lg:h-[30rem]">
              <iframe
                title={`Map showing ${siteConfig.name} at ${address}`}
                src={embedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full border-0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
