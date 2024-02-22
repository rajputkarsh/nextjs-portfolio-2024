"use client";

import { motion } from "framer-motion";
import ProjectIntroduction from "./ProjectIntroduction";
import LatestProject from "./LatestProject";
import OtherProjects from "./OtherProjects";
import ComingSoonProjects from "./ComingSoonProjects";

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
        <div className="mt-24"></div>
        <LatestProject />
        <div className="mt-24"></div>
        <OtherProjects />
        <div className="mt-24"></div>
        <ComingSoonProjects />
      </div>
    </motion.div>
  );
}

export default ProjectComponent;