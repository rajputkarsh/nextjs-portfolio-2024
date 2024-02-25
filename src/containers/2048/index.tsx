"use client";

import { useEffect } from "react";
import Game2048 from "@/components/2048";
import { motion } from "framer-motion";
import { pageView } from "@/utils/analyticsEvents";

function Game2048Container() {
  useEffect(() => {
    pageView("Homepage");
  }, []);

  return (
    <motion.div
      className="h-full mt-12"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="w-full">
        <Game2048 />
      </div>
    </motion.div>
  );
}

export default Game2048Container;
