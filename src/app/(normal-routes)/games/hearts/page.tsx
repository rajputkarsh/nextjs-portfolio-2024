import GameHeartsContainer from "@/containers/hearts";

import { metadataObject } from "@/constants/common";
import { Metadata } from "next";

export const metadata: Metadata = {
  ...metadataObject,
  title: `Play Hearts | ${metadataObject.title}`,
};

export default function page() {
  return <GameHeartsContainer />;
}
