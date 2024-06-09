"use client";

import { useEffect } from "react";
import GameKlondikeSolitaire from "@/components/klondikeSolitaire";
import { motion } from "framer-motion";
import { pageView } from "@/utils/analyticsEvents";

function GameSolitaireContainer() {
  useEffect(() => {
    pageView("Game - Solitaire");
  }, []);

  return (
    <motion.div
      className="h-full mt-12"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="w-full">
        <GameKlondikeSolitaire />
      </div>
    </motion.div>
  );
}

export default GameSolitaireContainer;
