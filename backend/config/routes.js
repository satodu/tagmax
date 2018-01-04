const express = require('express');

module.exports = function(server){
    //api routes
    const router = express.Router(),
    companyRoutes = express.Router();

    server.use(function(req, res, next) {
          res.setHeader('Access-Control-Allow-Credentials', true);
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
          res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
          next();
     });

    server.use('/api', router);
    //controllers
    const auth = require('../api/auth/auth');
    const company = require('../api/company/company');
    const user = require('../api/user/user');
    const campaigns = require('../api/campaigns/campaigns');
    const campaignsTag = require('../api/campaignTag/campaignsTag');

    //routas da API
    router.use('/login', auth);
    router.use('/company', company);
    router.use('/user', user);
    router.use('/campaigns', campaigns);
    router.use('/tag', campaignsTag);
}