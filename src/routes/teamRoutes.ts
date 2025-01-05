import express, { Request, Response, NextFunction } from 'express';
import { getAllTeams, getTeamById } from '../controllers/teamController';

const router = express.Router();

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: Team management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Team:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Raimon
 *         formation:
 *           type: string
 *           example: 4-3-3
 *         overallRating:
 *           type: number
 *           example: 85
 *         stats:
 *           type: object
 *           properties:
 *             attack:
 *               type: number
 *               example: 87
 *             defense:
 *               type: number
 *               example: 83
 *             teamwork:
 *               type: number
 *               example: 90
 */

/**
 * @swagger
 * /api/teams:
 *   get:
 *     summary: Get all teams
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: List of teams
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 */
router.get('/', asyncHandler(getAllTeams));

/**
 * @swagger
 * /api/teams/{id}:
 *   get:
 *     summary: Get team by ID
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Team ID
 *     responses:
 *       200:
 *         description: Team details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       404:
 *         description: Team not found
 */
router.get('/:id', asyncHandler(getTeamById));

export default router;