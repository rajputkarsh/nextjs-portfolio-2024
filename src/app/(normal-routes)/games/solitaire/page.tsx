import GameSolitaireContainer from "@/containers/solitaire";

import { metadataObject } from "@/constants/common";
import { Metadata } from "next";

export const metadata: Metadata = {
  ...metadataObject,
  title: `Play Solitaire | ${metadataObject.title}`,
};

export default function page() {
  return <GameSolitaireContainer />;
}
