"use server";

import { Project } from "@/interfaces/project";
import Firebase from "@/utils/firebase";

const COLLECTION_NAME = "projects";

const firebase = new Firebase(true);

export const fetchLatestProject = async (): Promise<Project> => {
  const data = await firebase.getDocuments<Project>(COLLECTION_NAME);
  return data
    .filter((project) => project.status === "completed")
    .sort(
      (project1, project2) =>
        project2.index - project1.index
    )[0];
};

export const fetchOtherProjects = async (): Promise<Array<Project>> => {
  const data = await firebase.getDocuments<Project>(COLLECTION_NAME);
  return data.filter((project) => project.status === "completed");
};
