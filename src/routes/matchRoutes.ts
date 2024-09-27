import express, { Request, Response, NextFunction } from 'express';
import { saveMatch } from '../controllers/matchController';

const router = express.Router();

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

router.post('/', asyncHandler(saveMatch));

export default router;