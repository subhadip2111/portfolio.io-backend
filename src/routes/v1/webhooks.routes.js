const express = require('express');
const router = express.Router();
router.get('/test',async(req,res)=>{
return res.send({msg:"dbsbb"})
})

router.post('/webhooks', (req, res) => {
  const event = req.headers['x-github-event'];
  const payload = req.body;

  if (!payload.repository) {
    return res.status(400).send('Invalid payload');
  }

  const repoName = payload.repository.name;
  const repoUrl = payload.repository.html_url;

  console.log(`📨 [${event.toUpperCase()}] from ${repoName}: ${repoUrl}`);

  switch (event) {
    case 'push':
      const commits = payload.commits.map(c => ({
        message: c.message,
        author: c.author.name,
        url: c.url,
        timestamp: c.timestamp,
      }));
      console.log(`✅ Push event in ${repoName} with ${commits.length} commits`, commits);
      break;

    case 'pull_request':
      const pr = payload.pull_request;
      console.log(`🔀 Pull Request ${payload.action}: #${pr.number} ${pr.title} by ${pr.user.login}`);
      if (payload.action === 'closed' && pr.merged) {
        console.log(`✅ PR #${pr.number} was merged`);
      }
      break;

    case 'create':
      console.log(`🆕 ${payload.ref_type} created: ${payload.ref} in ${repoName}`);
      break;

    case 'delete':
      console.log(`❌ ${payload.ref_type} deleted: ${payload.ref} in ${repoName}`);
      break;

    default:
      console.log(`ℹ️ Event ${event} is not specifically handled`);
      break;
  }

  res.status(200).send('Webhook received');
});

module.exports=router