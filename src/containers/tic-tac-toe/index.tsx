"use client";

import TicTacToe from "@/components/tic-tac-toe";
import { motion } from "framer-motion";

function TicTacToeContainer() {
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
