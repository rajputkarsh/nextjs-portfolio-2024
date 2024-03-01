import GameTicTacToeContainer from "@/containers/tic-tac-toe";

import { metadataObject } from "@/constants/common";
import { Metadata } from "next";

export const metadata: Metadata = {
  ...metadataObject,
  title: `Tic-Tac-Toe | ${metadataObject.title}`,
};

export default function page() {
  return <GameTicTacToeContainer />;
}
