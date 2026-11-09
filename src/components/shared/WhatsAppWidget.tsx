// src/components/shared/WhatsAppWidget.tsx
"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { siteConfig } from "@/config/site";
import { services } from "@/config/services";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const { contact } = siteConfig;
// Uses a separate `whatsapp` number from siteConfig.contact if you add one
// (digits only, with country code, e.g. "27821234567"); otherwise the phone.
const WHATSAPP_NUMBER = (
  (contact as { whatsapp?: string }).whatsapp ?? contact.phoneHref
).replace(/\D/g, "");
const whatsappLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

/* ───────── Editable options ───────── */
const jobTypes = ["Repair", "New work", "Not sure"] as const;
type JobType = (typeof jobTypes)[number];

const timeSlots = ["Morning", "Afternoon", "Any time"];

const options = [
  ...services.map((s) => ({ id: s.slug, label: s.name })),
  { id: "other", label: "Other" },
];

/* ───────── Icons (inline, no extra dependency) ───────── */
const paths = {
  wrench:
    "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
  pin: "M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  calendar:
    "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  message: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  check: "M20 6 9 17l-5-5",
  x: "M18 6 6 18M6 6l12 12",
  next: "M5 12h14M13 6l6 6-6 6",
  back: "M19 12H5M11 18l-6-6 6-6",
  zap: "M13 2 3 14h9l-1 8 10-12h-9l1-8z",
  restart: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8M3 3v5h5",
  copy: "M9 9h11a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2zM5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1",
} as const;

function Icon({
  name,
  className = "size-4",
}: {
  name: keyof typeof paths;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

const steps = [
  { id: "services", label: "Services", icon: "wrench" },
  { id: "location", label: "Location", icon: "pin" },
  { id: "when", label: "Date & time", icon: "calendar" },
  { id: "details", label: "Details", icon: "message" },
] as const;

/* ───────── Helpers ───────── */
function todayISO() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function formatDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// 16px text stops iOS zooming in on focus.
const inputCls =
  "mt-2 w-full min-h-12 rounded-xl border border-steel/20 bg-white px-4 py-3 text-base text-steel outline-none transition-colors duration-300 ease-course placeholder:text-girder/70 hover:border-steel/45 focus:border-hivis-deep focus-visible:ring-2 focus-visible:ring-hivis";

/* ───────── Small pieces ───────── */
function Chip({
  selected,
  onClick,
  children,
  className,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-colors duration-300 ease-course active:scale-95",
        selected
          ? "border-hivis bg-hivis text-steel"
          : "border-steel/20 bg-white text-steel hover:border-hivis hover:bg-hivis/25",
        className,
      )}
    >
      {selected && (
        <Icon
          name="check"
          className="size-3.5"
        />
      )}
      {children}
    </button>
  );
}

function StepHeading({ title, hint }: { title: string; hint: string }) {
  return (
    <>
      <h3 className="font-display wdth-wide text-lg font-extrabold leading-tight tracking-tight">
        {title}
      </h3>
      <p className="mt-1.5 text-sm text-girder">{hint}</p>
    </>
  );
}

