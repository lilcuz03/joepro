// src/app/card/contact.vcf/route.ts
//
// The "Save our contact" button downloads this file. On iPhone it opens the
// "Add contact" sheet, on Android it adds to Contacts. Built from site.ts, so
// changing the phone number or address there updates it automatically.

import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

// vCard values must escape backslashes, semicolons, commas and new lines.
const esc = (value: string) =>
  value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");

export function GET() {
  const { contact } = siteConfig;
  const [street, suburb = ""] = contact.streetAddress
    .split(",")
    .map((part) => part.trim());

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:;${esc(siteConfig.name)};;;`,
    `FN:${esc(siteConfig.name)}`,
    `ORG:${esc(siteConfig.name)}`,
    "X-ABShowAs:COMPANY",
    "TITLE:Building and roofing contractor",
    `TEL;TYPE=CELL,VOICE:${contact.phoneHref}`,
    `EMAIL;TYPE=INTERNET,WORK:${contact.email}`,
    // PO box; extended; street; locality; region; postal code; country
    `ADR;TYPE=WORK:;${esc(suburb)};${esc(street)};${esc(contact.city)};${esc(contact.province)};;South Africa`,
    `URL:${siteConfig.url}`,
    "END:VCARD",
  ];

  return new Response(`${lines.join("\r\n")}\r\n`, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="joepro-construction.vcf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
