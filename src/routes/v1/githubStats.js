const express = require('express');
const axios = require('axios');
const router = express.Router();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const githubAxios = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
  },
});

// GET /github/repo-data/:owner/:repo
router.get('/repo-data', async (req, res) => {
  const { owner, repo } = req.query;

  try {
    const [repoData, commits, contributors, languages, pulls] = await Promise.all([
      githubAxios.get(`/repos/${owner}/${repo}`),
      githubAxios.get(`/repos/${owner}/${repo}/commits?per_page=100`),
      githubAxios.get(`/repos/${owner}/${repo}/contributors`),
      githubAxios.get(`/repos/${owner}/${repo}/languages`),
      githubAxios.get(`/repos/${owner}/${repo}/pulls?state=all&per_page=100`),
    ]);
console.log(repoData)
    const commitMessages = commits.data.map((c) => ({
      message: c.commit.message,
      author: c.commit.author.name,
      date: c.commit.author.date,
    }));

    res.json({
      name: repoData.data.full_name,
      description: repoData.data.description,
      stars: repoData.data.stargazers_count,
      forks: repoData.data.forks_count,
      open_issues: repoData.data.open_issues_count,
      commits_count: commitMessages.length,
      contributors: contributors.data.map((c) => ({
        login: c.login,
        contributions: c.contributions,
      })),
      commitMessages,
      languages: languages.data,
      pullRequestsCount: pulls.data.length,
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch GitHub repo data' });
  }
});

module.exports = router;
