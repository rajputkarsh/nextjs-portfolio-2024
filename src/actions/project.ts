"use server";

import firebase from "@/utils/firebase";

const COLLECTION_NAME = "projects";

export const fetchLatestProject = async () => {
  const data = await firebase.getDocuments(COLLECTION_NAME);
  console.log(data);

  return data[0];
};
