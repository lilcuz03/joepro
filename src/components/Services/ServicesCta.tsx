// src/components/services/ServicesCta.tsx
import { QuoteButton } from "@/components/header/QuoteButton";
import { siteConfig } from "@/config/site";

const { contact } = siteConfig;

export function ServicesCta() {
  return (
    <section
      aria-labelledby="services-cta-heading"
      className="bg-formwork py-16 md:py-24"
    >
      {/* Same horizontal padding scale as the header and every section */}
      <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14">
        {/* dark panel so it reads as the action point, same as the home page */}
        <div className="bg-steel-gradient relative isolate overflow-hidden rounded-3xl p-6 text-formwork sm:p-8 md:p-12 lg:p-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div>
              <h2
                id="services-cta-heading"
                className="font-display wdth-wide max-w-[22ch] text-3xl font-extrabold leading-tight tracking-tight md:text-5xl"
              >
                Ready to get your job started?
              </h2>
              <p className="mt-4 max-w-[48ch] text-base leading-relaxed text-formwork/75 md:text-lg">
                Tell us what needs doing and we will give you a clear, free
                quote.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <QuoteButton
                href={siteConfig.cta.href}
                label="Get a free quote"
                tone="accent"
              />
              <a
                href={`tel:${contact.phoneHref}`}
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-formwork/30 bg-formwork/10 px-5 font-medium text-formwork backdrop-blur-sm transition-colors duration-300 ease-course hover:border-hivis hover:bg-hivis hover:text-steel"
              >
                Call <span className="font-semibold">{contact.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
