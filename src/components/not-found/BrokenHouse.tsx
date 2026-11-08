"use client";

import { MotionConfig, motion, type Variants } from "motion/react";
import { EASE_COURSE, EASE_SETTLE } from "@/lib/motion";

// A house mid-repair, built up piece by piece on load:
// walls rise, roof lands, scaffolding goes up, the hard hat drops on top.

const fade: Variants = {
  hidden: { opacity: 0 },
  show: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_SETTLE, delay },
  }),
};

const rise: Variants = {
  hidden: { scaleY: 0 },
  show: (delay: number = 0) => ({
    scaleY: 1,
    transition: { duration: 0.8, ease: EASE_COURSE, delay },
  }),
};

const drop: Variants = {
  hidden: { y: -60, opacity: 0 },
  show: (delay: number = 0) => ({
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 170, damping: 13, delay },
  }),
};

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (delay: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.9, ease: EASE_COURSE, delay },
      opacity: { duration: 0.01, delay },
    },
  }),
};

const fromBottom = { originX: 0.5, originY: 1 } as const;

export function BrokenHouse({ className }: { className?: string }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.svg
        viewBox="0 0 560 430"
        role="img"
        aria-label="A damaged house with a cracked wall and a patched roof, being repaired with scaffolding"
        className={className}
        initial="hidden"
        animate="show"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <radialGradient
            id="house-glow"
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop
              offset="0%"
              style={{ stopColor: "var(--color-hivis)", stopOpacity: 0.38 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "var(--color-hivis)", stopOpacity: 0 }}
            />
          </radialGradient>
        </defs>

        {/* soft glow behind the house */}
        <motion.circle
          variants={fade}
          custom={0}
          cx="280"
          cy="235"
          r="235"
          fill="url(#house-glow)"
        />

        {/* ground */}
        <motion.path
          variants={draw}
          custom={0.1}
          d="M30 400H530"
          className="stroke-steel"
          strokeWidth="4"
        />

        {/* chimney (behind the roof) */}
        <motion.rect
          variants={fade}
          custom={1}
          x="186"
          y="140"
          width="28"
          height="44"
          className="fill-concrete stroke-steel"
          strokeWidth="4"
        />

        {/* walls rise from the ground */}
        <motion.rect
          variants={rise}
          custom={0.25}
          style={fromBottom}
          x="150"
          y="228"
          width="250"
          height="172"
          rx="2"
          className="fill-formwork stroke-steel"
          strokeWidth="4"
        />

        {/* windows and door */}
        <motion.g
          variants={fade}
          custom={1.1}
        >
          {/* boarded-up window */}
          <rect
            x="180"
            y="262"
            width="62"
            height="58"
            className="fill-concrete stroke-steel"
            strokeWidth="4"
          />
          <path
            d="M172 308L250 274M172 276L250 310"
            className="stroke-girder"
            strokeWidth="9"
            strokeLinecap="butt"
          />
          {/* broken window */}
          <rect
            x="300"
            y="262"
            width="62"
            height="58"
            className="fill-concrete stroke-steel"
            strokeWidth="4"
          />
          <path
            d="M331 262L322 284L338 296L326 320M322 284L304 292M338 296L358 290"
            className="stroke-steel"
            strokeWidth="2.5"
          />
          {/* door */}
          <rect
            x="251"
            y="312"
            width="40"
            height="88"
            className="fill-girder stroke-steel"
            strokeWidth="4"
          />
          <circle
            cx="283"
            cy="360"
            r="3.5"
            className="fill-hivis"
          />
        </motion.g>

        {/* crack in the wall */}
        <motion.path
          variants={draw}
          custom={1.6}
          d="M385 228L378 248L390 262L376 284L386 300L374 322"
          className="stroke-steel"
          strokeWidth="3"
        />

        {/* roof: lands on the walls, with a hole where it has collapsed */}
        <motion.g
          variants={drop}
          custom={0.95}
        >
          <polygon
            points="125,228 275,118 425,228"
            className="fill-concrete stroke-steel"
            strokeWidth="4"
          />
          <polygon
            points="268,150 306,156 322,178 300,188 318,208 262,208 276,184 258,168"
            className="fill-steel"
          />
          <path
            d="M281 208L291 154M302 208L304 168"
            className="stroke-concrete"
            strokeWidth="4"
            strokeLinecap="butt"
          />
        </motion.g>

        {/* tarp thrown over part of the hole */}
        <motion.polygon
          variants={drop}
          custom={1.7}
          points="312,168 366,205 332,222 290,206"
          className="fill-hivis stroke-steel"
          strokeWidth="3"
        />

        {/* scaffolding */}
        <motion.path
          variants={rise}
          custom={1.0}
          style={fromBottom}
          d="M425 400V215"
          className="stroke-steel"
          strokeWidth="4"
        />
        <motion.path
          variants={rise}
          custom={1.12}
          style={fromBottom}
          d="M485 400V215"
          className="stroke-steel"
          strokeWidth="4"
        />
        <motion.path
          variants={fade}
          custom={1.7}
          d="M425 355H485M425 305H485M425 255H485"
          className="stroke-steel"
          strokeWidth="4"
        />
        <motion.g
          variants={fade}
          custom={1.8}
        >
          <rect
            x="419"
            y="346"
            width="72"
            height="9"
            className="fill-hivis stroke-steel"
            strokeWidth="2"
          />
          <rect
            x="419"
            y="296"
            width="72"
            height="9"
            className="fill-hivis stroke-steel"
            strokeWidth="2"
          />
          <rect
            x="419"
            y="246"
            width="72"
            height="9"
            className="fill-hivis stroke-steel"
            strokeWidth="2"
          />
        </motion.g>
        <motion.path
          variants={draw}
          custom={1.9}
          d="M425 355L485 305M485 355L425 305M425 305L485 255"
          className="stroke-girder"
          strokeWidth="3"
        />

        {/* ladder leaning on the wall */}
        <motion.g
          variants={fade}
          custom={1.3}
        >
          <path
            d="M90 400L138 262M118 400L146 262"
            className="stroke-hivis-deep"
            strokeWidth="5"
          />
          <path
            d="M99.6 372.4L123.6 372.4M109.2 344.8L129.2 344.8M118.8 317.2L134.8 317.2M128.4 289.6L140.4 289.6"
            className="stroke-hivis-deep"
            strokeWidth="4"
          />
        </motion.g>

        {/* hard hat drops onto the scaffold */}
        <motion.g
          variants={drop}
          custom={2.2}
        >
          <path
            d="M437 246a18 18 0 0 1 36 0z"
            className="fill-hivis stroke-steel"
            strokeWidth="3"
          />
          <rect
            x="451"
            y="229"
            width="8"
            height="14"
            className="fill-hivis stroke-steel"
            strokeWidth="2"
          />
          <path
            d="M431 246H479"
            className="stroke-steel"
            strokeWidth="5"
          />
        </motion.g>

        {/* "404" sign: drops in, then sways gently */}
        <motion.g
          variants={drop}
          custom={2.0}
        >
          <path
            d="M49 400V258"
            className="stroke-steel"
            strokeWidth="4"
          />
          <motion.g
            style={{ originX: 0.5, originY: 0 }}
            animate={{ rotate: [-2.5, 2.5] }}
            transition={{
              duration: 3.4,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: 3,
            }}
          >
            <path
              d="M24 272L49 258L74 272"
              className="stroke-steel"
              strokeWidth="2.5"
            />
            <rect
              x="14"
              y="272"
              width="70"
              height="40"
              rx="3"
              className="fill-hivis stroke-steel"
              strokeWidth="3"
            />
            <text
              x="49"
              y="293"
              textAnchor="middle"
              dominantBaseline="central"
              className="font-display fill-steel"
              fontSize="22"
              fontWeight="900"
              stroke="none"
            >
              404
            </text>
          </motion.g>
        </motion.g>

        {/* traffic cone */}
        <motion.g
          variants={fade}
          custom={2.3}
        >
          <polygon
            points="506,398 534,398 524,356 516,356"
            className="fill-hivis stroke-steel"
            strokeWidth="3"
          />
          <polygon
            points="510,386 530,386 527,374 513,374"
            className="fill-formwork"
          />
          <rect
            x="500"
            y="396"
            width="40"
            height="6"
            rx="2"
            className="fill-steel"
          />
        </motion.g>
      </motion.svg>
    </MotionConfig>
  );
}
