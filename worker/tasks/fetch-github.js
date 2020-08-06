var fetch = require('node-fetch');
const redis = require('redis');
const client = redis.createClient();

const { promisify } = require('util');
const setAsync = promisify(client.set).bind(client);

const baseURL = 'https://jobs.github.com/positions.json';

async function fetchGithub() {
  // console.log('Fetching Github!');

  let resultCount = 1,
    onPage = 0;
  const allJobs = [];

  // fetch all pages
  while (resultCount > 0) {
    const res = await fetch(`${baseURL}?page=${onPage}`);
    const jobs = await res.json();
    allJobs.push(...jobs);
    resultCount = jobs.length;
    console.log('Got ' + resultCount + ' jobs!');
    onPage += 1;
  }

  console.log('Got ' + allJobs.length + ' jobs total!');

  // filter algorithm
  const jrJobs = allJobs.filter((job) => {
    const jobTitle = job.title.toLowerCase();

    // algorithm logic
    if (
      jobTitle.includes('senior') ||
      jobTitle.includes('manager') ||
      jobTitle.includes('sr.') ||
      jobTitle.includes('architect')
    ) {
      return false;
    }
    return true;
  });

  console.log('Filtered down to ' + jrJobs.length);

  // setting redis
  // console.log('Got ' + allJobs.length + ' jobs total!');
  const success = await setAsync('github', JSON.stringify(jrJobs));

  console.log({ success });
}

// fetchGithub();

module.exports = fetchGithub;
