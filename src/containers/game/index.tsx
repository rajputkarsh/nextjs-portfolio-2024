"use client";

import { motion } from "framer-motion";
import GameIntroduction from "./GameIntroduction";
import GameList from "./GameList";
import Title from "@/components/title";

function HomeContainer() {
  return (
    <motion.div
      className="h-full mt-12"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="w-full">
        <Title title="Games" />
        <div className="mt-24"></div>
        <GameIntroduction />
        <div className="mt-24"></div>
        <GameList />
      </div>
    </motion.div>
  );
}

export default HomeContainer;