/* ───────── Widget ───────── */
export default function WhatsAppWidget() {
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selected, setSelected] = useState<string[]>([]);
  const [jobType, setJobType] = useState<JobType | null>(null);
  const [area, setArea] = useState("");
  const [street, setStreet] = useState("");
  const [asap, setAsap] = useState(false);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  /* Friendly nudge a few seconds after the page loads, once per session */
  useEffect(() => {
    try {
      if (sessionStorage.getItem("jp-quote-teaser")) return;
    } catch {
      /* storage blocked: just show it */
    }
    const show = setTimeout(() => {
      setTeaser(true);
      try {
        sessionStorage.setItem("jp-quote-teaser", "1");
      } catch {
        /* ignore */
      }
    }, 4000);
    const hide = setTimeout(() => setTeaser(false), 14000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  /* Close with Escape, and put focus back on the button */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggleService = (id: string) => {
    setError(null);
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const serviceLabels = options
    .filter((o) => selected.includes(o.id))
    .map((o) => o.label);
  const canSend = selected.length > 0 && area.trim().length > 0;

  const done = [
    selected.length > 0,
    area.trim().length > 0,
    asap || date !== "" || slot !== "",
    name.trim() !== "" || notes.trim() !== "",
  ];

  const message = useMemo(() => {
    const lines = [`Hi ${siteConfig.name}, I'd like to request a quote.`, ""];
    if (name.trim()) lines.push(`*Name:* ${name.trim()}`);
    if (serviceLabels.length)
      lines.push(`*Service:* ${serviceLabels.join(", ")}`);
    if (jobType) lines.push(`*Type of job:* ${jobType}`);
    const place = [street.trim(), area.trim()].filter(Boolean).join(", ");
    if (place) lines.push(`*Location:* ${place}`);
    if (asap) {
      lines.push("*When:* As soon as possible (urgent)");
    } else {
      if (date) lines.push(`*Preferred date:* ${formatDate(date)}`);
      if (slot) lines.push(`*Preferred time:* ${slot}`);
    }
    if (notes.trim()) lines.push(`*Details:* ${notes.trim()}`);
    return lines.join("\n");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, selected, jobType, street, area, asap, date, slot, notes]);

  const reset = () => {
    setSelected([]);
    setJobType(null);
    setArea("");
    setStreet("");
    setAsap(false);
    setDate("");
    setSlot("");
    setName("");
    setNotes("");
    setSent(false);
    setCopied(false);
    setError(null);
    setStep(0);
  };

  const toggleOpen = () => {
    setOpen((v) => !v);
    setTeaser(false);
  };

  // Tapped "Send" while something required is missing: jump to that step
  // and say what is needed, instead of leaving a dead grey button.
  const explainMissing = () => {
    if (selected.length === 0) {
      setStep(0);
      setError("Pick at least one service first.");
    } else if (area.trim().length === 0) {
      setStep(1);
      setError("Add your suburb or area so we know where the job is.");
    }
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setError("Could not copy the message. Please select and copy it manually.");
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      {/* ───────── Panel ───────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="dialog"
            aria-label="Request a quote on WhatsApp"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.3, ease }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed inset-x-3 bottom-[calc(5.5rem_+_env(safe-area-inset-bottom))] z-40 flex max-h-[min(640px,calc(100dvh_-_8rem))] flex-col overflow-hidden rounded-3xl border border-steel/10 bg-formwork text-steel shadow-[0_30px_80px_-20px_rgba(31,39,44,0.55)] sm:inset-x-auto sm:bottom-[calc(6.5rem_+_env(safe-area-inset-bottom))] sm:right-6 sm:w-[400px]"
          >
            {/* Header */}
            <div className="bg-steel-gradient flex items-center gap-3 px-5 py-4 text-formwork">
              <div className="grid size-10 shrink-0 place-items-center rounded-full bg-hivis text-steel">
                <WhatsAppIcon className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display wdth-wide text-sm font-extrabold leading-tight">
                  Request a free quote
                </p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-formwork/70">
                  <span
                    className="size-1.5 rounded-full bg-hivis"
                    aria-hidden
                  />
                  Goes straight to {siteConfig.shortName} on WhatsApp
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close quote form"
                className="grid size-11 shrink-0 place-items-center rounded-full border border-formwork/30 transition-colors duration-300 ease-course hover:border-hivis hover:bg-hivis hover:text-steel"
              >
                <Icon name="x" />
              </button>
            </div>

            {/* Tabs */}
            <div
              role="tablist"
              aria-label="Quote steps"
              className="grid grid-cols-4 border-b border-steel/10"
            >
              {steps.map((s, i) => {
                const active = i === step;
                return (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setStep(i)}
                    className={cn(
                      "relative flex min-h-14 flex-col items-center justify-center gap-1 px-1 py-2.5 text-[11px] font-semibold transition-colors duration-300 ease-course",
                      active
                        ? "text-steel"
                        : "text-girder hover:bg-hivis/20 hover:text-steel",
                    )}
                  >
                    <span className="relative">
                      <Icon name={s.icon} />
                      {done[i] && !active && (
                        <span className="absolute -right-2 -top-1.5 grid size-3.5 place-items-center rounded-full bg-hivis text-steel">
                          <Icon
                            name="check"
                            className="size-2.5"
                          />
                        </span>
                      )}
                    </span>
                    {s.label}
                    {active && (
                      <motion.span
                        layoutId="jp-wa-tab-underline"
                        className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-hivis"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Body. data-lenis-prevent stops smooth scroll hijacking it. */}
            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto overscroll-contain px-5 py-5"
            >
              {error && (
                <p
                  role="alert"
                  className="mb-4 rounded-xl border border-red-600/30 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
                >
                  {error}
                </p>
              )}

              <AnimatePresence
                mode="wait"
                initial={false}
              >
                <motion.div
                  key={step}
                  role="tabpanel"
                  aria-label={steps[step].label}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -14 }}
                  transition={{ duration: 0.2, ease }}
                >
                  {step === 0 && (
                    <div>
                      <StepHeading
                        title="What do you need?"
                        hint="Pick one or more services."
                      />
                      <div className="mt-4 flex flex-wrap gap-2">
                        {options.map((o) => (
                          <Chip
                            key={o.id}
                            selected={selected.includes(o.id)}
                            onClick={() => toggleService(o.id)}
                          >
                            {o.label}
                          </Chip>
                        ))}
                      </div>

                      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-girder">
                        Type of job
                      </p>
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        {jobTypes.map((t) => (
                          <Chip
                            key={t}
                            selected={jobType === t}
                            onClick={() => setJobType(jobType === t ? null : t)}
                            className="justify-center px-2"
                          >
                            {t}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div>
                      <StepHeading
                        title="Where is the job?"
                        hint="Tell us your suburb or area so we know where to come."
                      />
                      <label className="mt-4 block">
                        <span className="text-xs font-semibold text-girder">
                          Suburb or area{" "}
                          <span className="text-hivis-deep">*</span>
                        </span>
                        <input
                          value={area}
                          onChange={(e) => {
                            setArea(e.target.value);
                            setError(null);
                          }}
                          placeholder="e.g. Shallcross"
                          autoComplete="address-level2"
                          className={inputCls}
                        />
                      </label>
                      <label className="mt-4 block">
                        <span className="text-xs font-semibold text-girder">
                          Street, complex or landmark (optional)
                        </span>
                        <input
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
                          placeholder="Street name, complex or landmark"
                          autoComplete="street-address"
                          className={inputCls}
                        />
                      </label>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <StepHeading
                        title="When suits you?"
                        hint="Pick a date and time, or tell us it's urgent."
                      />
                      <button
                        type="button"
                        aria-pressed={asap}
                        onClick={() => setAsap((v) => !v)}
                        className={cn(
                          "mt-4 flex min-h-14 w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-colors duration-300 ease-course active:scale-[0.98]",
                          asap
                            ? "border-hivis bg-hivis text-steel"
                            : "border-steel/20 bg-white hover:border-hivis hover:bg-hivis/25",
                        )}
                      >
                        <Icon
                          name="zap"
                          className="size-4 shrink-0"
                        />
                        <span>
                          It&apos;s urgent, as soon as possible
                          <span
                            className={cn(
                              "block text-xs font-normal",
                              asap ? "text-steel/80" : "text-girder",
                            )}
                          >
                            We&apos;ll mark your request as urgent
                          </span>
                        </span>
                      </button>

                      {!asap && (
                        <>
                          <label className="mt-5 block">
                            <span className="text-xs font-semibold text-girder">
                              Preferred date
                            </span>
                            <input
                              type="date"
                              min={todayISO()}
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                              className={inputCls}
                            />
                          </label>

                          <p className="mt-5 text-xs font-semibold text-girder">
                            Preferred time
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {timeSlots.map((t) => (
                              <Chip
                                key={t}
                                selected={slot === t}
                                onClick={() => setSlot(slot === t ? "" : t)}
                              >
                                {t}
                              </Chip>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <StepHeading
                        title="Anything else?"
                        hint="Add a few details, check your message, then send."
                      />
                      <label className="mt-4 block">
                        <span className="text-xs font-semibold text-girder">
                          Your name (optional)
                        </span>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          autoComplete="name"
                          className={inputCls}
                        />
                      </label>
                      <label className="mt-4 block">
                        <span className="text-xs font-semibold text-girder">
                          Tell us about the job (optional)
                        </span>
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          rows={3}
                          placeholder="E.g. leaking roof above the kitchen"
                          className={cn(inputCls, "resize-none")}
                        />
                      </label>

                      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-girder">
                        Your message
                      </p>
                      <pre className="mt-2 whitespace-pre-wrap break-words rounded-2xl border border-steel/10 bg-white p-4 font-sans text-sm leading-relaxed text-steel/90">
                        {message}
                      </pre>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer actions */}
            <div className="border-t border-steel/10 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:pb-4">
              <div className="flex items-center gap-3">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    aria-label="Previous step"
                    className="grid size-12 shrink-0 place-items-center rounded-full border border-steel/25 transition-colors duration-300 ease-course hover:border-hivis hover:bg-hivis"
                  >
                    <Icon name="back" />
                  </button>
                )}

                {step < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s + 1)}
                    className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-hivis text-sm font-semibold text-steel transition-colors duration-300 ease-course hover:bg-hivis-deep active:scale-[0.98]"
                  >
                    Next
                    <Icon name="next" />
                  </button>
                ) : canSend ? (
                  <a
                    href={whatsappLink(message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setSent(true)}
                    className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-hivis text-sm font-semibold text-steel transition-colors duration-300 ease-course hover:bg-hivis-deep active:scale-[0.98]"
                  >
                    <WhatsAppIcon className="size-5" />
                    Send on WhatsApp
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  // Always tappable: jumps to whatever is missing and says so
                  <button
                    type="button"
                    onClick={explainMissing}
                    className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-hivis text-sm font-semibold text-steel transition-colors duration-300 ease-course hover:bg-hivis-deep active:scale-[0.98]"
                  >
                    <WhatsAppIcon className="size-5" />
                    Send on WhatsApp
                  </button>
                )}
              </div>

              {step === steps.length - 1 && !canSend && (
                <p className="mt-3 text-center text-xs text-girder">
                  Pick a service and add your suburb, then send.
                </p>
              )}

              {step === steps.length - 1 && canSend && !sent && (
                <p className="mt-3 text-center text-xs text-girder">
                  Nothing is sent until you press send inside WhatsApp.
                </p>
              )}

              {sent && (
                <div
                  role="status"
                  className="mt-3 rounded-xl bg-steel/5 px-3 py-2.5 text-xs text-girder"
                >
                  <p>
                    WhatsApp should have opened. Press send there to finish. If
                    it didn&apos;t open, copy the message and send it to{" "}
                    <a
                      href={`tel:${contact.phoneHref}`}
                      className="font-semibold text-steel underline decoration-hivis decoration-2 underline-offset-2"
                    >
                      {contact.phone}
                    </a>
                    .
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={copyMessage}
                      className="inline-flex min-h-9 items-center gap-1.5 font-semibold text-steel underline decoration-hivis decoration-2 underline-offset-4"
                    >
                      <Icon
                        name={copied ? "check" : "copy"}
                        className="size-3.5"
                      />
                      {copied ? "Copied" : "Copy message"}
                    </button>
                    <button
                      type="button"
                      onClick={reset}
                      className="inline-flex min-h-9 shrink-0 items-center gap-1 font-semibold text-steel underline decoration-hivis decoration-2 underline-offset-4"
                    >
                      <Icon
                        name="restart"
                        className="size-3"
                      />
                      Start over
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───────── Floating button ───────── */}
      <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 sm:bottom-6 sm:right-6">
        <AnimatePresence>
          {teaser && !open && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.3, ease }}
              className="absolute bottom-full right-0 mb-3 whitespace-nowrap rounded-2xl rounded-br-sm border border-steel/10 bg-formwork px-4 py-2.5 text-sm font-semibold text-steel shadow-xl"
            >
              Need a quote?{" "}
              <span className="rounded bg-hivis px-1.5 py-0.5">
                Chat with us
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          ref={buttonRef}
          type="button"
          onClick={toggleOpen}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
          aria-label={open ? "Close quote form" : "Open WhatsApp quote form"}
          aria-expanded={open}
          aria-controls={panelId}
          className="relative grid size-14 place-items-center rounded-full bg-hivis text-steel shadow-[0_10px_40px_-6px_rgba(31,39,44,0.55)] transition-colors duration-300 ease-course hover:bg-hivis-deep sm:size-16"
        >
          {!open && (
            <span
              aria-hidden
              className="absolute inset-0 animate-ping rounded-full bg-hivis/40"
            />
          )}
          <AnimatePresence
            mode="wait"
            initial={false}
          >
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <Icon
                  name="x"
                  className="size-6 sm:size-7"
                />
              </motion.span>
            ) : (
              <motion.span
                key="whatsapp"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <WhatsAppIcon className="size-7 sm:size-8" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </MotionConfig>
  );
}
