const express=require('express');
const routes=express.Router();
const analyticsController=require('../controllers/analyticsC');


/**
 * @swagger
 * /analytics/{alias}:
 *   get:
 *     summary: Get analytics for a specific alias
 *     parameters:
 *       - in: path
 *         name: alias
 *         required: true
 *         schema:
 *           type: string
 *           example: "abc123"
 *     responses:
 *       200:
 *         description: Analytics retrieved successfully.
 *       404:
 *         description: Alias not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /analytics/topic/{topic}:
 *   get:
 *     summary: Get analytics for a specific topic
 *     parameters:
 *       - in: path
 *         name: topic
 *         required: true
 *         schema:
 *           type: string
 *           example: "marketing"
 *     responses:
 *       200:
 *         description: Analytics retrieved successfully.
 *       404:
 *         description: Topic not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /analytics/overall:
 *   get:
 *     summary: Get overall analytics
 *     responses:
 *       200:
 *         description: Overall analytics retrieved successfully.
 *       500:
 *         description: Internal server error.
 */


routes.get('/:alias',analyticsController.getAnalyticsByAlias);

routes.get('/topic/:topic',analyticsController.getAnalyticsByTopic);

routes.get('/overall',analyticsController.getOverallAnalytics);

module.exports=routes;