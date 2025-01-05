const express =require('express');
const routes=express.Router();
const authenticateGoogle=require('../middlewares/authMiddleware')
const authController=require('../controllers/authC');


routes.post('/google-signin',authenticateGoogle,authController.loginWithGoogle);

module.exports=routes;