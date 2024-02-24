"use server";

import { Project } from "@/interfaces/project";
import firebase from "@/utils/firebase";

const COLLECTION_NAME = "projects";

export const fetchLatestProject = async (): Promise<Project> => {
  const data = await firebase.getDocuments<Project>(COLLECTION_NAME);
  return data
    .filter((project) => project.status === "completed")
    .sort(
      (project1, project2) =>
        parseInt(project2.index) - parseInt(project1.index)
    )[0];
};

export const fetchOtherProjects = async (): Promise<Array<Project>> => {
  const data = await firebase.getDocuments<Project>(COLLECTION_NAME);
  return data.filter((project) => project.status === "completed").slice(1);
};
