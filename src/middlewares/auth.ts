import { verifyToken } from '@/utils/auth/tokens';
import { NextFunction, Request, Response } from 'express';

export async function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Retrieve auth token
  const token = req.headers.authorization?.split(' ')[1];
  try {
    if (!token) {
      res.status(401);
      throw new Error("You're not authenticated.");
    }

    const userPayload = await verifyToken({
      token,
      type: 'access',
    }).catch((e) => {
      res.status(403);
      throw e;
    });

    req.user = userPayload;
    next();
  } catch (e: any) {
    res.json({
      name: e.name ?? 'Error',
      message: e.message,
    });
  }
}
