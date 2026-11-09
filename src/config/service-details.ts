// src/config/service-details.ts
// Longer copy for the /services page, keyed by the slug in services.ts.
// IMPORTANT: this is generic wording based on your service list. Check each
// "includes" item against what Joe really does, and delete anything he
// doesn't offer. Inaccurate copy costs more than short copy.

export type ServiceDetail = {
  intro: string;
  includes: readonly string[];
};

export const serviceDetails: Record<string, ServiceDetail> = {
  brickwork: {
    intro:
      "From boundary walls to extensions and new builds, we lay brickwork that is straight, square and finished to last, for homes and businesses across Shallcross and Durban.",
    includes: [
      "Boundary and garden walls",
      "Extensions and new builds",
      "Repairs to cracked or damaged brickwork",
      "Clean, tidy finishing",
    ],
  },
  roofs: {
    intro:
      "New roofs, replacements and repairs, built to cope with Durban's heavy rain and summer sun and to keep the weather out for years.",
    includes: [
      "New roofs and full roof replacements",
      "Tile and sheet repairs",
      "Finding and fixing leaks",
      "Gutters and flashing",
    ],
  },
  "roof-cleaning": {
    intro:
      "Moss, algae and built-up grime make a roof look tired and can wear it out faster. We clean it properly so it looks fresh again.",
    includes: [
      "Moss and algae removal",
      "Pressure cleaning of tiles and sheets",
      "Gutter clearing",
      "A tidy site when we leave",
    ],
  },
  paving: {
    intro:
      "Neat, level paving for yards, walkways and entrances, laid on a properly compacted base so it stays flat.",
    includes: [
      "Yards, walkways and entrances",
      "Base preparation and compaction",
      "Clean patterns and edges",
      "Repairs to sunken or loose paving",
    ],
  },
  tiling: {
    intro:
      "Floor and wall tiling for kitchens, bathrooms, patios and living areas, with straight lines and tidy finishes.",
    includes: [
      "Kitchen and bathroom tiling",
      "Floors, walls and patios",
      "Grouting and finishing",
      "Repairs and re-grouting",
    ],
  },
  plumbing: {
    intro:
      "Repairs, fittings and installations done properly, from a leaking tap to full bathroom work, so water goes where it should.",
    includes: [
      "Leaking taps and pipes",
      "Fittings and installations",
      "Bathroom and kitchen plumbing",
      "Fixing the cause, not just the symptom",
    ],
  },
  carports: {
    intro:
      "Sturdy carports that protect your vehicles from sun and rain, built to suit the size and layout of your property.",
    includes: [
      "Single and double carports",
      "Built to fit your property",
      "Strong frames and secure fixing",
      "Roof sheeting to keep the rain off",
    ],
  },
  waterproofing: {
    intro:
      "Damp and leaks cost far more once they spread. We seal roofs, walls and slabs to stop water damage before it gets expensive.",
    includes: [
      "Flat roof waterproofing",
      "Damp and leak treatment on walls",
      "Slabs and concrete surfaces",
      "Preventing water damage before it spreads",
    ],
  },
  ceilings: {
    intro:
      "New ceilings and repairs for sagging or water-damaged boards, finished neatly and ready for paint.",
    includes: [
      "New ceilings",
      "Replacing sagging or damaged boards",
      "Repairs after roof leaks",
      "Neat finishing, ready to paint",
    ],
  },
  driveways: {
    intro:
      "Durable driveways built on a solid base so they stay level, drain well and handle daily use.",
    includes: [
      "Base preparation",
      "Levelling and drainage",
      "Durable, even surfaces",
      "Repairs to worn or damaged driveways",
    ],
  },
};
