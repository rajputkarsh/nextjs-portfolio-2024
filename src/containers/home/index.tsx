"use client";

import { motion } from "framer-motion";
import HomeIntroduction from "./HomeIntroduction";
import Skillset from "./Skillset";
import GithubStats from "./GithubStats";

function HomeComponent() {
  return (
    <motion.div
      className="h-full mt-12"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="w-full">
        <HomeIntroduction />
        <div className="mt-24"></div>
        <Skillset />
        <div className="mt-24"></div>
        <GithubStats />
      </div>
    </motion.div>
  );
}

export default HomeComponent;
