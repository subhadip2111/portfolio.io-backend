const express = require('express');
const router = express.Router();
const controller = require('../../controllers/leetcode.controller');

router.post('/sync', controller.syncUser); // POST /api/leetcode/sync
router.get('/profile/:username', controller.getProfile); // GET /api/leetcode/profile/:username
router.get('/submissions/:username', controller.getSubmissions); // GET /api/leetcode/submissions/:username

module.exports = router;
