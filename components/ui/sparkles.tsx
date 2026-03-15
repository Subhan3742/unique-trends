"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const SparklesCore = ({
  background,
  minSize,
  maxSize,
  particleDensity,
  className,
  particleColor,
}: {
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}) => {
  const particles = Array.from({ length: particleDensity || 50 });

  return (
    <div className={cn("absolute inset-0", className)}>
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * (maxSize || 3) + (minSize || 1),
            height: Math.random() * (maxSize || 3) + (minSize || 1),
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            background: particleColor || "#FFF",
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};
