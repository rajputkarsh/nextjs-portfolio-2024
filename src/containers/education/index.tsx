"use client";

import { motion } from "framer-motion";

function EducationComponent() {
  return (
    <motion.div
      className="h-full mt-12"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="w-full"></div>
    </motion.div>
  );
}

export default EducationComponent;
