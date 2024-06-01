"use client";

import { useEffect } from "react";
import GameHearts from "@/components/Hearts";
import { motion } from "framer-motion";
import { pageView } from "@/utils/analyticsEvents";

function GameHeartsContainer() {
  useEffect(() => {
    pageView("Game - Hearts");
  }, []);

  return (
    <motion.div
      className="h-full mt-12"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="w-full">
        <GameHearts />
      </div>
    </motion.div>
  );
}

export default GameHeartsContainer;
