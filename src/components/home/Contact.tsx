// src/components/home/Contact.tsx
"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { MotionConfig, motion, type Variants } from "motion/react";
import { siteConfig } from "@/config/site";
import { services } from "@/config/services";
import { DURATION, EASE_SETTLE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const { contact } = siteConfig;

const whatsappHref = `https://wa.me/${contact.phoneHref.replace(/\D/g, "")}?text=${encodeURIComponent(
  `Hi ${siteConfig.shortName}, I'd like a quote please.`,
)}`;
const address = `${contact.streetAddress}, ${contact.city}`;
const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${siteConfig.name}, ${address}`,
)}`;

const icons = {
  phone:
    "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
  chat: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6",
  pin: "M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
} as const;

const details: {
  label: string;
  value: string;
  href: string;
  icon: keyof typeof icons;
  external?: boolean;
}[] = [
  {
    label: "Call us",
    value: contact.phone,
    href: `tel:${contact.phoneHref}`,
    icon: "phone",
  },
  {
    label: "WhatsApp",
    value: "Message us on WhatsApp",
    href: whatsappHref,
    icon: "chat",
    external: true,
  },
  {
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
    icon: "mail",
  },
  {
    label: "Find us",
    value: address,
    href: mapsHref,
    icon: "pin",
    external: true,
  },
];

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_SETTLE, delay: i * 0.1 },
  }),
};

const inView = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, margin: "0px 0px -80px 0px" },
} as const;

/* ---------------------------------------------------------------------------
   Form
--------------------------------------------------------------------------- */
type Field = "name" | "phone" | "email" | "service";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "success" | "error";

const FIELD_ORDER: Field[] = ["name", "phone", "email", "service"];

function validate(v: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (v.name.trim().length < 2) errors.name = "Please enter your name.";
  const digits = v.phone.replace(/\D/g, "");
  if (digits.length < 9 || digits.length > 13)
    errors.phone = "Please enter a valid phone number.";
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()))
    errors.email = "That email doesn't look right.";
  if (!v.service) errors.service = "Please choose a service.";
  return errors;
}

// Shared control styling: 16px text stops iOS zooming in on focus, and the
// border darkens on hover and turns amber on focus.
const control =
  "w-full min-h-12 rounded-xl border border-steel/20 bg-formwork px-4 py-3 text-base text-steel placeholder:text-girder/70 transition-colors duration-300 ease-course hover:border-steel/45 focus:border-hivis-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-hivis aria-[invalid=true]:border-red-600";

function FieldShell({
  id,
  label,
  optional,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-2 flex items-baseline justify-between gap-2 text-sm font-semibold"
      >
        {label}
        {optional && (
          <span className="text-xs font-normal text-girder">Optional</span>
        )}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 text-sm font-medium text-red-700"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export function Contact() {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [sentName, setSentName] = useState("");

  const id = (field: string) => `${uid}-${field}`;
  const aria = (field: Field) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${id(field)}-error` : undefined,
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const get = (key: string) => String(data.get(key) ?? "");
    const values = {
      name: get("name"),
      phone: get("phone"),
      email: get("email"),
      service: get("service"),
      message: get("message"),
      website: get("website"), // honeypot: real people leave this empty
    };

    const found = validate(values);
    setErrors(found);
    const firstBad = FIELD_ORDER.find((field) => found[field]);
    if (firstBad) {
      (form.elements.namedItem(firstBad) as HTMLElement | null)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setSentName(values.name.trim().split(" ")[0]);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="relative scroll-mt-24 bg-formwork py-20 md:py-28 lg:py-32"
      >
        {/* Same horizontal padding scale as the header and other sections */}
        <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* ---------------------------------------------------------
                Left: heading and ways to reach us
            --------------------------------------------------------- */}
            <motion.div
              custom={0}
              variants={reveal}
              {...inView}
              className="lg:col-span-5"
            >
              <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-girder sm:text-sm">
                <span
                  aria-hidden
                  className="h-0.5 w-8 shrink-0 bg-hivis"
                />
                Contact {siteConfig.shortName}
              </p>
              <h2
                id="contact-heading"
                className="font-display wdth-wide text-[clamp(1.9rem,4.2vw,4rem)] font-extrabold leading-[1.04] tracking-[-0.03em]"
              >
                Ready to start? Get a free{" "}
                <span className="box-decoration-clone rounded-lg bg-hivis px-[0.2em] text-steel">
                  quote
                </span>
                .
              </h2>
              <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-girder md:text-lg">
                Tell us what needs doing and we will get back to you. Based in{" "}
                {contact.region.split(",")[0]} and working across Durban.
              </p>

              <ul
                role="list"
                className="mt-8 border-t border-steel/15"
              >
                {details.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      {...(item.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group flex items-center gap-4 border-b border-steel/15 py-4 md:py-5"
                    >
                      <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-steel text-formwork transition-colors duration-300 ease-course group-hover:bg-hivis group-hover:text-steel">
                        <svg
                          aria-hidden
                          viewBox="0 0 24 24"
                          className="size-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d={icons[item.icon]} />
                        </svg>
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm text-girder">
                          {item.label}
                        </span>
                        <span className="block break-words font-display wdth-wide text-lg font-extrabold leading-tight tracking-tight md:text-xl">
                          {item.value}
                        </span>
                      </span>
                      {item.external && (
                        <span className="sr-only">(opens in a new tab)</span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* ---------------------------------------------------------
                Right: quote form card
            --------------------------------------------------------- */}
            <motion.div
              custom={1}
              variants={reveal}
              {...inView}
              className="lg:col-span-7"
            >
              <div className="relative rounded-3xl border border-steel/10 bg-white p-5 shadow-[0_24px_60px_-30px_rgba(31,39,44,0.35)] sm:p-8 md:p-10">
                {status === "success" ? (
                  <div
                    role="status"
                    className="flex min-h-[24rem] flex-col items-start justify-center"
                  >
                    <span className="inline-flex size-14 items-center justify-center rounded-full bg-hivis text-steel">
                      <svg
                        aria-hidden
                        viewBox="0 0 24 24"
                        className="size-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                    <h3 className="font-display wdth-wide mt-6 text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">
                      Thanks{sentName ? `, ${sentName}` : ""}. We got your
                      request.
                    </h3>
                    <p className="mt-3 max-w-[44ch] text-base leading-relaxed text-girder md:text-lg">
                      We will be in touch soon. If it is urgent, call us on{" "}
                      <a
                        href={`tel:${contact.phoneHref}`}
                        className="font-semibold text-steel underline decoration-hivis decoration-2 underline-offset-4"
                      >
                        {contact.phone}
                      </a>
                      .
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-6 inline-flex min-h-12 items-center rounded-full border border-steel/25 px-5 font-semibold transition-colors duration-300 ease-course hover:border-hivis hover:bg-hivis"
                    >
                      Send another request
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={onSubmit}
                    noValidate
                    aria-labelledby={id("form-title")}
                  >
                    <h3
                      id={id("form-title")}
                      className="font-display wdth-wide text-2xl font-extrabold leading-tight tracking-tight md:text-3xl"
                    >
                      Request a free quote
                    </h3>
                    <p className="mt-2 text-sm text-girder md:text-base">
                      Takes about a minute. Fields marked optional can be
                      skipped.
                    </p>

                    <div className="mt-8 grid gap-5 sm:grid-cols-2">
                      <FieldShell
                        id={id("name")}
                        label="Your name"
                        error={errors.name}
                      >
                        <input
                          id={id("name")}
                          name="name"
                          type="text"
                          autoComplete="name"
                          required
                          placeholder="e.g. Sipho Naidoo"
                          className={control}
                          {...aria("name")}
                        />
                      </FieldShell>

                      <FieldShell
                        id={id("phone")}
                        label="Phone number"
                        error={errors.phone}
                      >
                        <input
                          id={id("phone")}
                          name="phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          required
                          placeholder="e.g. 082 123 4567"
                          className={control}
                          {...aria("phone")}
                        />
                      </FieldShell>

                      <FieldShell
                        id={id("email")}
                        label="Email"
                        optional
                        error={errors.email}
                      >
                        <input
                          id={id("email")}
                          name="email"
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          placeholder="you@example.com"
                          className={control}
                          {...aria("email")}
                        />
                      </FieldShell>

                      <FieldShell
                        id={id("service")}
                        label="What do you need?"
                        error={errors.service}
                      >
                        <div className="relative">
                          <select
                            id={id("service")}
                            name="service"
                            required
                            defaultValue=""
                            className={cn(control, "appearance-none pr-11")}
                            {...aria("service")}
                          >
                            <option
                              value=""
                              disabled
                            >
                              Choose a service
                            </option>
                            {services.map((service) => (
                              <option
                                key={service.slug}
                                value={service.name}
                              >
                                {service.name}
                              </option>
                            ))}
                            <option value="Something else / not sure">
                              Something else / not sure
                            </option>
                          </select>
                          <svg
                            aria-hidden
                            viewBox="0 0 24 24"
                            className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-girder"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </div>
                      </FieldShell>

                      <FieldShell
                        id={id("message")}
                        label="Tell us about the job"
                        optional
                        className="sm:col-span-2"
                      >
                        <textarea
                          id={id("message")}
                          name="message"
                          rows={4}
                          maxLength={1500}
                          placeholder="What needs doing, and roughly where?"
                          className={cn(control, "resize-y")}
                        />
                      </FieldShell>
                    </div>

                    {/* honeypot: hidden from people, bots fill it in */}
                    <div
                      aria-hidden
                      className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                    >
                      <label>
                        Website
                        <input
                          type="text"
                          name="website"
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </label>
                    </div>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      {/* Phones: full width, label left and arrow at the right
                          edge. From sm: compact button with centred content. */}
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="group inline-flex min-h-12 w-full items-center justify-between gap-3 rounded-full bg-hivis py-1.5 pl-6 pr-1.5 font-semibold text-steel transition-colors duration-300 ease-course hover:bg-hivis-deep focus-visible:outline-offset-4 disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:justify-center"
                      >
                        {status === "sending" ? "Sending..." : "Send request"}
                        <span
                          aria-hidden
                          className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-steel text-formwork"
                        >
                          {status === "sending" ? (
                            <svg
                              viewBox="0 0 24 24"
                              className="size-4 animate-spin"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            >
                              <path d="M21 12a9 9 0 1 1-6.2-8.55" />
                            </svg>
                          ) : (
                            <svg
                              viewBox="0 0 24 24"
                              className="size-4 transition-transform duration-500 ease-settle group-hover:translate-x-0.5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M5 12h14M13 6l6 6-6 6" />
                            </svg>
                          )}
                        </span>
                      </button>
                      <p className="max-w-[36ch] text-xs leading-relaxed text-girder">
                        We only use your details to reply to your request.
                      </p>
                    </div>

                    <div
                      role="status"
                      aria-live="polite"
                    >
                      {status === "error" && (
                        <p className="mt-5 rounded-xl border border-red-600/30 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
                          Something went wrong sending that. Please call{" "}
                          <a
                            href={`tel:${contact.phoneHref}`}
                            className="underline underline-offset-2"
                          >
                            {contact.phone}
                          </a>{" "}
                          or use WhatsApp instead.
                        </p>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
