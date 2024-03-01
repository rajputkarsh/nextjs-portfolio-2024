import GameContainer from "@/containers/game";
import { metadataObject } from "@/constants/common";
import { Metadata } from "next";

export const metadata: Metadata = {
  ...metadataObject,
  title: `Games | ${metadataObject.title}`,
};

export default function page() {
  return <GameContainer />;
}
