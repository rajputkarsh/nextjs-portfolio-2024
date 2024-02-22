"use client";

import { motion } from "framer-motion";
import EducationIntroduction from "./EducationIntroduction";
import EducationTimeline from "./EducationTimeline";

function EducationContainer() {
  return (
    <motion.div
      className="h-full mt-12"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="w-full">
        <EducationIntroduction />
        <div className="mt-24"></div>
        <EducationTimeline />
      </div>
    </motion.div>
  );
}

export default EducationContainer;
