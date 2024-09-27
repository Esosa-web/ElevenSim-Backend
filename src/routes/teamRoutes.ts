import express, { Request, Response, NextFunction } from 'express';
import { getAllTeams, getTeamById } from '../controllers/teamController';

const router = express.Router();

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

router.get('/', asyncHandler(getAllTeams));
router.get('/:id', asyncHandler(getTeamById));

export default router;