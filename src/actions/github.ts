"use server";

import { Octokit } from "@octokit/rest";
import Firebase from "@/utils/firebase";

const octokitInstance = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const COLLECTION_NAME = "githubCommits";

const _fetchCommitsPage = (pageLimit: number, pageNumber: number) => {
  const dateString = _getDates();
  const query = `author:rajputkarsh+author-date:${dateString.date1}..${dateString.date2}`;
  return octokitInstance.search.commits({
    q: query,
    per_page: pageLimit,
    page: pageNumber,
  });
};

const _addDataToObject = <T>(
  obj: { [key: string]: number },
  data: Array<any>
) => {
  data.forEach((item) => {
    const commitDate = item.commit.author.date.split("T")[0];
    if (obj.hasOwnProperty(commitDate)) {
      obj[commitDate] = obj[commitDate] + 1;
    } else {
      obj[commitDate] = 1;
    }
  });
};

const _getDates = () => {
  const LAST_DAYS = 10;

  const date1 = new Date(new Date().setDate(new Date().getDate() - LAST_DAYS));
  const date1String = date1.toISOString().split("T")[0];
  const date2 = new Date(date1.setDate(date1.getDate() + LAST_DAYS + 2));
  const date2String = date2.toISOString().split("T")[0];

  return { date1: date1String, date2: date2String };
};

const _saveStats = async (data: { [key: string]: number }): Promise<void> => {
  try {
    const firebase = new Firebase(true);

    for await (let [date, commits] of Object.entries(data)) {
      const searchResults = await firebase.searchDocuments<{
        id: string;
        commits: number;
        date: string;
      }>(COLLECTION_NAME, { param: "date", condition: "==", value: date });

      if (!searchResults.length) {
        await firebase.saveDocument(COLLECTION_NAME, { date, commits });
      } else if (
        searchResults.length === 1 &&
        searchResults[0].commits <= commits
      ) {
        await firebase.updateDocument(
          COLLECTION_NAME,
          { id: searchResults[0].id },
          { date, commits }
        );
      } else if (searchResults.length > 1) {
        // delete all and save
        const deleteQueries = searchResults.map((result) =>
          firebase.deleteDocument(COLLECTION_NAME, { id: result.id })
        );
        await Promise.all(deleteQueries);
        await firebase.saveDocument(COLLECTION_NAME, { date, commits });
      }
    }
  } catch (error) {
    console.log(`Error while saving github commits -- `, error);
  }
};

export const savePreviousStats = async () => {
  const commits: { [key: string]: number } = {};
  const perPageLimit = 100;
  let currentPage = 1;

  try {
    const initialCommitData = await _fetchCommitsPage(
      perPageLimit,
      currentPage
    );
    const totalCount = initialCommitData.data.total_count;

    _addDataToObject(commits, initialCommitData.data.items);

    while (totalCount > perPageLimit * currentPage) {
      currentPage += 1;
      const commitData = await _fetchCommitsPage(perPageLimit, currentPage);
      _addDataToObject(commits, commitData.data.items);
    }
  } catch (error) {
    console.log(`error -- `, error);
  }

  await _saveStats(commits);

  return commits;
};

export const fetchStats = async () => {

  const commits: { [key: string]: number } = {};
  const firebase = new Firebase(true);

  const date = new Date();
  date.setDate(date.getDate() - 365);

  const commitData = await firebase.searchDocuments<{
    id: string;
    commits: number;
    date: string;
  }>(COLLECTION_NAME, {
    param: "date",
    condition: ">=",
    value: date.toISOString().split("T")[0],
  });

  for (let commit of commitData) {
    commits[commit.date] = commit.commits;
  }

  return commits;
};
