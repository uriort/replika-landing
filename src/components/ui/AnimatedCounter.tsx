"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (isNaN(numericValue)) {
      setDisplayValue(value);
      return;
    }

    const duration = 1500;
    const startTime = Date.now();
    const hasDecimal = value.includes(".");

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numericValue * eased;

      if (hasDecimal) {
        setDisplayValue(current.toFixed(1));
      } else {
        setDisplayValue(Math.round(current).toString());
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
