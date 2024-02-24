"use client";

import { motion } from "framer-motion";
import GameIntroduction from "./GameIntroduction";
import GameList from "./GameList";

function HomeContainer() {
  return (
    <motion.div
      className="h-full mt-12"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="w-full">
        <GameIntroduction />
        <div className="mt-24"></div>
        <GameList />
      </div>
    </motion.div>
  );
}

export default HomeContainer;
