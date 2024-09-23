"use client";

import { useEffect } from "react";
import Tetris from "@/components/tetris";
import { pageView } from "@/utils/analyticsEvents";
import { motion } from "framer-motion";

function TetrisContainer() {
  useEffect(() => {
    pageView("Play - Game Tetris");
  }, []);

  return (
    <motion.div
      className="h-full mt-12"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="w-full">
        <Tetris />
      </div>
    </motion.div>
  );
}

export default TetrisContainer;
