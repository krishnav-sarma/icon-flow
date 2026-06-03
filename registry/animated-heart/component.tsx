"use client";

import { motion } from "motion/react";

export default function AnimatedHeart() {
  return (
    <motion.svg
      width="80"
      height="80"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      whileHover="hover"
    >
      <motion.path
        d="M12 21s-7-4.35-9.33-8.33C.33 8.33 2.67 4 7 4c2.33 0 4 1.33 5 3 1-1.67 2.67-3 5-3 4.33 0 6.67 4.33 4.33 8.67C19 16.65 12 21 12 21z"
        variants={{
          hover: {
            scale: 1.1,
          },
        }}
        transition={{
          duration: 0.4,
            repeat: Infinity,
            repeatType: "reverse"
        }}
      />
    </motion.svg>
  );
}