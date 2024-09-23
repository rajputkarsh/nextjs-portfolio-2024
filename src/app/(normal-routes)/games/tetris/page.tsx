import GameTetrisContainer from "@/containers/tetris";

import { metadataObject } from "@/constants/common";
import { Metadata } from "next";

export const metadata: Metadata = {
  ...metadataObject,
  title: `Play Tetris | ${metadataObject.title}`,
};

export default function page() {
  return <GameTetrisContainer />;
}
