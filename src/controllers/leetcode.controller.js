// const LeetCode = require('../models/leetcode.model');

const { LeetCode } = require("../models");
const { fetchLeetCodeData } = require("../services/leetcode.service");


exports.syncUser = async (req, res) => {
  try {
    const { username } = req.body;
        const data = await fetchLeetCodeData(username);
    if (!data) return res.status(404).json({ message: 'User not found' });

    // const updated = await LeetCode.findOneAndUpdate(
    //   { username },
    //   data,
    //   { upsert: true, new: true }
    // );

    return res.json({data:data});
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await LeetCode.findOne({ username });
    if (!user) return res.status(404).json({ message: 'Not found' });

    res.json({
      username: user.username,
      ranking: user.ranking,
      totalSolved: user.totalSolved,
      easySolved: user.easySolved,
      mediumSolved: user.mediumSolved,
      hardSolved: user.hardSolved,
      contributionPoints: user.contributionPoints,
      lastSyncedAt: user.lastSyncedAt
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSubmissions = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await LeetCode.findOne({ username });
    if (!user) return res.status(404).json({ message: 'Not found' });

    res.json(user.submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
