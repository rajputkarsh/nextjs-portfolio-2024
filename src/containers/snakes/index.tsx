"use client";

import { useEffect } from "react";
import Snakes from "@/components/snakes";
import { pageView } from "@/utils/analyticsEvents";
import { motion } from "framer-motion";

function SnakesContainer() {
  useEffect(() => {
    pageView("Play - Game Snakes");
  }, []);

  return (
    <motion.div
      className="h-full mt-12"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="w-full">
        <Snakes />
      </div>
    </motion.div>
  );
}

export default SnakesContainer;
