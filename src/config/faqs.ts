// src/config/faqs.ts
import { services } from "@/config/services";
import { siteConfig } from "@/config/site";

// Questions and answers for the FAQ section and its FAQPage structured data.
// Answers are plain text on purpose: Google reads the same text it sees on
// the page, so the two always match.
//
// Only add facts Joe has confirmed. Good ones to add next:
//  - roughly what common jobs cost (paving, a carport, waterproofing)
//  - whether work is guaranteed, and for how long
//  - how deposits and payment work
//  - which other suburbs he covers (Chatsworth, Umhlanga, Pinetown...)
//  - how soon he can start after a quote is accepted

const { contact } = siteConfig;
const area = contact.region.split(",")[0];

function toSentenceList(items: string[]): string {
  if (items.length < 2) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

const serviceList = toSentenceList(
  services.map((service) => service.name.toLowerCase()),
);

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: `What services does ${siteConfig.name} offer?`,
    answer: `We offer ${serviceList}, for homes and businesses.`,
  },
  {
    question: "Which areas do you work in?",
    answer: `We are based in ${area} and work across ${contact.city}. If you are not sure we cover your suburb, call ${contact.phone} with the address and we will tell you straight away.`,
  },
  {
    question: "Do you give free quotes?",
    answer: `Yes, our quotes are free. Send the quote form, call us on ${contact.phone} or message us on WhatsApp and tell us what needs doing and where.`,
  },
  {
    question: "What should I tell you when I ask for a quote?",
    answer:
      "A short description of the job and your suburb is enough to get started. If you have a deadline, tell us that too.",
  },
  {
    question: "Do you take on small jobs?",
    answer:
      "Yes. We do small home improvement jobs as well as larger construction work.",
  },
  {
    question: "Do you work for businesses as well as homeowners?",
    answer: "Yes. We work for both homeowners and businesses.",
  },
  {
    question: "How much experience do you have?",
    answer: `${siteConfig.name} has ${siteConfig.yearsInIndustry} years of experience in the industry.`,
  },
  {
    question: "Will the job be finished on time?",
    answer:
      "Completing projects on time is one of our priorities. Tell us when you need the work done when you ask for a quote.",
  },
];

export function faqJsonLd(items: Faq[] = faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
