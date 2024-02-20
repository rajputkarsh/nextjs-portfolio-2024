"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Introduction from "./Introduction";
import Skillset from "./Skillset";

function HomeComponent() {
  return (
    <motion.div
      className="h-full mt-12"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="w-full">
        <Introduction />
        <div className="mt-24"></div>
        <Skillset />
      </div>
    </motion.div>
  );
}

export default HomeComponent;
