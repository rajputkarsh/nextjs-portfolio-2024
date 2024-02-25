"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import ProjectIntroduction from "./ProjectIntroduction";
import LatestProject from "./LatestProject";
import OtherProjects from "./OtherProjects";
import Title from "@/components/title";
import { pageView } from "@/utils/analyticsEvents";

function ProjectContainer() {
  useEffect(() => {
    pageView("Projects");
  }, []);

  return (
    <motion.div
      className="h-full mt-12"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="w-full text-center">
        <Title title="Projects" />
        <div className="mt-24"></div>
        <ProjectIntroduction />
        <div className="mt-24"></div>
        <LatestProject />
        <div className="mt-24"></div>
        <OtherProjects />
      </div>
    </motion.div>
  );
}

export default ProjectContainer;
