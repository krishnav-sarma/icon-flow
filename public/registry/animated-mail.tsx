"use client";

import { motion, useAnimation } from "motion/react";
import { useRef } from "react";

export default function AnimatedMail() {
  const controls = useAnimation();

  const isAnimating = useRef(false);
  const isHovered = useRef(false);

  const runAnimation = async () => {
    if (isAnimating.current) return;

    isAnimating.current = true;

    await controls.start("open");

    await controls.start("close");

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
      {/* Envelope body */}
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
      />

      {/* Bottom folds */}
      <path d="M3 7L12 13L21 7" />

      {/* Animated top flap */}
      <motion.path
        d="M3 7L12 13L21 7"
        animate={controls}
        variants={{
          open: {
            rotateX: -35,
            y: -1,
            transition: {
              duration: 0.25,
            },
          },
          close: {
            rotateX: 0,
            y: 0,
            transition: {
              duration: 0.25,
            },
          },
        }}
        style={{
          transformOrigin: "12px 7px",
        }}
      />
    </motion.svg>
  );
}