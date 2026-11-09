// src/components/services/ServicesFaq.tsx
// Server component: native <details>, so no JavaScript is needed and every
// answer is in the page HTML for search engines.
import { siteConfig } from "@/config/site";

const { contact } = siteConfig;
const area = contact.region.split(",")[0]; // "Shallcross"

const faqs = [
  {
    q: "Which areas do you work in?",
    a: `We are based in ${area} and work across Durban. Call or send a message with your suburb and we will confirm we can get to you.`,
  },
  {
    q: "Do you give free quotes?",
    a: "Yes. Tell us what needs doing and we will give you a clear price before any work starts.",
  },
  {
    q: "Do you take on small jobs?",
    a: "Yes. We do small home improvements and repairs as well as larger builds, for homes and businesses.",
  },
  {
    q: "How long will my job take?",
    a: "It depends on the size of the work. We agree a schedule with you up front and work to it, so you know what to expect.",
  },
  {
    q: "Can I see examples of your work?",
    a: "Yes. Have a look at our projects page, or ask us when you call and we will show you jobs similar to yours.",
  },
] as const;

export function ServicesFaq() {
  return (
    <section
      aria-labelledby="faq-heading"
      className="border-t border-steel/10 bg-formwork pt-16 md:pt-24"
    >
      {/* Same horizontal padding scale as the header and every section */}
      <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-girder sm:text-sm">
              <span
                aria-hidden
                className="h-0.5 w-8 shrink-0 bg-hivis"
              />
              Questions
            </p>
            <h2
              id="faq-heading"
              className="font-display wdth-wide text-[clamp(1.8rem,3.8vw,3.5rem)] font-extrabold leading-[1.04] tracking-[-0.03em]"
            >
              Common questions about our services.
            </h2>
            <p className="mt-5 max-w-[40ch] text-base leading-relaxed text-girder md:text-lg">
              Still not sure? Call{" "}
              <a
                href={`tel:${contact.phoneHref}`}
                className="font-semibold text-steel underline decoration-hivis decoration-2 underline-offset-4"
              >
                {contact.phone}
              </a>{" "}
              and we will talk it through.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="border-t border-steel/15">
              {faqs.map((item) => (
                <details
                  key={item.q}
                  className="group border-b border-steel/15"
                >
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
                    <h3 className="font-display wdth-wide text-lg font-extrabold leading-snug tracking-tight transition-colors duration-300 ease-course group-hover:text-hivis-deep md:text-xl">
                      {item.q}
                    </h3>
                    <span
                      aria-hidden
                      className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-steel/25 transition-colors duration-300 ease-course group-hover:border-hivis group-hover:bg-hivis"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="size-4 transition-transform duration-500 ease-settle group-open:rotate-45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </summary>
                  <p className="max-w-[60ch] pb-6 text-base leading-relaxed text-girder md:text-lg">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
