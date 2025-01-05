import express, { Request, Response, NextFunction } from 'express';
import { saveMatch } from '../controllers/matchController';

const router = express.Router();

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * @swagger
 * tags:
 *   name: Matches
 *   description: Match management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Match:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2024-03-20T15:00:00Z"
 *         teams:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               team:
 *                 type: string
 *                 description: Team ID
 *                 example: "5f7d3a2b9d3e1c2a1b3c4d5e"
 *               score:
 *                 type: number
 *                 example: 3
 *         players:
 *           type: array
 *           items:
 *             type: string
 *             description: Player ID
 *             example: "5f7d3a2b9d3e1c2a1b3c4d5f"
 *         result:
 *           type: object
 *           properties:
 *             winner:
 *               type: string
 *               description: Winner Team ID
 *               example: "5f7d3a2b9d3e1c2a1b3c4d5e"
 *             loser:
 *               type: string
 *               description: Loser Team ID
 *               example: "5f7d3a2b9d3e1c2a1b3c4d5f"
 */

/**
 * @swagger
 * /api/matches:
 *   post:
 *     summary: Save a new match
 *     tags: [Matches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - teams
 *               - players
 *               - result
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *               teams:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     team:
 *                       type: string
 *                       description: Team ID
 *                     score:
 *                       type: number
 *               players:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Player ID
 *               result:
 *                 type: object
 *                 properties:
 *                   winner:
 *                     type: string
 *                     description: Winner Team ID
 *                   loser:
 *                     type: string
 *                     description: Loser Team ID
 *     responses:
 *       201:
 *         description: Match saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Match saved successfully
 *                 match:
 *                   $ref: '#/components/schemas/Match'
 *       400:
 *         description: Invalid match data
 *       500:
 *         description: Server error
 */
router.post('/', asyncHandler(saveMatch));

export default router;