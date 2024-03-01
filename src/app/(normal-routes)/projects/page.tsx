import ProjectContainer from "@/containers/project";
import { metadataObject } from "@/constants/common";
import { Metadata } from "next";

export const metadata: Metadata = {
  ...metadataObject,
  title: `Projects | ${metadataObject.title}`,
};
export default function page() {
  return <ProjectContainer />;
}
