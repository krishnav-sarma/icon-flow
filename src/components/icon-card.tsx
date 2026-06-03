"use client";

import { useState } from "react";
import { Copy, Terminal, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface IconCardProps {
  title: string;
  code: string;
  command: string;
  children: React.ReactNode;
}

export default function IconCard({
  title,
  code,
  command,
  children,
}: IconCardProps) {
  const [copied, setCopied] = useState<
    "code" | "command" | null
  >(null);

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied("code");

    setTimeout(() => {
      setCopied(null);
    }, 1500);
  };

  const copyCommand = async () => {
    await navigator.clipboard.writeText(command);
    setCopied("command");

    setTimeout(() => {
      setCopied(null);
    }, 1500);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-zinc-900
        bg-black
        p-8
        transition-all
        duration-300
        hover:border-zinc-700
        hover:shadow-[0_0_40px_rgba(255,255,255,0.03)]
      "
    >
      {/* Toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 10,
            }}
            className="
              absolute
              right-4
              top-4
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-zinc-800
              bg-zinc-950
              px-3
              py-2
              text-xs
              text-zinc-300
            "
          >
            <Check size={14} />
            {copied === "code"
              ? "Copied code"
              : "Copied command"}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon */}
      <div className="flex h-48 items-center justify-center">
        {children}
      </div>

      {/* Name */}
      <h3 className="mb-6 text-center font-mono text-sm text-zinc-300">
        {title}
      </h3>

      {/* Hover Actions */}
      <div
        className="
          flex
          justify-center
          gap-4
          opacity-0
          translate-y-3
          transition-all
          duration-300
          group-hover:translate-y-0
          group-hover:opacity-100
        "
      >
        {/* Copy Code */}
        <button
          onClick={copyCode}
          title="Copy component code"
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-950
            transition-all
            hover:border-zinc-700
            hover:bg-zinc-900
          "
        >
          <Copy size={18} />
        </button>

        {/* Copy Command */}
        <button
          onClick={copyCommand}
          title="Copy install command"
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-950
            transition-all
            hover:border-zinc-700
            hover:bg-zinc-900
          "
        >
          <Terminal size={18} />
        </button>
      </div>
    </motion.div>
  );
}