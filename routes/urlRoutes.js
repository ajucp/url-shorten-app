const express=require('express');
const routes=express.Router();
const shortController=require('../controllers/urlC');
const rateLimiter=require('../middlewares/rateLimiter');

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a shortened URL
 *     parameters:
 *       - in: body
 *         name: url
 *         description: Original URL to be shortened
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             url:
 *               type: string
 *               example: "https://example.com"
 *     responses:
 *       200:
 *         description: Shortened URL created successfully.
 *       400:
 *         description: Invalid URL provided.
 *       429:
 *         description: Rate limit exceeded.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /{alias}:
 *   get:
 *     summary: Redirect to the original URL using the alias
 *     parameters:
 *       - in: path
 *         name: alias
 *         required: true
 *         schema:
 *           type: string
 *           example: "abc123"
 *     responses:
 *       302:
 *         description: Redirect to the original URL.
 *       404:
 *         description: Alias not found.
 *       500:
 *         description: Internal server error.
 */


routes.post('/',rateLimiter,shortController.createShortUrl);
routes.get('/:alias',shortController.redirectShortUrl)

module.exports=routes;