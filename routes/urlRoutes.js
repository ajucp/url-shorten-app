const express=require('express');
const routes=express.Router();
const shortController=require('../controllers/urlC');
const rateLimiter=require('../middlewares/rateLimiter');

routes.post('/',rateLimiter,shortController.createShortUrl);
routes.get('/:alias',shortController.redirectShortUrl)

module.exports=routes;