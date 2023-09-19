import { prisma } from '@/lib/db';
import { Request, Response } from 'express';

export async function getFavTeams(req: Request, res: Response) {
  try {
    const teams = await prisma.team
      .findMany({
        where: {
          followingUsers: {
            some: {
              userId: req.params.userId,
            },
          },
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.json(teams);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const { userId, teamId } = req.body;
    console.log("remove",req.body)


    await prisma.teamUser
      .delete({
        where: {
          teamId_userId: {
            teamId,
            userId,
          },
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.sendStatus(204);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function post(req: Request, res: Response) {
  try {
    const { teamId, userId, isMemberOfCurrentCAN } = req.body;
   

    if (!teamId || !userId || isMemberOfCurrentCAN == null) {
      res.status(400);
      throw Error('Missing parameters');
    }

    if (isMemberOfCurrentCAN === false) {
      res.status(403);
      throw Error('Cannot link a user to a non-participating team');
    }

    await prisma.teamUser
      .create({
        data: {
          userId,
          teamId,
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.sendStatus(201);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}
