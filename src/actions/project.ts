"use server";

import { Project } from "@/interfaces/project";
import firebase from "@/utils/firebase";

const COLLECTION_NAME = "projects";

export const fetchLatestProject = async (): Promise<Project> => {
  const data = await firebase.getDocuments(COLLECTION_NAME);
  return data[0];
};
