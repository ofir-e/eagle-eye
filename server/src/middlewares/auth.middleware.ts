import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "routing-controllers";

export const ADMIN_HEADER_KEY = 'admin-auth';
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.get(ADMIN_HEADER_KEY) === process.env.ADMIN_KEY) next();
  else next(new UnauthorizedError('6admins only6'));
}