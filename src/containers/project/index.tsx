"use client";

import { motion } from "framer-motion";
import ProjectIntroduction from "./ProjectIntroduction";

function ProjectComponent() {
  return (
    <motion.div
      className="h-full mt-12"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="w-full">
        <ProjectIntroduction />
      </div>
    </motion.div>
  );
}

export default ProjectComponent;
