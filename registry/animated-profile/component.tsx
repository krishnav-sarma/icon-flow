"use client";

import { motion, useAnimation } from "motion/react";
import { useRef } from "react";

export default function AnimatedProfile() {
  const controls = useAnimation();

  const isAnimating = useRef(false);
  const isHovered = useRef(false);

  const runAnimation = async () => {
    if (isAnimating.current) return;

    isAnimating.current = true;

    await controls.start("hover");

    await controls.start("idle");

    isAnimating.current = false;

    if (isHovered.current) {
      runAnimation();
    }
  };

  const handleHoverStart = () => {
    isHovered.current = true;

    if (!isAnimating.current) {
      runAnimation();
    }
  };

  const handleHoverEnd = () => {
    isHovered.current = false;
  };

  return (
    <motion.svg
      width="80"
      height="80"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      {/* Head */}
      <motion.circle
        cx="12"
        cy="8"
        r="4"
        animate={controls}
        variants={{
          idle: {
            scale: 1,
          },
          hover: {
            scale: 1.15,
            transition: {
              duration: 0.25,
            },
          },
        }}
      />

      {/* Body */}
      <motion.path
        d="M4 20C4 16.5 7.5 14 12 14C16.5 14 20 16.5 20 20"
        animate={controls}
        variants={{
          idle: {
            y: 0,
          },
          hover: {
            y: -1,
            transition: {
              duration: 0.25,
            },
          },
        }}
      />
    </motion.svg>
  );
}