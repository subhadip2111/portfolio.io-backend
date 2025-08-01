const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const leetcodeRoute=require('./leetcode.routes')
const projectRoute=require('./project.routes')
const webhooksRoute=require('./webhooks.routes')
const githubStatsRoutes=require('./githubStats')
const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path:'/leetcode',
    route:leetcodeRoute
  },
   {
    path:'/project',
    route:projectRoute
  },
  {
    path: '/webhooks',
    route: webhooksRoute,
  },
  {
    path:'/githubstats',
    route:githubStatsRoutes
  }

];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
