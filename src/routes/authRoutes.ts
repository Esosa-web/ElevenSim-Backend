import express, { Request, Response, NextFunction } from 'express';
import { signup, login } from '../controllers/authController';

const router = express.Router();

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

router.post('/signup', asyncHandler(signup));
router.post('/login', asyncHandler(login));

export default router;