"use client";
import { motion } from "framer-motion";

const HEART_PATH =
  "M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572";

export default function Preloader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f9f9f9]">
      <motion.svg
        width="120"
        height="120"
        viewBox="0 0 24 24"
        className="mb-8"
      >
        <motion.path
          d={HEART_PATH}
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
      </motion.svg>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-2xl font-snell text-black text-center"
      >
        Батырбек & Гузель
        <div className="text-lg mt-2">17.10.2025</div>
      </motion.div>
    </div>
  );
} 