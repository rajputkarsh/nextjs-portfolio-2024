import GameMinesweeperContainer from "@/containers/minesweeper";

import { metadataObject } from "@/constants/common";
import { Metadata } from "next";

export const metadata: Metadata = {
  ...metadataObject,
  title: `Play Minesweeper | ${metadataObject.title}`,
};

export default function page() {
  return <GameMinesweeperContainer />;
}
