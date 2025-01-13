"use client";

import { motion } from "motion/react";

export default function Logo() {
  return (
    <>
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ duration: 0.3, scale: {
          duration: 0.1
        } }}
        whileHover={{ scale: 1.3 }}
        width="26"
        height="26"
        viewBox="0 0 200 200"
        className="fill-black dark:fill-white focus:outline-none cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M100 0H0L100 100H0L100 200H200L100 100H200L100 0Z"
        />
      </motion.svg>
    </>
  );
}
