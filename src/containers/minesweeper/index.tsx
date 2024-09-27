"use client";

import { useEffect } from "react";
import Minesweeper from "@/components/minesweeper";
import { pageView } from "@/utils/analyticsEvents";
import { motion } from "framer-motion";

function MinesweeperContainer() {
  useEffect(() => {
    pageView("Play - Game Minesweeper");
  }, []);

  return (
    <motion.div
      className="h-full mt-12"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="w-full">
        <Minesweeper />
      </div>
    </motion.div>
  );
}

export default MinesweeperContainer;
