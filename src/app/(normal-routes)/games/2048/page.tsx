import Game2048Container from "@/containers/2048";

import { metadataObject } from "@/constants/common";
import { Metadata } from "next";

export const metadata: Metadata = {
  ...metadataObject,
  title: `2048 | ${metadataObject.title}`,
};

export default function page() {
  return <Game2048Container />;
}
