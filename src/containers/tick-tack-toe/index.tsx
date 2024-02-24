"use client";

import TickTackToe from "@/components/tick-tack-toe";
import { motion } from "framer-motion";

function TickTackToeContainer() {
  return (
    <motion.div
      className="h-full mt-12"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="w-full">
        <TickTackToe />
      </div>
    </motion.div>
  );
}

export default TickTackToeContainer;
