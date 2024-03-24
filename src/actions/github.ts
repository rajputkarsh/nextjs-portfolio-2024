'use server';

import { Octokit } from '@octokit/rest';

const octokitInstance = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

const _getAfterDate = () => {

  const date = new Date();
  date.setFullYear(date.getFullYear()-1);

  const offset = date.getTimezoneOffset()
  const newDate = new Date(date.getTime() - (offset*60*1000))
  return newDate.toISOString().split('T')[0]  
}
    
const _fetchCommitsPage = (pageLimit: number, pageNumber: number) => {
  const dateString = _getAfterDate();
  const query = `author:rajputkarsh+author-date:>${dateString}`;
  return octokitInstance.search.commits({q: query, per_page:pageLimit, page: pageNumber});
}

const _addDataToObject = <T>(obj: {[key: string]: number}, data:Array<any>) => {
  data.forEach((item) => {
    const commitDate = item.commit.author.date.split('T')[0];
    if(obj.hasOwnProperty(commitDate)) {
      obj[commitDate] = obj[commitDate] + 1;
    } else {
      obj[commitDate] = 1;
    }
  })  
}

export const fetchStats = async () => {

  const commits: {[key: string]: number} = {};
  const perPageLimit = 100;
  let currentPage = 1;

  try {
    const initialCommitData = await _fetchCommitsPage(perPageLimit, currentPage);
    const totalCount = initialCommitData.data.total_count;
  
    _addDataToObject(commits, initialCommitData.data.items);
  
    while(totalCount > perPageLimit * currentPage) {
      currentPage += 1;
      const commitData = await _fetchCommitsPage(perPageLimit, currentPage);
      _addDataToObject(commits, commitData.data.items);
    }
  } catch(error) {
    console.log('error -- ', error)
  }

 
  return commits;
}