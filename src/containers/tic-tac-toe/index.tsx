"use client";

import { useEffect } from "react";
import TicTacToe from "@/components/tic-tac-toe";
import { pageView } from "@/utils/analyticsEvents";
import { motion } from "framer-motion";

function TicTacToeContainer() {
  useEffect(() => {
    pageView("Game - Tic Tac Toe");
  }, []);

  return (
    <motion.div
      className="h-full mt-12"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="w-full">
        <TicTacToe />
      </div>
    </motion.div>
  );
}

export default TicTacToeContainer;
