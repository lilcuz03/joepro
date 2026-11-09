// src/components/privacy/PrivacyContent.tsx
// Server component: no JavaScript needed.
//
// CONFIRM before launch (search this file for "CONFIRM"):
//  - which tools receive quote requests (section 4)
//  - whether you add analytics or ad pixels later (section 5)
//  - how long you keep enquiries (section 6)
// This is a plain-English template, not legal advice. Have Joe (or a
// lawyer, if he wants certainty) read it once and make sure it matches how
// the business really handles customer details.
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";

const { contact } = siteConfig;
const address = `${contact.streetAddress}, ${contact.city}`;

function P({ children }: { children: ReactNode }) {
  return <p>{children}</p>;
}

function List({ items }: { items: ReactNode[] }) {
  return (
    <ul
      role="list"
      className="space-y-2.5"
    >
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3"
        >
          <span
            aria-hidden
            className="mt-2.5 h-0.5 w-4 shrink-0 bg-hivis"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

const sections: { id: string; title: string; body: ReactNode }[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <P>
          This website is run by <strong>{siteConfig.name}</strong>, a building
          and roofing contractor at {address}. We are the &quot;responsible
          party&quot; for the personal information described in this policy, as
          defined in the Protection of Personal Information Act (POPIA).
        </P>
        <P>
          Questions about this policy or your information can go to{" "}
          <a
            href={`mailto:${contact.email}`}
            className="font-semibold text-steel underline decoration-hivis decoration-2 underline-offset-4"
          >
            {contact.email}
          </a>{" "}
          or{" "}
          <a
            href={`tel:${contact.phoneHref}`}
            className="font-semibold text-steel underline decoration-hivis decoration-2 underline-offset-4"
          >
            {contact.phone}
          </a>
          .
        </P>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "What information we collect",
    body: (
      <>
        <P>We only collect what you choose to give us:</P>
        <List
          items={[
            <>
              <strong>Quote form:</strong> your name, phone number, the service
              you need, and optionally your email address and a message about
              the job.
            </>,
            <>
              <strong>Calls, WhatsApp and email:</strong> your number or email
              address and whatever you tell us about the job.
            </>,
            <>
              <strong>Basic technical data:</strong> like your IP address and
              browser type, which our website host and the services listed below
              may record automatically when you visit.
            </>,
          ]}
        />
        <P>
          We do not ask for ID numbers, banking details or card numbers on this
          website.
        </P>
      </>
    ),
  },
  {
    id: "why-we-use-it",
    title: "Why we use it",
    body: (
      <>
        <P>We use your information to:</P>
        <List
          items={[
            "reply to your quote request or enquiry",
            "plan, quote for and carry out the work you ask for",
            "contact you about your job, such as arranging a site visit",
            "keep the website secure and working properly",
          ]}
        />
        <P>
          We do not use your details for unrelated marketing, and we do not sell
          them.
        </P>
      </>
    ),
  },
  {
    id: "who-we-share-with",
    title: "Who we share it with",
    body: (
      <>
        <P>
          We only share your information with people who need it to help us
          respond to you. These are service providers that handle it on our
          behalf and are expected to protect it:
        </P>
        <List
          items={[
            <>
              <strong>Our website host</strong>, which delivers the website to
              you.
            </>,
            <>
              {/* CONFIRM: name the real tool, e.g. email, n8n, a CRM */}
              <strong>The tool that delivers quote requests to us</strong>, so
              your message reaches the business.
            </>,
            <>
              <strong>Google</strong> (Maps and reviews) and{" "}
              <strong>Elfsight</strong> (the reviews display) when you load the
              parts of the site that use them.
            </>,
          ]}
        />
        <P>
          We may also share information where the law requires it. Some of these
          providers are based outside South Africa, so your information may be
          processed in other countries.
        </P>
      </>
    ),
  },
  {
    id: "cookies-and-third-parties",
    title: "Cookies and third-party content",
    body: (
      <>
        <P>
          Parts of this site are provided by other companies: the map on the
          contact page comes from Google Maps, and the customer reviews are
          shown by Elfsight. When these load, those companies may receive your
          IP address and may set their own cookies. Their use of that data is
          covered by their own privacy policies.
        </P>
        <P>
          {/* CONFIRM: update this if you add Google Analytics, a Meta pixel
              or similar. If you do, you also need a cookie notice. */}
          We do not currently run advertising or analytics tracking on this
          website. If that changes, we will update this policy.
        </P>
      </>
    ),
  },
  {
    id: "how-long-we-keep-it",
    title: "How long we keep it",
    body: (
      <P>
        {/* CONFIRM: set a period Joe is happy with */}
        We keep your enquiry details only as long as we need them to respond to
        you, do the work and keep reasonable records of the job. After that we
        delete them or remove anything that identifies you.
      </P>
    ),
  },
  {
    id: "security",
    title: "How we protect it",
    body: (
      <P>
        We take reasonable steps to keep your information safe. The website uses
        an encrypted (HTTPS) connection, and your enquiry is only passed to the
        people who need it. No online system is completely risk-free, so if you
        would rather not send details through the form, you are welcome to call
        us instead.
      </P>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <P>Under POPIA you have the right to:</P>
        <List
          items={[
            "ask what personal information we hold about you",
            "ask us to correct or update it",
            "ask us to delete it, where we have no good reason to keep it",
            "object to us using it, or withdraw your consent",
          ]}
        />
        <P>
          To use any of these rights, contact us on the details above and we
          will respond as soon as we reasonably can. If you are not happy with
          how we have handled your information, you can complain to the
          Information Regulator of South Africa at{" "}
          <a
            href="https://inforegulator.org.za"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-steel underline decoration-hivis decoration-2 underline-offset-4"
          >
            inforegulator.org.za
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          .
        </P>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <P>
        We may update this policy from time to time. The date at the top of the
        page shows when it was last changed.
      </P>
    ),
  },
];

export function PrivacyContent() {
  return (
    <section
      aria-label="Privacy policy"
      className="bg-formwork py-12 md:py-20"
    >
      {/* Same horizontal padding scale as the header and every section */}
      <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* ---------------------------------------------------------
              Contents: chips on phones, sticky list from lg
          --------------------------------------------------------- */}
          <nav
            aria-label="On this page"
            className="lg:col-span-4 xl:col-span-3"
          >
            <div className="lg:sticky lg:top-28">
              <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-girder">
                <span
                  aria-hidden
                  className="h-0.5 w-6 bg-hivis"
                />
                On this page
              </p>
              <ol className="flex flex-wrap gap-2 lg:block lg:space-y-0.5">
                {sections.map((section, i) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-steel/20 px-4 text-sm font-medium transition-colors duration-300 ease-course hover:border-hivis hover:bg-hivis hover:text-steel focus-visible:border-hivis focus-visible:bg-hivis lg:w-full lg:rounded-xl lg:border-transparent lg:px-3 lg:text-base"
                    >
                      <span
                        aria-hidden
                        className="font-display wdth-wide text-xs font-bold tracking-widest text-girder"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          {/* ---------------------------------------------------------
              Policy text
          --------------------------------------------------------- */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="max-w-[70ch]">
              <p className="text-base leading-relaxed text-girder md:text-lg">
                {siteConfig.name} respects your privacy. This policy explains
                what personal information we collect through this website, why
                we collect it and what your rights are under South Africa&apos;s
                Protection of Personal Information Act (POPIA).
              </p>

              {sections.map((section, i) => (
                <section
                  key={section.id}
                  id={section.id}
                  aria-labelledby={`${section.id}-heading`}
                  className="mt-12 scroll-mt-28 border-t border-steel/15 pt-8 md:mt-14 md:pt-10"
                >
                  <p
                    aria-hidden
                    className="font-display wdth-wide text-sm font-bold tracking-widest text-girder"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2
                    id={`${section.id}-heading`}
                    className="font-display wdth-wide mt-2 text-[clamp(1.5rem,2.6vw,2.25rem)] font-extrabold leading-tight tracking-tight"
                  >
                    {section.title}
                  </h2>
                  <div className="mt-5 space-y-4 text-base leading-relaxed text-girder md:text-lg [&_strong]:font-semibold [&_strong]:text-steel">
                    {section.body}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
