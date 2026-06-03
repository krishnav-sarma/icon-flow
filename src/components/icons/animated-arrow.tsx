"use client";

import { motion, useAnimation } from "motion/react";
import { useRef } from "react";

export default function AnimatedArrow() {
  const controls = useAnimation();

  const isAnimating = useRef(false);
  const isHovered = useRef(false);

  const runAnimation = async () => {
    if (isAnimating.current) return;

    isAnimating.current = true;

    await controls.start({
      pathLength: [0, 1],
      transition: {
        duration: 0.6,
      },
    });

    await controls.start({
      x: [0, 5, 0],
      transition: {
        duration: 0.4,
      },
    });

    isAnimating.current = false;

    // If still hovered after finishing,
    // immediately start another cycle
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
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      <motion.path
        d="M5 12H19"
        initial={{ pathLength: 0 }}
        animate={controls}
      />

      <motion.path
        d="M13 6L19 12L13 18"
        animate={controls}
      />
    </motion.svg>
  );
}