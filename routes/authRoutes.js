const express =require('express');
const routes=express.Router();
const authenticateGoogle=require('../middlewares/authMiddleware')
const authController=require('../controllers/authC');


/**
 * @swagger
 * /google-signin:
 *   post:
 *     summary: Authenticate and log in using Google Sign-In
 *     security:
 *       - OAuth2: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           description: Bearer token from Google OAuth
 *     responses:
 *       200:
 *         description: User authenticated successfully.
 *       401:
 *         description: Unauthorized or invalid credentials.
 *       500:
 *         description: Internal server error.
 */

routes.post('/google-signin',authenticateGoogle,authController.loginWithGoogle);

module.exports=routes;