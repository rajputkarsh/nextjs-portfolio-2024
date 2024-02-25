"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import EducationIntroduction from "./EducationIntroduction";
import EducationTimeline from "./EducationTimeline";
import Title from "@/components/title";
import { pageView } from "@/utils/analyticsEvents";

function EducationContainer() {
  useEffect(() => {
    pageView("Education");
  }, []);

  return (
    <motion.div
      className="h-full mt-12"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="w-full">
        <Title title="Education" />
        <div className="mt-24"></div>
        <EducationIntroduction />
        <div className="mt-24"></div>
        <EducationTimeline />
      </div>
    </motion.div>
  );
}

export default EducationContainer;
