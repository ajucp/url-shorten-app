const express=require('express');
const routes=express.Router();
const analyticsController=require('../controllers/analyticsC');

routes.get('/:alias',analyticsController.getAnalyticsByAlias);

routes.get('/topic/:topic',analyticsController.getAnalyticsByTopic);

routes.get('/overall',analyticsController.getOverallAnalytics);

module.exports=routes;