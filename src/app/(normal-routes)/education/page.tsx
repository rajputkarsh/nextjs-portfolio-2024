import { metadataObject } from "@/constants/common";
import EducationContainer from "@/containers/education";
import { Metadata } from "next";

export const metadata: Metadata = {
  ...metadataObject,
  title: `Education | ${metadataObject.title}`,
};

export default function page() {
  return <EducationContainer />;
}
