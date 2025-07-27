const mongoose = require('mongoose');
const toJSON = require('./plugins/toJSON.plugin');
const paginate = require('./plugins/paginate.plugin');

const submissionSchema = new mongoose.Schema({
  title: String,
  status: String,
  lang: String,
  time: Date
});

const leetcodeSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  ranking: Number,
  totalSolved: Number,
  easySolved: Number,
  mediumSolved: Number,
  hardSolved: Number,
  contributionPoints: Number,
  submissions: [submissionSchema],
  lastSyncedAt: { type: Date, default: Date.now }
});
leetcodeSchema.plugin(toJSON);
leetcodeSchema.plugin(paginate);
module.exports = mongoose.model('LeetCode', leetcodeSchema);
