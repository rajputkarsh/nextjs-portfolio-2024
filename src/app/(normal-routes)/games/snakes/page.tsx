import GameSnakesContainer from "@/containers/snakes";

import { metadataObject } from "@/constants/common";
import { Metadata } from "next";

export const metadata: Metadata = {
  ...metadataObject,
  title: `Play Snakes | ${metadataObject.title}`,
};

export default function page() {
  return <GameSnakesContainer />;
}
