"use server";

import { Game } from "@/interfaces/game";
import Firebase from "@/utils/firebase";

const COLLECTION_NAME = "games";

const firebase = new Firebase(true);

export const fetchGameList = async (): Promise<Array<Game>> => {
  const data = await firebase.getDocuments<Game>(COLLECTION_NAME);

  return data
    .filter((game) => game.status === "completed")
    .sort((game1, game2) => parseInt(game2.index) - parseInt(game1.index));
};
