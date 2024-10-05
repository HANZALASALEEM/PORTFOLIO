"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div className="container flex justify-center items-center">
      <motion.div
        className="bg-gradient-to-b from-primary-400 to-secondary-600 my-24 h-16 w-1 rounded-full hidden sm:block dark:bg-opacity-20"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.125 }}
      ></motion.div>
    </div>
  );
}
